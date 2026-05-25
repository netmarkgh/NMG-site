import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsStrip from '../components/StatsStrip';
import ProblemStrip from '../components/ProblemStrip';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import WhoFor from '../components/WhoFor';
import WhyNMG from '../components/WhyNMG';
import NMGConnect from '../components/NMGConnect';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-white selection:bg-brand-green selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <ProblemStrip />
        
        {/* Services Section with custom explorer CTA */}
        <Services />
        <section className="bg-brand-black px-6 pb-24 md:pb-32 border-b border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-white/[0.03] border border-white/10 rounded-3xl max-w-4xl mx-auto">
              <div className="text-left">
                <h4 className="font-display font-bold text-white text-lg mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-gold" /> Complete Service Catalog Available
                </h4>
                <p className="text-white/50 text-[13px]">Explore comprehensive deliverables, individual setup strategies, and transparent service packages.</p>
              </div>
              <Link 
                to="/services" 
                className="flex items-center gap-2 bg-brand-gold text-brand-black px-6 py-3.5 rounded-full font-sans font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-md whitespace-nowrap"
              >
                View Packages & Deliverables <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <HowItWorks />
        
        {/* Who we serve with custom Client success story router */}
        <WhoFor />
        <section className="bg-brand-white px-6 pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-[#F0F7F3] border border-brand-green/20 rounded-3xl max-w-4xl mx-auto">
              <div className="text-left">
                <h4 className="font-display font-bold text-brand-black text-lg mb-1 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-brand-green" /> Partner with Ghana's Top Local Brands
                </h4>
                <p className="text-brand-grey text-[13px]">See how boutique beauty salons, real estate surveyors, and retail shops thrive on Google Maps.</p>
              </div>
              <Link 
                to="/clients" 
                className="flex items-center gap-2 bg-brand-green text-white px-6 py-3.5 rounded-full font-sans font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-md whitespace-nowrap"
              >
                Read Client Success Stories <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <WhyNMG />
        <NMGConnect />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
