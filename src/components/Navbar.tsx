import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { GeetaLogo } from './AdityaLogo';

interface NavbarProps {
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Projects', href: '#case-studies' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'Contact', href: '#quote' },
  ];

  return (
    <div className="sticky top-3 sm:top-5 z-50 px-3 sm:px-6 lg:px-8 2xl:px-12 w-full max-w-[1536px] mx-auto transition-all">
      {/* Enlarged Floating Rounded Cream Board */}
      <header className="w-full bg-[#FAF7F2]/95 backdrop-blur-md border border-[#E7DFD3] rounded-full shadow-[0_12px_36px_-6px_rgba(45,35,20,0.09),0_2px_12px_-2px_rgba(45,35,20,0.04)] px-5 sm:px-7 lg:px-8 2xl:px-10 py-3 sm:py-3.5 flex items-center justify-between transition-all">
        
        {/* Left: Brand Logo aligned to left */}
        <div className="flex items-center flex-shrink-0">
          <a href="#home" className="flex items-center gap-2 group" aria-label="Geeta Solars Homepage">
            <GeetaLogo size="md" showTagline={true} />
          </a>
        </div>

        {/* Center: Desktop Navigation Links (xl+ screens) */}
        <nav className="hidden xl:flex items-center justify-center gap-1 2xl:gap-2 flex-1 mx-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs 2xl:text-[13px] font-bold text-slate-700 hover:text-red-600 px-2.5 2xl:px-3 py-1.5 rounded-full hover:bg-amber-900/[0.05] transition-all whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Compact Navigation Links for Lg Screens (1024px - 1280px) */}
        <nav className="hidden lg:flex xl:hidden items-center justify-center gap-1 flex-1 mx-2">
          {navLinks
            .filter((l) => ['Home', 'Solutions', 'Calculator', 'Projects', 'Why Choose Us', 'Contact'].includes(l.label))
            .map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] font-bold text-slate-700 hover:text-red-600 px-2 py-1 rounded-full hover:bg-amber-900/[0.05] transition-all whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
        </nav>

        {/* Right: Quote Action Button aligned to far right */}
        <div className="hidden sm:flex items-center flex-shrink-0 pl-2">
          <button
            onClick={onOpenQuote}
            className="btn-red text-xs 2xl:text-sm uppercase tracking-wider font-extrabold px-5 sm:px-7 py-2.5 sm:py-3 rounded-full flex items-center gap-2 shadow-lg shadow-red-600/20 hover:shadow-red-600/35 hover:scale-105 active:scale-95 whitespace-nowrap transition-all"
          >
            <span>Get a Free Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-full text-slate-700 hover:text-red-600 hover:bg-amber-900/[0.06] transition-colors flex-shrink-0"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu Drawer (Rounded Cream Card) */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2.5 bg-[#FAF7F2] border border-[#E7DFD3] rounded-3xl p-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 hover:text-red-600 hover:bg-amber-900/[0.04] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center justify-between"
            >
              <span>Admin Portal</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 font-extrabold uppercase">Login</span>
            </a>
          </div>
          <div className="pt-2 border-t border-[#E7DFD3]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="btn-red w-full text-xs font-bold uppercase tracking-wider py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md"
            >
              <span>Get a Free Quote &amp; Survey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
