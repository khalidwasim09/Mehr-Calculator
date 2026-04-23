/**
 * Calculator type definitions
 * Models the complete data flow from user input through the wizard to calculation
 */

import { CurrencyCode, GoldKarat, MetalPrices } from './currency';
import { MehrForm, MehrPaymentStructure, MehrSplit } from './fiqh';

/* ── Step 1: Financial Profile ── */

export type EmploymentStatus = 'employed' | 'self_employed' | 'student' | 'unemployed';

export type SavingsBracket =
  | 'under_5k'
  | '5k_20k'
  | '20k_50k'
  | '50k_100k'
  | '100k_250k'
  | '250k_plus';

export interface FinancialProfile {
  annualIncome: number;
  currency: CurrencyCode;
  employmentStatus: EmploymentStatus;
  savingsBracket: SavingsBracket;
  hasDebts: boolean;
  debtAmount: number;
}

/* ── Step 2: Cultural & Family Context ── */

export interface FamilyContext {
  countryOfOrigin: string;
  cityRegion: string;
  sisterMehr: number | null;
  motherMehr: number | null;
  culturalExpectation: number; // 1 (modest) to 5 (very generous)
}

/* ── Step 3: Bride's Profile (for Mehr al-Mithl) ── */

export type EducationLevel =
  | 'high_school'
  | 'bachelors'
  | 'masters'
  | 'doctorate'
  | 'hafiza'
  | 'alima';

export type ProfessionalStatus = 'student' | 'working' | 'homemaker';
export type AgeBracket = '18_25' | '26_30' | '31_35' | '36_plus';

export interface BrideProfile {
  educationLevel: EducationLevel;
  professionalStatus: ProfessionalStatus;
  ageBracket: AgeBracket;
}

/* ── Step 4: Mehr Preferences ── */

export type Madhab = 'hanafi' | 'shafii' | 'maliki' | 'hanbali';

export interface MehrPreferences {
  madhab: Madhab;
  form: MehrForm;
  goldKarat: GoldKarat;
  paymentStructure: MehrPaymentStructure;
  customSplit: MehrSplit;
  metalPrices: MetalPrices;
}

/* ── Complete Calculator State ── */

export interface CalculatorState {
  currentStep: number;
  totalSteps: number;
  financial: FinancialProfile;
  family: FamilyContext;
  bride: BrideProfile;
  preferences: MehrPreferences;
  isComplete: boolean;
}

/* ── Wizard Step Definition ── */

export interface WizardStepDefinition {
  readonly id: number;
  readonly title: string;
  readonly subtitle: string;
  readonly fiqhContext: string;
  readonly icon: string;
}

/* ── Calculator Actions (for useReducer) ── */

export type CalculatorAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_FINANCIAL'; payload: Partial<FinancialProfile> }
  | { type: 'UPDATE_FAMILY'; payload: Partial<FamilyContext> }
  | { type: 'UPDATE_BRIDE'; payload: Partial<BrideProfile> }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<MehrPreferences> }
  | { type: 'SET_METAL_PRICES'; payload: MetalPrices }
  | { type: 'MARK_COMPLETE' }
  | { type: 'RESET' };
