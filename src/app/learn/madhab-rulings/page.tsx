import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../learn.module.css';

export const metadata: Metadata = {
  title: 'Rulings Across the 4 Madhabs — MehrWise',
  description:
    'Detailed guide to the rulings on Mehr across the four Sunni schools of thought: Hanafi, Maliki, Shafi\'i, and Hanbali.',
};

export default function MadhabRulingsPage() {
  return (
    <div className={styles.article}>
      <div className={styles.article__inner}>
        <Link href="/learn" className={styles.article__back}>
          ← Back to Knowledge Base
        </Link>

        <div className={styles.article__header}>
          <h1 className={styles.article__heading}>Mehr Rulings Across the 4 Madhabs</h1>
          <p className={styles.article__meta}>
            A comprehensive guide to the perspectives of the four major Sunni schools of thought
          </p>
        </div>

        <div className={styles.article__body}>
          <p>
            While all Sunni schools of thought (Madhabs) agree that Mehr is an obligatory requirement
            for a valid Islamic marriage, they differ slightly on specific minimum amounts and conditions.
            Understanding these differences highlights the beautiful diversity within Islamic jurisprudence.
          </p>

          <h2>1. The Hanafi School (المذهب الحنفي)</h2>
          <p>
            Founded by <strong>Imam Abu Hanifa</strong> (d. 150 AH).
          </p>
          <ul>
            <li><strong>Minimum Mehr:</strong> 10 silver dirhams (approx. 30.618 grams of pure silver).</li>
            <li><strong>Ruling:</strong> If a Nikah is contracted for an amount less than 10 dirhams, the marriage is still considered valid, but the husband is legally obligated to pay the minimum of 10 dirhams.</li>
            <li><strong>Philosophy:</strong> The minimum is established to ensure the Mehr holds significant, tangible value, honoring the dignity of the bride.</li>
          </ul>

          <h2>2. The Maliki School (المذهب المالكي)</h2>
          <p>
            Founded by <strong>Imam Malik ibn Anas</strong> (d. 179 AH).
          </p>
          <ul>
            <li><strong>Minimum Mehr:</strong> 3 silver dirhams, or 1/4 of a gold dinar.</li>
            <li><strong>Ruling:</strong> The Mehr must have a minimum value equivalent to 3 dirhams. Anything less is not considered a valid Mehr.</li>
            <li><strong>Philosophy:</strong> Imam Malik based this minimum on the threshold amount for the hadd (legal penalty) of theft, arguing that the right to physical intimacy should not be established for less than the value of property that is legally protected.</li>
          </ul>

          <h2>3. The Shafi&apos;i School (المذهب الشافعي)</h2>
          <p>
            Founded by <strong>Imam Muhammad ibn Idris al-Shafi&apos;i</strong> (d. 204 AH).
          </p>
          <ul>
            <li><strong>Minimum Mehr:</strong> No fixed numerical minimum.</li>
            <li><strong>Ruling:</strong> Anything that holds financial value and can be legally traded or sold can serve as Mehr, no matter how small.</li>
            <li><strong>Philosophy:</strong> The Shafi&apos;i school relies strictly on the Hadith where the Prophet ﷺ said: &quot;Look for (a mehr), even if it is an iron ring.&quot; Therefore, they argue that setting a strict numerical minimum restricts the ease granted by the Sunnah.</li>
          </ul>

          <h2>4. The Hanbali School (المذهب الحنبلي)</h2>
          <p>
            Founded by <strong>Imam Ahmad ibn Hanbal</strong> (d. 241 AH).
          </p>
          <ul>
            <li><strong>Minimum Mehr:</strong> No fixed numerical minimum.</li>
            <li><strong>Ruling:</strong> Similar to the Shafi&apos;i school, anything of value is permissible as long as the bride willingly accepts it.</li>
            <li><strong>Philosophy:</strong> The focus is heavily on mutual agreement and consent. If the bride agrees to a very small amount, it is entirely her right.</li>
          </ul>

          <h2>Summary Table of Minimums</h2>
          <table className={styles.article__table}>
            <thead>
              <tr>
                <th>Madhab</th>
                <th>Minimum Mehr</th>
                <th>Modern Equivalent (Approx.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Hanafi</strong></td>
                <td>10 Dirhams (30.6g silver)</td>
                <td>~$78 USD</td>
              </tr>
              <tr>
                <td><strong>Maliki</strong></td>
                <td>3 Dirhams (9.18g silver)</td>
                <td>~$23 USD</td>
              </tr>
              <tr>
                <td><strong>Shafi&apos;i</strong></td>
                <td>No fixed minimum</td>
                <td>Anything of value</td>
              </tr>
              <tr>
                <td><strong>Hanbali</strong></td>
                <td>No fixed minimum</td>
                <td>Anything of value</td>
              </tr>
            </tbody>
          </table>

          <h2>Common Ground Across All Schools</h2>
          <p>Despite the differences in <em>minimums</em>, all four schools uniformly agree on the following:</p>
          <ul>
            <li><strong>No Maximum Limit:</strong> There is no upper ceiling on Mehr.</li>
            <li><strong>Exclusive Right:</strong> The Mehr belongs solely and entirely to the bride.</li>
            <li><strong>Mehr al-Mithl:</strong> If no Mehr is specified at the time of the contract, the bride is entitled to "Equivalent Mehr" based on her family and social standing.</li>
            <li><strong>Sunnah of Ease:</strong> All imams strongly advised against exorbitant amounts that make marriage difficult for the youth.</li>
          </ul>

        </div>
      </div>
    </div>
  );
}
