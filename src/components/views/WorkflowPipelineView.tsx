import React from 'react';
import { WorkflowStage, InfrastructureProject } from '../../types';
import { Badge } from '../common/Badge';
import { 
  GitMerge, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ShieldAlert, 
  ChevronRight,
  LandPlot
} from 'lucide-react';

interface WorkflowPipelineViewProps {
  stages: WorkflowStage[];
  projects: InfrastructureProject[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
}

export const WorkflowPipelineView: React.FC<WorkflowPipelineViewProps> = ({
  stages,
  projects,
  selectedProjectId,
  onSelectProject
}) => {
  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="sky">Statutory Compliance Engine</Badge>
            <span className="text-xs text-slate-400">RFCTLARR Act 2013 & National Highways Act 1956</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            End-to-End Land Acquisition Statutory Pipeline
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Strict statutory SLA monitoring prevents lapsing of Section 19 final declaration (12-month limitation rule) and enforces pre-possession compensation deposition.
          </p>
        </div>

        {/* Project Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Corridor:</span>
          <select
            value={selectedProjectId}
            onChange={e => onSelectProject(e.target.value)}
            className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-sky-500"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Statutory Stages Timeline */}
      <div className="space-y-3">
        {stages.map((stage, idx) => {
          const isCompleted = stage.status === 'Completed';
          const isInProgress = stage.status === 'In Progress';
          const isDelayed = stage.averageCompletedDays > stage.statutorySlaDays;

          return (
            <div 
              key={stage.id}
              className={`p-4 rounded-xl border transition-all ${
                isInProgress
                  ? 'bg-slate-900 border-sky-600/80 shadow-lg shadow-sky-950/30'
                  : isCompleted
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-slate-950/40 border-slate-800/60 opacity-70'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Left: Step Number & Title */}
                <div className="flex items-start gap-3.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isCompleted 
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                      : isInProgress 
                      ? 'bg-sky-950 text-sky-400 border border-sky-600' 
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stage.stepNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-100">{stage.title}</h3>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {stage.sectionReference}
                      </span>
                      <Badge variant={isCompleted ? 'emerald' : isInProgress ? 'sky' : 'slate'} size="sm">
                        {stage.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 max-w-2xl">{stage.description}</p>
                    
                    {stage.gazetteRef && (
                      <div className="flex items-center gap-1.5 text-[11px] text-sky-400 font-mono mt-1.5">
                        <FileText className="w-3 h-3" />
                        <span>Gazette Order: {stage.gazetteRef}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: SLA Timers & Responsible Authority */}
                <div className="flex items-center gap-6 text-right shrink-0 lg:pl-4 lg:border-l lg:border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Statutory SLA</span>
                    <span className="text-xs font-mono font-bold text-slate-200">
                      {stage.statutorySlaDays} Days max
                    </span>
                    <span className={`block text-[10px] font-mono ${isDelayed ? 'text-amber-400' : 'text-emerald-400'}`}>
                      Avg: {stage.averageCompletedDays} Days {isDelayed ? '(Exceeded)' : '(On Schedule)'}
                    </span>
                  </div>

                  <div className="min-w-[140px]">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Authority</span>
                    <span className="text-xs font-medium text-slate-200 block truncate max-w-[160px]">
                      {stage.responsibleAuthority}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {stage.parcelsAtStage} of {stage.totalParcels} parcels
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
