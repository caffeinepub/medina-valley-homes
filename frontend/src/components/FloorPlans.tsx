import { useState } from 'react';
import { Bed, Bath, Square, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Plan {
  id: number;
  name: string;
  beds: string;
  baths: string;
  sqft: string;
  pricing: string;
  image: string;
  description: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: 1,
    name: 'The Medina',
    beds: '3–4 BR',
    baths: '2–2.5 BA',
    sqft: '1,800–2,200 sq ft',
    pricing: 'Starting from $320,000',
    image: '/assets/generated/floorplan-1.dim_800x500.png',
    description: 'A refined single-story design with open-concept living, a chef\'s kitchen, and a covered back porch perfect for Texas evenings.',
    features: ['Open-concept great room', 'Chef\'s kitchen with island', 'Primary suite with spa bath', 'Covered back porch', 'Energy-efficient construction', '2-car garage'],
  },
  {
    id: 2,
    name: 'The Castroville',
    beds: '4–5 BR',
    baths: '3–3.5 BA',
    sqft: '2,400–2,900 sq ft',
    pricing: 'Starting from $420,000',
    image: '/assets/generated/floorplan-2.dim_800x500.png',
    description: 'A two-story statement home with dramatic entry, flexible bonus room, and a luxurious primary suite retreat.',
    features: ['Grand two-story entry', 'Flexible bonus/game room', 'Luxurious primary suite', 'Gourmet kitchen', 'Outdoor living area', '3-car garage option'],
  },
  {
    id: 3,
    name: 'The Rio',
    beds: '3 BR',
    baths: '2 BA',
    sqft: '1,600–1,900 sq ft',
    pricing: 'Pricing Coming Soon',
    image: '/assets/generated/floorplan-3.dim_800x500.png',
    description: 'A charming Texas farmhouse design with board-and-batten exterior, metal roof, and a welcoming covered front porch.',
    features: ['Farmhouse exterior', 'Metal roof option', 'Covered front porch', 'Split bedroom layout', 'Mudroom/laundry combo', 'Energy Star certified'],
  },
  {
    id: 4,
    name: 'The Valley',
    beds: '4 BR',
    baths: '3 BA',
    sqft: '2,100–2,500 sq ft',
    pricing: 'Pricing Coming Soon',
    image: '/assets/generated/floorplan-4.dim_800x500.png',
    description: 'A contemporary Hill Country design with cedar and limestone accents, large overhanging eaves, and seamless indoor-outdoor flow.',
    features: ['Cedar & limestone facade', 'Large overhanging eaves', 'Indoor-outdoor flow', 'Study/home office', 'Walk-in pantry', 'Oversized covered patio'],
  },
];

interface PlanDetailProps {
  plan: Plan;
  open: boolean;
  onClose: () => void;
  onInquire: () => void;
}

function PlanDetail({ plan, open, onClose, onInquire }: PlanDetailProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground">{plan.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <img
            src={plan.image}
            alt={plan.name}
            className="w-full h-56 object-cover rounded-lg border border-border"
          />
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-sm font-body text-muted-foreground">
              <Bed className="w-4 h-4 text-accent" /> {plan.beds}
            </div>
            <div className="flex items-center gap-1.5 text-sm font-body text-muted-foreground">
              <Bath className="w-4 h-4 text-accent" /> {plan.baths}
            </div>
            <div className="flex items-center gap-1.5 text-sm font-body text-muted-foreground">
              <Square className="w-4 h-4 text-accent" /> {plan.sqft}
            </div>
          </div>
          <p className="font-body text-muted-foreground leading-relaxed">{plan.description}</p>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3">Included Features</h4>
            <ul className="grid sm:grid-cols-2 gap-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 font-body text-sm text-foreground">
                  <ChevronRight className="w-4 h-4 text-accent flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <p className="font-display font-semibold text-foreground">{plan.pricing}</p>
            <Button
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold"
              onClick={onInquire}
            >
              Inquire About This Plan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface FloorPlansProps {
  onInquire: () => void;
}

export default function FloorPlans({ onInquire }: FloorPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <section id="floor-plans" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">
            Our Designs
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Floor Plans
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our curated collection of plans — or bring your own. Every home is built to your specifications.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-card rounded-xl border border-border shadow-xs hover:shadow-luxury transition-shadow overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-44 object-cover"
                />
                <Badge
                  variant="secondary"
                  className="absolute top-3 left-3 font-body text-xs bg-primary/90 text-primary-foreground border-0"
                >
                  {plan.pricing.startsWith('Starting') ? 'Available' : 'Coming Soon'}
                </Badge>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">{plan.name}</h3>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                    <Bed className="w-3.5 h-3.5 text-accent" /> {plan.beds}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                    <Bath className="w-3.5 h-3.5 text-accent" /> {plan.baths}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                    <Square className="w-3.5 h-3.5 text-accent" /> {plan.sqft}
                  </div>
                </div>
                <p className="font-body text-sm font-semibold text-accent mb-4 mt-auto">{plan.pricing}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full font-body border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setSelectedPlan(plan)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <PlanDetail
          plan={selectedPlan}
          open={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onInquire={() => { setSelectedPlan(null); onInquire(); }}
        />
      )}
    </section>
  );
}
