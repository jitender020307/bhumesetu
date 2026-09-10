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
  LandPlot, 
  IndianRupee, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight,
  ExternalLink,
  Layers,
  MapPin
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

interface CommandCenterViewProps {
  projects: InfrastructureProject[];
  parcels: LandParcel[];
  alerts: AlertDispute[];
  workflowStages: WorkflowStage[];
  onSelectProject: (id: string) => void;
  onNavigateToGis: () => void;
  onOpenCalculator: () => void;
}

export const CommandCenterView: React.FC<CommandCenterViewProps> = ({
  projects,
  parcels,
  alerts,
  workflowStages,
  onSelectProject,
  onNavigateToGis,
  onOpenCalculator
}) => {
  // Aggregate national metrics
  const totalRequiredHa = projects.reduce((acc, p) => acc + p.totalLandRequiredHa, 0);
  const totalAcquiredHa = projects.reduce((acc, p) => acc + p.landAcquiredHa, 0);
  const nationalAcquisitionPercentage = Math.round((totalAcquiredHa / totalRequiredHa) * 100);

  const totalBudgetCr = projects.reduce((acc, p) => acc + p.totalBudgetCr, 0);
  const totalDisbursedCr = projects.reduce((acc, p) => acc + p.compensationDisbursedCr, 0);

  const totalDisputes = alerts.filter(a => a.status !== 'Stay Vacated').length;

  // Chart data: Monthly velocity
  const quarterlyAcquisitionData = [
    { quarter: 'Q1 FY25', targetHa: 950, achievedHa: 910 },
    { quarter: 'Q2 FY25', targetHa: 1200, achievedHa: 1140 },
    { quarter: 'Q3 FY25', targetHa: 1450, achievedHa: 1390 },
    { quarter: 'Q4 FY25', targetHa: 1600, achievedHa: 1520 },
    { quarter: 'Q1 FY26', targetHa: 1800, achievedHa: 1740 },
    { quarter: 'Q2 FY26', targetHa: 2000, achievedHa: 1980 }
  ];

  // Category distribution data
  const categoryData = [
    { name: 'Agricultural', value: 68, color: '#10b981' },
    { name: 'Forest / Buffer', value: 16, color: '#0ea5e9' },
    { name: 'Commercial', value: 10, color: '#f59e0b' },
    { name: 'Gram Sabha / Abadi', value: 6, color: '#8b5cf6' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / SIH Problem Statement Alignment */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-xl p-4 lg:p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold">
              SIH26016 Real-Time National Monitoring
            </span>
            <span className="text-xs text-slate-400">Integrated Decision Support Hub</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            National Land Acquisition Executive Command Center
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Single window multi-ministerial digital corridor twin integrating PM GatiShakti GIS, state Bhoomi records, PFMS direct benefit disbursement, and RFCTLARR 2013 statutory compliance.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCalculator}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-all shadow-md flex items-center gap-1.5"
          >
            <IndianRupee className="w-4 h-4" />
            <span>Statutory LARR Calculator</span>
          </button>
          <button
            onClick={onNavigateToGis}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <MapPin className="w-4 h-4 text-sky-400" />
            <span>Open National GIS</span>
          </button>
        </div>
      </div>

      {/* Top 4 Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Land Acquired
            </span>
            <div className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-800 text-emerald-400">
              <LandPlot className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-slate-100">
              {totalAcquiredHa.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">/ {totalRequiredHa.toLocaleString()} Ha</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-semibold">{nationalAcquisitionPercentage}% Complete</span>
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <TrendingUp className="w-3 h-3 text-emerald-400" /> +284 Ha this month
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${nationalAcquisitionPercentage}%` }}
            />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              PFMS DBT Disbursed
            </span>
            <div className="p-2 rounded-lg bg-sky-950/70 border border-sky-800 text-sky-400">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-slate-100">
              ₹{totalDisbursedCr.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">Cr Disbursed</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-sky-400 font-semibold">
              {Math.round((totalDisbursedCr / (totalBudgetCr * 0.35)) * 100)}% of Compensation Allocation
            </span>
            <span className="text-[11px] text-emerald-400">100% Solatium Audited</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-sky-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.round((totalDisbursedCr / (totalBudgetCr * 0.35)) * 100)}%` }}
            />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active National Corridors
            </span>
            <div className="p-2 rounded-lg bg-indigo-950/70 border border-indigo-800 text-indigo-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-slate-100">
              {projects.length}
            </span>
            <span className="text-xs text-slate-400">Corridors (2,275 km)</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-300">21,410 Parcels mapped</span>
            <Badge variant="indigo" size="sm">MoRTH • Rly • Jal</Badge>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full w-4/5" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Court Stays & Disputes
            </span>
            <div className="p-2 rounded-lg bg-rose-950/70 border border-rose-800 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-rose-400">
              {totalDisputes}
            </span>
            <span className="text-xs text-slate-400">High Court Stays / Sec 64</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-rose-400 font-medium">342.5 Ha Impacted</span>
            <Badge variant="rose" size="sm" pulse>Action Required</Badge>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full w-2/5" />
          </div>
        </div>
      </div>

      {/* Projects Directory & Status Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              National Infrastructure Corridors Status
              <span className="text-xs font-normal text-slate-400">({projects.length} Active Mega-Projects)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Real-time status synchronized with PM GatiShakti National Master Plan</p>
          </div>
          <span className="text-xs text-sky-400 font-medium">Click corridor to inspect digital twin →</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Corridor & Agency</th>
                <th className="py-3 px-4">Ministry</th>
                <th className="py-3 px-4">States Spanned</th>
                <th className="py-3 px-4">Land Progress</th>
                <th className="py-3 px-4">DBT Disbursed</th>
                <th className="py-3 px-4">Disputes</th>
                <th className="py-3 px-4">AI Risk</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {projects.map(project => {
                const isHighRisk = project.riskScore >= 60;
                return (
                  <tr 
                    key={project.id}
                    onClick={() => onSelectProject(project.id)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                        {project.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {project.code} • {project.executingAgency}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={project.ministry === 'MoRTH' ? 'amber' : project.ministry === 'Indian Railways' ? 'sky' : 'indigo'}>
                        {project.ministry}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {project.states.map(st => (
                          <span key={st} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                            {st}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-100">{project.acquisitionPercentage}%</span>
                        <span className="text-[10px] text-slate-400">{project.landAcquiredHa} / {project.totalLandRequiredHa} Ha</span>
                      </div>
                      <div className="w-28 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${project.acquisitionPercentage > 85 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                          style={{ width: `${project.acquisitionPercentage}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-slate-100">
                        ₹{project.compensationDisbursedCr.toLocaleString()} Cr
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        of ₹{project.totalBudgetCr.toLocaleString()} Cr
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {project.activeDisputes > 10 ? (
                        <span className="font-bold text-rose-400 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> {project.activeDisputes}
                        </span>
                      ) : (
                        <span className="text-slate-300 font-medium">{project.activeDisputes}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isHighRisk ? 'bg-rose-400 animate-pulse' : 'bg-emerald-400'}`} />
                        <span className={`font-semibold ${isHighRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {project.riskScore}/100
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="p-1 rounded bg-slate-800 hover:bg-sky-900/60 text-sky-400 hover:text-sky-200 border border-slate-700">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Visualizers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Quarterly Acquisition Velocity Bar Chart */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-100">
                National Land Acquisition Quarterly Run-Rate (Hectares)
              </h4>
              <p className="text-xs text-slate-400">Target vs Achieved land transfer velocity</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-sky-500 rounded-xs"></span>
                <span className="text-slate-300">Achieved Ha</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-slate-700 rounded-xs"></span>
                <span className="text-slate-400">Target Ha</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyAcquisitionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="quarter" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                />
                <Bar dataKey="targetHa" fill="#334155" radius={[4, 4, 0, 0]} />
                <Bar dataKey="achievedHa" fill="#0284c7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Land Category Distribution Pie */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-100">
              Land Category Classification
            </h4>
            <p className="text-xs text-slate-400">Breakdown of notified corridor area</p>
          </div>

          <div className="h-44 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={68}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val) => `${val}%`}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {categoryData.map(c => (
              <div key={c.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-slate-300">{c.name}</span>
                </div>
                <span className="font-bold text-slate-200">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
