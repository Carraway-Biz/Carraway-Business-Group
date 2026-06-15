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
              Carraway Capital was founded on a simple premise: business owners deserve
              a capital partner who works at their speed and structures solutions around
              how they actually operate — not around what a single lender happens to offer.
            </p>
            <p>
              We connect established businesses with the right capital across a vetted
              network of banks, credit unions, and non-bank lenders. Every deal is
              structured around your cash flow, your collateral, and your timeline.
            </p>
            <p>
              If your business is generating revenue and you have a clear use for
              capital, the conversation starts here.
            </p>
          </div>

          <div className={styles.actions}>
            <a href="#qualifier" className="btn btn-primary">Start Your Qualifier</a>
            <a href="#contact" className="btn btn-ghost--dark">Book a Call</a>
          </div>
        </div>

      </div>
    </section>
  );
}
