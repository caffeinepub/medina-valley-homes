import { CheckCircle2, Pencil, Package, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const options = [
  {
    icon: Home,
    title: 'Semi-Custom Builds',
    desc: 'Start with one of our proven floor plans and personalize finishes, fixtures, and features to match your vision and budget.',
  },
  {
    icon: Pencil,
    title: 'Fully Custom Homes',
    desc: 'Bring your own plans or work with our design team from the ground up. Every detail crafted to your exact specifications.',
  },
  {
    icon: Package,
    title: 'Lot + Build Packages',
    desc: 'Simplify the process with an all-in-one package — secure your homesite and begin your build under one streamlined agreement.',
  },
  {
    icon: CheckCircle2,
    title: 'Design Consultation',
    desc: 'Meet directly with Dennis to discuss your vision, budget, and timeline. No pressure, just honest guidance from a local builder.',
  },
];

interface BuildOptionsProps {
  onConsult: () => void;
}

export default function BuildOptions({ onConsult }: BuildOptionsProps) {
  return (
    <section id="build-options" className="py-20 lg:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">
              How We Build
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Build Your Custom Home in Medina Valley
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
              Whether you have a clear vision or are just starting to explore, we offer flexible paths
              to get you into the home you've always wanted — on land worth owning.
            </p>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold px-8"
              onClick={onConsult}
            >
              Schedule a Design Consultation
            </Button>
          </div>

          {/* Right: Options grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {options.map((opt) => (
              <div
                key={opt.title}
                className="bg-card rounded-xl border border-border p-5 shadow-xs hover:shadow-luxury transition-shadow"
              >
                <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center mb-3">
                  <opt.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{opt.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
