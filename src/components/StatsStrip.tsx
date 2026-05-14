import { useReveal } from '../hooks/useReveal';

export default function StatsStrip() {
  const containerRef = useReveal();

  const stats = [
    { num: '500+', lbl: 'Businesses in NMG Connect' },
    { num: '38+', lbl: 'Google Maps Clients Active' },
    { num: '18', lbl: 'Industries Served' },
    { num: 'GH', lbl: 'Proudly Ghana-Based' },
  ];

  return (
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 bg-white/5 gap-px border-y border-white/10">
      {stats.map((stat, i) => (
        <div key={i} className="reveal bg-brand-black py-12 px-6 text-center group">
          <div className="font-display text-4xl md:text-5xl font-extrabold text-brand-gold mb-3 group-hover:scale-110 transition-transform">
            {stat.num}
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
            {stat.lbl}
          </div>
        </div>
      ))}
    </div>
  );
}
