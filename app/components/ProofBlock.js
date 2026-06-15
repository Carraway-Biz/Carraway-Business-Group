import CountUp from './CountUp';
import styles from './ProofBlock.module.css';

const STATS = [
  { num: 500,  suffix: 'M+', label: 'Capital Structured',       note: 'across our lender network' },
  { num: 200,  suffix: '+',  label: 'Businesses Funded',        note: 'across industries and stages' },
  { num: 40,   suffix: '+',  label: 'Lender Relationships',     note: 'vetted capital partners' },
  { num: 14,   suffix: '',   label: 'Days to Term Sheet',        note: 'average, qualified deals' },
];

export default function ProofBlock() {
  return (
    <section className={styles.section} id="proof">
      <div className={`container ${styles.inner}`}>

        <div className={styles.grid}>
          {STATS.map((s, i) => (
            <div key={i} className={styles.stat}>
              <div className={styles.number}>
                <CountUp end={s.num} suffix={s.suffix} />
              </div>
              <div className={styles.labelGroup}>
                <span className={styles.label}>{s.label}</span>
                <span className={styles.note}>{s.note}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
