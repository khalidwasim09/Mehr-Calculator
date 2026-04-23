import React from 'react';
import styles from './FeatureGrid.module.css';

const FEATURES = [
  {
    icon: '🕌',
    title: 'Hanafi Fiqh Compliant',
    description: 'Every calculation is rooted in Imam Abu Hanifa\'s established rulings — minimums, benchmarks, and Mehr al-Mithl methodology.',
  },
  {
    icon: '🧠',
    title: 'AI-Powered Recommendation',
    description: 'Our weighted scoring algorithm considers 6 key factors to produce a personalized, fair Mehr range — not a single arbitrary number.',
  },
  {
    icon: '💰',
    title: 'Live Metal Prices',
    description: 'Real-time gold and silver prices to calculate exact Sunnah benchmark values in your local currency.',
  },
  {
    icon: '📖',
    title: 'Sunnah Benchmarks',
    description: 'Compare your Mehr against the Mehr Fatimi (480 dirhams) and the Mehr of the Prophet\'s ﷺ wives (500 dirhams).',
  },
  {
    icon: '🔒',
    title: '100% Private',
    description: 'All calculations happen in your browser. We never store, transmit, or share your personal financial information.',
  },
  {
    icon: '🖨️',
    title: 'Print-Ready Results',
    description: 'Generate a clean, professional summary to share with your family, imam, or nikah officiant.',
  },
];

const STEPS = [
  {
    number: 1,
    title: 'Answer Questions',
    description: 'Share your financial profile, family context, and preferences through our guided wizard.',
  },
  {
    number: 2,
    title: 'AI Analyzes',
    description: 'Our engine weighs income, family precedent, regional norms, and Hanafi benchmarks.',
  },
  {
    number: 3,
    title: 'Get Your Range',
    description: 'Receive a personalized Mehr recommendation with Sunnah comparisons and affordability insights.',
  },
];

export function FeatureGrid() {
  return (
    <>
      <section className={styles.features} id="features">
        <div className={styles.features__header}>
          <p className={styles.features__label}>Features</p>
          <h2 className={styles.features__title}>
            Built with Integrity, Powered by Intelligence
          </h2>
          <p className={styles.features__subtitle}>
            Every feature is designed to help you arrive at a Mehr that is fair,
            informed, and blessed.
          </p>
        </div>

        <div className={styles.features__grid}>
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className={styles.features__card}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className={styles.features__cardIcon}>{feature.icon}</span>
              <h3 className={styles.features__cardTitle}>{feature.title}</h3>
              <p className={styles.features__cardDescription}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.howItWorks} id="how-it-works">
        <div className={styles.features__header}>
          <p className={styles.features__label}>How It Works</p>
          <h2 className={styles.features__title}>
            Three Steps to Your Mehr Guidance
          </h2>
        </div>

        <div className={styles.howItWorks__steps}>
          {STEPS.map((step) => (
            <div key={step.number} className={styles.howItWorks__step}>
              <div className={styles.howItWorks__stepNumber}>{step.number}</div>
              <h3 className={styles.howItWorks__stepTitle}>{step.title}</h3>
              <p className={styles.howItWorks__stepDescription}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
