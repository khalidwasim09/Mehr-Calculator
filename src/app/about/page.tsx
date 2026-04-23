import React from 'react';
import type { Metadata } from 'next';
import styles from '../learn/learn.module.css';

export const metadata: Metadata = {
  title: 'About MehrWise',
  description:
    'Learn about MehrWise — our mission, methodology, scholarly sources, and commitment to privacy.',
};

export default function AboutPage() {
  return (
    <div className={styles.article}>
      <div className={styles.article__inner}>
        <div className={styles.article__header}>
          <h1 className={styles.article__heading}>About MehrWise</h1>
          <p className={styles.article__meta}>
            Our mission, methodology, and commitment to serving the ummah
          </p>
        </div>

        <div className={styles.article__body}>
          <h2>Our Mission</h2>
          <p>
            MehrWise was created to help Muslim couples navigate one of the most important aspects
            of their Nikah with knowledge, confidence, and integrity. We believe that determining
            a fair Mehr should be grounded in Islamic scholarship — not cultural pressure, arbitrary
            numbers, or social media comparisons.
          </p>

          <h2>Methodology</h2>
          <p>
            Our AI recommendation engine uses a <strong>weighted multi-factor scoring algorithm</strong>
            that considers six key factors:
          </p>
          <ul>
            <li><strong>Financial Capacity (30%):</strong> The groom&apos;s income, scaled logarithmically so higher earners see proportionally higher recommendations without excessive amounts.</li>
            <li><strong>Family Precedent (25%):</strong> Mehr al-Mithl — what women in the bride&apos;s paternal family received.</li>
            <li><strong>Regional Norms (20%):</strong> Curated data from 20+ countries on typical Mehr ranges.</li>
            <li><strong>Cultural Expectations (10%):</strong> The couple&apos;s stated preference for modesty or generosity.</li>
            <li><strong>Hanafi Minimum (10%):</strong> Ensures the floor of 10 dirhams is always met.</li>
            <li><strong>Bride&apos;s Profile (5%):</strong> Education and status per Mehr al-Mithl methodology.</li>
          </ul>
          <p>
            The engine produces a <strong>range</strong> (minimum – sweet spot – maximum), not a single number,
            because Mehr is ultimately a mutual agreement between the couple.
          </p>

          <h2>Scholarly Sources</h2>
          <p>
            Every ruling and benchmark in MehrWise is sourced from established Hanafi scholarly references:
          </p>
          <ul>
            <li><strong>Al-Hidaya</strong> by Imam al-Marghinani (d. 593 AH)</li>
            <li><strong>Al-Mabsut</strong> by Imam al-Sarakhsi (d. 483 AH)</li>
            <li><strong>Sahih Muslim</strong> — Hadith 1426 on the Prophet&apos;s ﷺ wives&apos; Mehr</li>
            <li><strong>Sahih al-Bukhari</strong> — Hadith 5029 on the iron ring</li>
            <li><strong>Askimam.org</strong> — Darul Ifta rulings</li>
            <li><strong>SeekersGuidance</strong> — Contemporary Hanafi scholarship</li>
            <li><strong>Darul Uloom Trinidad &amp; Tobago</strong> — Mehr Fatimi calculations</li>
          </ul>

          <h2>Privacy</h2>
          <p>
            MehrWise does <strong>not</strong> collect, store, transmit, or share any personal data.
            All calculations happen entirely in your browser. Your financial information never leaves
            your device. We do not use analytics, cookies, or tracking of any kind.
          </p>

          <h2>Disclaimer</h2>
          <blockquote>
            MehrWise provides educational guidance based on established Hanafi fiqh principles.
            It is not a fatwa, not a legally binding calculation, and not a substitute for consulting
            with a qualified local scholar. The Mehr is ultimately a mutual agreement between the
            bride and groom. Please consult your imam or a Darul Ifta for guidance specific to
            your personal situation.
          </blockquote>

          <h2>Technology</h2>
          <p>
            MehrWise is built with enterprise-grade technology:
          </p>
          <ul>
            <li>Next.js with TypeScript (strict mode)</li>
            <li>Atomic Design component architecture</li>
            <li>CSS Modules with a complete design token system</li>
            <li>Real-time metal prices via metals.dev API</li>
            <li>Zero external tracking or analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
