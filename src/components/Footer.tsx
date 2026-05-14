import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="px-6 py-12 bg-brand-black text-white/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center">
          <div className="w-32 h-12 flex-shrink-0">
            <img 
              src={`${import.meta.env.BASE_URL}logo.png`} 
              alt="NMG" 
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.endsWith('.svg')) {
                  target.src = `${import.meta.env.BASE_URL}nmg_logo.svg`;
                }
              }}
            />
          </div>
        </div>

        <p className="text-[11px] font-medium tracking-wide">
          Accra, Ghana · netmarkgh@gmail.com
        </p>

        <div className="text-[11px] font-medium tracking-wider">
          © {new Date().getFullYear()} NMG. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
