import React, { useState } from 'react';
import { InfrastructureProject, LandParcel, AlertDispute } from '../../types';
import { Badge } from '../common/Badge';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  Layers, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface ProjectDigitalTwinViewProps {
  projects: InfrastructureProject[];
  parcels: LandParcel[];
  alerts: AlertDispute[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  onInspectParcel: (parcel: LandParcel) => void;
  onOpenGis: () => void;
}

export const ProjectDigitalTwinView: React.FC<ProjectDigitalTwinViewProps> = ({
  projects,
  parcels,
  alerts,
  selectedProjectId,
  onSelectProject,
  onInspectParcel,
  onOpenGis
}) => {
  const project = projects.find(p => p.id === selectedProjectId) || projects[0];
  const projectParcels = parcels.filter(p => p.projectId === project.id);
  const projectAlerts = alerts.filter(a => a.projectCode === project.code || a.projectName.includes(project.name));

  // Simulated Linear Chainage Packages
  const packages = [
    {
      pkgName: 'Package 1 (Km 0+000 - Km 85+200)',
      section: 'Vadodara to Bharuch Section',
      lengthKm: 85.2,
      landRequiredHa: 980,
      acquiredHa: 980,
      status: '100% Handed Over',
      statusColor: 'emerald',
      disputesCount: 0
    },
    {
      pkgName: 'Package 2 (Km 85+200 - Km 182+400)',
      section: 'Bharuch to Surat Section',
      lengthKm: 97.2,
      landRequiredHa: 1120,
      acquiredHa: 1090,
      status: '97% Possession Taken',
      statusColor: 'sky',
      disputesCount: 2
    },
    {
      pkgName: 'Package 3 (Km 182+400 - Km 290+100)',
      section: 'Surat to Valsad Section',
      lengthKm: 107.7,
      landRequiredHa: 1190,
      acquiredHa: 1115,
      status: '94% Possession Taken',
      statusColor: 'sky',
      disputesCount: 3
    },
    {
      pkgName: 'Package 4 (Km 290+100 - Km 378+000)',
      section: 'Palghar to Vasai / JNPT Terminal Section',
      lengthKm: 87.9,
      landRequiredHa: 960,
      acquiredHa: 640,
      status: 'Active Court Stay & Valuation Protest',
      statusColor: 'rose',
      disputesCount: 9
    }
  ];

  return (
    <div className="space-y-6">
      {/* Project Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Select Corridor Twin:</span>
          <div className="flex flex-wrap gap-1.5">
            {projects.map(p => (
              <button
                key={p.id}
                onClick={() => onSelectProject(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  p.id === project.id
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {p.name.split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onOpenGis}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/80 border border-sky-800 text-sky-300 text-xs font-medium hover:bg-sky-900/60"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>View Corridor on GIS</span>
        </button>
      </div>

      {/* Corridor Overview Hero Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant={project.ministry === 'MoRTH' ? 'amber' : 'sky'}>{project.ministry}</Badge>
              <span className="text-xs font-mono text-slate-400">{project.code}</span>
              <Badge variant={project.acquisitionPercentage > 90 ? 'emerald' : 'amber'}>
                {project.status}
              </Badge>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">{project.name}</h2>
            <p className="text-xs text-slate-400">{project.corridor} • Executing Agency: {project.executingAgency}</p>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <span className="text-xs text-slate-400 block">Total Budget / Disbursed</span>
              <span className="text-base font-bold font-mono text-slate-100">
                ₹{project.compensationDisbursedCr.toLocaleString()} Cr <span className="text-xs text-slate-400 font-normal">/ ₹{project.totalBudgetCr.toLocaleString()} Cr</span>
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Target Completion</span>
              <span className="text-sm font-semibold text-sky-400 flex items-center justify-end gap-1">
                <Calendar className="w-3.5 h-3.5" /> {project.targetCompletionDate}
              </span>
            </div>
          </div>
        </div>

        {/* Milestone Indicator Banner */}
        <div className="mt-4 p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 mt-0.5">
            <Layers className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Current Statutory Milestone:</span>
            <p className="text-xs text-slate-200 font-medium mt-0.5">{project.currentMilestone}</p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-slate-400 block">Risk Score:</span>
            <span className={`text-sm font-bold ${project.riskScore > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {project.riskScore} / 100
            </span>
          </div>
        </div>
      </div>

      {/* Linear Corridor Chainage Packages (Digital Twin View) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100">Corridor Linear Chainage & Package Digital Twin</h3>
            <p className="text-xs text-slate-400">End-to-end continuous acquisition monitoring from Km 0+000 to Terminal</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Total Length: {project.totalLengthKm} km</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {packages.map((pkg, idx) => {
            const pct = Math.round((pkg.acquiredHa / pkg.landRequiredHa) * 100);
            return (
              <div 
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  pkg.statusColor === 'rose'
                    ? 'bg-rose-950/20 border-rose-800/80'
                    : pkg.statusColor === 'emerald'
                    ? 'bg-emerald-950/20 border-emerald-800/60'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300">PKG #{idx + 1}</span>
                  <Badge variant={pkg.statusColor as 'rose' | 'emerald' | 'sky'} size="sm">
                    {pct}% Acquired
                  </Badge>
                </div>
                <h4 className="text-xs font-bold text-slate-100 mt-2">{pkg.section}</h4>
                <span className="text-[10px] text-slate-400 font-mono block">{pkg.pkgName}</span>

                <div className="mt-3 space-y-1 text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Land Handover:</span>
                    <span className="font-mono text-slate-200">{pkg.acquiredHa} / {pkg.landRequiredHa} Ha</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${pct === 100 ? 'bg-emerald-400' : pct > 90 ? 'bg-sky-400' : 'bg-rose-400'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Disputes / Stays:</span>
                  <span className={pkg.disputesCount > 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-medium'}>
                    {pkg.disputesCount} Active
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Corridor Parcels List */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100">
              Corridor Land Parcels Ledger ({projectParcels.length} Parcels Listed)
            </h3>
            <p className="text-xs text-slate-400">Audited land parcels with RoR 7/12 records and solatium status</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Survey Number</th>
                <th className="py-3 px-4">Village & Taluk</th>
                <th className="py-3 px-4">Khatedar / Landowner</th>
                <th className="py-3 px-4">Area & Category</th>
                <th className="py-3 px-4">Total Award (LARR 2013)</th>
                <th className="py-3 px-4">PFMS DBT Status</th>
                <th className="py-3 px-4">LARR Stage</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {projectParcels.map(parcel => (
                <tr key={parcel.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                    {parcel.surveyNumber}
                    <span className="block text-[10px] text-slate-400 font-normal">{parcel.subDivision}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-slate-200 font-medium">{parcel.village}</span>
                    <span className="block text-[10px] text-slate-400">{parcel.taluk}, {parcel.district}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-slate-200 font-medium">{parcel.landOwnerName}</span>
                    <span className="block text-[10px] text-slate-400 font-mono">Khata: {parcel.khataNumber}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-100">{parcel.areaAcres} Acres</span>
                    <span className="block text-[10px] text-slate-400">{parcel.landCategory}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-200">
                    ₹{(parcel.totalCompensationRupees / 10000000).toFixed(2)} Cr
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={parcel.disbursedStatus === 'Disbursed' ? 'emerald' : parcel.disbursedStatus === 'Escrow_Deposited' ? 'amber' : 'rose'}>
                      {parcel.disbursedStatus}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={parcel.status === 'In_Dispute' ? 'rose' : parcel.status === 'Compensation_Paid' ? 'emerald' : 'sky'}>
                      {parcel.status.replace(/_/g, ' ')}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onInspectParcel(parcel)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-sky-900/70 border border-slate-700 text-sky-300 text-xs font-medium"
                    >
                      Inspect
                    </button>
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
