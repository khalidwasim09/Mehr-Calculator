import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../learn.module.css';

export const metadata: Metadata = {
  title: 'What is Mehr? — MehrWise',
  description:
    'Learn about Mehr — the obligatory bridal gift in Islamic marriage. Understand its Quranic basis, purpose, and common misconceptions.',
};

export default function WhatIsMehrPage() {
  return (
    <div className={styles.article}>
      <div className={styles.article__inner}>
        <Link href="/learn" className={styles.article__back}>
          ← Back to Knowledge Base
        </Link>

        <div className={styles.article__header}>
          <h1 className={styles.article__heading}>What is Mehr?</h1>
          <p className={styles.article__meta}>
            Understanding the obligatory bridal gift in Islamic marriage
          </p>
        </div>

        <div className={styles.article__body}>
          <p className={styles.article__arabic}>
            وَآتُوا النِّسَاءَ صَدُقَاتِهِنَّ نِحْلَةً
          </p>

          <blockquote>
            &quot;And give the women [upon marriage] their bridal gifts graciously.&quot;
            <cite>— Quran 4:4</cite>
          </blockquote>

          <h2>Definition</h2>
          <p>
            <strong>Mehr</strong> (مهر), also commonly known as <em>Meher</em>, <em>Mehr</em>, or <em>Sadaq</em>,
            is the obligatory gift that the groom gives to the bride at the time of their Islamic marriage
            contract (Nikah). It is a fundamental pillar of the Nikah and is the exclusive right of the wife.
          </p>
          <p>
            Unlike a dowry (which flows from the bride&apos;s family to the groom&apos;s family in some cultures), 
            Mehr flows in the opposite direction — from the groom to the bride. It is her personal property,
            and she has complete autonomy over how she uses it.
          </p>

          <h2>Purpose &amp; Philosophy</h2>
          <p>
            Mehr serves several important purposes in Islamic marriage:
          </p>
          <ul>
            <li><strong>Honoring the bride:</strong> Mehr is described in the Quran as a &quot;nihlah&quot; — a gift given 
            willingly and graciously, not a transaction or a price.</li>
            <li><strong>Financial security:</strong> It provides the wife with a personal financial asset that 
            belongs solely to her.</li>
            <li><strong>Commitment:</strong> It demonstrates the groom&apos;s sincerity and willingness to fulfill 
            his responsibilities.</li>
            <li><strong>Legal right:</strong> It establishes a contractual obligation that is legally enforceable.</li>
          </ul>

          <h2>Mehr is NOT a &quot;Price&quot;</h2>
          <p>
            A common misconception is that Mehr represents a &quot;price&quot; for the bride. This is incorrect.
            Mehr is a gift — an expression of love, respect, and commitment. The Arabic word &quot;nihlah&quot;
            (نحلة) used in the Quran specifically means a gift given willingly and without expectation of
            return.
          </p>

          <h2>Mehr vs. Cultural Dowry</h2>
          <p>
            It is important to distinguish between Islamic Mehr and cultural dowry practices:
          </p>
          <ul>
            <li><strong>Mehr:</strong> Groom → Bride. Required by Islamic law. Belongs to the wife exclusively.</li>
            <li><strong>Dowry:</strong> Bride&apos;s family → Groom&apos;s family. A cultural practice that is NOT 
            mandated by Islam and is prohibited in some countries.</li>
          </ul>

          <h2>Can Mehr Be Anything?</h2>
          <p>
            Yes — Mehr can be cash, gold, silver, property, jewelry, or any item of value. In a famous
            hadith, the Prophet ﷺ even accepted teaching the Quran as Mehr for a companion who had nothing
            material to offer. However, in the Hanafi school, there is a minimum value that must be met.
          </p>

          <blockquote>
            &quot;Look for (a mehr), even if it is an iron ring.&quot;
            <cite>— Sahih al-Bukhari 5029, narrated by Sahl ibn Sa&apos;d (RA)</cite>
          </blockquote>

          <h2>Who Determines the Amount?</h2>
          <p>
            The Mehr amount is determined through mutual agreement between the bride and groom, often with
            input from their families. The bride has the primary right to accept or decline a proposed amount.
            If no specific amount is agreed upon, the bride is entitled to a &quot;Mehr al-Mithl&quot; — an 
            equivalent mehr based on what women of similar status in her family received.
          </p>

          <p>
            Islam encourages moderation and ease in Mehr. The Prophet ﷺ said:
          </p>

          <blockquote>
            &quot;The most blessed marriage is the one with the least expense.&quot;
            <cite>— Musnad Ahmad</cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
