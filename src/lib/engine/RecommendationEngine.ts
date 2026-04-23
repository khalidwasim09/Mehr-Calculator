/**
 * RecommendationEngine — AI-Powered Mehr Recommendation
 * 
 * This is the core intelligence of MehrWise. It uses a weighted multi-factor
 * scoring algorithm to produce a personalized Mehr recommendation range.
 * 
 * Architecture:
 *   Inputs → Factor Scoring → Weighted Aggregation → Range Generation → Output
 * 
 * The engine produces a RANGE (min–sweetSpot–max), not a single number,
 * because Mehr is ultimately a mutual agreement between the couple.
 * 
 * Income Handling:
 *   - Income is a significant factor (30% weight) but uses LOGARITHMIC scaling
 *   - A groom earning $1M does NOT get a 10x recommendation vs $100K
 *   - The curve flattens at higher incomes to prevent excessive amounts
 *   - This respects the hadith: "The best of mehr is the easiest"
 *   - While also acknowledging that the bride has a right to request
 *     proportionally more from a higher-earning groom
 */

import { CalculatorState } from '../types/calculator';
import {
  RecommendationOutput,
  RecommendedRange,
  ReasoningStep,
  ConfidenceLevel,
  AffordabilityResult,
  MithlAnalysis,
  MehrBreakdownResult,
  FiqhComplianceResult,
  SunnahComparison,
} from '../types/recommendation';
import { CurrencyCode } from '../types/currency';
import {
  HANAFI_MINIMUM_SILVER_GRAMS,
  MALIKI_MINIMUM_SILVER_GRAMS,
  SHAFII_HANBALI_MINIMUM_SILVER_GRAMS,
  SUNNAH_BENCHMARKS
} from '../constants/fiqh';
import { getRegionalNorm } from '../constants/regions';
import {
  convertToUSD,
  convertFromUSD,
  calculateHanafiMinimum,
  convertToGoldGrams,
  convertToSilverGrams,
} from './MehrEngine';

/* ── Factor Weights ── */

const WEIGHT_INCOME = 0.30;
const WEIGHT_FAMILY_PRECEDENT = 0.25;
const WEIGHT_REGIONAL_NORMS = 0.20;
const WEIGHT_CULTURAL_EXPECTATION = 0.10;
const WEIGHT_HANAFI_MINIMUM = 0.10;
const WEIGHT_BRIDE_PROFILE = 0.05;

/* ── Income Bracket Ranges (in USD) ── */

/**
 * Maps income levels to a suggested Mehr range using logarithmic scaling.
 * The function: baseRange * (1 + ln(income / baseIncome) * scaleFactor)
 * 
 * This ensures:
 * - $30K income → ~$2,000–$5,000 range
 * - $60K income → ~$3,500–$8,000 range
 * - $100K income → ~$5,000–$12,000 range
 * - $250K income → ~$8,000–$20,000 range
 * - $500K income → ~$10,000–$28,000 range
 * - $1M income → ~$12,000–$35,000 range
 * 
 * The curve flattens significantly above $250K — higher income doesn't
 * linearly translate to higher mehr. This reflects the Sunnah principle
 * of ease while acknowledging the bride's right to proportional consideration.
 */
function incomeToRange(annualIncomeUSD: number): { low: number; high: number } {
  const baseIncome = 30000;
  const baseLow = 2000;
  const baseHigh = 5000;
  const scaleFactor = 0.65;

  if (annualIncomeUSD <= 0) {
    return { low: 200, high: 1000 };
  }

  const ratio = Math.max(annualIncomeUSD / baseIncome, 0.1);
  const logMultiplier = 1 + Math.log(ratio) * scaleFactor;
  const clampedMultiplier = Math.max(logMultiplier, 0.3);

  return {
    low: Math.round(baseLow * clampedMultiplier),
    high: Math.round(baseHigh * clampedMultiplier),
  };
}

/**
 * Apply debt adjustment — reduces the range if significant debts exist
 */
