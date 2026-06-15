// Phase 3 preview — header + hero only, for design sign-off.
// ?nav=a → transparent nav, shadow on scroll (Option A)
// ?nav=b → Sand nav, dark text (Option B)
// Default: Option A
import SiteHeader from '../components/SiteHeader';
import Hero from '../components/Hero';

export default async function PreviewPage({ searchParams }) {
  const params = await searchParams;
  const variant = params?.nav === 'b' ? 'b' : 'a';

  return (
    <>
      <SiteHeader variant={variant} />
      <main>
        <Hero variant={variant} />
      </main>
    </>
  );
}
