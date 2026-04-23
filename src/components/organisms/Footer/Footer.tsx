import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footer__inner}>
        <div className={styles.footer__grid}>
          <div className={styles.footer__brand}>
            <div className={styles.footer__logo}>
              🕌 Mehr<span className={styles.footer__logoAccent}>Wise</span>
            </div>
            <p className={styles.footer__description}>
              An intelligent Mehr calculator grounded in Imam Abu Hanifa&apos;s
              (رحمه الله) established fiqh — helping couples determine a fair,
              blessed, and informed Mehr.
            </p>
          </div>

          <div className={styles.footer__column}>
            <h4>Calculator</h4>
            <ul className={styles.footer__links}>
              <li>
                <Link href="/calculator" className={styles.footer__link}>
                  Start Calculator
                </Link>
              </li>
              <li>
                <Link href="/learn/sunnah-benchmarks" className={styles.footer__link}>
                  Sunnah Benchmarks
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footer__column}>
            <h4>Learn</h4>
            <ul className={styles.footer__links}>
              <li>
                <Link href="/learn/what-is-mehr" className={styles.footer__link}>
                  What is Mehr?
                </Link>
              </li>
              <li>
                <Link href="/learn/hanafi-rulings" className={styles.footer__link}>
                  Hanafi Rulings
                </Link>
              </li>
              <li>
                <Link href="/learn/sunnah-benchmarks" className={styles.footer__link}>
                  Sunnah Benchmarks
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footer__column}>
            <h4>About</h4>
            <ul className={styles.footer__links}>
              <li>
                <Link href="/about" className={styles.footer__link}>
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.footer__link}>
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.footer__link}>
                  Sources
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <p className={styles.footer__copyright}>
            © {new Date().getFullYear()} MehrWise. Built with knowledge and intention.
          </p>
          <p className={styles.footer__disclaimer}>
            This tool provides guidance only based on established Hanafi fiqh.
            Please consult your local scholar for your specific situation.
          </p>
        </div>
      </div>
    </footer>
  );
}
