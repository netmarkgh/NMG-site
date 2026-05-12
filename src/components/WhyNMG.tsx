import { useReveal } from '../hooks/useReveal';

const reasons = [
  {
    num: '01',
    title: 'We know the Ghanaian market',
    text: 'We\'re not a global SaaS company with generic advice. We understand how Accra\'s customers search, buy, and behave online.'
  },
  {
    num: '02',
    title: 'Done-for-you, not DIY',
    text: 'You don\'t have to learn marketing tools or manage dashboards. We handle everything and report back in plain language.'
  },
  {
    num: '03',
    title: 'WhatsApp-first communication',
    text: 'We work the way Ghana works — fast, direct, on WhatsApp. No email chains. No waiting days for a response.'
  },
  {
    num: '04',
    title: 'Real results, real clients',
    text: '38+ businesses optimised on Google Maps, 500+ in our business network. We have a track record in this market.'
  }
];

export default function WhyNMG() {
  const containerRef = useReveal();

  return (
    <section className="bg-brand-white px-6 py-24 md:py-32">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="reveal text-brand-green text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            Why NMG
          </p>
          <h2 className="reveal font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            We're not a software tool.<br />
            We're your marketing team.
          </h2>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border border border-brand-border rounded-2xl overflow-hidden shadow-sm">
          {reasons.map((r, i) => (
            <div key={i} className="bg-white p-10 hover:bg-brand-green-pale/30 transition-colors group">
              <div className="font-display text-xs font-bold text-brand-green uppercase mb-3">
                {r.num}
              </div>
              <h3 className="font-display text-lg font-bold mb-2 group-hover:text-brand-green transition-colors">
                {r.title}
              </h3>
              <p className="text-brand-grey text-[13px] leading-relaxed">
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
