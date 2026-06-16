import SiteHeader from './components/SiteHeader';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import ProofBlock from './components/ProofBlock';
import WhoWeServe from './components/WhoWeServe';
import Process from './components/Process';
import WhyCarraway from './components/WhyCarraway';
import About from './components/About';
import ContactSection from './components/ContactSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function HomePage() {
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
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
