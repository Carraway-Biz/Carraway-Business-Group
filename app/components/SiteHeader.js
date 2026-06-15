import RoadrunnerMark from './RoadrunnerMark';
import styles from './SiteHeader.module.css';

const NAV = [
  { label: 'Solutions',    href: '#solutions' },
  { label: 'Process',      href: '#process' },
  { label: 'Who We Serve', href: '#who' },
  { label: 'About',        href: '#about' },
];

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#home" className={styles.brand} aria-label="Carraway Capital — home">
          <RoadrunnerMark className={styles.mark} />
          <span className={styles.wordmark}>
            Carraway<span className={styles.wordmarkThin}> Capital</span>
          </span>
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
