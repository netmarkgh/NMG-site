import Navbar from '../components/Navbar';
import SocialProof from '../components/SocialProof';
import NMGConnect from '../components/NMGConnect';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { useReveal } from '../hooks/useReveal';
import { motion } from 'motion/react';
import { Star, MessageSquare, TrendingUp, Sparkles, Building2, Store } from 'lucide-react';

const caseStudies = [
  {
    logo: "💄",
    title: "Glow Cosmetics",
    industry: "Beauty & Wellness",
    metricValue: "+150%",
    metricLabel: "Sales Growth",
    challenge: "High social media following but struggled with converting followers to paying customers via WhatsApp.",
    solution: "Structured a seamless WhatsApp Sales Funnel and simplified checkout templates.",
    impact: "Created an automated flow where customer inquiries are immediately routed, resulting in 420+ new leads in 30 days."
  },
  {
    logo: "🌿",
    title: "Zara Organic Skincare",
    industry: "E-Commerce",
    metricValue: "40+/day",
    metricLabel: "Google Map Views",
    challenge: "Struggled with local organic discovery and wanted to claim Accra search market shares.",
    solution: "Fully optimized search tags, local descriptions, and reviews building loop on Google Maps.",
    impact: "Secured #1 Map Pack positioning for organic skincare keywords, yielding 80+ phone calls monthly."
  },
  {
    logo: "🏗️",
    title: "Evag Enterprise",
    industry: "Construction",
    metricValue: "Rank #1",
    metricLabel: "Local Search",
    challenge: "High contract values but struggled with establishing digital trust and professional presence.",
    solution: "Deployed a clean, modern web portfolio paired with synchronized local SEO listings.",
    impact: "Ranked as a top construction partner in Accra, opening doors to high-value project inquiries online."
  },
  {
    logo: "🌱",
    title: "Plantarium Garden Centre",
    industry: "Retail & Landscaping",
    metricValue: "250+",
    metricLabel: "Digital Leads",
    challenge: "Relying purely on physical drop-ins along major highways and wanted consistent online pre-orders.",
    solution: "Created highly visual Instagram posting schedules merged with a local search landing page.",
    impact: "Generated automated customer quote requests and established pre-orders for premium flower pots."
  }
];

export default function OurClientsPage() {
  const containerRef = useReveal();

  return (
    <div className="min-h-screen bg-brand-white selection:bg-brand-green selection:text-white">
      <Navbar />
      
      {/* Clients Hero Banner */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 bg-brand-black text-white overflow-hidden">
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
              Our Success Stories
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
              Ambitious Brands, <span className="text-brand-green">Real Digital Results</span>
            </h1>
            <p className="text-white/60 text-base md:text-xl leading-relaxed mb-8 font-light">
              From fast-growing beauty boutiques in East Legon to architectural consultancies working across West Africa, NMG is proud to be the growth catalyst behind leading local brands.
            </p>
          </motion.div>

          <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 border-t border-white/10 pt-16">
            <div className="reveal text-center md:text-left">
              <div className="font-display text-4xl md:text-5xl font-extrabold text-brand-green mb-2">500+</div>
              <div className="text-[11px] uppercase tracking-widest text-white/40 font-bold">Successful Onboardings</div>
            </div>
            <div className="reveal text-center md:text-left">
              <div className="font-display text-4xl md:text-5xl font-extrabold text-brand-gold mb-2">9+</div>
              <div className="text-[11px] uppercase tracking-widest text-white/40 font-bold">Business Sectors</div>
            </div>
            <div className="reveal text-center md:text-left">
              <div className="font-display text-4xl md:text-5xl font-extrabold text-white mb-2">99%</div>
              <div className="text-[11px] uppercase tracking-widest text-white/40 font-bold">Accra Search Domination</div>
            </div>
            <div className="reveal text-center md:text-left">
              <div className="font-display text-4xl md:text-5xl font-extrabold text-brand-green mb-2">GH</div>
              <div className="text-[11px] uppercase tracking-widest text-white/40 font-bold">Pride of Ghana</div>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* Core social proof client section */}
        <SocialProof />

        {/* Brand new, premium Case Studies Showcase */}
        <section className="bg-brand-white px-6 py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-16">
              <p className="text-brand-green text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
                Excellence in Action
              </p>
              <h2 className="font-display text-brand-black text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                How we deliver organic revenue
              </h2>
              <p className="text-brand-grey text-base leading-relaxed">
                Take a look under the hood. Here is how four ambitious Ghanaian business models partner with NMG to establish digital powerhouses:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((cs, i) => (
                <div 
                  key={i} 
                  className="bg-brand-white border border-brand-border/80 rounded-3xl p-8 hover:shadow-xl transition-all hover:border-brand-green/30 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{cs.logo}</span>
                        <div>
                          <h3 className="font-display font-bold text-brand-black text-lg">{cs.title}</h3>
                          <span className="text-[11px] uppercase text-brand-grey font-semibold tracking-wider">{cs.industry}</span>
                        </div>
                      </div>
                      <div className="bg-brand-green/5 border border-brand-green/15 rounded-xl px-4 py-2 text-right">
                        <div className="font-display font-extrabold text-[#006C35] text-lg leading-none">{cs.metricValue}</div>
                        <span className="text-[9px] text-[#006C35]/70 font-bold uppercase tracking-wider">{cs.metricLabel}</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm text-brand-grey leading-relaxed">
                      <div>
                        <strong className="text-brand-black block text-xs uppercase tracking-wider mb-1">🚨 Challenge</strong>
                        <p className="font-light">{cs.challenge}</p>
                      </div>
                      <div>
                        <strong className="text-brand-black block text-xs uppercase tracking-wider mb-1">🛠️ NMG Intervention</strong>
                        <p className="font-light">{cs.solution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-brand-border flex items-start gap-3 bg-brand-green-pale/30 p-4 rounded-2xl">
                    <Sparkles className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#006C35] text-xs font-bold uppercase tracking-wide">Key Impact</strong>
                      <p className="text-brand-black font-medium text-[13px] leading-relaxed mt-0.5">{cs.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NMG Connect Ecosystem grid */}
        <NMGConnect />

        {/* Action capture bar */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
