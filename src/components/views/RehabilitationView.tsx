import React from 'react';
import { RehabilitationRecord } from '../../types';
import { Badge } from '../common/Badge';
import { 
  Home, 
  Users, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';

interface RehabilitationViewProps {
  records: RehabilitationRecord[];
}

export const RehabilitationView: React.FC<RehabilitationViewProps> = ({ records }) => {
  const displacedCount = records.filter(r => r.isDisplacedFamily).length;
  const houseAllottedCount = records.filter(r => r.entitlements.alternativeHousePlotAllotted).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="indigo">RFCTLARR 2013 Second & Third Schedule</Badge>
            <span className="text-xs text-slate-400">Rehabilitation & Resettlement Administrator</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Rehabilitation & Resettlement (R&R) Entitlements
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Statutory tracking of alternative housing plots, tribal displacement enhancements, subsistence grants, and vocational rehabilitation assistance.
          </p>
        </div>
      </div>

      {/* R&R Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold uppercase text-slate-400">Displaced Families (Project Affected)</span>
          <div className="mt-2 text-2xl font-black font-mono text-slate-100">{displacedCount}</div>
          <span className="text-[11px] text-slate-400">100% Social Impact Audited</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold uppercase text-slate-400">Alternative House Plots Allotted</span>
          <div className="mt-2 text-2xl font-black font-mono text-emerald-400">{houseAllottedCount}</div>
          <span className="text-[11px] text-emerald-400">Model R&R Colonies</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold uppercase text-slate-400">Subsistence Grants Disbursed</span>
          <div className="mt-2 text-2xl font-black font-mono text-sky-400">₹36,000 - ₹60,000</div>
          <span className="text-[11px] text-slate-400">Per Family / Annum</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold uppercase text-slate-400">Vocational Training & Jobs</span>
          <div className="mt-2 text-2xl font-black font-mono text-indigo-400">92% Enrolled</div>
          <span className="text-[11px] text-slate-400">Skill India Mission Tie-up</span>
        </div>
      </div>

      {/* R&R Family Ledger */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100">
            Project-Affected Families Entitlement Matrix
          </h3>
          <span className="text-xs text-slate-400">Compliance with Section 31 R&R Scheme</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {records.map(rec => (
            <div key={rec.id} className="p-4 hover:bg-slate-800/40 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-100">{rec.beneficiaryName}</span>
                    <Badge variant={rec.isDisplacedFamily ? 'rose' : 'slate'} size="sm">
                      {rec.isDisplacedFamily ? 'Displaced Family' : 'Land Loser Only'}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {rec.village} • Project: {rec.projectCode}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">Grievance Status:</span>
                  <Badge variant={rec.grievanceStatus === 'Resolved' ? 'emerald' : rec.grievanceStatus === 'Pending' ? 'amber' : 'slate'}>
                    {rec.grievanceStatus}
                  </Badge>
                </div>
              </div>

              {/* Entitlement Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Residential Plot</span>
                  {rec.entitlements.alternativeHousePlotAllotted ? (
                    <div className="mt-1">
                      <span className="font-semibold text-emerald-400 block">{rec.entitlements.plotNumber}</span>
                      <span className="text-[10px] text-slate-400">{rec.entitlements.colonyName}</span>
                    </div>
                  ) : (
                    <span className="text-slate-500 mt-1 block">Not Applicable</span>
                  )}
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Subsistence Allowance</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-200">
                      ₹{rec.entitlements.subsistenceGrantAmount.toLocaleString()}
                    </span>
                    <Badge variant={rec.entitlements.subsistenceGrantDisbursed ? 'emerald' : 'amber'} size="sm">
                      {rec.entitlements.subsistenceGrantDisbursed ? 'Disbursed' : 'In Pipeline'}
                    </Badge>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Relocation Grant</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-200">
                      ₹{rec.entitlements.displacementAllowanceAmount.toLocaleString()}
                    </span>
                    <Badge variant={rec.entitlements.displacementAllowanceDisbursed ? 'emerald' : 'amber'} size="sm">
                      {rec.entitlements.displacementAllowanceDisbursed ? 'Paid' : 'Pending'}
                    </Badge>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Livelihood Assistance</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-slate-200 font-medium">{rec.entitlements.vocationalTrainingStatus}</span>
                    <Badge variant="indigo" size="sm">
                      {rec.entitlements.employmentAssistance}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
