import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../learn.module.css';

export const metadata: Metadata = {
  title: 'Sunnah Benchmarks — MehrWise',
  description:
    'Learn about the Mehr Fatimi, the Mehr of the Prophet\'s ﷺ wives, and how to calculate their modern-day equivalents.',
};

export default function SunnahBenchmarksPage() {
  return (
    <div className={styles.article}>
      <div className={styles.article__inner}>
        <Link href="/learn" className={styles.article__back}>
          ← Back to Knowledge Base
        </Link>

        <div className={styles.article__header}>
          <h1 className={styles.article__heading}>Sunnah Benchmarks</h1>
          <p className={styles.article__meta}>
            Historical Mehr amounts from the Prophet&apos;s ﷺ era and their modern equivalents
          </p>
        </div>

        <div className={styles.article__body}>
          <p>
            While there is no fixed &quot;required&quot; amount for Mehr beyond the Hanafi minimum, the Sunnah
            provides valuable reference points that many Muslims use as benchmarks.
          </p>

          <h2>Mehr Fatimi (مهر فاطمي)</h2>
          <p>
            <strong>480 dirhams of silver ≈ 1,469.7 grams of pure silver</strong>
          </p>
          <p>
            When Fatimah (RA), the beloved daughter of the Prophet ﷺ, married Ali ibn Abi Talib (RA),
            Ali was in a difficult financial situation. The Prophet ﷺ suggested that Ali offer his 
            shield (dir&apos;) as Mehr. This shield was valued at approximately 480 dirhams of silver.
          </p>
          <p>
            This is a powerful example of modesty and simplicity — the daughter of the Prophet ﷺ himself
            received a humble Mehr. It demonstrates that the value of a marriage lies in the spiritual
            bond, not in the financial transaction.
          </p>

          <blockquote>
            The Mehr Fatimi serves as a <strong>benchmark of blessed modesty</strong>. Using it as a 
            reference point honors the Sunnah while keeping marriage accessible.
            <cite>— Askimam.org, Darul Ifta</cite>
          </blockquote>

          <h2>Mehr Azwaj-un-Nabi ﷺ (مهر أزواج النبي ﷺ)</h2>
          <p>
            <strong>500 dirhams of silver ≈ 1,530.9 grams of pure silver</strong>
          </p>
          <p>
            It is reported in Sahih Muslim (Hadith 1426, narrated by Abu Salamah ibn Abdur-Rahman)
            that the Mehr given by the Prophet ﷺ to most of his blessed wives was 12.5 awqiyah,
            which equals 500 dirhams of silver.
          </p>
          <p>
            This amount — 500 dirhams — is slightly higher than the Mehr Fatimi and serves as
            another important benchmark in Islamic tradition.
          </p>

          <h2>Converting to Modern Values</h2>
          <p>
            To calculate the modern equivalent of these Sunnah benchmarks, you need:
          </p>
          <ul>
            <li><strong>1 dirham = 3.0618 grams</strong> of pure silver (established Hanafi standard)</li>
            <li><strong>Current silver price per gram</strong> (fluctuates daily)</li>
          </ul>
          <p>
            The formula is simple:
          </p>
          <p>
            <strong>Modern Value = Dirhams × 3.0618 × Silver Price per Gram</strong>
          </p>

          <table className={styles.article__table}>
            <thead>
              <tr>
                <th>Benchmark</th>
                <th>Dirhams</th>
                <th>Silver (grams)</th>
                <th>At $2.55/g</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hanafi Minimum</td>
                <td>10</td>
                <td>30.6g</td>
                <td>≈ $78</td>
              </tr>
              <tr>
                <td>Mehr Fatimi</td>
                <td>480</td>
                <td>1,469.7g</td>
                <td>≈ $3,748</td>
              </tr>
              <tr>
                <td>Mehr Azwaj</td>
                <td>500</td>
                <td>1,530.9g</td>
                <td>≈ $3,904</td>
              </tr>
            </tbody>
          </table>

          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
            * Values calculated at approximately $2.55/gram silver. Use our calculator for real-time prices.
          </p>

          <h2>The Principle of Ease</h2>
          <p>
            While these benchmarks provide valuable reference points, the overarching principle in
            Islam is to make marriage <strong>easy and accessible</strong>:
          </p>

          <blockquote>
            &quot;The best of mehr is the easiest.&quot;
            <cite>— Abu Dawud and al-Hakim, narrated by Uqbah ibn Amir (RA)</cite>
          </blockquote>

          <blockquote>
            &quot;The most blessed marriage is the one with the least expense.&quot;
            <cite>— Musnad Ahmad, narrated by Aisha (RA)</cite>
          </blockquote>

          <p>
            These narrations remind us that while Mehr is important, it should never become a barrier
            to marriage or a source of financial hardship.
          </p>
        </div>
      </div>
    </div>
  );
}
