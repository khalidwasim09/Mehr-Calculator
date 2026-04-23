/**
 * Hanafi Fiqh Constants
 * 
 * All values sourced from established Hanafi scholarly references:
 * - Al-Hidaya (Imam al-Marghinani)
 * - Al-Mabsut (Imam al-Sarakhsi)
 * - Askimam.org (Darul Ifta)
 * - SeekersGuidance
 * - Darul Uloom Trinidad & Tobago
 * 
 * Imam Abu Hanifa (رحمه الله) — d. 150 AH / 767 CE
 */

import { HanafiFiqhRuling, SunnahBenchmark, MithlFactor } from '../types/fiqh';

/**
 * Weight of one silver dirham in grams
 * This is the established Hanafi standard used across Darul Iftas globally
 */
export const DIRHAM_WEIGHT_GRAMS = 3.0618;

/**
 * Hanafi minimum Mehr: 10 silver dirhams
 * "The minimum mehr in the Hanafi madhab is ten dirhams of silver or its equivalent"
 * Source: Al-Hidaya, Kitab al-Nikah
 */
export const HANAFI_MINIMUM_DIRHAMS = 10;
export const HANAFI_MINIMUM_SILVER_GRAMS = HANAFI_MINIMUM_DIRHAMS * DIRHAM_WEIGHT_GRAMS; // ≈ 30.618g

/**
 * Maliki minimum Mehr: 3 silver dirhams (or 1/4 dinar)
 */
export const MALIKI_MINIMUM_DIRHAMS = 3;
export const MALIKI_MINIMUM_SILVER_GRAMS = MALIKI_MINIMUM_DIRHAMS * DIRHAM_WEIGHT_GRAMS; // ≈ 9.185g

/**
 * Shafi'i & Hanbali minimum: No fixed numerical minimum
 * The Sunnah specifies that anything of value suffices (e.g. an iron ring)
 * For calculation floor, we use 1 dirham as a symbolic non-zero value.
 */
export const SHAFII_HANBALI_MINIMUM_DIRHAMS = 1;
export const SHAFII_HANBALI_MINIMUM_SILVER_GRAMS = SHAFII_HANBALI_MINIMUM_DIRHAMS * DIRHAM_WEIGHT_GRAMS;

/**
 * Mehr Fatimi: 480 dirhams
 * The mehr given by Ali ibn Abi Talib (RA) to Fatimah bint Muhammad (RA)
 * It was the value of Ali's shield (dir')
 * Source: Askimam.org, Darul Uloom TT
 */
export const MEHR_FATIMI_DIRHAMS = 480;
export const MEHR_FATIMI_SILVER_GRAMS = MEHR_FATIMI_DIRHAMS * DIRHAM_WEIGHT_GRAMS; // ≈ 1,469.66g

/**
 * Mehr Azwaj-un-Nabi ﷺ: 500 dirhams
 * The mehr given by the Prophet ﷺ to most of his wives
 * Source: Sahih Muslim (Hadith 1426)
 */
export const MEHR_AZWAJ_DIRHAMS = 500;
export const MEHR_AZWAJ_SILVER_GRAMS = MEHR_AZWAJ_DIRHAMS * DIRHAM_WEIGHT_GRAMS; // ≈ 1,530.9g

/**
 * Complete Hanafi ruling definitions
 */
export const HANAFI_RULINGS: Record<string, HanafiFiqhRuling> = {
  minimum: {
    name: 'Hanafi Minimum Mehr',
    arabicName: 'أقل المهر',
    description:
      'The minimum mehr according to Imam Abu Hanifa is 10 silver dirhams. A nikah contracted for less is still valid, but the husband must pay at least this amount.',
    dirhams: HANAFI_MINIMUM_DIRHAMS,
    silverGrams: HANAFI_MINIMUM_SILVER_GRAMS,
    source: 'Al-Hidaya, Kitab al-Nikah',
    sourceReference: 'Imam al-Marghinani (d. 593 AH)',
  },
  mehrFatimi: {
    name: 'Mehr Fatimi',
    arabicName: 'مهر فاطمي',
    description:
      'The mehr of Fatimah (RA), daughter of the Prophet ﷺ, given by Ali ibn Abi Talib (RA). It was 480 dirhams, approximately the value of his shield.',
    dirhams: MEHR_FATIMI_DIRHAMS,
    silverGrams: MEHR_FATIMI_SILVER_GRAMS,
    source: 'Askimam.org, Darul Ifta',
    sourceReference: 'Multiple hadith collections',
  },
  mehrAzwaj: {
    name: 'Mehr Azwaj-un-Nabi ﷺ',
    arabicName: 'مهر أزواج النبي ﷺ',
    description:
      'The mehr given by the Prophet ﷺ to most of his blessed wives was 500 silver dirhams.',
    dirhams: MEHR_AZWAJ_DIRHAMS,
    silverGrams: MEHR_AZWAJ_SILVER_GRAMS,
    source: 'Sahih Muslim',
    sourceReference: 'Hadith 1426, narrated by Abu Salamah ibn Abdur-Rahman',
  },
};

