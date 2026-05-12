import { useReveal } from '../hooks/useReveal';
import { MessageCircle, FileText } from 'lucide-react';

export default function CTA() {
  const containerRef = useReveal();

  return (
    <section className="bg-brand-black px-6 py-24 md:py-40 text-center">
      <div ref={containerRef} className="reveal max-w-2xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
          Ready to grow<br />
          <span className="text-brand-gold">your business?</span>
        </h2>
        <p className="text-white/50 text-base md:text-lg leading-relaxed mb-12">
          Tell us where your business is. We'll tell you exactly what to fix, build, and scale. No fluff. No generic packages.
        </p>

        <div className="flex flex-col items-center gap-6">
          <a 
            href="https://wa.me/233268786647" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-[#25D366] text-white px-8 md:px-10 py-5 rounded-full font-display font-bold text-lg hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#25D366]/30 transition-all"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            Start on WhatsApp — It's Free
          </a>
          
          <a 
            href="/NMG_Client_Onboarding_Form_v2.html" 
            className="inline-flex items-center gap-2 border border-brand-gold/30 text-brand-gold px-8 py-3 rounded-full font-display font-bold text-sm tracking-wide bg-transparent hover:bg-brand-gold/5 transition-all"
          >
            <FileText className="w-4 h-4" />
            Or fill in our onboarding form →
          </a>
        </div>
        
        <p className="mt-8 text-xs text-white/30 font-medium tracking-wide">
          We typically respond within a few hours · Based in Accra, Ghana
        </p>
      </div>
    </section>
  );
}
