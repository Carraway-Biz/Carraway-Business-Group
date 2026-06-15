import RoadrunnerMark from './RoadrunnerMark';
import styles from './Footer.module.css';

const NAV = [
  { label: 'Solutions',    href: '#solutions' },
  { label: 'Process',      href: '#process' },
  { label: 'Who We Serve', href: '#who' },
  { label: 'About',        href: '#about' },
  { label: 'Contact',      href: '#contact' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        <div className={styles.top}>
          <a href="#home" className={styles.brand} aria-label="Carraway Capital — home">
            <RoadrunnerMark className={styles.mark} />
            <span className={styles.wordmark}>
              Carraway<span className={styles.wordmarkThin}> Capital</span>
            </span>
          </a>

          <nav className={styles.nav} aria-label="Footer">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.rule} aria-hidden="true" />

        <div className={styles.bottom}>
          <p className={styles.legal}>
            © {new Date().getFullYear()} Carraway Capital. All rights reserved.
          </p>
          <p className={styles.disclaimer}>
            Carraway Capital is a commercial capital brokerage. We connect businesses
            with third-party lenders across our network. We do not originate, fund,
            or hold loans directly.
          </p>
        </div>

      </div>
    </footer>
  );
}
