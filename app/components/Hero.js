import Eyebrow from './Eyebrow';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={`container ${styles.inner}`}>

        {/* TOP ZONE — eyebrow + massive headline, left-aligned */}
        <div className={styles.top}>
          <Eyebrow className={styles.eyebrow}>Commercial Capital, Brokered with Intent</Eyebrow>
          <h1 className={styles.headline}>
            Capital that moves at the speed of your next decision.
          </h1>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        {/* BOTTOM ZONE — two columns split by a vertical rule */}
        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <p className={styles.subhead}>
              Carraway Capital connects established businesses with the funding to grow —
              from working capital to acquisitions, structured around how you actually operate.
            </p>
          </div>

          <div className={styles.vrule} aria-hidden="true" />

          <div className={styles.bottomRight}>
            <div className={styles.actions}>
              <a href="#qualifier" className="btn btn-primary">Start Your Qualifier</a>
              <a href="https://cal.com/carrawaycapital/discovery-call" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Book a Call</a>
            </div>
            <p className={styles.reassurance}>No obligation. No credit impact.</p>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className={styles.scroll} aria-hidden="true">
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
