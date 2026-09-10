import React, { useState } from 'react';
import { AiRiskInsight } from '../../types';
import { Badge } from '../common/Badge';
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  ArrowRight,
  ShieldCheck,
  RefreshCw
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
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border border-indigo-800/60 rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="indigo" pulse>AI Predictive Engine</Badge>
            <span className="text-xs text-indigo-300 font-mono">BhoomiSetu ML Decision Engine v2.4</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Predictive Land Acquisition Delay & Cost Overrun Engine
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Trained on 10+ years of national infrastructure land acquisition datasets to forecast litigation clusters, compensation disputes, forest clearance bottlenecks, and statutory lapsing risks.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400">Model Precision:</span>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-800">
            94.8% F1 Score
          </span>
        </div>
      </div>

      {/* AI Risk Insights Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {risks.map(risk => {
          const isMitigated = simulatedMitigation[risk.id];
          const displayDelay = isMitigated ? Math.round(risk.predictedDelayDays * 0.25) : risk.predictedDelayDays;
          const displayEscalation = isMitigated ? Math.round(risk.predictedEscalationCr * 0.3) : risk.predictedEscalationCr;

          return (
            <div 
              key={risk.id}
              className={`rounded-xl border p-5 flex flex-col justify-between transition-all ${
                isMitigated
                  ? 'bg-emerald-950/20 border-emerald-800/80 shadow-emerald-950/20'
                  : risk.riskScore > 75
                  ? 'bg-slate-900 border-rose-800/70 shadow-xl'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant={isMitigated ? 'emerald' : risk.riskScore > 75 ? 'rose' : 'amber'}>
                    {risk.riskCategory}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs">
                    {risk.trend === 'increasing' ? (
                      <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    <span className="font-mono text-slate-400">{risk.confidenceScore}% conf</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-100 mt-2.5">
                  {risk.projectName}
                </h3>

                {/* Score & Impact Stats */}
                <div className="grid grid-cols-2 gap-2 my-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Forecasted Delay</span>
                    <span className={`text-base font-bold font-mono ${isMitigated ? 'text-emerald-400' : 'text-rose-400'}`}>
                      +{displayDelay} Days
                    </span>
                    {isMitigated && (
                      <span className="block text-[9px] text-emerald-400">(-75% saved)</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Cost Escalation</span>
                    <span className={`text-base font-bold font-mono ${isMitigated ? 'text-emerald-400' : 'text-amber-400'}`}>
                      +₹{displayEscalation} Cr
                    </span>
                    {isMitigated && (
                      <span className="block text-[9px] text-emerald-400">(-70% avoided)</span>
                    )}
                  </div>
                </div>

                {/* Key Drivers */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    AI Identified Drivers:
                  </span>
                  {risk.keyDrivers.map((driver, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-slate-300 text-[11px]">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span>{driver}</span>
                    </div>
                  ))}
                </div>

                {/* Recommended Mitigation */}
                <div className="mt-4 p-3 rounded-lg bg-indigo-950/40 border border-indigo-900/60 text-xs text-indigo-200">
                  <span className="text-[10px] font-bold uppercase text-indigo-300 block flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-400" /> Prescribed Intervention:
                  </span>
                  <p className="mt-1 text-[11px] leading-relaxed">{risk.recommendedAction}</p>
                </div>
              </div>

              {/* Action Simulation Button */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <button
                  onClick={() => toggleMitigation(risk.id)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isMitigated
                      ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-300 hover:bg-emerald-900/80'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{isMitigated ? 'Intervention Active (Simulated)' : 'Simulate Policy Mitigation'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
