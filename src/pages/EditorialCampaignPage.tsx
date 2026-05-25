import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Sparkles, ArrowRight, ShieldCheck, Globe, Star, Zap, Award } from 'lucide-react';

interface ContentBlock {
  id: string;
  type: 'hero' | 'features' | 'rich-text' | 'image-text' | 'cta' | 'pricing' | 'bento';
  title: string;
  subtitle: string;
  body: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  iconName: string;
  layoutStyle: 'left' | 'right' | 'center' | 'grid' | 'alternate';
  bgColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: 'Inter' | 'Space Grotesk' | 'Outfit' | 'Playfair Display' | 'JetBrains Mono';
  titleSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  bodySize: 'sm' | 'md' | 'lg' | 'xl';
  featuresList: string[];
}

const DEFAULT_SEED: ContentBlock[] = [
  {
    id: 'block-1',
    type: 'hero',
    title: 'Grow Your Business Across Ghana with Premium Strategic Marketing',
    subtitle: 'NET-MARKETING GHANA — LEADERSHIP IN DIGITAL VISIBILITY',
    body: 'We build high-converting landing pages, claimed Google Maps listings, automated WhatsApp sales pipelines, and high-impact social media assets for local brands.',
    ctaText: 'Start Your Growth Today',
    ctaLink: '/#/onboarding',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Sparkles',
    layoutStyle: 'center',
    bgColor: '#101010',
    textColor: '#FFFFFF',
    accentColor: '#D2B48C',
    fontFamily: 'Space Grotesk',
    titleSize: '2xl',
    bodySize: 'lg',
    featuresList: []
  }
];

export default function EditorialCampaignPage() {
  const [blocks, setBlocks] = useState<ContentBlock[]>(DEFAULT_SEED);

  useEffect(() => {
    const handleLoad = () => {
      const saved = localStorage.getItem('nmg_editorial_data');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBlocks(parsed);
          }
        } catch (e) {
          console.error(e);
        }
      }
    };

    handleLoad();

    // Listen to changes triggered inside editor sandbox
    window.addEventListener('nmg_editorial_updated', handleLoad);
    return () => {
      window.removeEventListener('nmg_editorial_updated', handleLoad);
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-white selection:bg-brand-green selection:text-white">
      <Navbar />

      <main className="pt-24">
        {blocks.map((b, idx) => {
          const isCentered = b.layoutStyle === 'center';
          const isLeft = b.layoutStyle.includes('left');
          const isRight = b.layoutStyle === 'right';
          const isGrid = b.layoutStyle === 'grid';

          // Mapping size classes
          const titleClazz = b.titleSize === 'sm' ? 'text-xl md:text-2xl font-bold' 
            : b.titleSize === 'md' ? 'text-2xl md:text-3xl font-extrabold'
            : b.titleSize === 'lg' ? 'text-3xl md:text-4xl font-extrabold'
            : b.titleSize === 'xl' ? 'text-4xl md:text-5xl font-extrabold tracking-tight'
            : b.titleSize === '2xl' ? 'text-5xl md:text-6xl font-black tracking-tight'
            : 'text-6xl md:text-8xl font-black tracking-tighter';

          const bodyClazz = b.bodySize === 'sm' ? 'text-xs md:text-sm'
            : b.bodySize === 'md' ? 'text-sm md:text-base'
            : b.bodySize === 'lg' ? 'text-base md:text-lg font-light'
            : 'text-lg md:text-xl font-light';

          const fontTypeClass = b.fontFamily === 'Inter' ? '"Inter", ui-sans-serif, sans-serif'
            : b.fontFamily === 'Space Grotesk' ? '"Space Grotesk", sans-serif'
            : b.fontFamily === 'Outfit' ? '"Outfit", sans-serif'
            : b.fontFamily === 'Playfair Display' ? '"Playfair Display", serif'
            : '"JetBrains Mono", monospace';

          return (
            <section 
              key={b.id}
              className="px-6 py-20 md:py-32 relative overflow-hidden transition-all first-of-type:pt-28"
              style={{
                backgroundColor: b.bgColor,
                color: b.textColor,
                fontFamily: fontTypeClass
              }}
            >
              {/* Layout Pattern A: Centered Box */}
              {(isCentered || b.type === 'hero' || b.type === 'cta') && (
                <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[11px] font-extrabold tracking-[0.25em] uppercase mb-4"
                    style={{ color: b.accentColor }}
                  >
                    {b.subtitle}
                  </motion.p>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className={`leading-[1.15] mb-6 font-display ${titleClazz}`}
                  >
                    {b.title}
                  </motion.h2>

                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className={`opacity-70 max-w-2xl leading-relaxed mb-8 ${bodyClazz}`}
                  >
                    {b.body}
                  </motion.p>

                  {b.imageUrl && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="w-full max-w-3xl aspect-video rounded-3xl overflow-hidden border border-brand-border/10 mb-8 shadow-2xl"
                    >
                      <img src={b.imageUrl} alt="Dynamic Media Asset" className="w-full h-full object-cover" />
                    </motion.div>
                  )}

                  {b.ctaText && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 }}
                    >
                      <a 
                        href={b.ctaLink}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-sans font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-md"
                        style={{ backgroundColor: b.accentColor, color: b.bgColor }}
                      >
                        {b.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Layout Pattern B: Two columns alternating media */}
              {(isLeft || isRight) && (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
                  <div className={isRight ? 'order-1' : 'order-1 md:order-2'}>
                    <span className="text-[11px] font-extrabold tracking-[0.25em] uppercase mb-4 block" style={{ color: b.accentColor }}>
                      {b.subtitle}
                    </span>
                    <h2 className={`leading-[1.2] mb-6 font-display ${titleClazz}`}>
                      {b.title}
                    </h2>
                    <p className={`opacity-70 leading-relaxed mb-8 ${bodyClazz}`}>
                      {b.body}
                    </p>

                    {b.ctaText && (
                      <a 
                        href={b.ctaLink}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-sans font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-md"
                        style={{ backgroundColor: b.accentColor, color: b.bgColor }}
                      >
                        {b.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className={isRight ? 'order-2' : 'order-2 md:order-1'}>
                    {b.imageUrl ? (
                      <div className="rounded-3xl overflow-hidden shadow-2xl border border-brand-border/15 max-h-[420px]">
                        <img src={b.imageUrl} alt="Editorial Grid representation" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="aspect-video bg-white/5 border border-dashed border-white/20 rounded-3xl flex items-center justify-center">
                        <span className="text-xs opacity-40">No preview image configured</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Layout Pattern C: Grid details block */}
              {isGrid && (
                <div className="max-w-7xl mx-auto relative z-10">
                  <div className="max-w-2xl mb-16">
                    <span className="text-[11px] font-extrabold tracking-[0.25em] uppercase mb-4 block" style={{ color: b.accentColor }}>
                      {b.subtitle}
                    </span>
                    <h2 className={`leading-[1.2] mb-4 font-display ${titleClazz}`}>
                      {b.title}
                    </h2>
                    <p className="opacity-70 text-sm font-light leading-relaxed">{b.body}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {b.featuresList?.map((feature, fIdx) => (
                      <div key={fIdx} className="p-6 rounded-3xl bg-white/5 border border-white/10 flex gap-4 items-start hover:bg-white/[0.08] transition-all">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white/10 text-xs">
                          ✦
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-relaxed">{feature}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {b.ctaText && (
                    <div className="mt-12 text-center md:text-left">
                      <a 
                        href={b.ctaLink}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-sans font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-md"
                        style={{ backgroundColor: b.accentColor, color: b.bgColor }}
                      >
                        {b.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}