function applyDebtAdjustment(
  range: { low: number; high: number },
  hasDebts: boolean,
  debtAmountUSD: number,
  incomeUSD: number
): { low: number; high: number } {
  if (!hasDebts || debtAmountUSD <= 0) return range;

  const debtToIncomeRatio = debtAmountUSD / Math.max(incomeUSD, 1);
  let reductionFactor = 1.0;

  if (debtToIncomeRatio > 2.0) {
    reductionFactor = 0.5;
  } else if (debtToIncomeRatio > 1.0) {
    reductionFactor = 0.7;
  } else if (debtToIncomeRatio > 0.5) {
    reductionFactor = 0.85;
  }

  return {
    low: Math.round(range.low * reductionFactor),
    high: Math.round(range.high * reductionFactor),
  };
}

/**
 * Map cultural expectation (1-5) to a multiplier
 */
function culturalExpectationMultiplier(level: number): number {
  const multipliers: Record<number, number> = {
    1: 0.6,   // Very modest
    2: 0.8,   // Modest
    3: 1.0,   // Moderate
    4: 1.3,   // Generous
    5: 1.6,   // Very generous
  };
  return multipliers[level] ?? 1.0;
}

/**
 * Calculate bride profile contribution
 */
function brideProfileMultiplier(state: CalculatorState): number {
  let multiplier = 1.0;

  // Education adds slight premium per Mehr al-Mithl principles
  const educationBonus: Record<string, number> = {
    high_school: 0.0,
    bachelors: 0.05,
    masters: 0.10,
    doctorate: 0.15,
    hafiza: 0.12,  // Memorized the Quran — highly valued
    alima: 0.15,   // Islamic scholar — highly valued
  };
  multiplier += educationBonus[state.bride.educationLevel] ?? 0;

  // Professional status is a minor factor
  if (state.bride.professionalStatus === 'working') {
    multiplier += 0.03;
  }

  return multiplier;
}

/**
 * Determine confidence level based on data completeness
 */
function determineConfidence(state: CalculatorState): ConfidenceLevel {
  let dataPoints = 0;
  const maxDataPoints = 8;

  if (state.financial.annualIncome > 0) dataPoints++;
  if (state.financial.employmentStatus !== 'unemployed') dataPoints++;
  if (state.family.countryOfOrigin) dataPoints++;
  if (state.family.sisterMehr !== null) dataPoints++;
  if (state.family.motherMehr !== null) dataPoints++;
  if (state.family.culturalExpectation >= 1) dataPoints++;
  if (state.bride.educationLevel) dataPoints++;
  if (state.preferences.metalPrices.goldPerGramUSD > 0) dataPoints++;

  const ratio = dataPoints / maxDataPoints;
  if (ratio >= 0.75) return 'high';
  if (ratio >= 0.5) return 'medium';
  return 'low';
}

/**
 * Calculate Mehr al-Mithl from family data
 */
function calculateMithl(state: CalculatorState): MithlAnalysis | null {
  const { sisterMehr, motherMehr } = state.family;
  if (sisterMehr === null && motherMehr === null) return null;

  const values: number[] = [];
  if (sisterMehr !== null && sisterMehr > 0) values.push(sisterMehr);
  if (motherMehr !== null && motherMehr > 0) values.push(motherMehr);

  if (values.length === 0) return null;

  // Convert family mehr values to USD for comparison
  const familyAverageInCurrency =
    values.reduce((sum, v) => sum + v, 0) / values.length;
  const familyAverageUSD = convertToUSD(
    familyAverageInCurrency,
    state.financial.currency
  );

  return {
    familyAverage: familyAverageInCurrency,
    dataPoints: values.length,
    comparisonToRecommendation: 'aligned', // Will be set after recommendation
    explanation:
      values.length === 2
        ? 'Based on the mehr given to both the bride\'s sister and mother, the family average provides a strong reference point (Mehr al-Mithl).'
        : 'Based on one family data point. More family references would strengthen the Mehr al-Mithl calculation.',
  };
}

