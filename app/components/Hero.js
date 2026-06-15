import Eyebrow from './Eyebrow';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <Eyebrow className={styles.eyebrow}>Commercial Capital, Brokered with Intent</Eyebrow>

          <h1 className={styles.headline}>
            Capital that moves at the speed of your next decision.
          </h1>

          <p className={styles.subhead}>
            Carraway Capital connects established businesses with the funding to grow —
            from working capital to acquisitions, structured around how you actually operate.
          </p>

          <div className={styles.actions}>
            <a href="#qualifier" className="btn btn-primary">Start Your Qualifier</a>
            <a href="#contact" className="btn btn-ghost">Book a Call</a>
          </div>
        </div>
      </div>
    </section>
  );
}
