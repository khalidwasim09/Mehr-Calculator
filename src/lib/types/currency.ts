/**
 * Currency type definitions for MehrWise
 * Supports 15+ international currencies commonly used in Muslim communities
 */

export type CurrencyCode =
  | 'USD' | 'CAD' | 'GBP' | 'EUR' | 'AED'
  | 'SAR' | 'PKR' | 'INR' | 'BDT' | 'MYR'
  | 'IDR' | 'TRY' | 'EGP' | 'NGN' | 'KWD'
  | 'QAR' | 'BHD' | 'OMR' | 'JOD' | 'AUD';

export interface CurrencyDefinition {
  readonly code: CurrencyCode;
  readonly name: string;
  readonly symbol: string;
  readonly locale: string;
  readonly approximateToUSD: number;
  readonly decimalPlaces: number;
}

export interface MetalPrices {
  readonly goldPerGramUSD: number;
  readonly silverPerGramUSD: number;
  readonly lastUpdated: string;
  readonly source: 'api' | 'manual' | 'fallback';
}

export type GoldKarat = 18 | 21 | 22 | 24;

export interface GoldKaratDefinition {
  readonly karat: GoldKarat;
  readonly purity: number;
  readonly label: string;
  readonly description: string;
}
