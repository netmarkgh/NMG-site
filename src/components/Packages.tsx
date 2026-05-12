import { useReveal } from '../hooks/useReveal';
import { Check } from 'lucide-react';

const packages = [
  {
    name: 'Starter',
    sub: 'Get found on Google Maps',
    items: [
      'Google Business Profile setup & verification',
      'Full optimisation (photos, hours, categories)',
      'Monthly GBP performance report',
      'WhatsApp support'
    ],
    featured: false
  },
  {
    name: 'Growth',
    sub: 'Maps + Social Media Management',
    badge: 'Most Popular',
    items: [
      'Everything in Starter',
      'Social media content & posting (3x/week)',
      'Caption writing & visual design',
      'Monthly analytics report',
      'WhatsApp sales funnel setup'
    ],
    featured: true
  },
  {
    name: 'Scale',
    sub: 'Full digital marketing partner',
    items: [
      'Everything in Growth',
      'Lead generation campaigns',
      'Website or landing page',
      'NMG Connect membership',
      'Monthly strategy session'
    ],
    featured: false
  }
];

export default function Packages() {
  const containerRef = useReveal();

  return (
    <section id="packages" className="bg-[#F0F7F3] px-6 py-24 md:py-32">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16 text-center mx-auto">
          <p className="reveal text-brand-green text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            Service Packages
          </p>
          <h2 className="reveal font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            Clear, honest pricing structures
          </h2>
          <p className="reveal text-brand-grey text-base md:text-lg leading-relaxed">
            Choose what fits your stage. Every package includes direct access to your account manager.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 items-stretch">
          {packages.map((pkg, i) => (
            <div 
              key={i} 
              className={`reveal relative p-8 md:p-10 rounded-3xl border transition-all ${
                pkg.featured 
                  ? 'bg-brand-green text-brand-white border-brand-green shadow-2xl shadow-brand-green/20 scale-105 z-10' 
                  : 'bg-brand-white text-brand-black border-brand-border hover:shadow-xl'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-gold text-white text-[10px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full whitespace-nowrap">
                  {pkg.badge}
                </div>
              )}
              <h3 className="font-display text-2xl font-extrabold mb-1">
                {pkg.name}
              </h3>
              <p className={`text-xs mb-8 ${pkg.featured ? 'text-white/60' : 'text-brand-grey'}`}>
                {pkg.sub}
              </p>
              
              <ul className="space-y-4 mb-10">
                {pkg.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[13px] leading-relaxed items-start">
                    <Check className={`w-4 h-4 shrink-0 ${pkg.featured ? 'text-brand-gold' : 'text-brand-green'}`} />
                    {item}
                  </li>
                ))}
              </ul>

              <a 
                href={`https://wa.me/233268786647?text=Hi%20NMG%2C%20I'm%20interested%20in%20the%20${pkg.name}%20package`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center py-4 rounded-full font-bold text-sm transition-all ${
                  pkg.featured 
                    ? 'bg-brand-white text-brand-green hover:bg-brand-green-pale' 
                    : 'bg-brand-green-pale text-brand-green hover:bg-brand-green hover:text-white'
                }`}
              >
                Get Started →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
