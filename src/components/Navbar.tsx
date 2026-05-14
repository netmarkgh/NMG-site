import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isDarkBgPage = location.pathname === '/' || location.pathname === '';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/#home', isExternal: false },
    { name: 'Our Clients', path: '/#our-clients', isExternal: false },
    { name: 'Full Services', path: '/#services', isExternal: false },
    { name: 'Get Onboard', path: '/onboarding', isExternal: false },
  ];

    const isSticky = scrolled || !isDarkBgPage;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky ? 'py-3 bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-border' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <div className="relative w-40 h-12 flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="Net-Marketing Ghana" 
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <li key={item.name}>
              {item.path.startsWith('#') ? (
                <a 
                  href={item.path} 
                  className={`font-sans text-[13px] font-medium transition-colors ${
                    isSticky ? 'text-brand-black hover:text-brand-green' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              ) : (
                <Link 
                  to={item.path} 
                  className={`font-sans text-[13px] font-medium transition-colors ${
                    isSticky ? 'text-brand-black hover:text-brand-green' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a 
            href="https://wa.me/233268786647" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center bg-brand-green text-white px-5 py-2.5 rounded-full font-sans font-medium text-[13px] hover:bg-brand-green-light hover:-translate-y-px transition-all"
          >
            Start Today →
          </a>
          
          <button 
            className={`md:hidden p-3 border rounded-lg active:bg-black/5 transition-colors ${
              isSticky ? 'text-brand-black border-brand-border' : 'text-white border-white/20'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-black/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <li key={item.name}>
                  {item.path.startsWith('#') ? (
                    <a 
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block font-display text-lg font-semibold text-white hover:text-brand-gold transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link 
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block font-display text-lg font-semibold text-white hover:text-brand-gold transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <a 
                  href="https://wa.me/233268786647" 
                  className="inline-flex w-full items-center justify-center gap-2 bg-brand-green text-white px-5 py-3 rounded-full font-display font-bold text-base"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
