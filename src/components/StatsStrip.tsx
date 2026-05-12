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
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 bg-brand-border gap-px border-y border-brand-border">
      {stats.map((stat, i) => (
        <div key={i} className="reveal bg-brand-dark py-12 px-6 text-center group">
          <div className="font-display text-4xl md:text-5xl font-extrabold text-brand-gold mb-2 group-hover:scale-110 transition-transform">
            {stat.num}
          </div>
          <div className="text-[11px] uppercase tracking-wider text-white/40 font-semibold italic">
            {stat.lbl}
          </div>
        </div>
      ))}
    </div>
  );
}
