'use client';
import { useEffect, useState } from 'react';
import styles from './SiteHeader.module.css';

const NAV = [
  { label: 'Solutions',    href: '#solutions' },
  { label: 'Who We Serve', href: '#who' },
  { label: 'About',        href: '#about' },
  { label: 'Contact',      href: '#contact' },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled || menuOpen ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.brand} aria-label="Carraway Capital — home" onClick={closeMenu}>
          <img
            src="/Carrawaylogo.svg"
            alt="Carraway Capital"
            height="32"
            className={styles.logo}
          />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="https://cal.com/carrawaycapital/discovery-call" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Book a Call</a>
          <a href="#contact" className="btn btn-primary">Start Your Qualifier</a>
        </div>

        <button
          type="button"
          className={styles.menuToggle}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`${styles.menuBar} ${menuOpen ? styles.menuBarOpenTop : ''}`} />
          <span className={`${styles.menuBar} ${menuOpen ? styles.menuBarOpenBottom : ''}`} />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav} aria-label="Primary mobile">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className={styles.mobileNavLink} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.mobileActions}>
          <a href="https://cal.com/carrawaycapital/discovery-call" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" onClick={closeMenu}>Book a Call</a>
          <a href="#contact" className="btn btn-primary" onClick={closeMenu}>Start Your Qualifier</a>
        </div>
      </div>
    </header>
  );
}
