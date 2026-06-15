import Eyebrow from './Eyebrow';
import styles from './Process.module.css';

const STEPS = [
  {
    num: '01',
    name: 'Qualify',
    desc: 'A 6-question qualifier scopes your situation — business type, revenue, funding need, timeline. Takes three minutes. No credit pull.',
  },
  {
    num: '02',
    name: 'Structure',
    desc: 'We map your deal across our lender network and identify the capital structure that fits your business model — not just your credit score.',
  },
  {
    num: '03',
    name: 'Execute',
    desc: 'We manage the lender relationship from term sheet to close. You run your business. We handle the capital stack.',
  },
];

export default function Process() {
  return (
    <section className={styles.section} id="process">
      <div className={`container ${styles.inner}`}>

        <div className={styles.header}>
          <Eyebrow>How It Works</Eyebrow>
          <h2 className={styles.headline}>
            Three steps from conversation to capital.
          </h2>
        </div>

        <div className={styles.steps}>
          {STEPS.map((s) => (
            <div key={s.num} className={styles.step}>
              <div className={styles.stepNum}>{s.num}</div>
              <div className={styles.stepRule} aria-hidden="true" />
              <h3 className={styles.stepName}>{s.name}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
