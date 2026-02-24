import { ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.png')" }}
      />
      {/* Navy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-800/75 via-navy-800/55 to-navy-900/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <p className="font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-white/70 mb-4">
          Medina County, Texas
        </p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-tight mb-6">
          Medina Valley Custom Homes
        </h1>
        <p className="font-body text-lg sm:text-xl lg:text-2xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed">
          Spacious homesites. Modern craftsmanship. Built for Texas living.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold px-8 py-6 text-base shadow-luxury-lg"
            onClick={() => scrollTo('homesites')}
          >
            View Available Homesites
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-2 border-white text-white bg-white/10 hover:bg-white/20 font-body font-semibold px-8 py-6 text-base backdrop-blur-sm"
            onClick={() => scrollTo('priority-list')}
          >
            Join Priority List
          </Button>
        </div>

        <a
          href="tel:+12103939794"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white font-body text-sm transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call (210) 393-9794
        </a>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('location')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white/90 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
