import React, { useState } from 'react';
import { AiRiskInsight } from '../../types';
import { Badge } from '../common/Badge';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Clock,
  Building2,
  FileWarning
} from 'lucide-react';

interface AiRiskAnalyticsViewProps {
  risks: AiRiskInsight[];
}

export const AiRiskAnalyticsView: React.FC<AiRiskAnalyticsViewProps> = ({ risks }) => {
  const [simulatedMitigation, setSimulatedMitigation] = useState<Record<string, boolean>>({});

  const toggleMitigation = (id: string) => {
    setSimulatedMitigation(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Statutory Decision Support System (DSS)
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Section 19 Limitation & Statutory Risk Forecaster
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Statutory SLA Risk Prediction & Bottleneck Forecasting
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl mt-0.5">
            Statistical regression models calibrated against national infrastructure acquisition records to identify statutory lapsing risks, forest clearance delays, and valuation anomalies.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-500 font-semibold">Model Confidence:</span>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300">
            94.8% Empirical Accuracy
          </span>
        </div>
      </div>

      {/* Grounded Decision Support Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {risks.map(risk => {
          const isMitigated = simulatedMitigation[risk.id];
          const displayDelay = isMitigated ? Math.round(risk.predictedDelayDays * 0.25) : risk.predictedDelayDays;
          const displayEscalation = isMitigated ? Math.round(risk.predictedEscalationCr * 0.3) : risk.predictedEscalationCr;

          return (
            <div 
              key={risk.id}
              className={`rounded border p-5 flex flex-col justify-between transition-all text-xs ${
                isMitigated
                  ? 'bg-emerald-50/40 border-emerald-300 shadow-2xs'
                  : risk.riskScore > 75
                  ? 'bg-rose-50/40 border-rose-300 shadow-xs'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={isMitigated ? 'emerald' : risk.riskScore > 75 ? 'rose' : 'amber'}>
                    {risk.riskCategory}
                  </Badge>
                  <div className="flex items-center gap-1 font-semibold text-slate-500">
                    {risk.trend === 'increasing' ? (
                      <TrendingUp className="w-3.5 h-3.5 text-rose-700" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
                    )}
                    <span>{risk.confidenceScore}% Confidence</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {risk.projectName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-slate-500">Risk Score:</span>
                    <span className={`font-bold ${risk.riskScore > 75 ? 'text-rose-800' : 'text-amber-800'}`}>
                      {risk.riskScore} / 100
                    </span>
                  </div>
                </div>

                {/* Score & Impact Stats */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Forecasted Delay</span>
                    <span className={`text-base font-bold ${isMitigated ? 'text-emerald-800' : 'text-rose-800'}`}>
                      +{displayDelay} Days
                    </span>
                    {isMitigated && (
                      <span className="block text-[10px] text-emerald-700 font-semibold">(-75% mitigated)</span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">CAPEX Escalation</span>
                    <span className={`text-base font-bold ${isMitigated ? 'text-emerald-800' : 'text-slate-900'}`}>
                      +₹{displayEscalation} Cr
                    </span>
                    {isMitigated && (
                      <span className="block text-[10px] text-emerald-700 font-semibold">(-70% avoided)</span>
                    )}
                  </div>
                </div>

                {/* Root Cause & Risk Factors */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">
                    Statutory Bottleneck Factor
                  </span>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {risk.rootCause}
                  </p>
                </div>

                {/* Recommended Administrative Action */}
                <div className="p-2.5 rounded bg-blue-50/70 border border-blue-200">
                  <span className="text-[10px] text-[#1B365D] uppercase font-bold block">
                    Recommended Administrative Action
                  </span>
                  <p className="text-slate-800 text-[11px] mt-0.5 font-medium">
                    {risk.recommendation}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {isMitigated ? 'Mitigation Scheduled' : 'Action Pending Review'}
                </span>

                <button
                  onClick={() => toggleMitigation(risk.id)}
                  className={`px-3 py-1.5 rounded font-semibold text-xs transition-colors ${
                    isMitigated
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                      : 'bg-[#1B365D] hover:bg-[#122642] text-white'
                  }`}
                >
                  {isMitigated ? 'Revert Simulation' : 'Execute Mitigation Plan'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
