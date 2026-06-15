import CountUp from './CountUp';
import styles from './ProofBlock.module.css';

// Capability framing — every value is true today, no track-record claims.
// `num` set → animated counter; `word` set → static mono word at the same scale.
const STATS = [
  { word: 'Tailored',           label: 'Funding Structure',   note: 'sized to your deal, not a fixed range' },
  { num: 6,        suffix: '',  label: 'Funding Types',       note: 'working capital to real estate' },
  { num: 40,       suffix: '+', label: 'Lender Relationships', note: 'vetted capital partners' },
  { word: 'Days',               label: 'To Term Sheet',       note: 'on qualified deals, not months' },
];

export default function ProofBlock() {
  return (
    <section className={styles.section} id="proof">
      <div className={`container ${styles.inner}`}>

        <div className={styles.grid}>
          {STATS.map((s, i) => (
            <div key={i} className={styles.stat}>
              <div className={`${styles.number} ${s.word ? styles.numberWord : ''}`}>
                {s.word ? s.word : <CountUp end={s.num} suffix={s.suffix} />}
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
