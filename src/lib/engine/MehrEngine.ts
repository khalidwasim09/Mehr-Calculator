/**
 * MehrEngine — Core Mehr Calculations
 * 
 * Provides pure calculation functions for Sunnah benchmarks,
 * Hanafi minimums, metal conversions, and currency operations.
 * 
 * All calculations are deterministic — same input always produces same output.
 * No side effects. No API calls. Pure functions only.
 */

import {
  HANAFI_MINIMUM_SILVER_GRAMS,
  MEHR_FATIMI_SILVER_GRAMS,
  MEHR_AZWAJ_SILVER_GRAMS,
} from '../constants/fiqh';
import { CURRENCIES, GOLD_KARATS } from '../constants/currencies';
import { CurrencyCode, GoldKarat, MetalPrices } from '../types/currency';

/**
 * Calculate the current monetary value of the Hanafi minimum Mehr
 * (10 dirhams = 30.618g of pure silver)
 */
export function calculateHanafiMinimum(
  silverPricePerGramUSD: number,
  targetCurrency: CurrencyCode
): number {
  const valueUSD = HANAFI_MINIMUM_SILVER_GRAMS * silverPricePerGramUSD;
  return convertFromUSD(valueUSD, targetCurrency);
}

/**
 * Calculate the current monetary value of Mehr Fatimi
 * (480 dirhams = 1,469.66g of pure silver)
 */
export function calculateMehrFatimi(
  silverPricePerGramUSD: number,
  targetCurrency: CurrencyCode
): number {
  const valueUSD = MEHR_FATIMI_SILVER_GRAMS * silverPricePerGramUSD;
  return convertFromUSD(valueUSD, targetCurrency);
}

/**
 * Calculate the current monetary value of Mehr Azwaj-un-Nabi ﷺ
 * (500 dirhams = 1,530.9g of pure silver)
 */
export function calculateMehrAzwaj(
  silverPricePerGramUSD: number,
  targetCurrency: CurrencyCode
): number {
  const valueUSD = MEHR_AZWAJ_SILVER_GRAMS * silverPricePerGramUSD;
  return convertFromUSD(valueUSD, targetCurrency);
}

/**
 * Convert a monetary amount to gold grams at a specific karat
 */
export function convertToGoldGrams(
  amountInCurrency: number,
  currency: CurrencyCode,
  goldPricePerGramUSD: number,
  karat: GoldKarat
): number {
  const amountUSD = convertToUSD(amountInCurrency, currency);
  const karatDef = GOLD_KARATS[karat];
  const pricePerGramAtKarat = goldPricePerGramUSD * karatDef.purity;
  return amountUSD / pricePerGramAtKarat;
}

/**
 * Convert a monetary amount to silver grams (pure)
 */
export function convertToSilverGrams(
  amountInCurrency: number,
  currency: CurrencyCode,
  silverPricePerGramUSD: number
): number {
  const amountUSD = convertToUSD(amountInCurrency, currency);
  return amountUSD / silverPricePerGramUSD;
}

/**
 * Convert amount from one currency to USD
 */
export function convertToUSD(amount: number, fromCurrency: CurrencyCode): number {
  const rate = CURRENCIES[fromCurrency].approximateToUSD;
  return amount * rate;
}

/**
 * Convert amount from USD to target currency
 */
export function convertFromUSD(amountUSD: number, toCurrency: CurrencyCode): number {
  const rate = CURRENCIES[toCurrency].approximateToUSD;
  if (rate === 0) return 0;
  return amountUSD / rate;
}

/**
 * Format a number as currency string
 */
export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode
): string {
  const def = CURRENCIES[currencyCode];
  try {
    return new Intl.NumberFormat(def.locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: def.decimalPlaces,
    }).format(amount);
  } catch {
    return `${def.symbol}${amount.toFixed(def.decimalPlaces)}`;
  }
}

/**
 * Format grams with appropriate precision
 */
export function formatGrams(grams: number): string {
  if (grams >= 100) {
    return `${grams.toFixed(0)}g`;
  }
  return `${grams.toFixed(1)}g`;
}

/**
 * Calculate all three Sunnah benchmarks at once
 */
export function calculateAllBenchmarks(
  metalPrices: MetalPrices,
  currency: CurrencyCode
) {
  return {
    hanafiMinimum: calculateHanafiMinimum(metalPrices.silverPerGramUSD, currency),
    mehrFatimi: calculateMehrFatimi(metalPrices.silverPerGramUSD, currency),
    mehrAzwaj: calculateMehrAzwaj(metalPrices.silverPerGramUSD, currency),
  };
}
