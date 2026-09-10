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
  LandPlot,
  Building2,
  Calendar,
  AlertTriangle,
  FileCheck
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Statutory Compliance Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">
              RFCTLARR Act 2013 & National Highways Act 1956
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            End-to-End Land Acquisition Statutory Pipeline
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl mt-0.5">
            Strict statutory SLA monitoring prevents lapsing of Section 19 final declaration (12-month limitation rule) and enforces pre-possession compensation deposition.
          </p>
        </div>

        {/* Project Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700">Corridor:</span>
          <select
            value={selectedProjectId}
            onChange={e => onSelectProject(e.target.value)}
            className="bg-slate-50 text-xs text-slate-900 font-semibold border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-700"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Statutory Stages Timeline */}
      <div className="space-y-3">
        {stages.map((stage) => {
          const isCompleted = stage.status === 'Completed';
          const isInProgress = stage.status === 'In Progress';
          const isDelayed = stage.averageCompletedDays > stage.statutorySlaDays;

          return (
            <div 
              key={stage.id}
              className={`p-4 rounded border transition-all ${
                isInProgress
                  ? 'bg-blue-50/50 border-blue-400 shadow-xs ring-1 ring-blue-300'
                  : isCompleted
                  ? 'bg-white border-slate-200'
                  : 'bg-slate-50/60 border-slate-200 opacity-80'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Step Number & Title */}
                <div className="flex items-start gap-3.5">
                  <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs shrink-0 ${
                    isCompleted 
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                      : isInProgress 
                      ? 'bg-[#1B365D] text-white border border-[#1B365D]' 
                      : 'bg-slate-200 text-slate-600 border border-slate-300'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : `0${stage.stepNumber}`}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900">{stage.title}</h3>
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300 font-medium">
                        {stage.sectionReference}
                      </span>
                      <Badge variant={isCompleted ? 'emerald' : isInProgress ? 'blue' : 'slate'} size="sm">
                        {stage.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 max-w-2xl">{stage.description}</p>
                    
                    {stage.gazetteRef && (
                      <div className="flex items-center gap-1.5 text-[11px] text-blue-900 font-semibold mt-1">
                        <FileText className="w-3.5 h-3.5 text-blue-700" />
                        <span>Gazette Order: {stage.gazetteRef}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: SLA Timers & Responsible Authority */}
                <div className="flex items-center gap-6 text-right shrink-0 lg:pl-4 lg:border-l lg:border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Statutory SLA</span>
                    <span className="font-bold text-slate-900">
                      {stage.statutorySlaDays} Days Max
                    </span>
                    <span className={`block text-[11px] font-semibold ${isDelayed ? 'text-amber-800' : 'text-emerald-800'}`}>
                      Avg: {stage.averageCompletedDays} Days {isDelayed ? '(Exceeded)' : '(Compliant)'}
                    </span>
                  </div>

                  <div className="min-w-[140px]">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Authority</span>
                    <span className="font-semibold text-slate-900 block truncate max-w-[160px]">
                      {stage.responsibleAuthority}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
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
