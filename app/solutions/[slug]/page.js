import { notFound } from 'next/navigation';
import SiteHeader from '../../components/SiteHeader';
import Footer from '../../components/Footer';
import FinalCTA from '../../components/FinalCTA';
import Eyebrow from '../../components/Eyebrow';
import { PRODUCTS, PRODUCT_SLUGS } from '../products';
import styles from './product.module.css';

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = PRODUCTS[slug];
  if (!product) return {};
  return {
    title: `${product.name} — Carraway Capital`,
    description: product.position,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = PRODUCTS[slug];
  if (!product) notFound();

  return (
    <>
      <SiteHeader />
      <main>

        {/* Hero band — dark */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <Eyebrow className={styles.heroEyebrow}>Funding Solutions</Eyebrow>
            <h1 className={styles.heroTitle}>{product.name}</h1>
            <p className={styles.heroPosition}>{product.position}</p>
          </div>
        </section>

        {/* Body — light */}
        <section className={styles.body}>
          <div className={`container ${styles.bodyInner}`}>

            <div className={styles.prose}>
              {product.body.map((block) => (
                <div key={block.h} className={styles.block}>
                  <h2 className={styles.blockH}>{block.h}</h2>
                  <p className={styles.blockP}>{block.p}</p>
                </div>
              ))}
            </div>

            <aside className={styles.aside}>
              <Eyebrow className={styles.asideEyebrow}>Best fit if…</Eyebrow>
              <ul className={styles.fitList}>
                {product.bestFit.map((item, i) => (
                  <li key={i} className={styles.fitItem}>
                    <span className={styles.fitMark} aria-hidden="true">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>

          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
