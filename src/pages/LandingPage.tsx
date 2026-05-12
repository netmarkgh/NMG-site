import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProblemStrip from '../components/ProblemStrip';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import WhoFor from '../components/WhoFor';
import SocialProof from '../components/SocialProof';
import Packages from '../components/Packages';
import WhyNMG from '../components/WhyNMG';
import NMGConnect from '../components/NMGConnect';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-white selection:bg-brand-green selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ProblemStrip />
        <Services />
        <HowItWorks />
        <WhoFor />
        <SocialProof />
        <Packages />
        <WhyNMG />
        <NMGConnect />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
