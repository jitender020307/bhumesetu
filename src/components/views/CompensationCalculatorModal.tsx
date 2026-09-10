import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Calculator, CheckCircle2, Info, RefreshCw, Copy, FileText, AlertCircle } from 'lucide-react';
import { apiService } from '../../services/api';

interface CompensationCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompensationCalculatorModal: React.FC<CompensationCalculatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [areaAcres, setAreaAcres] = useState<number>(2.5);
  const [circleRatePerAcre, setCircleRatePerAcre] = useState<number>(2500000);
  const [isRural, setIsRural] = useState<boolean>(true);
  const [ruralDistance, setRuralDistance] = useState<number>(25); // km from urban limit
  const [treeValuation, setTreeValuation] = useState<number>(350000);
  const [structureValuation, setStructureValuation] = useState<number>(650000);
  const [monthsElapsed, setMonthsElapsed] = useState<number>(14);
  const [copied, setCopied] = useState(false);

  const calc = apiService.calculateRfctlarrCompensation({
    areaAcres,
    circleRatePerAcre,
    isRural,
    treeValuation,
    structureValuation,
    monthsElapsedFromNotification: monthsElapsed
  });

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleCopySummary = () => {
    const text = `Government of India - RFCTLARR Act 2013 Compensation Assessment:
- Land Area: ${areaAcres} Acres (${isRural ? 'Rural Area' : 'Urban Area'})
- Base Market Value: ${formatINR(calc.baseLandValue)}
- Rural Multiplier Factor: ${calc.multiplier}x
- Multiplied Land Value: ${formatINR(calc.multipliedLandValue)}
- Attached Assets (Trees & Structures): ${formatINR(calc.assetsAttached)}
- Statutory Solatium (100% under Sec 30(1)): ${formatINR(calc.solatiumAmount)}
- Additional 12% p.a. Value (Sec 30(3)): ${formatINR(calc.additionalMarketValue)}
--------------------------------------------------
ESTIMATED STATUTORY COMPENSATION: ${formatINR(calc.totalAwardAmount)}
* Indicative calculation. Final compensation is subject to applicable law, government notification and competent authority approval.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Land Acquisition Compensation Calculator"
      subtitle="Statutory Valuation Framework under First Schedule of RFCTLARR Act 2013"
      maxWidth="4xl"
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Inputs (Col 6) */}
          <div className="lg:col-span-6 space-y-3.5 bg-slate-50 p-4 rounded border border-slate-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-[#1B365D] uppercase tracking-wide flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                Land & Valuation Parameters
              </span>
              <button
                onClick={() => {
                  setAreaAcres(2.5);
                  setCircleRatePerAcre(2500000);
                  setIsRural(true);
                  setTreeValuation(350000);
                  setStructureValuation(650000);
                  setMonthsElapsed(14);
                }}
                className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-[11px]"
              >
                <RefreshCw className="w-3 h-3" />
                Reset Defaults
              </button>
            </div>

            {/* Area & Classification */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Acquisition Area (Acres)
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={areaAcres}
                  onChange={e => setAreaAcres(Math.max(0.01, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Location Classification
                </label>
                <select
                  value={isRural ? 'rural' : 'urban'}
                  onChange={e => setIsRural(e.target.value === 'rural')}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-700"
                >
                  <option value="rural">Rural Area (1.25x - 2.0x)</option>
                  <option value="urban">Urban Area (1.0x)</option>
                </select>
              </div>
            </div>

            {/* Circle Rate / Jantri Value */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Circle Rate / Jantri Value per Acre (₹)
              </label>
              <input
                type="number"
                step="50000"
                value={circleRatePerAcre}
                onChange={e => setCircleRatePerAcre(Math.max(10000, parseFloat(e.target.value) || 0))}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-700"
              />
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Higher of registered sale deeds or notified district collectorate rate.
              </span>
            </div>

            {/* Attached Assets (Section 29) */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Horticulture / Trees (₹)
                </label>
                <input
                  type="number"
                  step="10000"
                  value={treeValuation}
                  onChange={e => setTreeValuation(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Structures / Wells (₹)
                </label>
                <input
                  type="number"
                  step="25000"
                  value={structureValuation}
                  onChange={e => setStructureValuation(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-700"
                />
              </div>
            </div>

            {/* Months elapsed for 12% p.a. */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Time Elapsed Since Section 11/3A Publication (Months)
              </label>
              <input
                type="number"
                min="0"
                max="60"
                value={monthsElapsed}
                onChange={e => setMonthsElapsed(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-700"
              />
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Calculates additional 12% per annum under Section 30(3).
              </span>
            </div>
          </div>

          {/* Right Calculation Award Breakdown (Col 6) */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded p-4 shadow-xs flex flex-col justify-between text-xs space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-900 uppercase tracking-wide">
                  Statutory Valuation Summary
                </span>
                <span className="text-[11px] text-slate-500">First Schedule</span>
              </div>

              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Base Land Value:</span>
                  <span className="font-semibold text-slate-900">{formatINR(calc.baseLandValue)}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Rural Multiplier:</span>
                  <span className="font-semibold text-blue-900">{calc.multiplier}x (Notified)</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Multiplied Land Value:</span>
                  <span className="font-semibold text-slate-900">{formatINR(calc.multipliedLandValue)}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Assets Attached (Sec 29):</span>
                  <span className="font-semibold text-slate-900">{formatINR(calc.assetsAttached)}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Solatium (100% under Sec 30(1)):</span>
                  <span className="font-semibold text-emerald-800">{formatINR(calc.solatiumAmount)}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Additional 12% p.a. (Sec 30(3)):</span>
                  <span className="font-semibold text-slate-900">{formatINR(calc.additionalMarketValue)}</span>
                </div>
              </div>

              {/* Total Award Banner */}
              <div className="p-3 bg-[#1B365D] text-white rounded mt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                  Total Estimated Statutory Compensation
                </span>
                <span className="text-xl font-bold text-white block mt-0.5">
                  {formatINR(calc.totalAwardAmount)}
                </span>
                <span className="text-[10px] text-slate-300 block mt-0.5">
                  ₹{(calc.totalAwardAmount / 100000).toFixed(2)} Lakhs • Directly payable via PFMS DBT
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleCopySummary}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-300"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Assessment Copied' : 'Copy Assessment'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#1B365D] hover:bg-[#122642] text-white rounded font-semibold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>

        {/* Mandatory Official Disclaimer required by Guidelines */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-950 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Official Notice:</strong> Indicative calculation. Final compensation is subject to applicable law, government notification and competent authority approval.
          </p>
        </div>
      </div>
    </Modal>
  );
};
