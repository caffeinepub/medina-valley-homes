import { MapPin, Clock, Trees, ArrowRight } from 'lucide-react';

const benefits = [
  { icon: MapPin, title: 'West of San Antonio', desc: 'Just 20–30 minutes from the city, with easy access to Loop 1604 and Hwy 90.' },
  { icon: Trees, title: 'Near Castroville, LaCoste & Rio Medina', desc: 'Charming small-town communities with local character and Texas Hill Country scenery.' },
  { icon: ArrowRight, title: 'Larger Lots', desc: 'Generous homesites with room to breathe — no cookie-cutter subdivisions here.' },
  { icon: Clock, title: 'Easy Commute Access', desc: 'Quick access to San Antonio employment centers while enjoying a quieter lifestyle.' },
];

export default function Location() {
  return (
    <section id="location" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">
            Where We Build
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Build in the Heart of Medina County
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Medina Valley offers the perfect balance — wide-open Texas land, a quieter pace of life,
            and easy access to everything San Antonio has to offer.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <div className="space-y-6">
            {benefits.map((item) => (
              <div key={item.title} className="flex gap-4 p-5 bg-card rounded-lg border border-border shadow-xs">
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* Aerial image */}
            <div className="rounded-lg overflow-hidden border border-border shadow-luxury mt-4">
              <img
                src="/assets/generated/location-aerial.dim_1200x600.png"
                alt="Aerial view of Medina Valley land"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          {/* Map */}
          <div className="rounded-lg overflow-hidden border border-border shadow-luxury h-[480px]">
            <iframe
              title="Medina Valley, Texas Location Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-99.2%2C29.1%2C-98.5%2C29.6&layer=mapnik&marker=29.35%2C-98.87"
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
