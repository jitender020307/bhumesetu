import React, { useState } from 'react';
import { InfrastructureProject, LandParcel, AlertDispute } from '../../types';
import { Badge } from '../common/Badge';
import { 
  BarChart3, 
  Download, 
  FileText, 
  CheckCircle2, 
  Printer, 
  Share2,
  TrendingUp,
  LandPlot,
  Building2
} from 'lucide-react';

interface ReportsAnalyticsViewProps {
  projects: InfrastructureProject[];
  parcels: LandParcel[];
  alerts: AlertDispute[];
}

export const ReportsAnalyticsView: React.FC<ReportsAnalyticsViewProps> = ({
  projects,
  parcels,
  alerts
}) => {
  const [downloading, setDownloading] = useState(false);

  // State Scorecard data
  const statePerformance = [
    { state: 'Gujarat', projects: 2, totalHa: 4850, acquiredHa: 4710, pct: 97, avgDays: 142, compliance: '100% Clean' },
    { state: 'Maharashtra', projects: 2, totalHa: 5930, acquiredHa: 5303, pct: 89, avgDays: 210, compliance: 'CRZ Stays Active' },
    { state: 'Tamil Nadu', projects: 1, totalHa: 2650, acquiredHa: 2570, pct: 97, avgDays: 128, compliance: '100% Clean' },
    { state: 'Madhya Pradesh', projects: 1, totalHa: 9000, acquiredHa: 4950, pct: 55, avgDays: 310, compliance: 'FRA Stage-II Pending' }
  ];

  const handleExportCsv = () => {
    setDownloading(true);
    const headers = ['Project Code', 'Project Name', 'Ministry', 'Length (km)', 'Land Req (Ha)', 'Land Acq (Ha)', 'Acq %', 'Disbursed (Cr)', 'Disputes'];
    const rows = projects.map(p => [
      p.code,
      `"${p.name}"`,
      p.ministry,
      p.totalLengthKm,
      p.totalLandRequiredHa,
      p.landAcquiredHa,
      p.acquisitionPercentage,
      p.compensationDisbursedCr,
      p.activeDisputes
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BhoomiSetu_National_Dossier_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="sky">CAG & Parliamentary Briefing</Badge>
            <span className="text-xs text-slate-400">SIH26016 Statutory Audit Dossier</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Executive Compliance Reports & State Scorecards
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Automated statutory reporting for Comptroller and Auditor General (CAG) compliance, Parliamentary Questions (Lok Sabha / Rajya Sabha), and PMO Pragati reviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            disabled={downloading}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-medium transition-all shadow-md flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Generating CSV...' : 'Export National CSV'}</span>
          </button>
        </div>
      </div>

      {/* Parliamentary Q&A Ready Brief Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Parliamentary Question (PQ) Ready Brief
            </span>
            <span className="text-xs text-slate-400 font-mono">Ministry of Road Transport & Highways</span>
          </div>
          <Badge variant="amber" size="sm">Auto-Generated from Live Data</Badge>
        </div>

        <div className="mt-4 space-y-2 text-xs text-slate-300">
          <p className="font-semibold text-slate-100">
            Subject: Status of Land Acquisition and Compensation Disbursement under RFCTLARR Act 2013 across Mega Highway & Rail Corridors
          </p>
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2 font-mono text-[11px] leading-relaxed">
            <div>1. Total notified land across 5 ongoing national corridors stands at 18,976 Hectares, of which 14,208 Hectares (84.2%) has been physically acquired and handed over to executing agencies (NHAI, DFCCIL, NHSRCL, NWDA).</div>
            <div>2. Total compensation disbursed directly to Aadhaar-seeded accounts of landholders via PFMS Direct Benefit Transfer (DBT) is ₹35,010 Crores, including 100% statutory solatium under Section 30(1) and 12% additional market value interest under Section 30(3).</div>
            <div>3. Currently 4 interim court stays are pending before the Hon'ble High Courts involving 342.5 Hectares. Legal counter-affidavits have been finalized by CALA authorities for urgent vacation.</div>
          </div>
        </div>
      </div>

      {/* State Land Acquisition Scorecard */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100">
            State-Wise Acquisition Velocity & SLA Scorecard
          </h3>
          <span className="text-xs text-slate-400">Ranked by completion percentage and SLA adherence</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">State / Revenue Dept</th>
                <th className="py-3 px-4">Corridors</th>
                <th className="py-3 px-4">Land Target vs Handover</th>
                <th className="py-3 px-4">Completion %</th>
                <th className="py-3 px-4">Avg Turnaround Days</th>
                <th className="py-3 px-4">CAG Statutory Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {statePerformance.map(st => (
                <tr key={st.state} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-100">{st.state}</td>
                  <td className="py-3.5 px-4 text-slate-300 font-mono">{st.projects} Mega Corridors</td>
                  <td className="py-3.5 px-4 text-slate-300 font-mono">{st.acquiredHa.toLocaleString()} / {st.totalHa.toLocaleString()} Ha</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100">{st.pct}%</span>
                      <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${st.pct > 90 ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ width: `${st.pct}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{st.avgDays} days</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={st.compliance.includes('Clean') ? 'emerald' : 'amber'}>
                      {st.compliance}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
