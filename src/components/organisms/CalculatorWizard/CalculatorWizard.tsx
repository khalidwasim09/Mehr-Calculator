'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCalculator } from '../../../context/CalculatorContext';
import { Input, Select, Slider } from '../../atoms/FormElements';
import { Button } from '../../atoms/Button/Button';
import { CURRENCY_DISPLAY_ORDER, CURRENCIES } from '../../../lib/constants/currencies';
import { COUNTRIES_FOR_DROPDOWN } from '../../../lib/constants/regions';
import { fetchMetalPrices } from '../../../lib/engine/MetalPriceService';
import {
  EmploymentStatus,
  SavingsBracket,
  EducationLevel,
  ProfessionalStatus,
  AgeBracket,
} from '../../../lib/types/calculator';
import { MehrForm, MehrPaymentStructure } from '../../../lib/types/fiqh';
import { GoldKarat } from '../../../lib/types/currency';
import styles from './CalculatorWizard.module.css';

const STEP_LABELS = [
  'Financial Profile',
  'Family & Culture',
  'Bride\'s Profile',
  'Mehr Preferences',
  'Review & Calculate',
];

export function CalculatorWizard() {
  const router = useRouter();
  const {
    state,
    nextStep,
    prevStep,
    goToStep,
    updateFinancial,
    updateFamily,
    updateBride,
    updatePreferences,
    setMetalPrices,
    markComplete,
  } = useCalculator();

  // Fetch metal prices on mount
  useEffect(() => {
    fetchMetalPrices().then(setMetalPrices);
  }, [setMetalPrices]);

  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatingStep, setCalculatingStep] = useState(0);

  const calculateSteps = [
    'Analyzing financial profile...',
    'Fetching live metal markets...',
    'Cross-referencing Mehr al-Mithl...',
    'Applying Madhab fiqh minimums...',
    'Finalizing recommendation...'
  ];

  const handleCalculate = () => {
    setIsCalculating(true);
    
    // Sequence through the steps
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < calculateSteps.length) {
        setCalculatingStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          markComplete();
          router.push('/results');
        }, 500); // short pause on last step
      }
    }, 800); // 800ms per step
  };

  if (isCalculating) {
    return (
      <div className={styles.wizard}>
        <div className={styles.calculating}>
          <div className={styles.calculating__ring}></div>
          <div className={styles.calculating__icon}>✦</div>
          <h2 className={styles.calculating__title}>Engine Processing</h2>
          <p className={styles.calculating__step}>
            {calculateSteps[calculatingStep]}
          </p>
          <div className={styles.calculating__progress}>
            <div 
              className={styles.calculating__progressBar} 
              style={{ width: `${((calculatingStep + 1) / calculateSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wizard}>
      <div className={styles.wizard__inner}>
        {/* Step Indicator */}
        <div className={styles.wizard__indicator} role="progressbar" aria-valuemin={1} aria-valuemax={5} aria-valuenow={state.currentStep}>
          {STEP_LABELS.map((label, index) => {
            const stepNum = index + 1;
            const isActive = stepNum === state.currentStep;
            const isCompleted = stepNum < state.currentStep;
            return (
              <React.Fragment key={label}>
                {index > 0 && (
                  <div className={`${styles.wizard__indicatorLine} ${isCompleted ? styles['wizard__indicatorLine--completed'] : ''}`} />
                )}
                <div className={styles.wizard__indicatorStep}>
                  <button
                    className={`${styles.wizard__indicatorDot} ${isActive ? styles['wizard__indicatorDot--active'] : ''} ${isCompleted ? styles['wizard__indicatorDot--completed'] : ''}`}
                    onClick={() => stepNum < state.currentStep && goToStep(stepNum)}
                    aria-label={`Step ${stepNum}: ${label}`}
                    type="button"
                  >
                    {isCompleted ? '✓' : stepNum}
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Step Content */}
        {state.currentStep === 1 && <Step1Financial />}
        {state.currentStep === 2 && <Step2Family />}
        {state.currentStep === 3 && <Step3Bride />}
        {state.currentStep === 4 && <Step4Preferences />}
        {state.currentStep === 5 && <Step5Review />}

        {/* Navigation */}
        <div className={styles.wizard__nav}>
          {state.currentStep > 1 ? (
            <Button variant="ghost" onClick={prevStep} icon={<span>←</span>}>
              Back
            </Button>
          ) : (
            <div className={styles.wizard__navSpacer} />
          )}

          {state.currentStep < 5 ? (
            <Button variant="primary" onClick={nextStep} icon={<span>→</span>} iconPosition="right">
              Continue
            </Button>
          ) : (
            <Button variant="gold" size="lg" onClick={handleCalculate} icon={<span>✦</span>}>
              Calculate My Mehr
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STEP 1: Financial Profile
   ═══════════════════════════════════════════════════════ */

function Step1Financial() {
  const { state, updateFinancial } = useCalculator();
  const { financial } = state;

  const currencyOptions = CURRENCY_DISPLAY_ORDER.map((code) => ({
    label: `${CURRENCIES[code].symbol} ${CURRENCIES[code].name} (${code})`,
    value: code,
  }));

  const employmentOptions = [
    { label: 'Employed (Full-time)', value: 'employed' },
    { label: 'Self-Employed / Business', value: 'self_employed' },
    { label: 'Student', value: 'student' },
    { label: 'Currently Unemployed', value: 'unemployed' },
  ];

  const savingsOptions = [
    { label: 'Under $5,000', value: 'under_5k' },
    { label: '$5,000 – $20,000', value: '5k_20k' },
    { label: '$20,000 – $50,000', value: '20k_50k' },
    { label: '$50,000 – $100,000', value: '50k_100k' },
    { label: '$100,000 – $250,000', value: '100k_250k' },
    { label: '$250,000+', value: '250k_plus' },
  ];

  return (
    <div className={styles.wizard__step}>
      <div className={styles.wizard__stepHeader}>
        <p className={styles.wizard__stepLabel}>Step 1 of 5</p>
        <h2 className={styles.wizard__stepTitle}>Financial Profile</h2>
        <p className={styles.wizard__stepSubtitle}>
          Help us understand the groom&apos;s financial capacity to recommend a comfortable Mehr range.
        </p>
      </div>

      <div className={styles.wizard__card}>
        <div className={styles.wizard__form}>
          <div className={styles.wizard__row}>
            <Input
              id="annual-income"
              label="Annual Income"
              type="number"
              value={financial.annualIncome || ''}
              onChange={(e) => updateFinancial({ annualIncome: Number(e.target.value) })}
              placeholder="e.g. 75000"
              required
              helperText="Gross annual income before taxes"
            />
            <Select
              id="currency"
              label="Currency"
              options={currencyOptions}
              value={financial.currency}
              onChange={(e) => updateFinancial({ currency: e.target.value as typeof financial.currency })}
              required
            />
          </div>

          <div className={styles.wizard__row}>
            <Select
              id="employment-status"
              label="Employment Status"
              options={employmentOptions}
              value={financial.employmentStatus}
              onChange={(e) => updateFinancial({ employmentStatus: e.target.value as EmploymentStatus })}
            />
            <Select
              id="savings-bracket"
              label="Savings / Net Worth"
              options={savingsOptions}
              value={financial.savingsBracket}
              onChange={(e) => updateFinancial({ savingsBracket: e.target.value as SavingsBracket })}
            />
          </div>

          <label className={styles.wizard__toggle}>
            <input
              type="checkbox"
              className={styles.wizard__toggleInput}
              checked={financial.hasDebts}
              onChange={(e) => updateFinancial({ hasDebts: e.target.checked })}
            />
            <span className={styles.wizard__toggleLabel}>I have outstanding debts or loans</span>
          </label>

          {financial.hasDebts && (
            <Input
              id="debt-amount"
              label="Approximate Total Debt"
              type="number"
              value={financial.debtAmount || ''}
              onChange={(e) => updateFinancial({ debtAmount: Number(e.target.value) })}
              placeholder="e.g. 15000"
              helperText="Student loans, car loans, credit cards, etc."
            />
          )}
        </div>
      </div>

      <div className={styles.wizard__fiqhPanel}>
        <span className={styles.wizard__fiqhIcon}>📖</span>
        <p className={styles.wizard__fiqhText}>
          <strong>Why we ask this:</strong> The groom&apos;s financial capacity is a primary factor in determining a fair Mehr.
          Islam encourages a Mehr that the groom can afford comfortably. The Prophet ﷺ said:
          &quot;The best of mehr is the easiest.&quot; (Abu Dawud). Income is weighted at 30% in our algorithm
          with logarithmic scaling — higher earners see proportionally higher recommendations, but the curve
          flattens to prevent excessive amounts.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STEP 2: Family & Cultural Context
   ═══════════════════════════════════════════════════════ */

function Step2Family() {
  const { state, updateFamily } = useCalculator();
  const { family } = state;

  const expectationLabels: Record<number, string> = {
    1: 'Very Modest',
    2: 'Modest',
    3: 'Moderate',
    4: 'Generous',
    5: 'Very Generous',
  };

  return (
    <div className={styles.wizard__step}>
      <div className={styles.wizard__stepHeader}>
        <p className={styles.wizard__stepLabel}>Step 2 of 5</p>
        <h2 className={styles.wizard__stepTitle}>Family &amp; Cultural Context</h2>
        <p className={styles.wizard__stepSubtitle}>
          Family precedent and regional norms help determine the Mehr al-Mithl (equivalent mehr).
        </p>
      </div>

      <div className={styles.wizard__card}>
        <div className={styles.wizard__form}>
          <div className={styles.wizard__row}>
            <Select
              id="country-of-origin"
              label="Country of Cultural Origin"
              options={COUNTRIES_FOR_DROPDOWN}
              value={family.countryOfOrigin}
              onChange={(e) => updateFamily({ countryOfOrigin: e.target.value })}
              placeholder="Select a country"
              required
            />
            <Input
              id="city-region"
              label="City / Region (optional)"
              type="text"
              value={family.cityRegion}
              onChange={(e) => updateFamily({ cityRegion: e.target.value })}
              placeholder="e.g. Toronto, Karachi, London"
            />
          </div>

          <div className={styles.wizard__row}>
            <Input
              id="sister-mehr"
              label="Mehr given to bride's sister(s)"
              type="number"
              value={family.sisterMehr ?? ''}
              onChange={(e) => updateFamily({ sisterMehr: e.target.value ? Number(e.target.value) : null })}
              placeholder="Amount (optional)"
              helperText={`In ${state.financial.currency}`}
            />
            <Input
              id="mother-mehr"
              label="Mehr given to bride's mother"
              type="number"
              value={family.motherMehr ?? ''}
              onChange={(e) => updateFamily({ motherMehr: e.target.value ? Number(e.target.value) : null })}
              placeholder="Amount (optional)"
              helperText={`In ${state.financial.currency}`}
            />
          </div>

          <Slider
            id="cultural-expectation"
            label="Cultural Expectation Level"
            min={1}
            max={5}
            value={family.culturalExpectation}
            onChange={(value) => updateFamily({ culturalExpectation: value })}
            minLabel="Very Modest"
            maxLabel="Very Generous"
            valueFormatter={(v) => expectationLabels[v] || 'Moderate'}
          />
        </div>
      </div>

      <div className={styles.wizard__fiqhPanel}>
        <span className={styles.wizard__fiqhIcon}>📖</span>
        <p className={styles.wizard__fiqhText}>
          <strong>Mehr al-Mithl (مهر المثل):</strong> In Hanafi fiqh, when determining a fair mehr, 
          scholars look at the mehr given to women of similar status in the bride&apos;s <em>paternal</em> family —
          sisters, paternal aunts, and cousins. If you can provide this data, it significantly strengthens
          the recommendation (25% weight in our algorithm).
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STEP 3: Bride's Profile
   ═══════════════════════════════════════════════════════ */

function Step3Bride() {
  const { state, updateBride } = useCalculator();
  const { bride } = state;

  const educationOptions = [
    { label: 'High School', value: 'high_school' },
    { label: 'Bachelor\'s Degree', value: 'bachelors' },
    { label: 'Master\'s Degree', value: 'masters' },
    { label: 'Doctorate (PhD)', value: 'doctorate' },
    { label: 'Hafiza (Quran Memorization)', value: 'hafiza' },
    { label: 'Alima (Islamic Scholar)', value: 'alima' },
  ];

  const professionalOptions = [
    { label: 'Student', value: 'student' },
    { label: 'Working Professional', value: 'working' },
    { label: 'Homemaker', value: 'homemaker' },
  ];

  const ageOptions = [
    { label: '18 – 25', value: '18_25' },
    { label: '26 – 30', value: '26_30' },
    { label: '31 – 35', value: '31_35' },
    { label: '36+', value: '36_plus' },
  ];

  return (
    <div className={styles.wizard__step}>
      <div className={styles.wizard__stepHeader}>
        <p className={styles.wizard__stepLabel}>Step 3 of 5</p>
        <h2 className={styles.wizard__stepTitle}>Bride&apos;s Profile</h2>
        <p className={styles.wizard__stepSubtitle}>
          These factors are used for Mehr al-Mithl calculation per Hanafi methodology.
        </p>
      </div>

      <div className={styles.wizard__card}>
        <div className={styles.wizard__form}>
          <Select
            id="education-level"
            label="Education Level"
            options={educationOptions}
            value={bride.educationLevel}
            onChange={(e) => updateBride({ educationLevel: e.target.value as EducationLevel })}
          />

          <div className={styles.wizard__row}>
            <Select
              id="professional-status"
              label="Professional Status"
              options={professionalOptions}
              value={bride.professionalStatus}
              onChange={(e) => updateBride({ professionalStatus: e.target.value as ProfessionalStatus })}
            />
            <Select
              id="age-bracket"
              label="Age Bracket"
              options={ageOptions}
              value={bride.ageBracket}
              onChange={(e) => updateBride({ ageBracket: e.target.value as AgeBracket })}
            />
          </div>
        </div>
      </div>

      <div className={styles.wizard__fiqhPanel}>
        <span className={styles.wizard__fiqhIcon}>📖</span>
        <p className={styles.wizard__fiqhText}>
          <strong>Important note:</strong> These factors are <em>not</em> about putting a &quot;price&quot; on the bride.
          In Hanafi fiqh, Mehr al-Mithl considers the bride&apos;s comparable status — education, age, and social standing —
          to ensure she receives a mehr that is equitable relative to women of similar profile in her family.
          This carries a modest 5% weight in our algorithm.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STEP 4: Mehr Preferences
   ═══════════════════════════════════════════════════════ */

function Step4Preferences() {
  const { state, updatePreferences } = useCalculator();
  const { preferences } = state;

  const formOptions = [
    { label: 'Cash', value: 'cash' },
    { label: 'Gold', value: 'gold' },
    { label: 'Silver', value: 'silver' },
    { label: 'Mixed (Cash + Metal)', value: 'mixed' },
  ];

  const karatOptions = [
    { label: '24K (Pure Gold)', value: '24' },
    { label: '22K (Traditional)', value: '22' },
    { label: '21K (Middle Eastern)', value: '21' },
    { label: '18K (Western)', value: '18' },
  ];

  const paymentOptions = [
    { label: '100% Prompt (Mu\'ajjal)', value: 'full_prompt' },
    { label: '100% Deferred (Mu\'akhkhar)', value: 'full_deferred' },
    { label: 'Split (Custom)', value: 'split' },
  ];

  const madhabOptions = [
    { label: 'Hanafi (حَنَفِي)', value: 'hanafi' },
    { label: 'Shafi\'i (شَافِعِي)', value: 'shafii' },
    { label: 'Maliki (مَالِكِي)', value: 'maliki' },
    { label: 'Hanbali (حَنْبَلِي)', value: 'hanbali' },
  ];

  return (
    <div className={styles.wizard__step}>
      <div className={styles.wizard__stepHeader}>
        <p className={styles.wizard__stepLabel}>Step 4 of 5</p>
        <h2 className={styles.wizard__stepTitle}>Mehr Preferences</h2>
        <p className={styles.wizard__stepSubtitle}>
          Choose the form and payment structure for the Mehr.
        </p>
      </div>

      <div className={styles.wizard__card}>
        <div className={styles.wizard__form}>
          <Select
            id="madhab"
            label="School of Thought (Madhab)"
            options={madhabOptions}
            value={preferences.madhab}
            onChange={(e) => updatePreferences({ madhab: e.target.value as typeof preferences.madhab })}
          />

          <div className={styles.wizard__row}>
            <Select
              id="mehr-form"
              label="Preferred Form"
              options={formOptions}
              value={preferences.form}
              onChange={(e) => updatePreferences({ form: e.target.value as MehrForm })}
            />
            {(preferences.form === 'gold' || preferences.form === 'mixed') && (
              <Select
                id="gold-karat"
                label="Gold Karat"
                options={karatOptions}
                value={String(preferences.goldKarat)}
                onChange={(e) => updatePreferences({ goldKarat: Number(e.target.value) as GoldKarat })}
              />
            )}
          </div>

          <Select
            id="payment-structure"
            label="Payment Structure"
            options={paymentOptions}
            value={preferences.paymentStructure}
            onChange={(e) => updatePreferences({ paymentStructure: e.target.value as MehrPaymentStructure })}
          />

          {preferences.paymentStructure === 'split' && (
            <Slider
              id="split-percentage"
              label="Prompt / Deferred Split"
              min={10}
              max={90}
              value={preferences.customSplit.promptPercentage}
              onChange={(value) =>
                updatePreferences({
                  customSplit: {
                    promptPercentage: value,
                    deferredPercentage: 100 - value,
                  },
                })
              }
              minLabel="10% Prompt"
              maxLabel="90% Prompt"
              valueFormatter={(v) => `${v}% Prompt / ${100 - v}% Deferred`}
            />
          )}

          <div className={styles.wizard__row}>
            <Input
              id="gold-price"
              label="Current Gold Price (USD/gram)"
              type="number"
              value={preferences.metalPrices.goldPerGramUSD || ''}
              onChange={(e) =>
                updatePreferences({
                  metalPrices: {
                    ...preferences.metalPrices,
                    goldPerGramUSD: Number(e.target.value),
                    source: 'manual',
                  },
                })
              }
              placeholder="e.g. 153"
              helperText={preferences.metalPrices.source === 'api' ? '✓ Auto-fetched from API' : 'Enter current price or leave for estimate'}
            />
            <Input
              id="silver-price"
              label="Current Silver Price (USD/gram)"
              type="number"
              value={preferences.metalPrices.silverPerGramUSD || ''}
              onChange={(e) =>
                updatePreferences({
                  metalPrices: {
                    ...preferences.metalPrices,
                    silverPerGramUSD: Number(e.target.value),
                    source: 'manual',
                  },
                })
              }
              placeholder="e.g. 2.55"
              helperText={preferences.metalPrices.source === 'api' ? '✓ Auto-fetched from API' : 'Enter current price or leave for estimate'}
            />
          </div>
        </div>
      </div>

      <div className={styles.wizard__fiqhPanel}>
        <span className={styles.wizard__fiqhIcon}>📖</span>
        <p className={styles.wizard__fiqhText}>
          <strong>Prompt vs. Deferred:</strong> In Hanafi fiqh, Mehr Mu&apos;ajjal (prompt) is payable immediately on the wife&apos;s demand.
          Mehr Mu&apos;akhkhar (deferred) becomes due upon divorce or death — it is a debt on the husband&apos;s estate.
          The wife may refuse cohabitation until the prompt portion is paid.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STEP 5: Review & Calculate
   ═══════════════════════════════════════════════════════ */

function Step5Review() {
  const { state, goToStep } = useCalculator();
  const { financial, family, bride, preferences } = state;

  const formatLabel = (val: string) =>
    val.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const expectationLabels: Record<number, string> = {
    1: 'Very Modest', 2: 'Modest', 3: 'Moderate', 4: 'Generous', 5: 'Very Generous',
  };

  const countryLabel = COUNTRIES_FOR_DROPDOWN.find(c => c.value === family.countryOfOrigin)?.label || family.countryOfOrigin;

  return (
    <div className={styles.wizard__step}>
      <div className={styles.wizard__stepHeader}>
        <p className={styles.wizard__stepLabel}>Step 5 of 5</p>
        <h2 className={styles.wizard__stepTitle}>Review &amp; Calculate</h2>
        <p className={styles.wizard__stepSubtitle}>
          Verify your information before generating your Mehr recommendation.
        </p>
      </div>

      <div className={styles.wizard__card}>
        {/* Financial */}
        <div className={styles.wizard__reviewSection}>
          <div className={styles.wizard__reviewSectionTitle}>
            💰 Financial Profile
            <button className={styles.wizard__reviewEdit} onClick={() => goToStep(1)} type="button">Edit</button>
          </div>
          <div className={styles.wizard__reviewGrid}>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Annual Income</div>
              <div className={styles.wizard__reviewItemValue}>
                {financial.annualIncome.toLocaleString()} {financial.currency}
              </div>
            </div>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Employment</div>
              <div className={styles.wizard__reviewItemValue}>{formatLabel(financial.employmentStatus)}</div>
            </div>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Savings</div>
              <div className={styles.wizard__reviewItemValue}>{formatLabel(financial.savingsBracket)}</div>
            </div>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Debts</div>
              <div className={styles.wizard__reviewItemValue}>
                {financial.hasDebts ? `${financial.debtAmount.toLocaleString()} ${financial.currency}` : 'None'}
              </div>
            </div>
          </div>
        </div>

        {/* Family */}
        <div className={styles.wizard__reviewSection}>
          <div className={styles.wizard__reviewSectionTitle}>
            👨‍👩‍👧 Family &amp; Culture
            <button className={styles.wizard__reviewEdit} onClick={() => goToStep(2)} type="button">Edit</button>
          </div>
          <div className={styles.wizard__reviewGrid}>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Country</div>
              <div className={styles.wizard__reviewItemValue}>{countryLabel || 'Not specified'}</div>
            </div>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Cultural Expectation</div>
              <div className={styles.wizard__reviewItemValue}>{expectationLabels[family.culturalExpectation]}</div>
            </div>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Sister&apos;s Mehr</div>
              <div className={styles.wizard__reviewItemValue}>
                {family.sisterMehr !== null ? `${family.sisterMehr.toLocaleString()} ${financial.currency}` : 'Not provided'}
              </div>
            </div>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Mother&apos;s Mehr</div>
              <div className={styles.wizard__reviewItemValue}>
                {family.motherMehr !== null ? `${family.motherMehr.toLocaleString()} ${financial.currency}` : 'Not provided'}
              </div>
            </div>
          </div>
        </div>

        {/* Bride */}
        <div className={styles.wizard__reviewSection}>
          <div className={styles.wizard__reviewSectionTitle}>
            👤 Bride&apos;s Profile
            <button className={styles.wizard__reviewEdit} onClick={() => goToStep(3)} type="button">Edit</button>
          </div>
          <div className={styles.wizard__reviewGrid}>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Education</div>
              <div className={styles.wizard__reviewItemValue}>{formatLabel(bride.educationLevel)}</div>
            </div>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Status</div>
              <div className={styles.wizard__reviewItemValue}>{formatLabel(bride.professionalStatus)}</div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className={styles.wizard__reviewSection}>
          <div className={styles.wizard__reviewSectionTitle}>
            ⚙️ Preferences
            <button className={styles.wizard__reviewEdit} onClick={() => goToStep(4)} type="button">Edit</button>
          </div>
          <div className={styles.wizard__reviewGrid}>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Madhab</div>
              <div className={styles.wizard__reviewItemValue}>{formatLabel(preferences.madhab)}</div>
            </div>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Form</div>
              <div className={styles.wizard__reviewItemValue}>{formatLabel(preferences.form)}</div>
            </div>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Payment</div>
              <div className={styles.wizard__reviewItemValue}>{formatLabel(preferences.paymentStructure)}</div>
            </div>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Gold Price</div>
              <div className={styles.wizard__reviewItemValue}>${preferences.metalPrices.goldPerGramUSD}/g</div>
            </div>
            <div className={styles.wizard__reviewItem}>
              <div className={styles.wizard__reviewItemLabel}>Silver Price</div>
              <div className={styles.wizard__reviewItemValue}>${preferences.metalPrices.silverPerGramUSD}/g</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
