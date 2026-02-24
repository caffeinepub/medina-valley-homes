import { CheckCircle2, User } from 'lucide-react';

const benefits = [
  'Local Medina County builder — we know this land',
  'Flexible design options for every budget and style',
  'Energy-efficient construction built for Texas climate',
  'Transparent pricing with no hidden surprises',
  'Direct communication with the builder, Dennis',
  'Limited Phase 1 availability — act early for best selection',
];

export default function WhyChoose() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">
            Why Us
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Why Choose Medina Valley Homes
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not a national builder. We're a local team that cares about every home we build.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="font-body text-base text-foreground">{benefit}</p>
              </div>
            ))}
          </div>

          {/* Founder */}
          <div className="bg-card rounded-2xl border border-border shadow-luxury p-8">
            <div className="flex items-center gap-5 mb-5">
              <div className="w-20 h-20 rounded-full bg-secondary border-2 border-accent/30 flex items-center justify-center flex-shrink-0">
                <User className="w-10 h-10 text-accent/60" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">Dennis</h3>
                <p className="font-body text-sm text-accent">Founder & Builder</p>
                <p className="font-body text-sm text-muted-foreground">Medina Valley Homes</p>
              </div>
            </div>
            <blockquote className="font-body text-muted-foreground leading-relaxed italic border-l-2 border-accent/40 pl-4">
              "I've spent years building in Medina County because I believe in this land and this community.
              Every home I build is one I'd be proud to live in myself. My goal is simple: give families
              a beautiful, well-built home at a fair price — with the kind of personal service you can
              only get from a local builder."
            </blockquote>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="font-body text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Direct line:</span>{' '}
                <a href="tel:+12103939794" className="text-accent hover:underline">(210) 393-9794</a>
              </p>
              <p className="font-body text-sm text-muted-foreground mt-1">
                <span className="font-medium text-foreground">Email:</span>{' '}
                <a href="mailto:Dennis@tx.properties" className="text-accent hover:underline">Dennis@tx.properties</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
