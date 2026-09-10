import React, { useState } from 'react';
import { AlertDispute } from '../../types';
import { Badge } from '../common/Badge';
import { 
  AlertTriangle, 
  Gavel, 
  Calendar, 
  IndianRupee, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  FileText, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface AlertsDisputesViewProps {
  alerts: AlertDispute[];
  onResolveDispute: (id: string, note: string) => Promise<void>;
}

export const AlertsDisputesView: React.FC<AlertsDisputesViewProps> = ({
  alerts,
  onResolveDispute
}) => {
  const [selectedDispute, setSelectedDispute] = useState<AlertDispute | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const [resolving, setResolving] = useState(false);

  const totalFinancialAtRisk = alerts.reduce((acc, a) => acc + (a.status !== 'Stay Vacated' ? a.financialImplicationCr : 0), 0);
  const totalImpactedAcres = alerts.reduce((acc, a) => acc + (a.status !== 'Stay Vacated' ? a.impactedAreaAcres : 0), 0);
  const activeStaysCount = alerts.filter(a => a.status !== 'Stay Vacated').length;

  const handleResolveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDispute || !resolutionNote) return;
    setResolving(true);
    try {
      await onResolveDispute(selectedDispute.id, resolutionNote);
      setSelectedDispute(null);
      setResolutionNote('');
    } finally {
      setResolving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="rose" pulse>High Court & LARR Tribunal Bridge</Badge>
            <span className="text-xs text-slate-400">SIH26016 Real-Time Escalation Radar</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Litigation Stays, Forest Clearance & Section 64 Disputes
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Real-time litigation tracking integrated with e-Courts CIS to flag interim stay orders, advocate appointments, upcoming hearing dates, and counter-affidavit deadlines.
          </p>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold uppercase text-slate-400">Active High Court & Tribunal Stays</span>
          <div className="mt-2 text-2xl font-black font-mono text-rose-400">{activeStaysCount} Pending</div>
          <span className="text-[11px] text-slate-400">Across 4 National Corridors</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold uppercase text-slate-400">Capital At Risk Due to Stays</span>
          <div className="mt-2 text-2xl font-black font-mono text-amber-400">₹{totalFinancialAtRisk} Crores</div>
          <span className="text-[11px] text-slate-400">Escrowed / Delayed Project CAPEX</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold uppercase text-slate-400">Land Extent Under Litigation</span>
          <div className="mt-2 text-2xl font-black font-mono text-sky-400">{totalImpactedAcres.toFixed(1)} Acres</div>
          <span className="text-[11px] text-slate-400">Critical Path Corridors</span>
        </div>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {alerts.map(item => {
          const isStayVacated = item.status === 'Stay Vacated';

          return (
            <div 
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                isStayVacated 
                  ? 'bg-slate-900/60 border-slate-800 opacity-80' 
                  : item.severity === 'Critical'
                  ? 'bg-rose-950/20 border-rose-800/80 shadow-lg'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={item.severity === 'Critical' ? 'rose' : 'amber'}>
                      {item.type}
                    </Badge>
                    <span className="text-xs font-mono font-bold text-slate-200">{item.id}</span>
                    <Badge variant={isStayVacated ? 'emerald' : 'rose'} size="sm">
                      {item.status}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100">{item.projectName}</h3>
                  <div className="text-xs text-slate-400">
                    Impacted Survey Numbers: <strong className="text-slate-200">{item.surveyNumber}</strong> ({item.village}, {item.state})
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right shrink-0">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">CAPEX Implication</span>
                    <span className="text-sm font-bold font-mono text-rose-400">
                      ₹{item.financialImplicationCr} Cr
                    </span>
                    <span className="text-[10px] text-slate-400 block">{item.impactedAreaAcres} Acres</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Days Pending</span>
                    <span className="text-xs font-mono font-bold text-slate-200 flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {item.daysPending} days
                    </span>
                  </div>
                </div>
              </div>

              {/* Description & Court Details */}
              <div className="mt-3 text-xs text-slate-300">
                <p className="leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3 text-slate-400">
                  {item.courtName && (
                    <span className="flex items-center gap-1">
                      <Gavel className="w-3.5 h-3.5 text-sky-400" />
                      <span>{item.courtName}</span>
                    </span>
                  )}
                  {item.hearingDate && (
                    <span className="flex items-center gap-1 font-mono text-amber-300">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Next Hearing: {item.hearingDate}</span>
                    </span>
                  )}
                </div>

                {!isStayVacated && (
                  <button
                    onClick={() => setSelectedDispute(item)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 rounded text-xs font-medium transition-colors"
                  >
                    Action / Vacate Motion →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resolution Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-100">
              Record Resolution / Vacation Order
            </h3>
            <p className="text-xs text-slate-400">
              Dispute: {selectedDispute.id} ({selectedDispute.courtName})
            </p>

            <form onSubmit={handleResolveSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Resolution / Order Details</label>
                <textarea
                  required
                  rows={3}
                  value={resolutionNote}
                  onChange={e => setResolutionNote(e.target.value)}
                  placeholder="e.g. Bombay High Court Division Bench vacated interim stay order following submission of revised CRZ clearance."
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedDispute(null)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resolving}
                  className="px-3.5 py-1.5 bg-emerald-700 text-white rounded hover:bg-emerald-600 font-medium"
                >
                  {resolving ? 'Recording...' : 'Mark Stay Vacated'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
