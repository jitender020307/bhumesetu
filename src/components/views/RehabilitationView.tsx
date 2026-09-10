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
  ShieldCheck,
  Building2,
  Truck,
  Check
} from 'lucide-react';

interface RehabilitationViewProps {
  records: RehabilitationRecord[];
}

export const RehabilitationView: React.FC<RehabilitationViewProps> = ({ records }) => {
  const displacedCount = records.filter(r => r.isDisplacedFamily).length;
  const houseAllottedCount = records.filter(r => r.entitlements.alternativeHousePlotAllotted).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              RFCTLARR 2013 Second & Third Schedule
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Rehabilitation & Resettlement Administrator (Section 31)
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Rehabilitation & Resettlement (R&R) Entitlements
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl mt-0.5">
            Statutory tracking of alternative housing plots, tribal displacement enhancements, subsistence grants, and vocational rehabilitation assistance.
          </p>
        </div>
      </div>

      {/* R&R Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">Displaced Families (PAFs)</span>
          <div className="mt-2 text-2xl font-bold text-slate-900">{displacedCount} Families</div>
          <span className="text-[11px] text-slate-500">100% Social Impact Audited</span>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">Alternative House Plots Allotted</span>
          <div className="mt-2 text-2xl font-bold text-emerald-800">{houseAllottedCount} Allotted</div>
          <span className="text-[11px] text-emerald-700 font-medium">Model R&R Colony Approved</span>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">Subsistence Grants Disbursed</span>
          <div className="mt-2 text-2xl font-bold text-[#1B365D]">₹36,000 / PAF</div>
          <span className="text-[11px] text-slate-500">Per Family / 12 Months</span>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">Vocational Training & Jobs</span>
          <div className="mt-2 text-2xl font-bold text-blue-900">92% Enrolled</div>
          <span className="text-[11px] text-slate-500">Skill India Mission Tie-up</span>
        </div>
      </div>

      {/* R&R Family Ledger */}
      <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            Project-Affected Families Entitlement Matrix
          </h2>
          <span className="text-xs text-slate-500">
            Compliance with Section 31 R&R Scheme
          </span>
        </div>

        <div className="divide-y divide-slate-200">
          {records.map(rec => (
            <div key={rec.id} className="p-4 hover:bg-slate-50 transition-colors text-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1B365D] text-sm">{rec.beneficiaryName}</span>
                    <Badge variant={rec.isDisplacedFamily ? 'amber' : 'slate'} size="sm">
                      {rec.isDisplacedFamily ? 'Displaced Family' : 'Land Loser Only'}
                    </Badge>
                  </div>
                  <div className="text-slate-600 mt-0.5">
                    {rec.village} • Project: <strong>{rec.projectCode}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-500">R&R Grievance:</span>
                  <Badge variant={rec.grievanceStatus === 'Resolved' ? 'emerald' : 'amber'}>
                    {rec.grievanceStatus}
                  </Badge>
                </div>
              </div>

              {/* Statutory Entitlements Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">
                    Alternative Housing Plot
                  </span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">
                    {rec.entitlements.alternativeHousePlotAllotted 
                      ? `Plot #${rec.entitlements.plotNumber} (${rec.entitlements.colonyName})` 
                      : 'Not Applicable / Cash Option'}
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">
                    Subsistence Allowance (12 Mo)
                  </span>
                  <span className="font-semibold text-emerald-800 mt-0.5 block">
                    ₹{rec.entitlements.subsistenceGrantAmount.toLocaleString()} • Disbursed
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">
                    Transportation Allowance
                  </span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">
                    ₹{rec.entitlements.displacementAllowanceAmount.toLocaleString()} • {rec.entitlements.displacementAllowanceDisbursed ? 'Credited' : 'Pending'}
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">
                    Livelihood Assistance
                  </span>
                  <span className="font-semibold text-blue-900 mt-0.5 block truncate">
                    {rec.entitlements.employmentAssistance}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
