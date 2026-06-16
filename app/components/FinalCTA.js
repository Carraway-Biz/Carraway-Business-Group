import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  return (
    <section className={styles.section} id="contact">
      <div className={`container ${styles.inner}`}>

        <div className={styles.top}>
          <h2 className={styles.headline}>
            The right capital structure starts with one conversation.
          </h2>
        </div>

        <div className={styles.rule} aria-hidden="true" />

        <div className={styles.bottom}>
          <p className={styles.sub}>
            Tell us about your business and what you're trying to accomplish.
            We'll tell you where you fit across our lender network — and whether
            we're the right partner for this deal.
          </p>
          <div className={styles.actions}>
            <a href="#contact" className="btn btn-primary">Start Your Qualifier</a>
            <a href="mailto:ben@gocarraway.com" className="btn btn-ghost">Send a Direct Email</a>
          </div>
        </div>

      </div>
    </section>
  );
}
