import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center px-6 pt-24 md:pt-32 pb-20 overflow-hidden bg-brand-black">
      <div className="hero-bg absolute inset-0 z-0 opacity-40" />
      <div className="hero-grid absolute inset-0 z-0 opacity-10" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-medium tracking-wider px-3.5 py-1.5 rounded-full mb-8 font-sans"
        >
          <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse" />
          Digital Marketing Agency · Accra, Ghana
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1] tracking-[-0.04em] mb-8"
        >
          <span className="text-white block mb-2">We Grow</span>
          <span className="text-brand-gold italic block">
            Ghanaian Businesses.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-12"
        >
          SEO, social media, WhatsApp funnels and map visibility — built specifically for SMEs and growing brands in Ghana.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-5"
        >
          <a 
            href="https://wa.me/233268786647" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-brand-gold text-brand-black px-8 py-4 rounded-full font-sans font-bold text-base hover:bg-white hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-gold/20 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Chat With Us on WhatsApp
          </a>
          <a 
            href="#services" 
            className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full font-sans font-medium text-base hover:bg-white/5 hover:border-white/40 hover:-translate-y-1 transition-all"
          >
            Our Services →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
