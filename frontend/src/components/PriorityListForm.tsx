import { useState, useEffect } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSubmitLead, BudgetRange, BuildTimeline } from '@/hooks/useQueries';

interface PriorityListFormProps {
  preselectedLot?: number | null;
}

const budgetOptions = [
  { value: BudgetRange.under300K, label: 'Under $300,000' },
  { value: BudgetRange._300to400K, label: '$300,000 – $400,000' },
  { value: BudgetRange._400to500K, label: '$400,000 – $500,000' },
  { value: BudgetRange.over500K, label: '$500,000+' },
];

const timelineOptions = [
  { value: BuildTimeline.immediate, label: 'Immediate' },
  { value: BuildTimeline.within6Months, label: 'Within 6 Months' },
  { value: BuildTimeline.within1Year, label: 'Within 1 Year' },
  { value: BuildTimeline.unsure, label: 'Not Sure Yet' },
];

const lotOptions = [
  { value: 'not-sure', label: 'Not Sure Yet' },
  ...Array.from({ length: 20 }, (_, i) => ({
    value: `Lot ${i + 1}`,
    label: `Lot ${i + 1}`,
  })),
];

export default function PriorityListForm({ preselectedLot }: PriorityListFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budgetRange, setBudgetRange] = useState<BudgetRange | ''>('');
  const [buildTimeline, setBuildTimeline] = useState<BuildTimeline | ''>('');
  const [interestedLot, setInterestedLot] = useState('not-sure');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitLead = useSubmitLead();

  useEffect(() => {
    if (preselectedLot) {
      setInterestedLot(`Lot ${preselectedLot}`);
    }
  }, [preselectedLot]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budgetRange || !buildTimeline) return;

    try {
      await submitLead.mutateAsync({
        fullName,
        email,
        phone,
        budgetRange,
        buildTimeline,
        interestedLot,
        message,
      });
      setSubmitted(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setBudgetRange('');
      setBuildTimeline('');
      setInterestedLot('not-sure');
      setMessage('');
    } catch {
      // error handled by mutation state
    }
  };

  return (
    <section id="priority-list" className="py-20 lg:py-28 bg-primary/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">
            Limited Availability
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Secure Your Spot in Phase 1
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-2">
            Limited homesites available.{' '}
            <span className="font-semibold text-accent">Early reservations receive priority pricing.</span>
          </p>
        </div>

        {submitted ? (
          <div className="bg-card rounded-2xl border border-border shadow-luxury p-10 text-center">
            <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-4" />
            <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
              You're on the Priority List!
            </h3>
            <p className="font-body text-muted-foreground mb-6 leading-relaxed">
              Thank you for your interest in Medina Valley Homes. Dennis will be in touch with you
              shortly to discuss your homesite and build options.
            </p>
            <p className="font-body text-sm text-muted-foreground">
              Questions? Call{' '}
              <a href="tel:+12103939794" className="text-accent hover:underline font-medium">
                (210) 393-9794
              </a>
            </p>
            <Button
              variant="outline"
              className="mt-6 font-body border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground"
              onClick={() => setSubmitted(false)}
            >
              Submit Another Inquiry
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl border border-border shadow-luxury p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="font-body text-sm font-medium">Full Name *</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Smith"
                  required
                  className="font-body"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="font-body text-sm font-medium">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="font-body"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="font-body text-sm font-medium">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(210) 555-0000"
                required
                className="font-body"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label className="font-body text-sm font-medium">Budget Range *</Label>
                <Select value={budgetRange} onValueChange={(v) => setBudgetRange(v as BudgetRange)} required>
                  <SelectTrigger className="font-body">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="font-body">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="font-body text-sm font-medium">Desired Build Timeline *</Label>
                <Select value={buildTimeline} onValueChange={(v) => setBuildTimeline(v as BuildTimeline)} required>
                  <SelectTrigger className="font-body">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelineOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="font-body">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="font-body text-sm font-medium">Interested Lot</Label>
              <Select value={interestedLot} onValueChange={setInterestedLot}>
                <SelectTrigger className="font-body">
                  <SelectValue placeholder="Select a lot" />
                </SelectTrigger>
                <SelectContent>
                  {lotOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="font-body">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message" className="font-body text-sm font-medium">Message (Optional)</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your dream home, questions, or anything else..."
                rows={4}
                className="font-body resize-none"
              />
            </div>

            {submitLead.isError && (
              <p className="font-body text-sm text-destructive">
                Something went wrong. Please try again or call (210) 393-9794.
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={submitLead.isPending || !budgetRange || !buildTimeline}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-base py-6"
            >
              {submitLead.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Join Priority List'
              )}
            </Button>

            <p className="font-body text-xs text-center text-muted-foreground">
              By submitting, you agree to be contacted by Medina Valley Homes regarding your inquiry.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
