import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 pt-32 pb-20 overflow-hidden">
      <div className="hero-bg absolute inset-0 z-0" />
      <div className="hero-grid absolute inset-0 z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-brand-green-pale border border-brand-green/10 text-brand-green text-xs font-medium tracking-wider px-3.5 py-1.5 rounded-full mb-8 font-sans"
        >
          <span className="w-1.5 h-1.5 bg-brand-green rounded-full" />
          Digital Marketing · Accra, Ghana
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-[clamp(2.5rem,7vw,4.8rem)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-6 text-brand-black"
        >
          We Grow<br />
          <span className="text-brand-green italic relative inline-block">
            Ghanaian Businesses.
            <span className="absolute bottom-1 left-0 right-0 h-1 bg-brand-green/20 rounded-full" />
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-brand-grey text-lg md:text-xl font-light leading-relaxed max-w-xl mb-10"
        >
          SEO, social media, WhatsApp funnels and map visibility — built specifically for SMEs and growing brands in Ghana.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <a 
            href="https://wa.me/233268786647" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-brand-green text-white px-8 py-4 rounded-full font-sans font-medium text-base hover:bg-brand-green-light hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-green/20 transition-all"
          >
            Chat With Us on WhatsApp
          </a>
          <a 
            href="#services" 
            className="inline-flex items-center gap-2 border border-black/20 text-brand-black px-8 py-4 rounded-full font-sans font-medium text-base hover:border-black/40 hover:-translate-y-1 transition-all"
          >
            Our Services →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
