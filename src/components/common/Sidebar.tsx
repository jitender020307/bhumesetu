import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Layers, 
  Map, 
  GitMerge, 
  IndianRupee, 
  Home, 
  ClipboardCheck, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck, 
  Network,
  Users
} from 'lucide-react';

export interface OfficerNavItem {
  id: string;
  label: string;
  section: 'Administration' | 'Statutory Workflow' | 'Compliance & Governance';
  icon: React.ComponentType<{ className?: string }>;
  badgeCount?: number;
  badgeType?: 'alert' | 'neutral';
}

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  disputesCount: number;
}

export const OFFICER_NAV_ITEMS: OfficerNavItem[] = [
  // Administration
  { id: 'overview', label: 'Overview', section: 'Administration', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', section: 'Administration', icon: FolderKanban },
  { id: 'land-parcels', label: 'Land Parcels', section: 'Administration', icon: Layers },
  { id: 'gis-map', label: 'GIS Map', section: 'Administration', icon: Map },
  
  // Statutory Workflow
  { id: 'acquisition-workflow', label: 'Acquisition Workflow', section: 'Statutory Workflow', icon: GitMerge },
  { id: 'compensation', label: 'Compensation', section: 'Statutory Workflow', icon: IndianRupee },
  { id: 'rehabilitation', label: 'Rehabilitation & Resettlement', section: 'Statutory Workflow', icon: Home },
  { id: 'field-verification', label: 'Field Verification', section: 'Statutory Workflow', icon: ClipboardCheck },
  
  // Compliance & Governance
  { id: 'documents', label: 'Official Documents', section: 'Compliance & Governance', icon: FileText },
  { id: 'disputes-grievances', label: 'Disputes & Grievances', section: 'Compliance & Governance', icon: AlertTriangle },
  { id: 'risk-insights', label: 'Risk & Compliance Insights', section: 'Compliance & Governance', icon: TrendingUp },
  { id: 'reports', label: 'Reports', section: 'Compliance & Governance', icon: BarChart3 },
  { id: 'audit-compliance', label: 'Audit & Activity History', section: 'Compliance & Governance', icon: ShieldCheck },
  { id: 'system-admin', label: 'System Administration', section: 'Compliance & Governance', icon: Network }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  disputesCount
}) => {
  const sections = ['Administration', 'Statutory Workflow', 'Compliance & Governance'] as const;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 select-none overflow-y-auto shadow-2xs">
      {/* Officer Workspace Header Note */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
          Authorized Workspace
        </span>
        <span className="text-xs font-semibold text-[#1B365D]">
          Competent Authority & District Administration
        </span>
      </div>

      {/* Navigation Sections */}
      <div className="p-3 space-y-5 flex-1">
        {sections.map(sec => {
          const items = OFFICER_NAV_ITEMS.filter(i => i.section === sec);
          return (
            <div key={sec} className="space-y-1">
              <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {sec}
              </div>
              <div className="space-y-0.5">
                {items.map(item => {
                  const Icon = item.icon;
                  // Handle mapped tab equivalences for seamless compatibility
                  const isSelected = activeTab === item.id || 
                    (item.id === 'overview' && (activeTab === 'command-center' || activeTab === 'overview')) ||
                    (item.id === 'projects' && (activeTab === 'project-twin' || activeTab === 'projects')) ||
                    (item.id === 'gis-map' && (activeTab === 'gis-explorer' || activeTab === 'gis-map')) ||
                    (item.id === 'acquisition-workflow' && (activeTab === 'workflow-pipeline' || activeTab === 'acquisition-workflow')) ||
                    (item.id === 'compensation' && (activeTab === 'compensation-dbt' || activeTab === 'compensation')) ||
                    (item.id === 'rehabilitation' && (activeTab === 'rehabilitation-rr' || activeTab === 'rehabilitation')) ||
                    (item.id === 'documents' && (activeTab === 'document-vault' || activeTab === 'documents')) ||
                    (item.id === 'disputes-grievances' && (activeTab === 'alerts-disputes' || activeTab === 'disputes-grievances')) ||
                    (item.id === 'risk-insights' && (activeTab === 'ai-risk-analytics' || activeTab === 'risk-insights')) ||
                    (item.id === 'reports' && (activeTab === 'reports-analytics' || activeTab === 'reports')) ||
                    (item.id === 'system-admin' && (activeTab === 'api-gateway' || activeTab === 'system-admin')) ||
                    (item.id === 'audit-compliance' && (activeTab === 'audit-trail' || activeTab === 'audit-compliance'));

                  const hasBadge = item.id === 'disputes-grievances' && disputesCount > 0;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors text-left ${
                        isSelected
                          ? 'bg-[#1B365D] text-white shadow-xs font-semibold'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {hasBadge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                          isSelected ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {disputesCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Bottom Infrastructure Badge */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500">
        <div className="flex items-center justify-between">
          <span className="text-slate-600 font-medium">National Data Center</span>
          <span className="text-emerald-700 font-semibold text-[10px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Online
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-0.5">
          PM GatiShakti Synchronized
        </p>
      </div>
    </aside>
  );
};
