import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Homesites', href: '#homesites' },
  { label: 'Floor Plans', href: '#floor-plans' },
  { label: 'Build Options', href: '#build-options' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-primary/97 backdrop-blur-md shadow-luxury border-b border-primary/80'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo + Text Lockup */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-3 group"
          >
            <img
              src="/assets/ChatGPT Image Feb 24, 2026, 09_01_17 PM.png"
              alt="Medina Valley Homes logo"
              className="h-10 w-10 object-contain rounded-sm flex-shrink-0"
            />
            <div className="text-left">
              <div className="font-display font-semibold text-base leading-tight text-white">
                Medina Valley Homes
              </div>
              <div className="font-body text-xs tracking-widest uppercase text-white/70">
                Custom Home Builder
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm font-body font-medium rounded-md transition-colors text-white/90 hover:text-white hover:bg-white/10"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+12103939794"
              className="flex items-center gap-2 text-sm font-body font-medium transition-colors text-white/90 hover:text-white"
            >
              <Phone className="w-4 h-4" />
              (210) 393-9794
            </a>
            <Button
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-medium"
              onClick={() => handleNavClick('#priority-list')}
            >
              Join Priority List
            </Button>
          </div>

          {/* Mobile: Call + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:+12103939794"
              className="flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-2 rounded-md text-sm font-body font-medium"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md transition-colors text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-white/10 shadow-luxury-lg">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-3 py-3 text-sm font-body font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-white/10 mt-2">
              <Button
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body"
                onClick={() => handleNavClick('#priority-list')}
              >
                Join Priority List
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