/**
 * Calculate affordability score
 */
function calculateAffordability(
  sweetSpotUSD: number,
  annualIncomeUSD: number
): AffordabilityResult {
  if (annualIncomeUSD <= 0) {
    return {
      score: 20,
      zone: 'burdensome',
      percentageOfIncome: 100,
      explanation:
        'Without reported income, any mehr amount may be financially challenging. Consider starting with the Hanafi minimum and increasing as your circumstances improve.',
    };
  }

  const percentage = (sweetSpotUSD / annualIncomeUSD) * 100;
  let score: number;
  let zone: AffordabilityResult['zone'];
  let explanation: string;

  if (percentage <= 5) {
    score = 95;
    zone = 'comfortable';
    explanation =
      'This amount is very comfortable relative to your income. The Prophet ﷺ said: "The best of mehr is the easiest."';
  } else if (percentage <= 15) {
    score = 80;
    zone = 'comfortable';
    explanation =
      'This amount is well within a comfortable range for your financial situation.';
  } else if (percentage <= 25) {
    score = 60;
    zone = 'moderate';
    explanation =
      'This amount requires some financial planning but is manageable. Consider discussing a prompt/deferred split.';
  } else if (percentage <= 40) {
    score = 40;
    zone = 'stretching';
    explanation =
      'This amount represents a significant portion of your income. The Sunnah encourages making marriage easy — consider a more modest amount or a deferred arrangement.';
  } else {
    score = 20;
    zone = 'burdensome';
    explanation =
      'This amount may cause financial hardship. Islam discourages placing undue burden on the groom. "The most blessed marriage is the one with the least expense." (Musnad Ahmad)';
  }

  return {
    score,
    zone,
    percentageOfIncome: Math.round(percentage * 10) / 10,
    explanation,
  };
}

/* ── Main Engine ── */

/**
 * Generate the complete Mehr recommendation
 * 
 * This is the primary entry point for the AI recommendation engine.
 * It aggregates all factors, applies weights, and produces a comprehensive output.
 */
