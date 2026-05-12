import { useReveal } from '../hooks/useReveal';
import { MapPin, Smartphone, MessageSquare, Target, Globe, TrendingUp } from 'lucide-react';

const services = [
  {
    icon: <MapPin className="w-5 h-5 text-brand-green" />,
    title: 'Google Maps Listing (GBP)',
    desc: 'We set up, verify, and fully optimise your Google Business Profile so customers in your area find you first — on Google Search and Maps.',
    delivers: ['Verified & live on Google Maps', 'Optimised categories, photos & hours', 'Monthly performance reports']
  },
  {
    icon: <Smartphone className="w-5 h-5 text-brand-green" />,
    title: 'Social Media Management',
    desc: 'We run your Facebook, Instagram, TikTok pages — creating content, posting consistently and building an audience.',
    delivers: ['Content creation & scheduling', 'Caption writing & hashtag strategy', 'Monthly analytics review']
  },
  {
    icon: <MessageSquare className="w-5 h-5 text-brand-green" />,
    title: 'WhatsApp Sales Funnel',
    desc: 'We build structured WhatsApp flows that turn enquiries into paying customers — so no lead slips through the cracks.',
    delivers: ['Funnel strategy & message scripts', 'Lead capture setup', 'Follow-up sequences']
  },
  {
    icon: <Target className="w-5 h-5 text-brand-green" />,
    title: 'Lead Generation',
    desc: 'We create targeted campaigns designed to bring real, interested prospects to your business — not just likes and followers.',
    delivers: ['Campaign strategy & targeting', 'Landing page or form setup', 'Lead tracking & reporting']
  },
  {
    icon: <Globe className="w-5 h-5 text-brand-green" />,
    title: 'Website Development',
    desc: 'We build clean, fast websites that represent your brand well and are built to convert — not just look good.',
    delivers: ['Mobile-first design', 'SEO-ready structure', 'WhatsApp & contact integration']
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-brand-green" />,
    title: 'NMG Connect',
    desc: 'Join our growing business community of 500+ Accra, Ghana-based brands. Get referrals, visibility and marketing support.',
    delivers: ['Business referral network', 'Status Marketing exposure', 'Community growth support']
  },
];

export default function Services() {
  const containerRef = useReveal();

  return (
    <section id="services" className="bg-brand-black px-6 py-24 md:py-32">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="reveal text-brand-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            What We Do
          </p>
          <h2 className="reveal font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            Everything your business<br />
            needs to be found <span className="text-brand-gold">& chosen.</span>
          </h2>
          <p className="reveal text-white/50 text-base md:text-lg leading-relaxed">
            We don't sell packages. We build growth systems tailored to where your business is and where it needs to go.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border border border-brand-border rounded-2xl overflow-hidden shadow-sm">
          {services.map((s, i) => (
            <div 
              key={i} 
              className="group bg-white p-8 md:p-10 relative overflow-hidden transition-all hover:bg-brand-green-pale/40"
            >
              <div className="w-12 h-12 bg-brand-green-pale border border-brand-green/10 rounded-xl flex items-center justify-center mb-6">
                {s.icon}
              </div>
              <h3 className="font-display font-bold text-lg mb-3">
                {s.title}
              </h3>
              <p className="text-brand-grey text-[13px] leading-relaxed mb-6">
                {s.desc}
              </p>
              <ul className="space-y-2">
                {s.delivers.map((item, j) => (
                  <li key={j} className="text-[11px] font-semibold text-brand-green flex items-center gap-2">
                    <span className="text-xs">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
