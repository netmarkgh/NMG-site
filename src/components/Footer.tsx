export default function Footer() {
  return (
    <footer className="px-6 py-12 md:py-16 bg-brand-black text-white/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3 group">
            <img 
              src="/nmg_logo.png" 
              alt="Net-Marketing Ghana" 
              className="w-8 h-8 object-contain rounded bg-white p-0.5"
            />
            <span className="font-display font-extrabold text-sm tracking-tight text-white">
              Net-Marketing <span className="text-brand-green-light">Ghana</span>
            </span>
          </div>
          <p className="text-[11px] font-medium tracking-wide">
            Accra, Ghana · netmarkgh@gmail.com
          </p>
        </div>

        <div className="text-[11px] font-medium tracking-wider">
          © {new Date().getFullYear()} NMG. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
