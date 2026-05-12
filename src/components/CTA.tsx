import { useReveal } from '../hooks/useReveal';
import { MessageCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA() {
  const containerRef = useReveal();

  return (
    <section className="bg-[#006C35] px-6 py-24 md:py-32 text-center text-white">
      <div ref={containerRef} className="reveal max-w-4xl mx-auto">
        <h2 className="font-display text-white text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight mb-8">
          Ready to grow your business<br />
          online?
        </h2>
        <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
          Talk to us today. No pressure, no jargon — just a real conversation<br className="hidden md:block" />
          about what NMG can do for you.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a 
            href="https://wa.me/233268786647" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white text-brand-black px-8 py-4 rounded-full font-sans font-medium text-base hover:scale-105 transition-all"
          >
            📲 Message us on WhatsApp
          </a>
          
          <a 
            href="mailto:netmarkgh@gmail.com"
            className="flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-sans font-medium text-base hover:bg-white/10 transition-all"
          >
            Email us instead
          </a>
        </div>
      </div>
    </section>
  );
}
