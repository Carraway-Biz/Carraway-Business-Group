import Eyebrow from './Eyebrow';
import styles from './WhyCarraway.module.css';

const PILLARS = [
  {
    label: 'Speed',
    headline: 'Capital decisions in days, not months.',
    body: 'We don\'t move at the pace of a community bank. When a deal is in front of you, we work on your timeline — term sheets in under two weeks on qualified transactions.',
  },
  {
    label: 'Structure',
    headline: 'Built around how you actually operate.',
    body: 'Off-the-shelf loan products are designed for the median borrower. We structure capital around your cash flow cycles, collateral position, and growth plan.',
  },
  {
    label: 'Network',
    headline: 'Access to 40+ vetted capital partners.',
    body: 'Banks, credit unions, non-bank lenders, SBA preferred partners. We maintain active relationships across the full capital stack so you don\'t have to.',
  },
];

export default function WhyCarraway() {
  return (
    <section className={styles.section} id="why">
      <div className={`container ${styles.inner}`}>

        <div className={styles.header}>
          <Eyebrow>Why Carraway</Eyebrow>
        </div>

        <div className={styles.pillars}>
          {PILLARS.map((p) => (
            <div key={p.label} className={styles.pillar}>
              <div className={styles.pillarTop}>
                <span className={styles.pillarLabel}>{p.label}</span>
                <h3 className={styles.pillarHeadline}>{p.headline}</h3>
              </div>
              <p className={styles.pillarBody}>{p.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
