import { format } from 'date-fns';
import { ArrowLeft, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetLeads } from '@/hooks/useQueries';
import { BudgetRange, BuildTimeline } from '@/backend';

const budgetLabel: Record<BudgetRange, string> = {
  [BudgetRange.under300K]: 'Under $300K',
  [BudgetRange._300to400K]: '$300K–$400K',
  [BudgetRange._400to500K]: '$400K–$500K',
  [BudgetRange.over500K]: '$500K+',
  [BudgetRange.unknown_]: 'N/A',
};

const timelineLabel: Record<BuildTimeline, string> = {
  [BuildTimeline.immediate]: 'Immediate',
  [BuildTimeline.within6Months]: 'Within 6 Months',
  [BuildTimeline.within1Year]: 'Within 1 Year',
  [BuildTimeline.unsure]: 'Not Sure',
};

export default function AdminPage() {
  const { data: leads, isLoading, isError, refetch } = useGetLeads();

  const formatTimestamp = (ts: bigint) => {
    try {
      const ms = Number(ts / BigInt(1_000_000));
      return format(new Date(ms), 'MMM d, yyyy h:mm a');
    } catch {
      return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary border-b border-primary/80 shadow-xs sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors font-body text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Site
            </a>
            <span className="text-primary-foreground/30">|</span>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <span className="font-display font-semibold text-primary-foreground">Priority List Admin</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="font-body text-xs border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
          >
            Refresh
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="mb-6">
          <div className="bg-card rounded-xl border border-border shadow-xs p-5 inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">Total Leads</p>
              <p className="font-display text-2xl font-semibold text-foreground">
                {isLoading ? '—' : (leads?.length ?? 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <p className="font-body text-muted-foreground mb-4">Failed to load leads.</p>
            <Button variant="outline" onClick={() => refetch()} className="font-body">
              Try Again
            </Button>
          </div>
        ) : !leads || leads.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border border-border">
            <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-display text-lg font-semibold text-foreground mb-1">No leads yet</p>
            <p className="font-body text-sm text-muted-foreground">
              Priority List submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border shadow-luxury overflow-hidden">
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="font-body font-semibold text-foreground whitespace-nowrap">Name</TableHead>
                    <TableHead className="font-body font-semibold text-foreground whitespace-nowrap">Email</TableHead>
                    <TableHead className="font-body font-semibold text-foreground whitespace-nowrap">Phone</TableHead>
                    <TableHead className="font-body font-semibold text-foreground whitespace-nowrap">Budget</TableHead>
                    <TableHead className="font-body font-semibold text-foreground whitespace-nowrap">Timeline</TableHead>
                    <TableHead className="font-body font-semibold text-foreground whitespace-nowrap">Lot / Source</TableHead>
                    <TableHead className="font-body font-semibold text-foreground whitespace-nowrap">Message</TableHead>
                    <TableHead className="font-body font-semibold text-foreground whitespace-nowrap">Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead, idx) => (
                    <TableRow key={idx} className="hover:bg-secondary/20 transition-colors">
                      <TableCell className="font-body font-medium text-foreground whitespace-nowrap">
                        {lead.fullName}
                      </TableCell>
                      <TableCell className="font-body text-sm">
                        <a href={`mailto:${lead.email}`} className="text-accent hover:underline">
                          {lead.email}
                        </a>
                      </TableCell>
                      <TableCell className="font-body text-sm whitespace-nowrap">
                        <a href={`tel:${lead.phone}`} className="text-accent hover:underline">
                          {lead.phone}
                        </a>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant="secondary" className="font-body text-xs">
                          {budgetLabel[lead.budgetRange]}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-body text-sm whitespace-nowrap">
                        {timelineLabel[lead.buildTimeline]}
                      </TableCell>
                      <TableCell className="font-body text-sm whitespace-nowrap">
                        {lead.source === 'Chatbot' ? (
                          <Badge variant="outline" className="font-body text-xs border-accent text-accent">
                            Chatbot
                          </Badge>
                        ) : (
                          lead.interestedLot || '—'
                        )}
                      </TableCell>
                      <TableCell className="font-body text-sm max-w-[200px]">
                        <span className="line-clamp-2 text-muted-foreground">
                          {lead.message || '—'}
                        </span>
                      </TableCell>
                      <TableCell className="font-body text-xs text-muted-foreground whitespace-nowrap">
                        {formatTimestamp(lead.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        )}
      </main>
    </div>
  );
}
