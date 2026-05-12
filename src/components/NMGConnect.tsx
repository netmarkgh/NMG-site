import { useReveal } from '../hooks/useReveal';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  { name: 'Beauty & Health', count: 23 },
  { name: 'Fashion & Clothing', count: 19 },
  { name: 'Retail', count: 17 },
  { name: 'Food & Beverage', count: 14 },
  { name: 'Services', count: 3 },
  { name: 'Photography & Creative', count: 3 },
  { name: 'Events', count: 2 },
  { name: 'Tech & Electronics', count: 1 },
  { name: 'Construction & Real Estate', count: 1 },
];

export default function NMGConnect() {
  const containerRef = useReveal();

  return (
    <section className="bg-gradient-to-br from-[#0f1a0f] to-brand-black px-6 py-24 md:py-32 border-y border-brand-border">
      <div ref={containerRef} className="reveal max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-brand-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            NMG Connect
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            Ghana's business<br />
            growth <span className="text-brand-green">ecosystem.</span>
          </h2>
          <p className="text-white/40 text-sm md:text-base leading-relaxed mb-10 max-w-md">
            NMG Connect is our community of Ghanaian businesses growing together — referrals, visibility and shared resources across 9 industries.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '500+', label: 'Member businesses' },
              { num: '18', label: 'Industries' },
              { num: 'GH', label: 'Accra-based' },
              { num: <ArrowUpRight className="w-6 h-6" />, label: 'Growing monthly' },
            ].map((stat, i) => (
              <div key={i} className="bg-brand-green/5 border border-brand-green/15 rounded-2xl p-5 md:p-6 group hover:bg-brand-green/10 transition-colors">
                <div className="font-display text-2xl md:text-3xl font-extrabold text-brand-green mb-1">
                  {stat.num}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white/30 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {categories.map((cat, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between bg-brand-card border border-brand-border rounded-full py-2.5 px-6 hover:border-brand-green/30 hover:translate-x-2 transition-all group"
            >
              <span className="text-sm md:text-base font-medium text-white/80">{cat.name}</span>
              <span className="bg-brand-green/10 text-brand-green text-[10px] font-bold px-2.5 py-1 rounded-full group-hover:bg-brand-green group-hover:text-brand-black transition-all">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
