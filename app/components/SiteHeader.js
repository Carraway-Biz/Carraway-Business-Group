'use client';
import { useEffect, useState } from 'react';
import RoadrunnerMark from './RoadrunnerMark';
import styles from './SiteHeader.module.css';

const NAV = [
  { label: 'Solutions',    href: '#solutions' },
  { label: 'Process',      href: '#process' },
  { label: 'Who We Serve', href: '#who' },
  { label: 'About',        href: '#about' },
];

export default function SiteHeader({ variant = 'a' }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (variant !== 'a') return;
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant]);

  const isA = variant === 'a';
  const isB = variant === 'b';

  return (
    <header
      className={[
        styles.header,
        isA && styles.headerA,
        isA && scrolled && styles.headerAScrolled,
        isB && styles.headerB,
      ].filter(Boolean).join(' ')}
    >
      <div className={`container ${styles.inner}`}>
        <a href="#home" className={styles.brand} aria-label="Carraway Capital — home">
          <RoadrunnerMark className={[styles.mark, isB && styles.markDark].filter(Boolean).join(' ')} />
          <span className={[styles.wordmark, isB && styles.wordmarkDark].filter(Boolean).join(' ')}>
            Carraway<span className={styles.wordmarkThin}> Capital</span>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className={[styles.navLink, isB && styles.navLinkDark].filter(Boolean).join(' ')}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="#contact" className={isB ? 'btn btn-ghost--dark' : 'btn btn-ghost'}>Book a Call</a>
          <a href="#qualifier" className="btn btn-primary">Start Your Qualifier</a>
        </div>
      </div>
    </header>
  );
}
