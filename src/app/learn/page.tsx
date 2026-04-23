import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './learn.module.css';

export const metadata: Metadata = {
  title: 'Learn About Mehr — MehrWise',
  description:
    'Comprehensive educational resources on Mehr in Islamic marriage, Hanafi fiqh rulings, and Sunnah benchmarks.',
};

const ARTICLES = [
  {
    href: '/learn/what-is-mehr',
    icon: '📖',
    title: 'What is Mehr?',
    description:
      'Understand the Quranic basis, purpose, and philosophy of Mehr — the obligatory bridal gift in Islamic marriage.',
  },
  {
    href: '/learn/madhab-rulings',
    icon: '🕌',
    title: 'Rulings Across the 4 Madhabs',
    description:
      'Detailed guide to the rulings of Imam Abu Hanifa, Imam Malik, Imam Shafi\'i, and Imam Ahmad on Mehr minimums and conditions.',
  },
  {
    href: '/learn/sunnah-benchmarks',
    icon: '✨',
    title: 'Sunnah Benchmarks',
    description:
      'The Mehr of the Prophet\'s ﷺ wives (500 dirhams), Mehr Fatimi (480 dirhams), and their modern-day equivalents.',
  },
];

export default function LearnPage() {
  return (
    <div className={styles.learn}>
      <div className={styles.learn__inner}>
        <div className={styles.learn__header}>
          <p className={styles.learn__label}>Knowledge Base</p>
          <h1 className={styles.learn__title}>Learn About Mehr</h1>
          <p className={styles.learn__subtitle}>
            Understanding Mehr is essential before determining an amount.
            Explore our educational resources grounded in Hanafi scholarship.
          </p>
        </div>

        <div className={styles.learn__grid}>
          {ARTICLES.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className={styles.learn__card}
            >
              <span className={styles.learn__cardIcon}>{article.icon}</span>
              <h2 className={styles.learn__cardTitle}>{article.title}</h2>
              <p className={styles.learn__cardDescription}>
                {article.description}
              </p>
              <span className={styles.learn__cardArrow}>
                Read Article →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
