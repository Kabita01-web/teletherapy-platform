import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Find a Therapist', href: '#services' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Resources', href: '#about' },
  ];

  return (
    <nav
      className={`w-full top-0 sticky z-50 transition-all duration-300 ${
        isScrolled ? 'bg-surface shadow-md' : 'bg-surface/95 shadow-sm'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" id="nav-logo">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-[24px] font-headline-md font-bold text-primary leading-none">
            Inner Balance
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className={`text-label-md font-label-md transition-colors duration-200 active:scale-95 ${
                i === 0
                  ? 'text-primary border-b-2 border-primary pb-0.5'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            id="nav-login-btn"
            className="text-label-md font-label-md text-primary hover:text-primary-container transition-colors duration-200"
          >
            Login
          </button>
          <button
            id="nav-signup-btn"
            className="text-label-md font-label-md bg-primary text-on-primary px-6 py-2 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors duration-200 shadow-sm"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          id="nav-mobile-menu-btn"
          className="md:hidden p-2 text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-label-md font-label-md text-on-surface hover:text-primary transition-colors py-1"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2 border-t border-outline-variant">
            <button
              id="nav-mobile-login-btn"
              className="flex-1 text-label-md font-label-md border border-primary text-primary py-2 rounded-full hover:bg-surface-container-low transition-colors"
            >
              Login
            </button>
            <button
              id="nav-mobile-signup-btn"
              className="flex-1 text-label-md font-label-md bg-primary text-on-primary py-2 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
