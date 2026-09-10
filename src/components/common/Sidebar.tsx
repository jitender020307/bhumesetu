import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Map, 
  GitMerge, 
  IndianRupee, 
  Home, 
  FileCheck2, 
  ClipboardCheck, 
  AlertTriangle, 
  Sparkles, 
  BarChart3, 
  Network, 
  ShieldCheck, 
  Users,
  ChevronRight
} from 'lucide-react';

export type NavViewId = 
  | 'command_center'
  | 'project_twin'
  | 'gis_explorer'
  | 'workflow_pipeline'
  | 'compensation_dbt'
  | 'rehabilitation_rr'
  | 'document_vault'
  | 'field_verification'
  | 'alerts_disputes'
  | 'ai_risk_engine'
  | 'reports_dossier'
  | 'api_gateway'
  | 'audit_trail'
  | 'public_portal';

interface SidebarProps {
  activeView: NavViewId;
  onSelectView: (view: NavViewId) => void;
  disputesCount: number;
}

interface NavItem {
  id: NavViewId;
  label: string;
  category: 'Core Monitoring' | 'Operations & LARR' | 'Governance & Analytics' | 'Public & Citizen';
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeColor?: string;
}

export const NAV_ITEMS: NavItem[] = [
  // Core Monitoring
  { id: 'command_center', label: 'Command Center', category: 'Core Monitoring', icon: LayoutDashboard },
  { id: 'project_twin', label: 'Project Digital Twin', category: 'Core Monitoring', icon: Layers },
  { id: 'gis_explorer', label: 'GIS Cadastral Map', category: 'Core Monitoring', icon: Map },
  
  // Operations & LARR
  { id: 'workflow_pipeline', label: 'LARR 2013 Statutory Pipeline', category: 'Operations & LARR', icon: GitMerge },
  { id: 'compensation_dbt', label: 'Compensation & PFMS DBT', category: 'Operations & LARR', icon: IndianRupee },
  { id: 'rehabilitation_rr', label: 'Rehabilitation & Resettlement (R&R)', category: 'Operations & LARR', icon: Home },
  { id: 'document_vault', label: 'Document Vault & DigiLocker', category: 'Operations & LARR', icon: FileCheck2 },
  { id: 'field_verification', label: 'Field Survey & Drone Sync', category: 'Operations & LARR', icon: ClipboardCheck },
  
  // Governance & Analytics
  { id: 'alerts_disputes', label: 'Alerts & Litigation Stays', category: 'Governance & Analytics', icon: AlertTriangle, badge: '4 Stays', badgeColor: 'bg-rose-500' },
  { id: 'ai_risk_engine', label: 'AI Risk & Decision Support', category: 'Governance & Analytics', icon: Sparkles, badge: 'AI Engine', badgeColor: 'bg-indigo-500' },
  { id: 'reports_dossier', label: 'Reports & CAG Dossier', category: 'Governance & Analytics', icon: BarChart3 },
  { id: 'api_gateway', label: 'API & GatiShakti Gateway', category: 'Governance & Analytics', icon: Network, badge: '6 APIs', badgeColor: 'bg-emerald-500' },
  { id: 'audit_trail', label: 'Audit Trail & Integrity Log', category: 'Governance & Analytics', icon: ShieldCheck },

  // Public & Citizen
  { id: 'public_portal', label: 'Landowner Citizen Portal', category: 'Public & Citizen', icon: Users, badge: 'Public' }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  disputesCount
}) => {
  const categories = ['Core Monitoring', 'Operations & LARR', 'Governance & Analytics', 'Public & Citizen'] as const;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 select-none overflow-y-auto">
      <div className="p-3 space-y-6">
        {categories.map(cat => {
          const items = NAV_ITEMS.filter(i => i.category === cat);
          return (
            <div key={cat} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {cat}
              </div>
              <div className="space-y-0.5">
                {items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  const badgeText = item.id === 'alerts_disputes' && disputesCount > 0 ? `${disputesCount} Stays` : item.badge;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectView(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                        isActive
                          ? 'bg-sky-950/70 text-sky-200 border border-sky-800/80 shadow-xs'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {badgeText && (
                          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full text-white ${item.badgeColor || 'bg-slate-700'}`}>
                            {badgeText}
                          </span>
                        )}
                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-sky-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer System Status Banner */}
      <div className="mt-auto p-3 border-t border-slate-800 bg-slate-950/60 text-[11px] text-slate-400">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">NIC Cloud Infrastructure</span>
          <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 99.98% SLA
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
          <span>Version 3.2.4-PROD</span>
          <span className="font-mono">SIH26016</span>
        </div>
      </div>
    </aside>
  );
};