export function generateRecommendation(
  state: CalculatorState
): RecommendationOutput {
  const currency = state.financial.currency;
  const metalPrices = state.preferences.metalPrices;
  const reasoning: ReasoningStep[] = [];

  // Convert income to USD for normalization
  const incomeUSD = convertToUSD(state.financial.annualIncome, currency);
  const debtUSD = state.financial.hasDebts
    ? convertToUSD(state.financial.debtAmount, currency)
    : 0;

  /* ── Factor 1: Income (30%) ── */
  let incomeRange = incomeToRange(incomeUSD);
  incomeRange = applyDebtAdjustment(
    incomeRange,
    state.financial.hasDebts,
    debtUSD,
    incomeUSD
  );

  const incomeMidpoint = (incomeRange.low + incomeRange.high) / 2;
  reasoning.push({
    factor: 'Financial Capacity',
    weight: WEIGHT_INCOME,
    contribution: incomeMidpoint * WEIGHT_INCOME,
    explanation: state.financial.hasDebts
      ? `Based on annual income with debt adjustment. The recommendation accounts for existing financial obligations.`
      : `Based on annual income using logarithmic scaling — higher earners see proportionally higher recommendations, but the curve flattens to prevent excessive amounts.`,
  });

  /* ── Factor 2: Family Precedent (25%) ── */
  const mithlAnalysis = calculateMithl(state);
  let familyContribution = 0;
  if (mithlAnalysis) {
    const familyAvgUSD = convertToUSD(mithlAnalysis.familyAverage, currency);
    familyContribution = familyAvgUSD;
    reasoning.push({
      factor: 'Family Precedent (Mehr al-Mithl)',
      weight: WEIGHT_FAMILY_PRECEDENT,
      contribution: familyContribution * WEIGHT_FAMILY_PRECEDENT,
      explanation: `The average mehr in the bride's family is ${mithlAnalysis.familyAverage.toLocaleString()} ${currency}. Per Hanafi fiqh, this is a key reference for Mehr al-Mithl.`,
    });
  } else {
    // No family data — redistribute weight to income and regional
    reasoning.push({
      factor: 'Family Precedent (Mehr al-Mithl)',
      weight: WEIGHT_FAMILY_PRECEDENT,
      contribution: 0,
      explanation:
        'No family precedent data provided. In the absence of this data, the recommendation relies more heavily on income and regional norms.',
    });
  }

  /* ── Factor 3: Regional Norms (20%) ── */
  const regionalNorm = getRegionalNorm(state.family.countryOfOrigin);
  let regionalMidpoint = 3000; // Default fallback
  if (regionalNorm) {
    regionalMidpoint = (regionalNorm.medianLow + regionalNorm.medianHigh) / 2;
    reasoning.push({
      factor: 'Regional & Cultural Norms',
      weight: WEIGHT_REGIONAL_NORMS,
      contribution: regionalMidpoint * WEIGHT_REGIONAL_NORMS,
      explanation: `Typical mehr range in ${regionalNorm.country}: $${regionalNorm.medianLow.toLocaleString()}–$${regionalNorm.medianHigh.toLocaleString()} USD. ${regionalNorm.notes}`,
    });
  } else {
    reasoning.push({
      factor: 'Regional & Cultural Norms',
      weight: WEIGHT_REGIONAL_NORMS,
      contribution: regionalMidpoint * WEIGHT_REGIONAL_NORMS,
      explanation: 'Using global median as no specific regional data is available for the selected country.',
    });
  }

  /* ── Factor 4: Cultural Expectation (10%) ── */
  const culturalMultiplier = culturalExpectationMultiplier(
    state.family.culturalExpectation
  );
  reasoning.push({
    factor: 'Cultural Expectations',
    weight: WEIGHT_CULTURAL_EXPECTATION,
    contribution: culturalMultiplier,
    explanation: `Cultural expectation level set to ${state.family.culturalExpectation}/5. This adjusts the recommendation ${culturalMultiplier > 1 ? 'upward' : culturalMultiplier < 1 ? 'downward' : 'neutrally'}.`,
  });

  /* ── Factor 5: Madhab Minimum Floor (10%) ── */
  let madhabMinSilverGrams = HANAFI_MINIMUM_SILVER_GRAMS;
  let madhabName = 'Hanafi';
  let madhabDirhams = 10;
  
  if (state.preferences.madhab === 'maliki') {
    madhabMinSilverGrams = MALIKI_MINIMUM_SILVER_GRAMS;
    madhabName = 'Maliki';
    madhabDirhams = 3;
  } else if (state.preferences.madhab === 'shafii') {
    madhabMinSilverGrams = SHAFII_HANBALI_MINIMUM_SILVER_GRAMS;
    madhabName = 'Shafi\'i';
    madhabDirhams = 1;
  } else if (state.preferences.madhab === 'hanbali') {
    madhabMinSilverGrams = SHAFII_HANBALI_MINIMUM_SILVER_GRAMS;
    madhabName = 'Hanbali';
    madhabDirhams = 1;
  }

  const madhabMinUSD = madhabMinSilverGrams * metalPrices.silverPerGramUSD;
  reasoning.push({
    factor: `${madhabName} Minimum Floor`,
    weight: WEIGHT_HANAFI_MINIMUM,
    contribution: madhabMinUSD,
    explanation: state.preferences.madhab === 'hanafi' || state.preferences.madhab === 'maliki'
      ? `The ${madhabName} minimum is ${madhabDirhams} dirhams (${madhabMinSilverGrams.toFixed(1)}g silver). At current prices, this equals approximately $${madhabMinUSD.toFixed(0)} USD. The recommendation will never fall below this.`
      : `The ${madhabName} school has no strict numerical minimum, but we use a symbolic 1 dirham floor for calculation ease.`,
  });

  /* ── Factor 6: Bride Profile (5%) ── */
  const brideMultiplier = brideProfileMultiplier(state);
  reasoning.push({
    factor: 'Bride\'s Profile (Mehr al-Mithl Factors)',
    weight: WEIGHT_BRIDE_PROFILE,
    contribution: brideMultiplier,
    explanation: `Education and professional status considered per Mehr al-Mithl methodology. Education level: ${state.bride.educationLevel.replace('_', ' ')}.`,
  });

  /* ── Weighted Aggregation ── */
  let weightedSum: number;

  if (mithlAnalysis) {
    // Full calculation with all factors
    weightedSum =
      incomeMidpoint * WEIGHT_INCOME +
      familyContribution * WEIGHT_FAMILY_PRECEDENT +
      regionalMidpoint * WEIGHT_REGIONAL_NORMS +
      incomeMidpoint * WEIGHT_CULTURAL_EXPECTATION +
      madhabMinUSD * WEIGHT_HANAFI_MINIMUM +
      incomeMidpoint * WEIGHT_BRIDE_PROFILE;
  } else {
    // Redistribute family weight to income and regional
    const redistributedIncomeWeight = WEIGHT_INCOME + WEIGHT_FAMILY_PRECEDENT * 0.6;
    const redistributedRegionalWeight = WEIGHT_REGIONAL_NORMS + WEIGHT_FAMILY_PRECEDENT * 0.4;

    weightedSum =
      incomeMidpoint * redistributedIncomeWeight +
      regionalMidpoint * redistributedRegionalWeight +
      incomeMidpoint * WEIGHT_CULTURAL_EXPECTATION +
      madhabMinUSD * WEIGHT_HANAFI_MINIMUM +
      incomeMidpoint * WEIGHT_BRIDE_PROFILE;
  }

  // Apply cultural expectation and bride profile multipliers
  weightedSum *= culturalMultiplier * brideMultiplier;

  /* ── Range Generation ── */
  const sweetSpotUSD = Math.round(weightedSum);
  const minimumUSD = Math.round(sweetSpotUSD * 0.7);
  const maximumUSD = Math.round(sweetSpotUSD * 1.4);

  // Ensure we never go below Madhab minimum
  const flooredMinimumUSD = Math.max(minimumUSD, madhabMinUSD);

  // Convert to user's currency
  const recommended: RecommendedRange = {
    minimum: Math.round(convertFromUSD(flooredMinimumUSD, currency)),
    sweetSpot: Math.round(convertFromUSD(sweetSpotUSD, currency)),
    maximum: Math.round(convertFromUSD(maximumUSD, currency)),
    currency,
  };

  /* ── Sunnah Comparisons ── */
  const sunnahComparisons: SunnahComparison[] = SUNNAH_BENCHMARKS.map(
    (benchmark) => {
      const currentValue =
        benchmark.silverGrams * metalPrices.silverPerGramUSD;
      const currentValueInCurrency = convertFromUSD(currentValue, currency);

      let relation: SunnahComparison['recommendationRelation'];
      if (sweetSpotUSD < currentValue * 0.8) relation = 'below';
      else if (sweetSpotUSD > currentValue * 1.2) relation = 'above';
      else relation = 'within';

      return {
        benchmark,
        currentValueInCurrency: Math.round(currentValueInCurrency),
        currency,
        recommendationRelation: relation,
      };
    }
  );

  /* ── Affordability ── */
  const affordability = calculateAffordability(sweetSpotUSD, incomeUSD);

  /* ── Update Mithl comparison ── */
  let finalMithl = mithlAnalysis;
  if (finalMithl) {
    const familyAvgUSD = convertToUSD(finalMithl.familyAverage, currency);
    let comparison: MithlAnalysis['comparisonToRecommendation'];
    if (sweetSpotUSD < familyAvgUSD * 0.8) comparison = 'lower';
    else if (sweetSpotUSD > familyAvgUSD * 1.2) comparison = 'higher';
    else comparison = 'aligned';

    finalMithl = { ...finalMithl, comparisonToRecommendation: comparison };
  }

  /* ── Breakdown ── */
  const totalInCurrency = recommended.sweetSpot;
  let promptAmount: number;
  let deferredAmount: number;

  if (state.preferences.paymentStructure === 'full_prompt') {
    promptAmount = totalInCurrency;
    deferredAmount = 0;
  } else if (state.preferences.paymentStructure === 'full_deferred') {
    promptAmount = 0;
    deferredAmount = totalInCurrency;
  } else {
    const promptPct = state.preferences.customSplit.promptPercentage / 100;
    promptAmount = Math.round(totalInCurrency * promptPct);
    deferredAmount = totalInCurrency - promptAmount;
  }

  const breakdown: MehrBreakdownResult = {
    promptAmount,
    deferredAmount,
    totalAmount: totalInCurrency,
    currency,
    goldEquivalentGrams: convertToGoldGrams(
      totalInCurrency,
      currency,
      metalPrices.goldPerGramUSD,
      state.preferences.goldKarat
    ),
    silverEquivalentGrams: convertToSilverGrams(
      totalInCurrency,
      currency,
      metalPrices.silverPerGramUSD
    ),
    goldKarat: state.preferences.goldKarat,
  };

  /* ── Fiqh Compliance ── */
  const madhabMinInCurrency = convertFromUSD(madhabMinUSD, currency);
  const fiqhCompliance: FiqhComplianceResult = {
    meetsHanafiMinimum: recommended.minimum >= madhabMinInCurrency * 0.99,
    hanafiMinimumInCurrency: Math.round(madhabMinInCurrency),
    minimumSilverGrams: madhabMinSilverGrams,
    explanation: recommended.minimum >= madhabMinInCurrency * 0.99
      ? `The recommended amount meets or exceeds the ${madhabName} minimum.`
      : `Warning: The recommended amount may fall below the ${madhabName} minimum. Consider increasing it.`,
  };

  /* ── Summary ── */
  const summary = generateSummary(recommended, affordability, currency, state);
  const confidence = determineConfidence(state);

  return {
    recommended,
    confidence,
    reasoning,
    summary,
    sunnahComparisons,
    affordability,
    mithlAnalysis: finalMithl,
    breakdown,
    fiqhCompliance,
  };
}

