/**
 * Metal Price API Service
 * 
 * Fetches real-time gold and silver prices from free APIs.
 * Uses metals.dev as primary, with fallback values.
 * 
 * The API is called through Next.js API routes to keep keys server-side.
 */

import { MetalPrices } from '../types/currency';

/**
 * Fallback prices (approximate April 2026 values)
 * Used when API is unavailable
 */
const FALLBACK_PRICES: MetalPrices = {
  goldPerGramUSD: 153.0,
  silverPerGramUSD: 2.55,
  lastUpdated: '2026-04-22T00:00:00Z',
  source: 'fallback',
};

/**
 * Fetch current metal prices from the API route
 */
export async function fetchMetalPrices(): Promise<MetalPrices> {
  try {
    const response = await fetch('/api/metal-prices', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.warn('Metal price API returned non-OK status, using fallback');
      return FALLBACK_PRICES;
    }

    const data = await response.json();
    return {
      goldPerGramUSD: data.goldPerGramUSD,
      silverPerGramUSD: data.silverPerGramUSD,
      lastUpdated: data.lastUpdated,
      source: 'api',
    };
  } catch (error) {
    console.warn('Failed to fetch metal prices, using fallback:', error);
    return FALLBACK_PRICES;
  }
}

/**
 * Get fallback prices (for initial state before API call)
 */
export function getFallbackPrices(): MetalPrices {
  return { ...FALLBACK_PRICES };
}
