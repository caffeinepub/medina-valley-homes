import { Phone, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'medina-valley-homes');

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/ChatGPT Image Feb 24, 2026, 09_01_17 PM.png"
                alt="Medina Valley Homes logo"
                className="h-10 w-10 object-contain rounded-sm flex-shrink-0"
              />
              <div>
                <div className="font-display font-semibold text-base leading-tight text-primary-foreground">
                  Medina Valley Homes
                </div>
                <div className="font-body text-xs tracking-widest uppercase text-primary-foreground/70">
                  Custom Home Builder
                </div>
              </div>
            </div>
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">
              Custom home builder in Medina County, Texas. Building quality homes west of San Antonio
              with craftsmanship you can trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Available Homesites', href: '#homesites' },
                { label: 'Floor Plans', href: '#floor-plans' },
                { label: 'Build Options', href: '#build-options' },
                { label: 'About Us', href: '#about' },
                { label: 'Join Priority List', href: '#priority-list' },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => {
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="tel:+12103939794"
                className="flex items-center gap-2 font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-4 h-4 text-accent" />
                (210) 393-9794
              </a>
              <a
                href="mailto:Dennis@tx.properties"
                className="flex items-center gap-2 font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-4 h-4 text-accent" />
                Dennis@tx.properties
              </a>
              <p className="font-body text-sm text-primary-foreground/70">
                Medina Valley, Medina County, TX
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-primary-foreground/50">
            © {year} Medina Valley Homes. All rights reserved.
          </p>
          <p className="font-body text-xs text-primary-foreground/50 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-blue-300 fill-blue-300" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground/80 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
