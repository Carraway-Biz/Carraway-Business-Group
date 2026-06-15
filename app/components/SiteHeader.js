'use client';
import { useEffect, useState } from 'react';
import LogoLockup from './LogoLockup';
import styles from './SiteHeader.module.css';

const NAV = [
  { label: 'Solutions',    href: '#solutions' },
  { label: 'Who We Serve', href: '#who' },
  { label: 'About',        href: '#about' },
  { label: 'Contact',      href: '#contact' },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.brand} aria-label="Carraway Capital — home">
          <LogoLockup className={styles.logo} />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="#contact" className="btn btn-ghost">Book a Call</a>
          <a href="#qualifier" className="btn btn-primary">Start Your Qualifier</a>
        </div>
      </div>
    </header>
  );
}
