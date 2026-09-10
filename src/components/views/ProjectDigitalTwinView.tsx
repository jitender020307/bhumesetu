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
  ShieldCheck,
  Building2,
  Clock
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

  // Linear Chainage Packages
  const packages = [
    {
      pkgName: 'Package 1 (Km 0+000 - Km 85+200)',
      section: 'Vadodara to Bharuch Section',
      lengthKm: 85.2,
      landRequiredHa: 980,
      acquiredHa: 980,
      status: '100% Handed Over',
      disputesCount: 0
    },
    {
      pkgName: 'Package 2 (Km 85+200 - Km 182+400)',
      section: 'Bharuch to Surat Section',
      lengthKm: 97.2,
      landRequiredHa: 1120,
      acquiredHa: 1090,
      status: '97% Possession Taken',
      disputesCount: 2
    },
    {
      pkgName: 'Package 3 (Km 182+400 - Km 290+100)',
      section: 'Surat to Valsad Section',
      lengthKm: 107.7,
      landRequiredHa: 1190,
      acquiredHa: 1115,
      status: '94% Possession Taken',
      disputesCount: 3
    },
    {
      pkgName: 'Package 4 (Km 290+100 - Km 378+000)',
      section: 'Palghar to Vasai / JNPT Section',
      lengthKm: 87.9,
      landRequiredHa: 960,
      acquiredHa: 640,
      status: 'Active Court Stay & Valuation Review',
      disputesCount: 9
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Project Selector Bar */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Select Corridor:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {projects.map(p => (
              <button
                key={p.id}
                onClick={() => onSelectProject(p.id)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                  p.id === project.id
                    ? 'bg-[#1B365D] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {p.name.split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onOpenGis}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-50 border border-slate-300 text-blue-900 text-xs font-semibold hover:bg-slate-100"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Inspect Corridor on GIS Map</span>
        </button>
      </div>

      {/* Corridor Overview Hero Card */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {project.ministry}
              </span>
              <span className="text-xs font-mono text-slate-500 font-semibold">{project.code}</span>
              <Badge variant={project.acquisitionPercentage > 90 ? 'emerald' : 'blue'}>
                {project.status}
              </Badge>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{project.name}</h2>
            <p className="text-xs text-slate-600">
              {project.corridor} • Executing Authority: <strong>{project.executingAgency}</strong>
            </p>
          </div>

          <div className="flex items-center gap-6 text-right">
            <div>
              <span className="text-[11px] text-slate-500 block">Total Budget / Disbursed</span>
              <span className="text-base font-bold text-slate-900">
                ₹{project.compensationDisbursedCr.toLocaleString()} Cr{' '}
                <span className="text-xs text-slate-500 font-normal">/ ₹{project.totalBudgetCr.toLocaleString()} Cr</span>
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Statutory Completion</span>
              <span className="text-sm font-semibold text-[#1B365D] flex items-center justify-end gap-1">
                <Calendar className="w-3.5 h-3.5" /> {project.targetCompletionDate}
              </span>
            </div>
          </div>
        </div>

        {/* Milestone Indicator Banner */}
        <div className="p-3.5 rounded bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              Current Statutory Milestone
            </span>
            <p className="text-xs text-slate-800 font-medium mt-1">
              {project.currentMilestone}
            </p>
          </div>

          <div className="sm:text-right shrink-0">
            <span className="text-[11px] text-slate-500 block">Composite Legal Risk:</span>
            <span className={`text-sm font-bold ${project.riskScore > 50 ? 'text-rose-800' : 'text-emerald-800'}`}>
              {project.riskScore} / 100 ({project.riskScore > 50 ? 'High Court Review' : 'Nominal'})
            </span>
          </div>
        </div>
      </div>

      {/* Linear Corridor Chainage Packages */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Corridor Linear Chainage & Package Digital Twin
            </h3>
            <p className="text-xs text-slate-600">
              Continuous acquisition monitoring across statutory construction packages
            </p>
          </div>
          <span className="text-xs text-slate-600 font-semibold">
            Total Length: {project.totalLengthKm} km
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {packages.map((pkg, idx) => {
            const pct = Math.round((pkg.acquiredHa / pkg.landRequiredHa) * 100);
            return (
              <div
                key={idx}
                className="p-4 rounded border border-slate-200 bg-slate-50/50 space-y-3 text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                    <span className="font-bold text-[#1B365D] text-xs truncate">
                      {pkg.pkgName.split('(')[0]}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{pkg.lengthKm} km</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1 font-medium">{pkg.section}</p>

                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Acquired:</span>
                      <span className="font-bold text-slate-900">{pkg.acquiredHa} / {pkg.landRequiredHa} Ha</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${pct === 100 ? 'bg-emerald-600' : pct > 90 ? 'bg-blue-600' : 'bg-rose-600'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <span className={`font-semibold ${pkg.disputesCount > 0 ? 'text-rose-800' : 'text-emerald-800'}`}>
                    {pkg.disputesCount > 0 ? `⚠ ${pkg.disputesCount} Legal Stays` : '✓ 0 Stays'}
                  </span>
                  <span className="font-bold text-slate-700">{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Parcels in Corridor Table */}
      <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Surveyed Land Parcels along Alignment ({projectParcels.length} Records)
          </h3>
          <span className="text-xs text-slate-500">
            Click any parcel to inspect cadastral records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-2.5 px-4">Survey #</th>
                <th className="py-2.5 px-4">Khata #</th>
                <th className="py-2.5 px-4">Khatedar (Landowner)</th>
                <th className="py-2.5 px-4">Village</th>
                <th className="py-2.5 px-4">Area (Acres)</th>
                <th className="py-2.5 px-4">Compensation (LARR)</th>
                <th className="py-2.5 px-4">Statutory Status</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {projectParcels.map(parcel => (
                <tr key={parcel.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#1B365D]">
                    #{parcel.surveyNumber}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {parcel.khataNumber}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">
                    {parcel.landOwnerName}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {parcel.village}, {parcel.district}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {parcel.areaAcres} Acres
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    ₹{(parcel.totalCompensationRupees / 100000).toFixed(2)} Lakhs
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={parcel.status === 'Compensation_Paid' ? 'emerald' : 'blue'}>
                      {parcel.status.replace(/_/g, ' ')}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onInspectParcel(parcel)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-blue-900 border border-slate-300 rounded font-semibold text-xs"
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
