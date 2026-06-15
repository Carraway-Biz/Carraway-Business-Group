// Phase 3 preview — full page, design sign-off before promoting to "/".
// Production homepage and all API routes remain untouched.
import SiteHeader from '../components/SiteHeader';
import Hero from '../components/Hero';
import Solutions from '../components/Solutions';
import ProofBlock from '../components/ProofBlock';
import WhoWeServe from '../components/WhoWeServe';
import Process from '../components/Process';
import WhyCarraway from '../components/WhyCarraway';
import About from '../components/About';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function PreviewPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Solutions />
        <ProofBlock />
        <WhoWeServe />
        <Process />
        <WhyCarraway />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
