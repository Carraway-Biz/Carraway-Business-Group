import Image from 'next/image';
import Eyebrow from './Eyebrow';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className={`container ${styles.inner}`}>

        <div className={styles.imageWrap}>
          <Image
            src="/Bcarraway.jpg"
            alt="Ben Carraway"
            fill
            className={styles.image}
            sizes="(max-width: 860px) 100vw, 45vw"
          />
        </div>

        <div className={styles.content}>
          <Eyebrow>About</Eyebrow>

          <h2 className={styles.headline}>
            Ben Carraway
          </h2>

          <p className={styles.subline}>Commercial Capital Broker</p>

          <div className={styles.rule} aria-hidden="true" />

          <div className={styles.body}>
            <p>
              Ben Carraway founded Carraway Capital after a career spent inside the
              numbers — as an FP&amp;A analyst building the board-level models and
              forecasts that guide real operating decisions. He holds an MBA in Global
              Management from the Thunderbird School of Global Management and started
              his path as an entrepreneur, building and running his own ventures. That
              combination — the rigor of finance and the instincts of an operator — is
              the lens he brings to every deal. He reads a P&amp;L the way you live it,
              and treats your next move like it&apos;s his own.
            </p>
            <p>
              Carraway Capital was founded on a simple premise: business owners deserve
              a capital partner who works at their speed and structures solutions around
              how they actually operate — not around what a single lender happens to offer.
              We connect established businesses with the right capital across a vetted
              network of banks, credit unions, and non-bank lenders, with every deal
              structured around your cash flow, your collateral, and your timeline.
            </p>
            <p>
              If your business is generating revenue and you have a clear use for
              capital, the conversation starts here.
            </p>
          </div>

          <div className={styles.actions}>
            <a href="#contact" className="btn btn-primary">Start Your Qualifier</a>
            <a href="https://cal.com/carrawaycapital/discovery-call" target="_blank" rel="noopener noreferrer" className="btn btn-ghost--dark">Book a Call</a>
          </div>
        </div>

      </div>
    </section>
  );
}
