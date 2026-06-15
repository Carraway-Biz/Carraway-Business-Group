// Phase 3 preview — header + hero only, for design sign-off.
// 2026 institutional direction: near-black hero, transparent→solid nav,
// pure typography. Lives at /preview so production and forms stay untouched.
import SiteHeader from '../components/SiteHeader';
import Hero from '../components/Hero';

export default function PreviewPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
      </main>
    </>
  );
}
