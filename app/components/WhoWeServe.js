import Eyebrow from './Eyebrow';
import styles from './WhoWeServe.module.css';

const INDUSTRIES = [
  'Manufacturing & Distribution',
  'Healthcare Practices',
  'Professional Services',
  'Franchise Operations',
  'Construction & Trades',
  'Transportation & Logistics',
  'Business Acquisitions',
  'Wholesale & Retail',
];

const CRITERIA = [
  { label: 'Time in Business', value: 'Operating history, any stage' },
  { label: 'Annual Revenue',   value: 'Generating consistent revenue' },
  { label: 'Funding Range',    value: 'Tailored to your deal — no fixed minimum' },
  { label: 'Credit Profile',   value: 'A range of profiles considered' },
];

export default function WhoWeServe() {
  return (
    <section className={styles.section} id="who">
      <div className={`container ${styles.inner}`}>

        <div className={styles.left}>
          <Eyebrow>Who We Serve</Eyebrow>
          <h2 className={styles.headline}>
            Established businesses at an inflection point.
          </h2>
          <p className={styles.body}>
            We work with owners who have built something real and need
            capital structured to match — not a generic loan product
            designed for the median borrower.
          </p>

          <div className={styles.industries}>
            {INDUSTRIES.map((ind) => (
              <span key={ind} className={styles.industryTag}>{ind}</span>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.criteriaLabel}>Qualifier criteria</div>
          <div className={styles.criteria}>
            {CRITERIA.map((c) => (
              <div key={c.label} className={styles.criterionRow}>
                <span className={styles.criterionLabel}>{c.label}</span>
                <span className={styles.criterionValue}>{c.value}</span>
              </div>
            ))}
          </div>
          <div className={styles.cta}>
            <a href="#contact" className="btn btn-primary">Check Your Eligibility</a>
          </div>
        </div>

      </div>
    </section>
  );
}
