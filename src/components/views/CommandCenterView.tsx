import React from 'react';
import { 
  InfrastructureProject, 
  LandParcel, 
  AlertDispute, 
  WorkflowStage 
} from '../../types';
import { Badge } from '../common/Badge';
import { 
  TrendingUp, 
  Layers, 
  IndianRupee, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  MapPin,
  Clock,
  Building2,
  FileCheck,
  Home,
  Check
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface CommandCenterViewProps {
  projects: InfrastructureProject[];
  parcels: LandParcel[];
  alerts: AlertDispute[];
  workflowStages?: WorkflowStage[];
  onSelectProject: (id: string) => void;
  onNavigateToGis?: () => void;
  onOpenCalculator: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const CommandCenterView: React.FC<CommandCenterViewProps> = ({
  projects,
  parcels,
  alerts,
  workflowStages = [],
  onSelectProject,
  onNavigateToGis,
  onOpenCalculator,
  onNavigateTab
}) => {
  // Aggregate national metrics
  const activeProjectsCount = projects.filter(p => p.status !== 'Archived').length;
  const totalParcelsCount = parcels.length;
  const pendingVerificationCount = parcels.filter(p => p.status === 'Survey_Section3A_Notified' || p.status === 'Objection_Hearing_Section15').length;
  const compensationPendingCount = parcels.filter(p => p.status === 'Award_Declared_Section3G').length;
  const openDisputesCount = alerts.filter(a => a.status !== 'Stay Vacated').length;
  const rrCasesPendingCount = 14;

  const totalRequiredHa = projects.reduce((acc, p) => acc + p.totalLandRequiredHa, 0);
  const totalAcquiredHa = projects.reduce((acc, p) => acc + p.landAcquiredHa, 0);
  const nationalAcquisitionPercentage = Math.round((totalAcquiredHa / totalRequiredHa) * 100);

  // Velocity data for simple, clean bar chart
  const quarterlyAcquisitionData = [
    { quarter: 'Q1 FY25', targetHa: 950, achievedHa: 910 },
    { quarter: 'Q2 FY25', targetHa: 1200, achievedHa: 1140 },
    { quarter: 'Q3 FY25', targetHa: 1450, achievedHa: 1390 },
    { quarter: 'Q4 FY25', targetHa: 1600, achievedHa: 1520 },
    { quarter: 'Q1 FY26', targetHa: 1800, achievedHa: 1740 },
    { quarter: 'Q2 FY26', targetHa: 2000, achievedHa: 1980 }
  ];

  // Specific pending action items required by guidelines
  const pendingActions = [
    {
      id: 'act-1',
      title: '18 parcels awaiting field verification',
      subtitle: 'Drone orthomosaic vs Revenue boundary discrepancy flagged in Vadodara Rural',
      urgency: 'high',
      tab: 'field-verification'
    },
    {
      id: 'act-2',
      title: '7 compensation cases require document validation',
      subtitle: 'Aadhaar-seeded bank account mismatch on PFMS portal for Bharuch section',
      urgency: 'medium',
      tab: 'compensation'
    },
    {
      id: 'act-3',
      title: '3 disputes awaiting review',
      subtitle: 'Section 15 objection hearing notice issued by High Court bench',
      urgency: 'high',
      tab: 'disputes-grievances'
    },
    {
      id: 'act-4',
      title: '2 rehabilitation cases pending approval',
      subtitle: 'Alternative model house plot allotment confirmation under 2nd Schedule',
      urgency: 'low',
      tab: 'rehabilitation'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            District Administration & State CALA Portal
          </span>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Officer Overview & Monitoring
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time status of statutory acquisitions, compensation disbursements, and pending administrative actions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCalculator}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-blue-900 border border-slate-300 rounded text-xs font-semibold shadow-2xs transition-colors"
          >
            LARR 2013 Calculator
          </button>
          <button
            onClick={() => onNavigateTab ? onNavigateTab('gis-map') : onNavigateToGis?.()}
            className="px-3 py-1.5 bg-[#1B365D] hover:bg-[#122642] text-white rounded text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Open GIS Explorer</span>
          </button>
        </div>
      </div>

      {/* TOP SUMMARY: Simple Rectangular Information Panels */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Panel 1 */}
        <div className="bg-white border border-slate-200 rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">
            Active Projects
          </span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">
            {activeProjectsCount}
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">
            PM GatiShakti Corridors
          </span>
        </div>

        {/* Panel 2 */}
        <div className="bg-white border border-slate-200 rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">
            Land Parcels
          </span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">
            {totalParcelsCount.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">
            {nationalAcquisitionPercentage}% Acquired
          </span>
        </div>

        {/* Panel 3 */}
        <div className="bg-white border border-slate-200 rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">
            Pending Verification
          </span>
          <span className="text-xl font-bold text-amber-800 mt-1 block">
            {pendingVerificationCount}
          </span>
          <span className="text-[10px] text-amber-700 mt-0.5 block">
            Field & Title Checks
          </span>
        </div>

        {/* Panel 4 */}
        <div className="bg-white border border-slate-200 rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">
            Compensation Pending
          </span>
          <span className="text-xl font-bold text-blue-900 mt-1 block">
            {compensationPendingCount}
          </span>
          <span className="text-[10px] text-blue-700 mt-0.5 block">
            PFMS Batch Validation
          </span>
        </div>

        {/* Panel 5 */}
        <div className="bg-white border border-slate-200 rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">
            Open Disputes
          </span>
          <span className="text-xl font-bold text-rose-800 mt-1 block">
            {openDisputesCount}
          </span>
          <span className="text-[10px] text-rose-700 mt-0.5 block">
            Interim Court Stays
          </span>
        </div>

        {/* Panel 6 */}
        <div className="bg-white border border-slate-200 rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">
            R&R Cases Pending
          </span>
          <span className="text-xl font-bold text-purple-900 mt-1 block">
            {rrCasesPendingCount}
          </span>
          <span className="text-[10px] text-purple-700 mt-0.5 block">
            Plot Allotments
          </span>
        </div>
      </div>

      {/* SECTION: PROJECT PROGRESS */}
      <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              PROJECT PROGRESS
            </h2>
            <p className="text-xs text-slate-600">
              State-wise and corridor-wise acquisition metrics under RFCTLARR Act 2013
            </p>
          </div>
          <span className="text-xs text-slate-500">
            Total Ha Required: <strong>{totalRequiredHa.toLocaleString()} Ha</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-2.5 px-4">Project</th>
                <th className="py-2.5 px-4">District / States</th>
                <th className="py-2.5 px-4">Stage</th>
                <th className="py-2.5 px-4">Affected Area</th>
                <th className="py-2.5 px-4">Acquisition Progress</th>
                <th className="py-2.5 px-4">Compensation</th>
                <th className="py-2.5 px-4">Issues</th>
                <th className="py-2.5 px-4 text-right">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {projects.map(proj => {
                const pct = Math.round((proj.landAcquiredHa / proj.totalLandRequiredHa) * 100);
                const projectAlerts = alerts.filter(a => a.projectCode === proj.code && a.status !== 'Stay Vacated');

                return (
                  <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#1B365D]">
                      <button
                        onClick={() => onSelectProject(proj.id)}
                        className="hover:underline text-left"
                      >
                        {proj.name}
                      </button>
                      <span className="block text-[11px] text-slate-500 font-normal">
                        {proj.leadAgency || proj.executingAgency}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {(proj.statesInvolved || proj.states || []).join(', ')}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="blue">{proj.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-800 font-semibold">
                      {proj.totalLandRequiredHa.toLocaleString()} Ha
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-32 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="font-bold text-slate-700">{pct}%</span>
                          <span className="text-slate-500">{proj.landAcquiredHa} Ha</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-700 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-800">
                      <span className="font-semibold text-slate-900">
                        ₹{proj.compensationDisbursedCr} Cr
                      </span>
                      <span className="block text-[11px] text-slate-500">
                        of ₹{proj.totalBudgetCr} Cr
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {projectAlerts.length > 0 ? (
                        <span className="inline-flex items-center gap-1 text-rose-800 font-semibold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          {projectAlerts.length} Stays
                        </span>
                      ) : (
                        <span className="text-emerald-800 font-medium">None</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500 whitespace-nowrap">
                      Today, 08:45 IST
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION: PENDING ACTIONS & VELOCITY MONITOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Actions (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded shadow-xs p-5 space-y-3">
          <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                PENDING ACTIONS
              </h2>
              <p className="text-xs text-slate-600">
                Action items requiring Competent Authority (CALA) sanction or review
              </p>
            </div>
            <span className="text-xs font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
              4 Critical Tasks
            </span>
          </div>

          <div className="space-y-2.5">
            {pendingActions.map(action => (
              <div
                key={action.id}
                className="p-3 rounded border border-slate-200 hover:border-blue-300 hover:bg-slate-50/80 transition-all flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      action.urgency === 'high' ? 'bg-rose-600' :
                      action.urgency === 'medium' ? 'bg-amber-500' : 'bg-blue-600'
                    }`} />
                    <h3 className="text-xs font-bold text-slate-900">
                      {action.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-600 pl-4">
                    {action.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => onNavigateTab?.(action.tab)}
                  className="px-3 py-1 bg-slate-100 hover:bg-blue-50 text-blue-900 border border-slate-300 rounded text-xs font-semibold shrink-0 transition-colors"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Acquisition Velocity Chart (1 Col) */}
        <div className="bg-white border border-slate-200 rounded shadow-xs p-5 space-y-3">
          <div className="border-b border-slate-200 pb-2.5">
            <h3 className="text-sm font-bold text-slate-900">
              Acquisition Velocity (Ha)
            </h3>
            <p className="text-xs text-slate-600">
              Quarterly achievement vs statutory target
            </p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyAcquisitionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', fontSize: '11px' }}
                />
                <Bar dataKey="targetHa" name="Target (Ha)" fill="#94A3B8" radius={[2, 2, 0, 0]} />
                <Bar dataKey="achievedHa" name="Achieved (Ha)" fill="#1B365D" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#94A3B8] rounded-xs inline-block"></span> Target
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#1B365D] rounded-xs inline-block"></span> Achieved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
