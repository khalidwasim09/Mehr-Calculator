import React from 'react';
import Link from 'next/link';
import { Button } from '../../atoms/Button/Button';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section className={styles.hero} id="hero">
      {/* Geometric Pattern Overlay */}
      <div className={styles.hero__pattern} aria-hidden="true">
        <div className={styles.hero__patternShape} />
        <div className={styles.hero__patternShape} />
        <div className={styles.hero__patternShape} />
        <div className={styles.hero__patternShape} />
      </div>

      <div className={styles.hero__content}>
        <p className={styles.hero__bismillah} aria-label="In the name of Allah, the Most Gracious, the Most Merciful">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        <h1 className={styles.hero__heading}>
          Your Mehr, Guided by{' '}
          <span className={styles.hero__headingAccent}>Knowledge</span>
        </h1>

        <p className={styles.hero__subtitle}>
          An intelligent calculator grounded in Imam Abu Hanifa&apos;s (رحمه الله) 
          established fiqh — helping you determine a fair, blessed, and informed Mehr.
        </p>

        <div className={styles.hero__actions}>
          <Link href="/calculator">
            <Button variant="primary" size="lg" icon={<span>→</span>} iconPosition="right">
              Start Calculator
            </Button>
          </Link>
          <Link href="/learn/what-is-mehr">
            <Button variant="secondary" size="lg">
              Learn About Mehr
            </Button>
          </Link>
        </div>

        <div className={styles.hero__trust}>
          <div className={styles.hero__trustItem}>
            <span className={styles.hero__trustIcon}>✓</span>
            Built on Hanafi Fiqh
          </div>
          <div className={styles.hero__trustItem}>
            <span className={styles.hero__trustIcon}>✓</span>
            Sourced from Scholarly References
          </div>
          <div className={styles.hero__trustItem}>
            <span className={styles.hero__trustIcon}>✓</span>
            100% Private — No Data Stored
          </div>
        </div>
      </div>
    </section>
  );
}