/**
 * Generate a natural language summary of the recommendation
 */
function generateSummary(
  recommended: RecommendedRange,
  affordability: AffordabilityResult,
  currency: CurrencyCode,
  state: CalculatorState
): string {
  const parts: string[] = [];

  parts.push(
    `Based on your financial profile and the factors considered, we recommend a Mehr in the range of ${recommended.minimum.toLocaleString()} to ${recommended.maximum.toLocaleString()} ${currency}, with ${recommended.sweetSpot.toLocaleString()} ${currency} as the suggested amount.`
  );

  if (affordability.zone === 'comfortable') {
    parts.push(
      'This amount sits comfortably within your financial capacity.'
    );
  } else if (affordability.zone === 'moderate') {
    parts.push(
      'This amount is manageable but may require some planning.'
    );
  } else if (affordability.zone === 'stretching') {
    parts.push(
      'This amount is on the higher end of what may be comfortable. Consider a prompt/deferred split arrangement.'
    );
  }

  if (state.family.sisterMehr !== null || state.family.motherMehr !== null) {
    parts.push(
      'Family precedent data was factored in using the Mehr al-Mithl methodology of the Hanafi school.'
    );
  }

  parts.push(
    'Remember: the best mehr is one that both parties agree upon with mutual satisfaction and ease. (وَآتُوا النِّسَاءَ صَدُقَاتِهِنَّ نِحْلَةً — Quran 4:4)'
  );

  return parts.join(' ');
}
