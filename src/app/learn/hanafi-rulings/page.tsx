import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../learn.module.css';

export const metadata: Metadata = {
  title: 'Hanafi Rulings on Mehr — MehrWise',
  description:
    'Detailed guide to Imam Abu Hanifa\'s rulings on Mehr — minimum amounts, Mehr al-Mithl, prompt vs deferred, and the wife\'s legal rights.',
};

export default function HanafiRulingsPage() {
  return (
    <div className={styles.article}>
      <div className={styles.article__inner}>
        <Link href="/learn" className={styles.article__back}>
          ← Back to Knowledge Base
        </Link>

        <div className={styles.article__header}>
          <h1 className={styles.article__heading}>Hanafi Rulings on Mehr</h1>
          <p className={styles.article__meta}>
            A comprehensive guide to Imam Abu Hanifa&apos;s (رحمه الله) established fiqh on Mehr
          </p>
        </div>

        <div className={styles.article__body}>
          <h2>The Hanafi Minimum: 10 Dirhams</h2>
          <p>
            According to Imam Abu Hanifa (رحمه الله), the <strong>minimum Mehr is 10 silver dirhams</strong>,
            which equals approximately <strong>30.618 grams of pure silver</strong>.
          </p>
          <p>
            This ruling is documented in Al-Hidaya (by Imam al-Marghinani) and Al-Mabsut (by Imam al-Sarakhsi),
            two foundational texts of Hanafi jurisprudence.
          </p>

          <blockquote>
            If a Nikah is contracted for an amount less than 10 dirhams, the marriage is still considered valid,
            but the husband is obligated to pay the minimum of 10 dirhams.
            <cite>— Al-Hidaya, Kitab al-Nikah</cite>
          </blockquote>

          <h2>Types of Mehr</h2>

          <h3>1. Mehr al-Musamma (Specified Mehr)</h3>
          <p>
            This is the specific amount or item agreed upon by both the bride and groom and explicitly
            stated in the marriage contract. This is the preferred and most common method.
          </p>

          <h3>2. Mehr al-Mithl (Equivalent Mehr)</h3>
          <p>
            When no Mehr is specified at the time of Nikah, or when the specified amount is unlawful,
            the bride is entitled to a &quot;proper Mehr&quot; based on what women of similar status in her
            paternal family received. The Hanafi school considers these factors:
          </p>
          <ul>
            <li>Mehr given to her sisters and paternal aunts</li>
            <li>Age and beauty</li>
            <li>Social standing and family reputation</li>
            <li>Education and knowledge (including Islamic scholarship)</li>
            <li>Locality and time period norms</li>
          </ul>

          <h2>Payment Structure</h2>

          <h3>Mehr Mu&apos;ajjal (Prompt Mehr)</h3>
          <p>
            The portion payable immediately upon the wife&apos;s demand. Key points:
          </p>
          <ul>
            <li>The wife can demand payment at any time after the Nikah</li>
            <li>She may refuse to cohabit with the husband until the prompt Mehr is paid</li>
            <li>It is a religiously and legally binding obligation</li>
          </ul>

          <h3>Mehr Mu&apos;akhkhar (Deferred Mehr)</h3>
          <p>
            The portion postponed to a later date. Key points:
          </p>
          <ul>
            <li>Typically becomes due upon divorce or death of the husband</li>
            <li>It is a <strong>debt on the husband&apos;s estate</strong> — must be paid before inheritance distribution</li>
            <li>Provides long-term financial security for the wife</li>
          </ul>

          <h2>The Wife&apos;s Rights</h2>
          <ul>
            <li><strong>Exclusive ownership:</strong> Mehr belongs solely to the wife</li>
            <li><strong>Right to demand:</strong> She can demand the prompt portion at any time</li>
            <li><strong>Right to refuse cohabitation:</strong> Until prompt Mehr is paid (before consummation)</li>
            <li><strong>Voluntary waiver (Ibra&apos;):</strong> She may voluntarily forgive part or all of the Mehr, but only of her own free will</li>
            <li><strong>No minimum ceiling:</strong> There is no maximum limit on Mehr</li>
          </ul>

          <h2>Summary Table</h2>

          <table className={styles.article__table}>
            <thead>
              <tr>
                <th>Ruling</th>
                <th>Detail</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Minimum Mehr</td>
                <td>10 dirhams (30.618g silver)</td>
                <td>Al-Hidaya</td>
              </tr>
              <tr>
                <td>Below minimum</td>
                <td>Nikah valid, but minimum must be paid</td>
                <td>Darul Ifta</td>
              </tr>
              <tr>
                <td>Maximum</td>
                <td>No upper limit</td>
                <td>Consensus</td>
              </tr>
              <tr>
                <td>Unspecified Mehr</td>
                <td>Mehr al-Mithl applies</td>
                <td>Hanafi Usul</td>
              </tr>
              <tr>
                <td>Wife&apos;s property</td>
                <td>Exclusive — she may use freely</td>
                <td>Quran 4:4</td>
              </tr>
              <tr>
                <td>Deferred Mehr</td>
                <td>Debt on estate upon death</td>
                <td>Hanafi Nikah law</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
