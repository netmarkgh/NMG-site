import { useReveal } from '../hooks/useReveal';

export default function ProblemStrip() {
  const containerRef = useReveal();

  return (
    <div className="bg-brand-black text-brand-white py-16 md:py-20 px-6">
      <div ref={containerRef} className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <p className="reveal flex-1 font-display text-3xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
          Most Ghanaian businesses are<br />
          <span className="text-brand-gold italic">invisible online.</span>
          <span className="block mt-8 text-white/50 text-base md:text-lg font-medium leading-relaxed max-w-md">
            That's money left behind every day. It's time to build a presence that actually works.
          </span>
        </p>
        <ul className="reveal flex-1 space-y-4">
          {[
            "Customers search on Google but can't find you",
            "Your social media hasn't been posted on in weeks",
            "Leads come in but there's no system to convert them",
            "Competitors are growing — and you're watching"
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-sm md:text-base text-white/70">
              <span className="text-brand-gold font-bold">✕</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
