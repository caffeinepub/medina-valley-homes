import { Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Contact Medina Valley Homes
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Ready to start your build? Have questions? Reach out directly — Dennis answers personally.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border shadow-luxury p-6">
              <h3 className="font-display text-xl font-semibold text-foreground mb-5">
                Medina Valley Homes
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:+12103939794"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">Phone</p>
                    <p className="font-body font-semibold text-foreground group-hover:text-accent transition-colors">
                      (210) 393-9794
                    </p>
                  </div>
                </a>
                <a
                  href="mailto:Dennis@tx.properties"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                    <p className="font-body font-semibold text-foreground group-hover:text-accent transition-colors">
                      Dennis@tx.properties
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">Location</p>
                    <p className="font-body font-semibold text-foreground">
                      Medina Valley, Medina County, TX
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      West of San Antonio, near Castroville
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 rounded-xl border border-accent/20 p-5">
              <p className="font-body text-sm text-foreground leading-relaxed">
                <span className="font-semibold">Phase 1 is now open for reservations.</span>{' '}
                Limited homesites available. Contact Dennis today to secure your spot before
                early-access pricing ends.
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-border shadow-luxury h-[400px]">
            <iframe
              title="Medina Valley Homes Location"
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