/**
 * Sunnah benchmark definitions for comparison display
 */
export const SUNNAH_BENCHMARKS: SunnahBenchmark[] = [
  {
    id: 'hanafi_minimum',
    name: 'Hanafi Minimum',
    arabicName: 'أقل المهر',
    description: 'The minimum mehr per Imam Abu Hanifa — 10 dirhams of silver',
    dirhams: HANAFI_MINIMUM_DIRHAMS,
    silverGrams: HANAFI_MINIMUM_SILVER_GRAMS,
    hadithReference: 'Al-Hidaya by Imam al-Marghinani',
    source: 'Hanafi Fiqh — Al-Mabsut, Al-Hidaya',
  },
  {
    id: 'mehr_fatimi',
    name: 'Mehr Fatimi',
    arabicName: 'مهر فاطمي',
    description:
      'The mehr of Fatimah (RA), given by Ali (RA) — 480 dirhams, the value of his shield',
    dirhams: MEHR_FATIMI_DIRHAMS,
    silverGrams: MEHR_FATIMI_SILVER_GRAMS,
    hadithReference: 'Narrated in multiple hadith collections',
    source: 'Askimam.org, Darul Uloom TT',
  },
  {
    id: 'mehr_azwaj',
    name: "Mehr of the Prophet's ﷺ Wives",
    arabicName: 'مهر أزواج النبي ﷺ',
    description:
      'The mehr given by the Prophet ﷺ to his blessed wives — 500 dirhams of silver',
    dirhams: MEHR_AZWAJ_DIRHAMS,
    silverGrams: MEHR_AZWAJ_SILVER_GRAMS,
    hadithReference: 'Sahih Muslim 1426',
    source: 'Sahih Muslim',
  },
];

/**
 * Mehr al-Mithl factors per Hanafi fiqh
 * These are the factors used to determine "equivalent mehr" when comparing
 * the bride to women of similar standing in her paternal family
 */
export const MITHL_FACTORS: MithlFactor[] = [
  {
    name: 'Family Precedent',
    arabicTerm: 'مهر المثل',
    description:
      'The mehr given to women in the bride\'s paternal family — sisters, paternal aunts, and cousins',
    weight: 0.45,
  },
  {
    name: 'Social Standing',
    arabicTerm: 'المنزلة الاجتماعية',
    description: 'The social standing and reputation of the bride\'s family in their community',
    weight: 0.20,
  },
  {
    name: 'Education & Knowledge',
    arabicTerm: 'العلم والتعليم',
    description: 'The bride\'s level of education, including Islamic knowledge (Hafiza, Alima)',
    weight: 0.15,
  },
  {
    name: 'Age & Locality',
    arabicTerm: 'العمر والبلد',
    description: 'The bride\'s age and the norms of her specific locality',
    weight: 0.10,
  },
  {
    name: 'Time Period Norms',
    arabicTerm: 'أعراف الزمان',
    description: 'What is customary in the current era and economic conditions',
    weight: 0.10,
  },
];

/**
 * Quranic verse on Mehr
 * Surah An-Nisa (4:4)
 */
export const QURAN_MEHR_VERSE = {
  surah: 'An-Nisa',
  ayah: 4,
  arabic: 'وَآتُوا النِّسَاءَ صَدُقَاتِهِنَّ نِحْلَةً',
  translation:
    'And give the women [upon marriage] their bridal gifts graciously.',
  transliteration: 'Wa aatu an-nisaa-a saduqaatihinna nihlah',
  reference: 'Quran 4:4',
};

/**
 * Key hadith references about Mehr
 */
export const MEHR_HADITH_REFERENCES = [
  {
    text: 'The most blessed marriage is the one with the least expense.',
    source: 'Musnad Ahmad',
    narrator: 'Aisha (RA)',
    relevance: 'Encourages moderation in mehr amounts',
  },
  {
    text: 'The best of mehr is the easiest.',
    source: 'Reported by Abu Dawud and al-Hakim',
    narrator: 'Uqbah ibn Amir (RA)',
    relevance: 'The Prophet ﷺ encouraged making mehr accessible',
  },
  {
    text: 'Look for (a mehr), even if it is an iron ring.',
    source: 'Sahih al-Bukhari 5029',
    narrator: 'Sahl ibn Sa\'d (RA)',
    relevance: 'Even a small amount can serve as mehr if mutually agreed',
  },
];
