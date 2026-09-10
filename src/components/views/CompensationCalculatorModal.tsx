import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Calculator, CheckCircle, Info, RefreshCw, Copy } from 'lucide-react';
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
    const text = `RFCTLARR Act 2013 Compensation Award Breakdown:
- Area: ${areaAcres} Acres (${isRural ? 'Rural' : 'Urban'})
- Base Market Value: ${formatINR(calc.baseLandValue)}
- Multiplier Applied: ${calc.multiplier}x
- Multiplied Land Value: ${formatINR(calc.multipliedLandValue)}
- Assets Attached (Trees & Structures): ${formatINR(calc.assetsAttached)}
- Solatium (100% statutory): ${formatINR(calc.solatiumAmount)}
- Additional 12% p.a. Interest (${monthsElapsed} mo): ${formatINR(calc.additionalMarketValue)}
====================================
TOTAL STATUTORY AWARD: ${formatINR(calc.totalAwardAmount)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="RFCTLARR Act 2013 Statutory Compensation Calculator"
      subtitle="Calculated in compliance with Sections 26, 29 & 30 of First Schedule (LARR 2013)"
      maxWidth="4xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-4 bg-slate-800/40 p-4 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" /> Parameter Inputs
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
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset Defaults
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Acquisition Area (in Acres)
            </label>
            <input
              type="number"
              step="0.05"
              value={areaAcres}
              onChange={e => setAreaAcres(Math.max(0.01, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Circle Rate / Market Base Rate per Acre (₹)
            </label>
            <input
              type="number"
              step="50000"
              value={circleRatePerAcre}
              onChange={e => setCircleRatePerAcre(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">Average registered sale deeds or SDR rate under Sec 26</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Land Location Type
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsRural(true)}
                  className={`flex-1 py-1.5 px-3 text-xs rounded-lg border font-medium transition-colors ${
                    isRural
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Rural (1.5x - 2.0x)
                </button>
                <button
                  type="button"
                  onClick={() => setIsRural(false)}
                  className={`flex-1 py-1.5 px-3 text-xs rounded-lg border font-medium transition-colors ${
                    !isRural
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Urban (1.0x)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Notification Elapsed (Months)
              </label>
              <input
                type="number"
                min="0"
                max="60"
                value={monthsElapsed}
                onChange={e => setMonthsElapsed(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Tree / Horticulture Valuation (₹)
              </label>
              <input
                type="number"
                step="10000"
                value={treeValuation}
                onChange={e => setTreeValuation(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Structure / Well Valuation (₹)
              </label>
              <input
                type="number"
                step="10000"
                value={structureValuation}
                onChange={e => setStructureValuation(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Right Output Breakdown */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-950/70 p-4 rounded-lg border border-slate-800">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Statutory Compensation Ledger
              </span>
              <button
                onClick={handleCopySummary}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 px-2 py-1 bg-emerald-950/50 border border-emerald-800/60 rounded"
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Schedule'}
              </button>
            </div>

            <div className="mt-3 space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">1. Base Market Value ({areaAcres} Acres × {formatINR(circleRatePerAcre)}):</span>
                <span className="font-mono text-slate-200 font-medium">{formatINR(calc.baseLandValue)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">2. Statutory Multiplier (Sec 26):</span>
                <span className="font-mono text-emerald-400 font-semibold">{calc.multiplier}x ({isRural ? 'Rural Area' : 'Urban Area'})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">3. Multiplied Land Value:</span>
                <span className="font-mono text-slate-200 font-medium">{formatINR(calc.multipliedLandValue)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">4. Assets Attached (Sec 29 Trees + Structures):</span>
                <span className="font-mono text-slate-200 font-medium">{formatINR(calc.assetsAttached)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60 bg-slate-900/40 px-2 rounded">
                <span className="text-slate-300 font-medium">Subtotal Pre-Solatium Market Value:</span>
                <span className="font-mono text-slate-200 font-bold">{formatINR(calc.totalMarketValue)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-1">
                  5. Solatium (100% Mandatory under Sec 30(1)):
                  <Info className="w-3 h-3 text-slate-500" />
                </span>
                <span className="font-mono text-amber-400 font-semibold">{formatINR(calc.solatiumAmount)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">6. Additional Market Value @ 12% p.a. (Sec 30(3) - {monthsElapsed} mos):</span>
                <span className="font-mono text-sky-400 font-medium">{formatINR(calc.additionalMarketValue)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <div className="bg-emerald-950/50 border border-emerald-800/60 rounded-lg p-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold block">
                  Total Statutory Award (CALA Sanctioned)
                </span>
                <span className="text-xs text-slate-400">Under First Schedule of LARR 2013</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold font-mono text-emerald-400 block">
                  {formatINR(calc.totalAwardAmount)}
                </span>
                <span className="text-[11px] text-slate-400">
                  ≈ ₹{(calc.totalAwardAmount / 10000000).toFixed(2)} Crores
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
