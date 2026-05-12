import { useReveal } from '../hooks/useReveal';

const industries = [
  { icon: '💄', title: 'Beauty & Wellness', text: 'Hair, skincare, cosmetics, spas — we help you get found and build a loyal client base online.' },
  { icon: '🍽️', title: 'Food & Beverage', text: 'Restaurants, caterers, bakeries — let hungry customers find you on Google Maps.' },
  { icon: '👗', title: 'Fashion & Retail', text: 'Boutiques, clothing brands, and product sellers — we grow your online orders and foot traffic.' },
  { icon: '🏗️', title: 'Construction & Real Estate', text: 'Contractors, surveyors, architects — we help serious buyers and project clients find you.' },
  { icon: '🛍️', title: 'SMEs & Startups', text: 'Any growing business that needs a professional online presence without a full marketing team.' },
  { icon: '📸', title: 'Creatives & Events', text: 'Photographers, event planners — we build your visibility and help you book more clients.' }
];

export default function WhoFor() {
  const containerRef = useReveal();

  return (
    <section className="bg-brand-white px-6 py-24 md:py-32">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16 text-center md:text-left mx-auto md:mx-0">
          <p className="reveal text-brand-green text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            Who We Serve
          </p>
          <h2 className="reveal font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            Built for Ghana's real businesses
          </h2>
          <p className="reveal text-brand-grey text-base md:text-lg leading-relaxed">
            If you run a business in Ghana and want more customers online, NMG was made for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {industries.map((ind, i) => (
            <div key={i} className="reveal bg-white border border-brand-border p-8 rounded-2xl hover:border-brand-green hover:shadow-xl hover:shadow-brand-green/5 transition-all group">
              <div className="text-4xl mb-4">{ind.icon}</div>
              <h3 className="font-display text-lg font-bold mb-2 group-hover:text-brand-green transition-colors">
                {ind.title}
              </h3>
              <p className="text-brand-grey text-[13px] leading-relaxed">
                {ind.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
