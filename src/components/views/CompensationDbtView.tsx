import React, { useState } from 'react';
import { Beneficiary, LandParcel } from '../../types';
import { Badge } from '../common/Badge';
import { 
  IndianRupee, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Search, 
  FileSpreadsheet, 
  ArrowDownToLine,
  RefreshCw,
  Building2
} from 'lucide-react';

interface CompensationDbtViewProps {
  beneficiaries: Beneficiary[];
  parcels: LandParcel[];
  onProcessDbt: (beneficiaryId: string) => Promise<void>;
  onOpenCalculator: () => void;
}

export const CompensationDbtView: React.FC<CompensationDbtViewProps> = ({
  beneficiaries,
  parcels,
  onProcessDbt,
  onOpenCalculator
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const totalAwarded = beneficiaries.reduce((acc, b) => acc + b.awardedAmountRupees, 0);
  const totalDisbursed = beneficiaries.reduce((acc, b) => acc + b.disbursedAmountRupees, 0);
  const successCount = beneficiaries.filter(b => b.paymentStatus === 'DBT Success').length;

  const filteredBeneficiaries = beneficiaries.filter(b => {
    if (filterStatus !== 'ALL' && b.paymentStatus !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.village.toLowerCase().includes(q) ||
        b.bankName.toLowerCase().includes(q) ||
        b.aadhaarLast4.includes(q)
      );
    }
    return true;
  });

  const handleDisburseClick = async (id: string) => {
    setProcessingId(id);
    try {
      await onProcessDbt(id);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald">PFMS-DBT Direct Gateway</Badge>
            <span className="text-xs text-slate-400">Public Financial Management System Direct Benefit Transfer</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Compensation Ledger & Aadhaar-Linked DBT Engine
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Zero-leakage electronic disbursement directly credited to landholder Aadhaar-seeded accounts with 100% Solatium and 12% additional market interest under LARR 2013 First Schedule.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCalculator}
            className="px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium transition-all shadow-md flex items-center gap-1.5"
          >
            <IndianRupee className="w-4 h-4" />
            <span>LARR Valuation Calculator</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Statutory Awards</span>
          <div className="mt-2 text-2xl font-black font-mono text-slate-100">
            ₹{(totalAwarded / 10000000).toFixed(2)} Cr
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Across all sanctioned Section 23/30 orders</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">DBT Real-Time Disbursed</span>
          <div className="mt-2 text-2xl font-black font-mono text-emerald-400">
            ₹{(totalDisbursed / 10000000).toFixed(2)} Cr
          </div>
          <p className="text-[11px] text-emerald-400 mt-1">
            {Math.round((totalDisbursed / totalAwarded) * 100)}% Credited via PFMS Direct Settlement
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Khatedar Beneficiaries</span>
          <div className="mt-2 text-2xl font-black font-mono text-sky-400">
            {successCount} <span className="text-xs font-normal text-slate-400">/ {beneficiaries.length} settled</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">100% Aadhaar NPCI mapper verified</p>
        </div>
      </div>

      {/* Beneficiaries Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-100">
              Direct Benefit Transfer Beneficiary Ledger
            </h3>
            <p className="text-xs text-slate-400">Real-time payment triggers with ISO 20022 PFMS webhooks</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-52">
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search Beneficiary or Bank..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">All Payments</option>
              <option value="DBT Success">DBT Success</option>
              <option value="PFMS Verified">PFMS Verified</option>
              <option value="Under Grievance">Under Grievance</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Beneficiary & Father/Spouse</th>
                <th className="py-3 px-4">Village & District</th>
                <th className="py-3 px-4">Aadhaar & Bank Account</th>
                <th className="py-3 px-4">Awarded Compensation</th>
                <th className="py-3 px-4">Status & UTR</th>
                <th className="py-3 px-4 text-right">DBT Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBeneficiaries.map(ben => {
                const isPaid = ben.paymentStatus === 'DBT Success';
                const isProcessing = processingId === ben.id;

                return (
                  <tr key={ben.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-100">{ben.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        S/o or W/o {ben.fatherHusbandName} • Share: {ben.sharePercentage}%
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-slate-200 font-medium">{ben.village}</span>
                      <span className="block text-[10px] text-slate-400">{ben.district}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-slate-200">
                        Aadhaar: •••• •••• {ben.aadhaarLast4}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {ben.bankName} (IFSC: {ben.ifscCode})
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-100">
                      ₹{(ben.awardedAmountRupees / 10000000).toFixed(2)} Cr
                      <span className="block text-[10px] text-slate-400 font-normal">
                        ₹{ben.awardedAmountRupees.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={isPaid ? 'emerald' : ben.paymentStatus === 'PFMS Verified' ? 'sky' : 'rose'}>
                        {ben.paymentStatus}
                      </Badge>
                      {ben.pfmsTxnId && (
                        <span className="block text-[10px] text-sky-400 font-mono mt-1">
                          {ben.pfmsTxnId}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isPaid ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Disbursed
                        </span>
                      ) : (
                        <button
                          onClick={() => handleDisburseClick(ben.id)}
                          disabled={isProcessing}
                          className="px-2.5 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-medium text-xs transition-colors flex items-center gap-1 ml-auto disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              <span>Settling...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3 h-3" />
                              <span>Trigger DBT</span>
                            </>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
