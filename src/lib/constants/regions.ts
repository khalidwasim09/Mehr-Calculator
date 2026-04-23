/**
 * Regional norm data for Mehr amounts
 * 
 * These are curated approximate ranges based on research across community forums,
 * Islamic finance sites, and cultural norms. They represent rough median ranges
 * and are used as ONE factor (20% weight) in the recommendation engine.
 * 
 * All values are in USD equivalent for normalization.
 * The engine converts to the user's selected currency at calculation time.
 */

export interface RegionalNorm {
  readonly country: string;
  readonly code: string;
  readonly region: string;
  readonly medianLow: number;   // USD equivalent — lower end of typical range
  readonly medianHigh: number;  // USD equivalent — upper end of typical range
  readonly notes: string;
}

export const REGIONAL_NORMS: RegionalNorm[] = [
  { country: 'Pakistan', code: 'PK', region: 'South Asia', medianLow: 500, medianHigh: 5000, notes: 'Varies widely between urban/rural; Mehr Fatimi is common' },
  { country: 'India', code: 'IN', region: 'South Asia', medianLow: 300, medianHigh: 5000, notes: 'Varies by community and state; gold jewelry common' },
  { country: 'Bangladesh', code: 'BD', region: 'South Asia', medianLow: 200, medianHigh: 3000, notes: 'Often specified in gold weight (tolas)' },
  { country: 'Saudi Arabia', code: 'SA', region: 'Middle East', medianLow: 5000, medianHigh: 40000, notes: 'Higher cultural norms; gold is standard' },
  { country: 'UAE', code: 'AE', region: 'Middle East', medianLow: 5000, medianHigh: 35000, notes: 'Expatriate community ranges vary significantly' },
  { country: 'Kuwait', code: 'KW', region: 'Middle East', medianLow: 5000, medianHigh: 30000, notes: 'Among the higher regional norms' },
  { country: 'Qatar', code: 'QA', region: 'Middle East', medianLow: 5000, medianHigh: 30000, notes: 'High cost-of-living reflected in mehr norms' },
  { country: 'Bahrain', code: 'BH', region: 'Middle East', medianLow: 3000, medianHigh: 20000, notes: 'Moderate by Gulf standards' },
  { country: 'Oman', code: 'OM', region: 'Middle East', medianLow: 3000, medianHigh: 15000, notes: 'Government has encouraged moderation' },
  { country: 'Jordan', code: 'JO', region: 'Middle East', medianLow: 2000, medianHigh: 15000, notes: 'Split prompt/deferred is very common' },
  { country: 'Egypt', code: 'EG', region: 'Middle East', medianLow: 1000, medianHigh: 10000, notes: 'Deferred mehr (mu\'akhkhar) is culturally significant' },
  { country: 'Turkey', code: 'TR', region: 'Middle East', medianLow: 1000, medianHigh: 8000, notes: 'Gold coins (Cumhuriyet altini) are traditional' },
  { country: 'Malaysia', code: 'MY', region: 'Southeast Asia', medianLow: 100, medianHigh: 2000, notes: 'State religious authorities set guidelines; generally modest' },
  { country: 'Indonesia', code: 'ID', region: 'Southeast Asia', medianLow: 50, medianHigh: 1500, notes: 'Al-Quran as mehr is common; cash amounts are modest' },
  { country: 'United Kingdom', code: 'GB', region: 'Western', medianLow: 1000, medianHigh: 15000, notes: 'Varies by community background; legally recognized' },
  { country: 'United States', code: 'US', region: 'Western', medianLow: 1000, medianHigh: 20000, notes: 'Highly variable; first-generation vs diaspora differences' },
  { country: 'Canada', code: 'CA', region: 'Western', medianLow: 1000, medianHigh: 15000, notes: 'Similar to US patterns; recognized in family law' },
  { country: 'Nigeria', code: 'NG', region: 'Africa', medianLow: 50, medianHigh: 2000, notes: 'Varies between Yoruba, Hausa, and other communities' },
  { country: 'Somalia', code: 'SO', region: 'Africa', medianLow: 200, medianHigh: 5000, notes: 'Diaspora communities may set higher amounts' },
  { country: 'Australia', code: 'AU', region: 'Western', medianLow: 1000, medianHigh: 12000, notes: 'Growing Muslim community; norms follow origin country' },
];

/**
 * Country list for dropdown (sorted alphabetically)
 */
export const COUNTRIES_FOR_DROPDOWN = REGIONAL_NORMS
  .map((r) => ({ label: r.country, value: r.code }))
  .sort((a, b) => a.label.localeCompare(b.label));

/**
 * Get regional norm by country code
 */
export function getRegionalNorm(countryCode: string): RegionalNorm | undefined {
  return REGIONAL_NORMS.find((r) => r.code === countryCode);
}
