import { useReveal } from '../hooks/useReveal';

const steps = [
  {
    num: '01',
    label: 'Step 1',
    title: 'We talk about your business',
    text: 'A quick WhatsApp or call to understand where you are, what you sell, and what growth means to you.'
  },
  {
    num: '02',
    label: 'Step 2',
    title: 'We build your plan',
    text: 'We recommend exactly what you need — no bloated packages. Just what will actually move your business forward.'
  },
  {
    num: '03',
    label: 'Step 3',
    title: 'We execute — you focus on sales',
    text: 'We handle the marketing work. You handle serving customers. We update you with results regularly.'
  },
  {
    num: '04',
    label: 'Step 4',
    title: 'We review and scale',
    text: 'Monthly reviews to measure what\'s working, fix what\'s not, and grow from there.'
  }
];

export default function HowItWorks() {
  const containerRef = useReveal();

  return (
    <section className="bg-brand-black text-brand-white px-6 py-24 md:py-32">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="reveal text-brand-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            The Process
          </p>
          <h2 className="reveal font-display text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            How we work with you
          </h2>
          <p className="reveal text-white/50 text-base md:text-lg leading-relaxed">
            Simple, transparent and built around your business — not ours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
          {steps.map((step, i) => (
            <div key={i} className="reveal relative pt-4">
              <div className="font-display text-7xl md:text-8xl font-extrabold text-white/5 line-height-none absolute -top-4 -left-2">
                {step.num}
              </div>
              <div className="relative z-10">
                <p className="text-[11px] font-bold tracking-widest text-brand-gold uppercase mb-3">
                  {step.label}
                </p>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
