import React, { useState } from 'react';
import { LandParcel, Beneficiary } from '../../types';
import { Badge } from '../common/Badge';
import { 
  Users, 
  Search, 
  CheckCircle2, 
  IndianRupee, 
  FileText, 
  AlertCircle, 
  HelpCircle, 
  Send,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface PublicPortalViewProps {
  parcels: LandParcel[];
  beneficiaries: Beneficiary[];
  onOpenCalculator: () => void;
}

export const PublicPortalView: React.FC<PublicPortalViewProps> = ({
  parcels,
  beneficiaries,
  onOpenCalculator
}) => {
  const [searchKey, setSearchKey] = useState('142/2A');
  const [searched, setSearched] = useState(true);
  const [grievanceText, setGrievanceText] = useState('');
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);

  const matchedParcel = parcels.find(p => 
    p.surveyNumber.toLowerCase() === searchKey.trim().toLowerCase() ||
    p.khataNumber.toLowerCase() === searchKey.trim().toLowerCase() ||
    p.aadhaarMasked.includes(searchKey.trim())
  );

  const matchedBeneficiary = matchedParcel 
    ? beneficiaries.find(b => b.parcelId === matchedParcel.id)
    : null;

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grievanceText) return;
    setGrievanceSubmitted(true);
    setTimeout(() => {
      setGrievanceText('');
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/60 rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald">Citizen & Landowner Portal</Badge>
            <span className="text-xs text-emerald-300">Public Transparency Window</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            BhoomiSetu Public Khatedar & Citizen Service Hub
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Empowering landholders with instant access to gazette acquisition status, LARR 2013 statutory compensation schedule, PFMS bank credits, and online grievance registration.
          </p>
        </div>

        <button
          onClick={onOpenCalculator}
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-all shadow-md flex items-center gap-1.5 shrink-0"
        >
          <IndianRupee className="w-4 h-4" />
          <span>Statutory LARR Calculator</span>
        </button>
      </div>

      {/* Citizen Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl max-w-3xl mx-auto">
        <div className="text-center mb-4">
          <h3 className="text-base font-bold text-slate-100">
            Check Your Land Acquisition & Compensation Status
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Enter your Survey Number, Khata / Patta Number, or last 4 digits of Aadhaar
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)}
              placeholder="e.g. 142/2A or KH-819 or 4912"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button
            onClick={() => setSearched(true)}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all shadow-md shrink-0"
          >
            Search Status
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-slate-400">
          <span>Quick Demo Searches:</span>
          <button onClick={() => { setSearchKey('142/2A'); setSearched(true); }} className="text-sky-400 hover:underline">
            Survey #142/2A (Paid)
          </button>
          <button onClick={() => { setSearchKey('89/1B'); setSearched(true); }} className="text-sky-400 hover:underline">
            Survey #89/1B (Dispute)
          </button>
          <button onClick={() => { setSearchKey('45/1'); setSearched(true); }} className="text-sky-400 hover:underline">
            Survey #45/1 (Possession Taken)
          </button>
        </div>
      </div>

      {/* Search Result Card */}
      {searched && matchedParcel && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-100 font-mono">
                  Survey #{matchedParcel.surveyNumber}
                </span>
                <Badge variant={matchedParcel.status === 'Compensation_Paid' ? 'emerald' : matchedParcel.status === 'In_Dispute' ? 'rose' : 'sky'}>
                  {matchedParcel.status.replace(/_/g, ' ')}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {matchedParcel.village}, {matchedParcel.taluk}, {matchedParcel.district} ({matchedParcel.state})
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Infrastructure Corridor:</span>
              <span className="text-xs font-bold text-sky-400">{matchedParcel.projectName}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Registered Khatedar</span>
              <span className="text-sm font-bold text-slate-100 mt-1 block">{matchedParcel.landOwnerName}</span>
              <span className="text-[10px] text-slate-400">Khata: {matchedParcel.khataNumber}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Acquired Extent</span>
              <span className="text-sm font-bold text-slate-100 mt-1 block">{matchedParcel.areaAcres} Acres</span>
              <span className="text-[10px] text-slate-400">{matchedParcel.landCategory}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Statutory Compensation</span>
              <span className="text-sm font-bold font-mono text-emerald-400 mt-1 block">
                ₹{(matchedParcel.totalCompensationRupees / 10000000).toFixed(2)} Cr
              </span>
              <span className="text-[10px] text-slate-400">100% Solatium Included</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">PFMS DBT Credit</span>
              <span className="text-sm font-bold text-sky-400 mt-1 block">{matchedParcel.disbursedStatus}</span>
              {matchedParcel.dbtUtrNumber && (
                <span className="text-[9px] font-mono text-slate-400 truncate block">UTR: {matchedParcel.dbtUtrNumber}</span>
              )}
            </div>
          </div>

          {/* Grievance Submission Section */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              File Section 64 Grievance / Query with CALA Officer
            </h4>
            <form onSubmit={handleGrievanceSubmit} className="space-y-2 text-xs">
              <textarea
                rows={2}
                value={grievanceText}
                onChange={e => setGrievanceText(e.target.value)}
                placeholder="Submit any inquiry or grievance regarding valuation schedule, tree enumeration, or bank IFSC correction..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Directly routed to CALA Vadodara / Palghar Magistracy</span>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-sky-700 hover:bg-sky-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3 h-3" />
                  <span>Submit Grievance</span>
                </button>
              </div>
              {grievanceSubmitted && (
                <div className="p-2.5 rounded bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Grievance filed successfully! Docket #GRV-{Math.floor(100000 + Math.random() * 900000)} generated. CALA will respond within 15 working days.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Citizen FAQs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl max-w-4xl mx-auto">
        <h3 className="text-sm font-bold text-slate-100 mb-3 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-sky-400" />
          Frequently Asked Questions (RFCTLARR Act 2013)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <h5 className="font-semibold text-slate-100">What is Solatium under Section 30(1)?</h5>
            <p className="text-[11px] text-slate-400 mt-1">
              Solatium is a statutory 100% additional compensation on the total market value of the land and assets attached, mandated by Parliament to mitigate the compulsory nature of the acquisition.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <h5 className="font-semibold text-slate-100">How is Rural Land multiplier calculated?</h5>
            <p className="text-[11px] text-slate-400 mt-1">
              Under Section 26, rural land receives a multiplier between 1.5x and 2.0x based on its distance from the nearest urban municipal limits, followed by 100% Solatium.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
