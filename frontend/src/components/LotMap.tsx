import { useState } from 'react';
import { X, MapPin, Calendar, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type LotStatus = 'available' | 'reserved' | 'model' | 'phase2';

export interface Lot {
  id: number;
  size: string;
  timeline: string;
  status: LotStatus;
  x: number;
  y: number;
  w: number;
  h: number;
}

const lots: Lot[] = [
  { id: 1,  size: '0.75 acres', timeline: 'Q3 2025', status: 'available', x: 40,  y: 40,  w: 90, h: 70 },
  { id: 2,  size: '0.82 acres', timeline: 'Q3 2025', status: 'reserved',  x: 140, y: 40,  w: 90, h: 70 },
  { id: 3,  size: '0.68 acres', timeline: 'Q4 2025', status: 'available', x: 240, y: 40,  w: 90, h: 70 },
  { id: 4,  size: '1.10 acres', timeline: 'Q4 2025', status: 'model',     x: 340, y: 40,  w: 90, h: 70 },
  { id: 5,  size: '0.95 acres', timeline: 'Q1 2026', status: 'available', x: 440, y: 40,  w: 90, h: 70 },
  { id: 6,  size: '0.72 acres', timeline: 'Q1 2026', status: 'phase2',    x: 540, y: 40,  w: 90, h: 70 },
  { id: 7,  size: '0.88 acres', timeline: 'Q2 2026', status: 'phase2',    x: 640, y: 40,  w: 90, h: 70 },
  { id: 8,  size: '0.65 acres', timeline: 'Q3 2025', status: 'available', x: 40,  y: 130, w: 90, h: 70 },
  { id: 9,  size: '0.78 acres', timeline: 'Q3 2025', status: 'reserved',  x: 140, y: 130, w: 90, h: 70 },
  { id: 10, size: '1.20 acres', timeline: 'Q4 2025', status: 'available', x: 240, y: 130, w: 90, h: 70 },
  { id: 11, size: '0.90 acres', timeline: 'Q4 2025', status: 'available', x: 340, y: 130, w: 90, h: 70 },
  { id: 12, size: '0.85 acres', timeline: 'Q1 2026', status: 'reserved',  x: 440, y: 130, w: 90, h: 70 },
  { id: 13, size: '0.70 acres', timeline: 'Q1 2026', status: 'phase2',    x: 540, y: 130, w: 90, h: 70 },
  { id: 14, size: '0.92 acres', timeline: 'Q2 2026', status: 'phase2',    x: 640, y: 130, w: 90, h: 70 },
  { id: 15, size: '0.80 acres', timeline: 'Q3 2025', status: 'available', x: 40,  y: 220, w: 90, h: 70 },
  { id: 16, size: '1.05 acres', timeline: 'Q4 2025', status: 'available', x: 140, y: 220, w: 90, h: 70 },
  { id: 17, size: '0.75 acres', timeline: 'Q4 2025', status: 'reserved',  x: 240, y: 220, w: 90, h: 70 },
  { id: 18, size: '0.88 acres', timeline: 'Q1 2026', status: 'available', x: 340, y: 220, w: 90, h: 70 },
  { id: 19, size: '0.95 acres', timeline: 'Q1 2026', status: 'phase2',    x: 440, y: 220, w: 90, h: 70 },
  { id: 20, size: '1.15 acres', timeline: 'Q2 2026', status: 'phase2',    x: 540, y: 220, w: 90, h: 70 },
];

const statusConfig: Record<LotStatus, { label: string; fill: string; stroke: string; badge: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
  available:  { label: 'Available',         fill: '#cce4f8', stroke: '#2b7fd4', badge: 'default' },
  reserved:   { label: 'Reserved',          fill: '#f8d7da', stroke: '#dc3545', badge: 'destructive' },
  model:      { label: 'Model Coming Soon', fill: '#d5dff0', stroke: '#1e4480', badge: 'secondary' },
  phase2:     { label: 'Phase 2',           fill: '#e8f3fc', stroke: '#7a9acb', badge: 'outline' },
};

interface LotPopupProps {
  lot: Lot;
  onClose: () => void;
  onRequestInfo: (lotId: number) => void;
}

function LotPopup({ lot, onClose, onRequestInfo }: LotPopupProps) {
  const config = statusConfig[lot.status];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-card rounded-xl shadow-luxury-lg border border-border p-6 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">Lot {lot.id}</h3>
            <Badge variant={config.badge} className="mt-1 font-body text-xs">{config.label}</Badge>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-3 text-sm font-body">
            <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="text-muted-foreground">Lot Size:</span>
            <span className="font-medium text-foreground">{lot.size}</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-body">
            <Calendar className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="text-muted-foreground">Est. Build Start:</span>
            <span className="font-medium text-foreground">{lot.timeline}</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-body">
            <Info className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="text-muted-foreground">Phase:</span>
            <span className="font-medium text-foreground">Phase 1</span>
          </div>
        </div>
        <Button
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold"
          onClick={() => { onRequestInfo(lot.id); onClose(); }}
        >
          Request Info on This Lot
        </Button>
      </div>
    </div>
  );
}

