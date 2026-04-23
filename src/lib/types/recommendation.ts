/**
 * Recommendation engine output types
 * Defines the complete output structure of the AI scoring algorithm
 */

import { CurrencyCode, GoldKarat } from './currency';
import { SunnahBenchmark } from './fiqh';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface RecommendedRange {
  readonly minimum: number;
  readonly sweetSpot: number;
  readonly maximum: number;
  readonly currency: CurrencyCode;
}

export interface SunnahComparison {
  readonly benchmark: SunnahBenchmark;
  readonly currentValueInCurrency: number;
  readonly currency: CurrencyCode;
  readonly recommendationRelation: 'below' | 'within' | 'above';
}

export interface MithlAnalysis {
  readonly familyAverage: number;
  readonly dataPoints: number;
  readonly comparisonToRecommendation: 'lower' | 'aligned' | 'higher';
  readonly explanation: string;
}

export interface AffordabilityResult {
  readonly score: number; // 0-100
  readonly zone: 'comfortable' | 'moderate' | 'stretching' | 'burdensome';
  readonly percentageOfIncome: number;
  readonly explanation: string;
}

export interface MehrBreakdownResult {
  readonly promptAmount: number;
  readonly deferredAmount: number;
  readonly totalAmount: number;
  readonly currency: CurrencyCode;
  readonly goldEquivalentGrams: number;
  readonly silverEquivalentGrams: number;
  readonly goldKarat: GoldKarat;
}

export interface FiqhComplianceResult {
  readonly meetsHanafiMinimum: boolean;
  readonly hanafiMinimumInCurrency: number;
  readonly minimumSilverGrams: number;
  readonly explanation: string;
}

export interface ReasoningStep {
  readonly factor: string;
  readonly weight: number;
  readonly contribution: number;
  readonly explanation: string;
}

export interface RecommendationOutput {
  readonly recommended: RecommendedRange;
  readonly confidence: ConfidenceLevel;
  readonly reasoning: ReasoningStep[];
  readonly summary: string;
  readonly sunnahComparisons: SunnahComparison[];
  readonly affordability: AffordabilityResult;
  readonly mithlAnalysis: MithlAnalysis | null;
  readonly breakdown: MehrBreakdownResult;
  readonly fiqhCompliance: FiqhComplianceResult;
}
