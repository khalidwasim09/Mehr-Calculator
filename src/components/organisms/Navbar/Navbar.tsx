'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../../atoms/Button/Button';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/learn', label: 'Learn' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className={styles.navbar} role="banner">
        <div className={styles.navbar__inner}>
          <Link href="/" className={styles.navbar__brand}>
            <span className={styles.navbar__logo}>🕌</span>
            <span className={styles.navbar__title}>
              Mehr<span className={styles.navbar__titleAccent}>Wise</span>
            </span>
          </Link>

          <nav aria-label="Main navigation">
            <ul className={styles.navbar__nav}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.navbar__link} ${
                      pathname === link.href ? styles['navbar__link--active'] : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className={styles.navbar__cta}>
                <Link href="/calculator">
                  <Button variant="primary" size="sm">
                    Calculate Mehr
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>

          <button
            className={styles.navbar__mobile}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      <div
        className={`${styles.navbar__mobileMenu} ${
          mobileOpen ? styles['navbar__mobileMenu--open'] : ''
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.navbar__mobileLink}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/calculator" onClick={() => setMobileOpen(false)}>
          <Button variant="primary" size="md" fullWidth>
            Calculate Mehr
          </Button>
        </Link>
      </div>
    </>
  );
}
