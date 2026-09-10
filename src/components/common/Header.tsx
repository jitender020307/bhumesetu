import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ShieldCheck, 
  Calculator, 
  ChevronDown, 
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { AVAILABLE_ROLES } from '../../data/mockData';

interface HeaderProps {
  currentUser: User;
  onRoleChange: (role: UserRole) => void;
  onOpenCalculator: () => void;
  selectedState: string;
  onStateChange: (state: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  unreadAlertsCount: number;
  onAlertsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onRoleChange,
  onOpenCalculator,
  selectedState,
  onStateChange,
  searchQuery,
  onSearchChange,
  unreadAlertsCount,
  onAlertsClick
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const statesList = ['All India Corridors', 'Gujarat', 'Maharashtra', 'Madhya Pradesh', 'Tamil Nadu', 'Uttar Pradesh'];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 lg:px-6 py-2.5">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-emerald-600 to-sky-700 text-white shadow-lg p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              {/* Ashoka chakra inspired / Land Bridge Icon */}
              <div className="relative flex items-center justify-center">
                <span className="text-base font-black tracking-tighter text-amber-400">भू</span>
                <span className="absolute -bottom-1 text-[9px] font-extrabold text-emerald-400">SETU</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                BHOOMISETU
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  SIH26016
                </span>
              </h1>
              {/* Indian Flag micro-ribbon */}
              <div className="flex h-3 w-4.5 rounded-[2px] overflow-hidden border border-slate-700 shadow-xs">
                <div className="w-full bg-orange-500 h-1"></div>
                <div className="w-full bg-white h-1 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-900"></div>
                </div>
                <div className="w-full bg-green-600 h-1"></div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              National Land Acquisition & Management System • PM GatiShakti NMP
            </p>
          </div>
        </div>

        {/* Center: Global Search & State Filter */}
        <div className="flex-1 max-w-xl mx-2 hidden md:flex items-center gap-2">
          {/* State / Corridor Dropdown */}
          <select
            value={selectedState}
            onChange={e => onStateChange(e.target.value)}
            className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            {statesList.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search Survey # (e.g. 142/2A), Parcel ID, Village, Khata, or Khatedar..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: Quick Tools, Role Selector, User Info */}
        <div className="flex items-center gap-2.5">
          {/* RFCTLARR 2013 Calculator Button */}
          <button
            onClick={onOpenCalculator}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 hover:bg-emerald-900/60 text-xs font-medium transition-colors shadow-xs"
            title="Open Statutory RFCTLARR 2013 Compensation Calculator"
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>LARR Calc</span>
          </button>

          {/* Live GatiShakti Sync Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400">GatiShakti:</span>
            <span className="text-emerald-400 font-medium">LIVE</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotificationMenu(!showNotificationMenu);
                if (showNotificationMenu) onAlertsClick();
              }}
              className="relative p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="System Alerts & Escalations"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotificationMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-semibold text-slate-200">Active High-Priority Alerts</span>
                  <span className="text-[10px] text-rose-400 font-mono">{unreadAlertsCount} pending</span>
                </div>
                <div className="space-y-2 mt-2">
                  <div className="p-2 rounded bg-rose-950/50 border border-rose-900/60">
                    <div className="flex items-start gap-1.5 text-rose-300 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>Bombay HC Stay: Vasai Mangrove Corridor</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">42.4 Ha stalled. Hearing scheduled for Sept 24.</p>
                  </div>
                  <div className="p-2 rounded bg-amber-950/50 border border-amber-900/60">
                    <div className="flex items-start gap-1.5 text-amber-300 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>Ken-Betwa FRA Gram Sabha Consensus Pending</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">3 tribal villages in Panna buffer require special corpus.</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowNotificationMenu(false);
                    onAlertsClick();
                  }}
                  className="w-full mt-2 py-1.5 text-center text-sky-400 hover:text-sky-300 font-medium text-[11px]"
                >
                  View All Court Stays & Bottlenecks →
                </button>
              </div>
            )}
          </div>

          {/* Role Switcher Dropdown (Crucial for SIH evaluation to test all stakeholder roles) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 pl-2.5 pr-2 py-1.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors text-left"
            >
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] uppercase font-bold text-sky-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Role Switcher
                </span>
                <span className="text-xs font-medium text-slate-200 truncate max-w-[130px]">
                  {AVAILABLE_ROLES.find(r => r.role === currentUser.role)?.label}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 text-xs">
                <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  Switch Stakeholder Persona (SIH Demo)
                </div>
                <div className="py-1 space-y-1">
                  {AVAILABLE_ROLES.map(item => {
                    const isSelected = item.role === currentUser.role;
                    return (
                      <button
                        key={item.role}
                        onClick={() => {
                          onRoleChange(item.role);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-sky-950/80 border border-sky-800/70 text-sky-200'
                            : 'hover:bg-slate-800/70 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs">{item.label}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                        <span className="text-[9px] text-slate-500 font-mono block mt-1">e.g. {item.sampleUser}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
