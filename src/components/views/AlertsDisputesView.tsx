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
  ExternalLink,
  Plus,
  X
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
  const [hearingDateInput, setHearingDateInput] = useState('');
  const [resolving, setResolving] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const totalFinancialAtRisk = alerts.reduce((acc, a) => acc + (a.status !== 'Stay Vacated' ? a.financialImplicationCr : 0), 0);
  const totalImpactedAcres = alerts.reduce((acc, a) => acc + (a.status !== 'Stay Vacated' ? a.impactedAreaAcres : 0), 0);
  const activeStaysCount = alerts.filter(a => a.status !== 'Stay Vacated').length;

  const filteredAlerts = alerts.filter(a => {
    if (activeFilter === 'ACTIVE') return a.status !== 'Stay Vacated';
    if (activeFilter === 'RESOLVED') return a.status === 'Stay Vacated';
    return true;
  });

  const handleResolveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDispute || !resolutionNote) return;
    setResolving(true);
    try {
      await onResolveDispute(selectedDispute.id, `${resolutionNote} ${hearingDateInput ? `(Next Hearing: ${hearingDateInput})` : ''}`);
      setSelectedDispute(null);
      setResolutionNote('');
      setHearingDateInput('');
    } finally {
      setResolving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              High Court, Tribunal & Section 64 Objections
            </span>
            <span className="text-xs text-slate-500 font-medium">
              National Land Acquisition Escalation Radar
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Disputes, Litigation Stays & Grievances Queue
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl mt-0.5">
            Real-time litigation tracking integrated with e-Courts CIS to monitor interim stay orders, advocate appointments, upcoming hearing dates, and counter-affidavits.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded border border-slate-200">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1 text-xs font-semibold rounded ${activeFilter === 'ALL' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            All Cases ({alerts.length})
          </button>
          <button
            onClick={() => setActiveFilter('ACTIVE')}
            className={`px-3 py-1 text-xs font-semibold rounded ${activeFilter === 'ACTIVE' ? 'bg-white text-rose-800 shadow-2xs' : 'text-slate-600'}`}
          >
            Active ({activeStaysCount})
          </button>
          <button
            onClick={() => setActiveFilter('RESOLVED')}
            className={`px-3 py-1 text-xs font-semibold rounded ${activeFilter === 'RESOLVED' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600'}`}
          >
            Vacated / Resolved
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">Active Judicial Stays</span>
          <div className="mt-2 text-2xl font-bold text-rose-800">{activeStaysCount} Orders</div>
          <span className="text-[11px] text-slate-500">Across 4 PM GatiShakti Corridors</span>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">Capital At Risk Due to Stays</span>
          <div className="mt-2 text-2xl font-bold text-slate-900">₹{totalFinancialAtRisk} Crores</div>
          <span className="text-[11px] text-slate-500">Delayed Infrastructure Construction</span>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">Land Extent In Litigation</span>
          <div className="mt-2 text-2xl font-bold text-blue-900">{totalImpactedAcres.toFixed(1)} Acres</div>
          <span className="text-[11px] text-slate-500">Critical Right-of-Way Alignment</span>
        </div>
      </div>

      {/* Disputes Queue List */}
      <div className="space-y-3">
        {filteredAlerts.map(item => {
          const isStayVacated = item.status === 'Stay Vacated';

          return (
            <div 
              key={item.id}
              className={`p-4 rounded border transition-all text-xs ${
                isStayVacated 
                  ? 'bg-slate-50/70 border-slate-200 opacity-80' 
                  : item.severity === 'Critical'
                  ? 'bg-rose-50/40 border-rose-300 shadow-2xs'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 pb-3 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={item.severity === 'Critical' ? 'rose' : 'amber'}>
                      {item.type}
                    </Badge>
                    <span className="text-xs font-bold text-slate-700">{item.id}</span>
                    <Badge variant={isStayVacated ? 'emerald' : 'rose'} size="sm">
                      {item.status}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{item.projectName}</h3>
                  <div className="text-slate-600">
                    Impacted Survey Numbers: <strong className="text-slate-900">{item.surveyNumber}</strong> ({item.village}, {item.state})
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right shrink-0">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">CAPEX Implication</span>
                    <span className="text-sm font-bold text-rose-800">
                      ₹{item.financialImplicationCr} Cr
                    </span>
                    <span className="text-[10px] text-slate-500 block">{item.impactedAreaAcres} Acres</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Days Pending</span>
                    <span className="text-xs font-bold text-slate-900 flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {item.daysPending} Days
                    </span>
                  </div>
                </div>
              </div>

              {/* Description & Court Details */}
              <div className="mt-3 text-slate-700">
                <p className="leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-4 text-slate-600">
                  {item.courtName && (
                    <span className="flex items-center gap-1 font-semibold text-[#1B365D]">
                      <Gavel className="w-3.5 h-3.5 text-blue-700" />
                      <span>{item.courtName}</span>
                    </span>
                  )}
                  {item.hearingDate && (
                    <span className="flex items-center gap-1 font-semibold text-amber-900">
                      <Calendar className="w-3.5 h-3.5 text-amber-700" />
                      <span>Next Hearing: {item.hearingDate}</span>
                    </span>
                  )}
                </div>

                {!isStayVacated && (
                  <button
                    onClick={() => setSelectedDispute(item)}
                    className="px-3 py-1 bg-[#1B365D] hover:bg-[#122642] text-white rounded font-semibold transition-colors"
                  >
                    Schedule Hearing / Vacate Motion →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resolution & Hearing Scheduler Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white border border-slate-300 rounded max-w-md w-full shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Record Action / Vacation Order
                </h3>
                <p className="text-xs text-slate-500">
                  Dispute: {selectedDispute.id} ({selectedDispute.courtName})
                </p>
              </div>
              <button onClick={() => setSelectedDispute(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleResolveSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Next Hearing Date / Schedule (Optional)
                </label>
                <input
                  type="date"
                  value={hearingDateInput}
                  onChange={e => setHearingDateInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Order Details / Counter Affidavit Remarks *
                </label>
                <textarea
                  required
                  rows={3}
                  value={resolutionNote}
                  onChange={e => setResolutionNote(e.target.value)}
                  placeholder="e.g. Division Bench vacated interim stay order following submission of revised CRZ clearance."
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedDispute(null)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resolving}
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-semibold"
                >
                  {resolving ? 'Recording...' : 'Mark Stay Vacated / Hearing Recorded'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
