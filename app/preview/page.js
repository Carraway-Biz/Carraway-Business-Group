// Phase 3 preview — header + hero only, for design sign-off.
// Lives at /preview so the production homepage and forms stay untouched
// until the full redesign is approved and promoted to "/".
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
