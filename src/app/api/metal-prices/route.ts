/**
 * Metal Prices API Route
 * 
 * Server-side route that fetches gold/silver prices from metals.dev free API.
 * This keeps API interactions server-side and provides a clean JSON response.
 */

import { NextResponse } from 'next/server';

const METALS_API_URL = 'https://api.metals.dev/v1/latest';
const METALS_API_KEY = process.env.METALS_API_KEY || 'demo';

interface MetalsApiResponse {
  metals: {
    gold: number;
    silver: number;
  };
  timestamps: {
    metal: string;
  };
}

export async function GET() {
  try {
    const url = `${METALS_API_URL}?api_key=${METALS_API_KEY}&currency=USD&unit=gram`;
    
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      // Return fallback prices if API fails
      return NextResponse.json({
        goldPerGramUSD: 153.0,
        silverPerGramUSD: 2.55,
        lastUpdated: new Date().toISOString(),
        source: 'fallback',
      });
    }

    const data: MetalsApiResponse = await response.json();

    return NextResponse.json({
      goldPerGramUSD: data.metals.gold,
      silverPerGramUSD: data.metals.silver,
      lastUpdated: data.timestamps?.metal || new Date().toISOString(),
      source: 'api',
    });
  } catch {
    // Return fallback on any error
    return NextResponse.json({
      goldPerGramUSD: 153.0,
      silverPerGramUSD: 2.55,
      lastUpdated: new Date().toISOString(),
      source: 'fallback',
    });
  }
}