interface LotMapProps {
  onSelectLot: (lotId: number) => void;
}

export default function LotMap({ onSelectLot }: LotMapProps) {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);

  const handleRequestInfo = (lotId: number) => {
    onSelectLot(lotId);
    const el = document.getElementById('priority-list');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="homesites" className="py-20 lg:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">
            Community Map
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Available Homesites
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Click any lot to view details, size, and estimated build timeline. Phase 1 lots are filling fast.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.entries(statusConfig).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2 font-body text-sm">
              <div
                className="w-4 h-4 rounded-sm border-2"
                style={{ backgroundColor: val.fill, borderColor: val.stroke }}
              />
              <span className="text-foreground">{val.label}</span>
            </div>
          ))}
        </div>

        {/* SVG Map */}
        <div className="bg-card rounded-xl border border-border shadow-luxury overflow-x-auto">
          <div className="min-w-[780px]">
            <svg
              viewBox="0 0 780 320"
              className="w-full"
              style={{ minHeight: '280px' }}
            >
              {/* Road */}
              <rect x="0" y="300" width="780" height="20" fill="#aabfe1" opacity="0.5" />
              <text x="390" y="314" textAnchor="middle" fontSize="9" fill="#4f78b5" fontFamily="Inter, sans-serif">
                MEDINA VALLEY DRIVE
              </text>

              {/* Lots */}
              {lots.map((lot) => {
                const config = statusConfig[lot.status];
                return (
                  <g
                    key={lot.id}
                    onClick={() => setSelectedLot(lot)}
                    className="cursor-pointer"
                    style={{ transition: 'opacity 0.15s' }}
                  >
                    <rect
                      x={lot.x}
                      y={lot.y}
                      width={lot.w}
                      height={lot.h}
                      fill={config.fill}
                      stroke={config.stroke}
                      strokeWidth="2"
                      rx="4"
                      className="hover:opacity-80 transition-opacity"
                    />
                    <text
                      x={lot.x + lot.w / 2}
                      y={lot.y + lot.h / 2 - 6}
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="600"
                      fill="#0d1b2a"
                      fontFamily="Playfair Display, serif"
                    >
                      {lot.id}
                    </text>
                    <text
                      x={lot.x + lot.w / 2}
                      y={lot.y + lot.h / 2 + 10}
                      textAnchor="middle"
                      fontSize="8"
                      fill="#1e4480"
                      fontFamily="Inter, sans-serif"
                    >
                      {lot.size}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <p className="text-center font-body text-sm text-muted-foreground mt-4">
          * Placeholder map. Actual lot layout subject to final survey and plat approval.
        </p>
      </div>

      {/* Lot Popup */}
      {selectedLot && (
        <LotPopup
          lot={selectedLot}
          onClose={() => setSelectedLot(null)}
          onRequestInfo={handleRequestInfo}
        />
      )}
    </section>
  );
}
