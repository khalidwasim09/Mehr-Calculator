/**
 * Currency definitions for MehrWise
 * Covers major currencies used in Muslim communities worldwide
 */

import { CurrencyCode, CurrencyDefinition, GoldKarat, GoldKaratDefinition } from '../types/currency';

export const CURRENCIES: Record<CurrencyCode, CurrencyDefinition> = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US', approximateToUSD: 1, decimalPlaces: 2 },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', locale: 'en-CA', approximateToUSD: 0.72, decimalPlaces: 2 },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', locale: 'en-GB', approximateToUSD: 1.26, decimalPlaces: 2 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', locale: 'de-DE', approximateToUSD: 1.08, decimalPlaces: 2 },
  AED: { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', locale: 'ar-AE', approximateToUSD: 0.27, decimalPlaces: 2 },
  SAR: { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', locale: 'ar-SA', approximateToUSD: 0.27, decimalPlaces: 2 },
  PKR: { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', locale: 'ur-PK', approximateToUSD: 0.0036, decimalPlaces: 0 },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', locale: 'hi-IN', approximateToUSD: 0.012, decimalPlaces: 0 },
  BDT: { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', locale: 'bn-BD', approximateToUSD: 0.0083, decimalPlaces: 0 },
  MYR: { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', locale: 'ms-MY', approximateToUSD: 0.21, decimalPlaces: 2 },
  IDR: { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', locale: 'id-ID', approximateToUSD: 0.000061, decimalPlaces: 0 },
  TRY: { code: 'TRY', name: 'Turkish Lira', symbol: '₺', locale: 'tr-TR', approximateToUSD: 0.031, decimalPlaces: 2 },
  EGP: { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', locale: 'ar-EG', approximateToUSD: 0.02, decimalPlaces: 2 },
  NGN: { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', locale: 'en-NG', approximateToUSD: 0.00063, decimalPlaces: 0 },
  KWD: { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', locale: 'ar-KW', approximateToUSD: 3.25, decimalPlaces: 3 },
  QAR: { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق', locale: 'ar-QA', approximateToUSD: 0.27, decimalPlaces: 2 },
  BHD: { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', locale: 'ar-BH', approximateToUSD: 2.65, decimalPlaces: 3 },
  OMR: { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.', locale: 'ar-OM', approximateToUSD: 2.60, decimalPlaces: 3 },
  JOD: { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', locale: 'ar-JO', approximateToUSD: 1.41, decimalPlaces: 3 },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', locale: 'en-AU', approximateToUSD: 0.65, decimalPlaces: 2 },
};

export const GOLD_KARATS: Record<GoldKarat, GoldKaratDefinition> = {
  24: { karat: 24, purity: 1.0, label: '24K (Pure Gold)', description: '99.9% pure gold — investment grade' },
  22: { karat: 22, purity: 0.9167, label: '22K', description: '91.67% gold — traditional jewelry standard' },
  21: { karat: 21, purity: 0.875, label: '21K', description: '87.5% gold — common in Middle Eastern jewelry' },
  18: { karat: 18, purity: 0.75, label: '18K', description: '75% gold — common in Western jewelry' },
};

/**
 * Get the sorted list of currencies for display (most common first)
 */
export const CURRENCY_DISPLAY_ORDER: CurrencyCode[] = [
  'USD', 'CAD', 'GBP', 'EUR', 'AED', 'SAR', 'PKR', 'INR', 'BDT',
  'MYR', 'IDR', 'TRY', 'EGP', 'KWD', 'QAR', 'BHD', 'OMR', 'JOD',
  'NGN', 'AUD',
];
