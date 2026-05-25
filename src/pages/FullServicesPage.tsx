import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Packages from '../components/Packages';
import HowItWorks from '../components/HowItWorks';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { useReveal } from '../hooks/useReveal';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Zap } from 'lucide-react';

export default function FullServicesPage() {
  const containerRef = useReveal();

  return (
    <div className="min-h-screen bg-brand-white selection:bg-brand-green selection:text-white">
      <Navbar />
      
      {/* Services Page Sub-Hero */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 bg-brand-black text-white overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full filter blur-[100px] -z-10" />
        <div className="absolute -bottom-20 left-10 w-80 h-80 bg-brand-gold/5 rounded-full filter blur-[80px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-brand-gold text-[11px] font-bold tracking-[0.25em] uppercase mb-4">
              Premium Solutions
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
              Full-Suite Digital <span className="text-brand-gold">Growth Systems</span>
            </h1>
            <p className="text-white/60 text-base md:text-xl leading-relaxed mb-8 font-light">
              We do not sell standard templates or loose services. We design, launch, and manage fully custom growth systems that put your business in front of customers where they search and buy.
            </p>
          </motion.div>

          <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 border-t border-white/10 pt-16">
            <div className="reveal flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base mb-1">Guaranteed Quality</h3>
                <p className="text-white/40 text-[13px] leading-relaxed">No cutting corners. Every line of code, social media design, and funnels flow is built to world-class standards.</p>
              </div>
            </div>
            
            <div className="reveal flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base mb-1">Local Focus</h3>
                <p className="text-white/40 text-[13px] leading-relaxed">Tailored specifically for local Ghanaian business dynamics. We understand the local consumer journey.</p>
              </div>
            </div>

            <div className="reveal flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-white/80" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base mb-1">High Performance</h3>
                <p className="text-white/40 text-[13px] leading-relaxed">We optimize for speed, discoverability, and clean UI flow. No lag, no friction—only results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* Core services list */}
        <Services />

        {/* Custom Price Packages */}
        <Packages />

        {/* How onboarding works */}
        <HowItWorks />

        {/* Lead action box */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
