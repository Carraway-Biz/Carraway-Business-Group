import Link from 'next/link';
import Eyebrow from './Eyebrow';
import styles from './Solutions.module.css';

const PRODUCTS = [
  {
    name: 'Working Capital',
    slug: 'working-capital',
    tag: 'Lines of credit · Merchant advances · Invoice factoring',
    desc: 'Flexible, recurring capital for businesses that move fast — cover payroll, inventory, or seasonal gaps without disrupting operations.',
  },
  {
    name: 'Equipment Financing',
    slug: 'equipment-financing',
    tag: 'Machinery · Vehicles · Technology · Medical',
    desc: "Finance the assets that drive production without tying up working capital. We structure terms around the equipment's useful life.",
  },
  {
    name: 'SBA Loans',
    slug: 'sba-loans',
    tag: '7(a) · 504 · Express',
    desc: 'Government-backed programs with favorable rates and extended terms — structured for acquisitions, real estate, and long-horizon growth.',
  },
  {
    name: 'Acquisition Financing',
    slug: 'acquisition-financing',
    tag: 'Business purchase · Partner buyout · Roll-up',
    desc: 'Capitalize on the deal in front of you. We structure the capital stack across multiple lender relationships to get you to close.',
  },
  {
    name: 'Bridge Capital',
    slug: 'bridge-capital',
    tag: 'Short-term · Transaction-specific',
    desc: 'When timing is the constraint, bridge financing holds your position while permanent capital is arranged or a deal reaches its next stage.',
  },
  {
    name: 'Commercial Real Estate',
    slug: 'commercial-real-estate',
    tag: 'Owner-occupied · Investment · Construction',
    desc: 'From owner-occupied facilities to income-producing assets, we connect commercial borrowers with the right lender for the asset class.',
  },
];

export default function Solutions() {
  return (
    <section className={styles.section} id="solutions">
      <div className={`container ${styles.inner}`}>

        <div className={styles.header}>
          <Eyebrow>Funding Solutions</Eyebrow>
          <h2 className={styles.headline}>
            Every stage of growth has a structure.
          </h2>
        </div>

        <div className={styles.rule} aria-hidden="true" />

        <div className={styles.grid}>
          {PRODUCTS.map((p) => (
            <Link
              key={p.name}
              href={`/solutions/${p.slug}`}
              className={styles.card}
              aria-label={`${p.name} — learn more`}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardTag}>{p.tag}</span>
                <h3 className={styles.cardName}>{p.name}</h3>
              </div>
              <p className={styles.cardDesc}>{p.desc}</p>
              <span className={styles.cardArrow} aria-hidden="true">→</span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
