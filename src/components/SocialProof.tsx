import { useReveal } from '../hooks/useReveal';

const clients = [
  { biz: 'Glow Cosmetics', type: 'Beauty · Social Media' },
  { biz: 'Evag Enterprise', type: 'Construction · GBP + Social' },
  { biz: 'Prime Zone', type: 'Spa · GBP + Social' },
  { biz: 'Mabsnaturals', type: 'Beauty · Social Media' },
  { biz: 'J\'s Gourmet & More', type: 'Food · GBP + Community' },
  { biz: 'Zara Organic Skincare', type: 'Beauty · Google Maps' },
  { biz: 'Gillionaires Touch', type: 'Beauty · GBP + Community' },
  { biz: 'Plantarium Garden Centre', type: 'Retail · Google Maps' },
];

export default function SocialProof() {
  const containerRef = useReveal();

  return (
    <section id="our-clients" className="bg-brand-dark px-6 py-24 md:py-32">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="reveal text-brand-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            Who We Work With
          </p>
          <h2 className="reveal font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            Real businesses.<br />
            <span className="text-brand-gold">Real results.</span>
          </h2>
          <p className="reveal text-white/50 text-base md:text-lg leading-relaxed">
            From beauty brands to construction firms — NMG has helped businesses across Accra and beyond grow their digital presence.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {clients.map((c, i) => (
            <div 
              key={i} 
              className="bg-brand-card border border-brand-border p-6 rounded-2xl hover:border-brand-gold/30 hover:-translate-y-1 transition-all group"
            >
              <div className="w-2 h-2 bg-brand-green rounded-full mb-4 animate-pulse" />
              <div className="font-display font-bold text-base mb-1 group-hover:text-brand-gold transition-colors">
                {c.biz}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-white/40 font-semibold italic">
                {c.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
