/**
 * Fiqh type definitions — rooted in Imam Abu Hanifa's (رحمه الله) rulings
 * Every type here maps to an established Hanafi principle
 */

export interface HanafiFiqhRuling {
  readonly name: string;
  readonly arabicName: string;
  readonly description: string;
  readonly dirhams: number;
  readonly silverGrams: number;
  readonly source: string;
  readonly sourceReference: string;
}

export interface SunnahBenchmark {
  readonly id: 'mehr_fatimi' | 'mehr_azwaj' | 'hanafi_minimum';
  readonly name: string;
  readonly arabicName: string;
  readonly description: string;
  readonly dirhams: number;
  readonly silverGrams: number;
  readonly hadithReference: string;
  readonly source: string;
}

export type MehrPaymentStructure = 'full_prompt' | 'full_deferred' | 'split';

export interface MehrSplit {
  readonly promptPercentage: number;
  readonly deferredPercentage: number;
}

export type MehrForm = 'cash' | 'gold' | 'silver' | 'mixed';

export interface MithlFactor {
  readonly name: string;
  readonly arabicTerm: string;
  readonly description: string;
  readonly weight: number;
}
