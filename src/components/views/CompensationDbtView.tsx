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
  Building2,
  Calculator,
  Download
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
    if (searchQuery.trim()) {
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              PFMS-DBT Direct Financial Integration
            </span>
            <span className="text-xs text-slate-500 font-medium">
              RFCTLARR 2013 First Schedule Statutory Valuation & Transfer
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Compensation Ledger & Aadhaar-Linked DBT Engine
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl mt-0.5">
            Zero-leakage electronic disbursement directly credited to landholder Aadhaar-seeded accounts with 100% Solatium and 12% additional market interest under LARR 2013 First Schedule.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCalculator}
            className="px-3.5 py-2 bg-[#1B365D] hover:bg-[#122642] text-white rounded text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Calculator className="w-4 h-4" />
            <span>Open Statutory LARR Calculator</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">Total Statutory Awards</span>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            ₹{(totalAwarded / 10000000).toFixed(2)} Cr
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Across all sanctioned Section 23/30 CALA orders</p>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">DBT Disbursed (PFMS Credited)</span>
          <div className="mt-2 text-2xl font-bold text-emerald-800">
            ₹{(totalDisbursed / 10000000).toFixed(2)} Cr
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">
            {Math.round((totalDisbursed / totalAwarded) * 100)}% Settled via NPCI APBS Transfer
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">Khatedar Beneficiaries</span>
          <div className="mt-2 text-2xl font-bold text-[#1B365D]">
            {successCount} <span className="text-sm font-normal text-slate-500">/ {beneficiaries.length} Settled</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">100% Aadhaar-seeded accounts verified</p>
        </div>
      </div>

      {/* Beneficiaries Table */}
      <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Direct Benefit Transfer Beneficiary Ledger
            </h2>
            <p className="text-xs text-slate-500">Real-time payment triggers with ISO 20022 PFMS webhooks</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-52">
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search Khatedar or Bank..."
                className="w-full bg-white border border-slate-300 rounded pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-700"
              />
            </div>

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-white text-xs text-slate-900 font-semibold border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none"
            >
              <option value="ALL">All Payment Statuses</option>
              <option value="DBT Success">DBT Success</option>
              <option value="PFMS Verified">PFMS Verified</option>
              <option value="Under Grievance">Under Grievance</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-2.5 px-4">Beneficiary & Share</th>
                <th className="py-2.5 px-4">Village / District</th>
                <th className="py-2.5 px-4">Aadhaar & Bank Account</th>
                <th className="py-2.5 px-4">Statutory Award</th>
                <th className="py-2.5 px-4">Status & UTR</th>
                <th className="py-2.5 px-4 text-right">DBT Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredBeneficiaries.map(ben => {
                const isPaid = ben.paymentStatus === 'DBT Success';
                const isProcessing = processingId === ben.id;

                return (
                  <tr key={ben.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1B365D] text-sm">{ben.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        S/o {ben.fatherHusbandName} • Share: <strong>{ben.sharePercentage}%</strong>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">{ben.village}</span>
                      <span className="block text-[11px] text-slate-500">{ben.district}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-slate-700">
                        •••• •••• {ben.aadhaarLast4} (Aadhaar Seeded)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {ben.bankName} • IFSC: <span className="font-mono">{ben.ifscCode}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">
                        ₹{(ben.awardedAmountRupees / 100000).toFixed(2)} Lakhs
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Solatium: 100% included
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={isPaid ? 'emerald' : ben.paymentStatus === 'PFMS Verified' ? 'blue' : 'amber'}>
                        {ben.paymentStatus}
                      </Badge>
                      {ben.utrNumber && (
                        <div className="font-mono text-[10px] text-slate-500 mt-1">
                          UTR: {ben.utrNumber}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isPaid ? (
                        <span className="text-emerald-700 font-semibold text-xs inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Disbursed
                        </span>
                      ) : (
                        <button
                          onClick={() => handleDisburseClick(ben.id)}
                          disabled={isProcessing}
                          className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#122642] text-white rounded font-semibold text-xs shadow-xs transition-colors inline-flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>{isProcessing ? 'Triggering...' : 'Disburse DBT'}</span>
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
