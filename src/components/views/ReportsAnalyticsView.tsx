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
    { state: 'Gujarat', projects: 2, totalHa: 4850, acquiredHa: 4710, pct: 97, avgDays: 142, compliance: 'Compliant' },
    { state: 'Maharashtra', projects: 2, totalHa: 5930, acquiredHa: 5303, pct: 89, avgDays: 210, compliance: 'CRZ Review Active' },
    { state: 'Tamil Nadu', projects: 1, totalHa: 2650, acquiredHa: 2570, pct: 97, avgDays: 128, compliance: 'Compliant' },
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
    setTimeout(() => setDownloading(false), 800);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              CAG & Parliamentary Briefing Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">
              National Infrastructure Monitoring & Audit Dossier
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Executive Compliance Reports & State Scorecards
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl mt-0.5">
            Automated statutory reporting for Comptroller and Auditor General (CAG) compliance, Parliamentary Questions (Lok Sabha / Rajya Sabha), and PMO Pragati reviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            disabled={downloading}
            className="px-3.5 py-2 bg-[#1B365D] hover:bg-[#122642] text-white rounded text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Generating Dossier...' : 'Export National Dossier (CSV)'}</span>
          </button>
        </div>
      </div>

      {/* Parliamentary Q&A Ready Brief Card */}
      <div className="bg-white border border-slate-200 rounded p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Parliamentary Question (PQ) Briefing Note
            </span>
            <span className="text-xs text-slate-500 font-medium">Lok Sabha Starred Question Reference</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">Session: Monsoon 2026</span>
        </div>

        <div className="text-xs text-slate-700 leading-relaxed space-y-2">
          <p>
            <strong>Subject:</strong> Status of land acquisition, compensation disbursal, and pending litigations across flagship National Corridor projects under PM GatiShakti National Master Plan.
          </p>
          <div className="p-3 bg-slate-50 rounded border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <span className="text-slate-500 text-[11px] block">Total Land Acquired Nationally</span>
              <strong className="text-slate-900 text-sm">17,533 Hectares (78.1%)</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block">Total DBT Compensation Disbursed</span>
              <strong className="text-emerald-800 text-sm">₹11,040 Crores (Direct Settlement)</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block">Active High Court Stay Orders</span>
              <strong className="text-rose-800 text-sm">14 Writs Under Vacation Motion</strong>
            </div>
          </div>
        </div>
      </div>

      {/* State-Wise Performance Scorecard */}
      <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            State Land Acquisition Performance Scorecard
          </h2>
          <span className="text-xs text-slate-500">
            Monitored against statutory Section 19 12-month SLA limitation
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-2.5 px-4">State</th>
                <th className="py-2.5 px-4">Active Projects</th>
                <th className="py-2.5 px-4">Land Required (Ha)</th>
                <th className="py-2.5 px-4">Land Acquired (Ha)</th>
                <th className="py-2.5 px-4">Progress Rate</th>
                <th className="py-2.5 px-4">Avg SLA Days</th>
                <th className="py-2.5 px-4">Statutory Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {statePerformance.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#1B365D]">{s.state}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{s.projects} Projects</td>
                  <td className="py-3 px-4 text-slate-700">{s.totalHa.toLocaleString()} Ha</td>
                  <td className="py-3 px-4 text-slate-900 font-semibold">{s.acquiredHa.toLocaleString()} Ha</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${s.pct > 90 ? 'bg-emerald-600' : 'bg-blue-600'}`}
                          style={{ width: `${s.pct}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-800">{s.pct}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">{s.avgDays} Days</td>
                  <td className="py-3 px-4">
                    <Badge variant={s.compliance === 'Compliant' ? 'emerald' : 'amber'}>
                      {s.compliance}
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
