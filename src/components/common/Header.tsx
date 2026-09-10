import React, { useState } from 'react';
import { 
  Bell, 
  HelpCircle, 
  ChevronDown, 
  FileText,
  User as UserIcon,
  Globe,
  Sliders,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { User } from '../../types';

interface HeaderProps {
  currentUser: User;
  onSwitchUser: (user: User) => void;
  availableUsers: User[];
  isOfficerMode: boolean;
  onToggleMode: (officerMode: boolean) => void;
  onOpenCalculator: () => void;
  onOpenHelpModal: () => void;
  language: 'en' | 'hi';
  onToggleLanguage: () => void;
  fontSizeLevel: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (level: 'normal' | 'large' | 'xlarge') => void;
  highContrast: boolean;
  onToggleContrast: () => void;
  unreadAlertsCount: number;
  onNavigateToAlerts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onSwitchUser,
  availableUsers,
  isOfficerMode,
  onToggleMode,
  onOpenCalculator,
  onOpenHelpModal,
  language,
  onToggleLanguage,
  fontSizeLevel,
  onChangeFontSize,
  highContrast,
  onToggleContrast,
  unreadAlertsCount,
  onNavigateToAlerts
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 select-none shadow-xs">
      {/* Top Gov Banner Strip with tricolor bar */}
      <div className="bg-[#1B365D] text-white px-4 lg:px-8 py-1 flex items-center justify-between text-xs border-b border-blue-950">
        <div className="flex items-center gap-3">
          {/* Subtle Indian Flag Ribbon */}
          <div className="flex flex-col h-3 w-5 rounded-xs overflow-hidden border border-white/30 shrink-0">
            <div className="h-1 bg-[#FF9933] w-full"></div>
            <div className="h-1 bg-white w-full flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-[#000080]"></div>
            </div>
            <div className="h-1 bg-[#138808] w-full"></div>
          </div>
          <span className="font-medium tracking-wide text-slate-100">
            {language === 'en' ? 'Government of India' : 'भारत सरकार'} • {language === 'en' ? 'National Portal for Land Acquisition Governance' : 'भूमि अधिग्रहण राष्ट्रीय पोर्टल'}
          </span>
        </div>

        {/* Accessibility & Language Bar */}
        <div className="flex items-center gap-4 text-xs">
          {/* Accessibility Quick Tools */}
          <div className="hidden sm:flex items-center gap-1.5 border-r border-blue-900 pr-3">
            <span className="text-slate-300 text-[11px]">Text Size:</span>
            <button
              onClick={() => onChangeFontSize('normal')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                fontSizeLevel === 'normal' ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white'
              }`}
              title="Standard Text Size"
            >
              A
            </button>
            <button
              onClick={() => onChangeFontSize('large')}
              className={`px-1.5 py-0.5 rounded text-[12px] font-bold ${
                fontSizeLevel === 'large' ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white'
              }`}
              title="Large Text"
            >
              A+
            </button>
            <button
              onClick={() => onChangeFontSize('xlarge')}
              className={`px-1.5 py-0.5 rounded text-[13px] font-black ${
                fontSizeLevel === 'xlarge' ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white'
              }`}
              title="Extra Large Text"
            >
              A++
            </button>
            
            <button
              onClick={onToggleContrast}
              className={`ml-2 px-1.5 py-0.5 rounded text-[11px] border ${
                highContrast ? 'bg-amber-400 text-black border-amber-300 font-bold' : 'border-white/30 text-slate-200 hover:bg-white/10'
              }`}
              title="Toggle High Contrast"
            >
              {highContrast ? 'Standard Contrast' : 'High Contrast'}
            </button>
          </div>

          {/* Language Selector */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 hover:text-amber-300 transition-colors font-medium cursor-pointer"
            title="Switch Portal Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Help & FAQs */}
          <button
            onClick={onOpenHelpModal}
            className="flex items-center gap-1 hover:text-amber-300 transition-colors font-medium cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{language === 'en' ? 'Help & Support' : 'सहायता'}</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Official Platform Identity */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center justify-center w-11 h-11 rounded-sm bg-[#1B365D] text-white shadow-xs p-1">
            {/* Clean Devanagari / Typography Seal Mark */}
            <div className="w-full h-full border border-amber-400/80 rounded-xs flex flex-col items-center justify-center">
              <span className="text-base font-bold text-amber-300 leading-none">भू</span>
              <span className="text-[9px] tracking-wider font-semibold text-white">SETU</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#1B365D] tracking-tight">
                BHOOMISETU
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-semibold rounded-xs border border-slate-300">
                Official Digital Service
              </span>
            </div>
            <p className="text-xs text-slate-600 font-normal">
              {language === 'en' 
                ? 'National Land Acquisition & Project Management Platform' 
                : 'राष्ट्रीय भूमि अधिग्रहण एवं परियोजना प्रबंधन मंच'}
            </p>
          </div>
        </div>

        {/* Center / Mode Navigation: Public Portal vs Officer Workspace */}
        <div className="hidden md:flex items-center bg-slate-100 p-1 rounded border border-slate-300">
          <button
            onClick={() => onToggleMode(false)}
            className={`px-4 py-1.5 rounded text-xs font-semibold transition-all ${
              !isOfficerMode
                ? 'bg-white text-[#1B365D] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'en' ? 'Citizen Public Portal' : 'नागरिक सार्वजनिक पोर्टल'}
          </button>
          <button
            onClick={() => onToggleMode(true)}
            className={`px-4 py-1.5 rounded text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isOfficerMode
                ? 'bg-[#1B365D] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Officer Workspace' : 'अधिकारी कार्यक्षेत्र'}</span>
          </button>
        </div>

        {/* Right: Actions, Notifications & Officer Profile */}
        <div className="flex items-center gap-3">
          {/* Official Compensation Calculator Quick Action */}
          <button
            onClick={onOpenCalculator}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1B365D] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-colors"
            title="Open RFCTLARR Act 2013 Compensation Calculator"
          >
            <FileText className="w-3.5 h-3.5 text-blue-700" />
            <span>LARR Calculator</span>
          </button>

          {/* Notifications / Alerts Indicator */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-sm relative transition-colors border border-transparent hover:border-slate-200"
              title="Official Notices & Urgent Stay Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-600 rounded-full"></span>
              )}
            </button>

            {/* Notification Dropdown Menu */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded shadow-lg z-50 p-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-semibold text-slate-800">Pending Actions & Alerts</span>
                  <span className="text-[11px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-medium">
                    {unreadAlertsCount} Active Cases
                  </span>
                </div>
                <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
                  <div 
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigateToAlerts();
                    }}
                    className="p-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded cursor-pointer transition-colors"
                  >
                    <p className="font-semibold text-amber-950">High Court Stay Notice • Gujarat</p>
                    <p className="text-[11px] text-amber-900 mt-0.5">Vadodara Section 15 Hearing scheduled on 18-Sep-2026</p>
                  </div>
                  <div 
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigateToAlerts();
                    }}
                    className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded cursor-pointer transition-colors"
                  >
                    <p className="font-semibold text-slate-800">PFMS Batch Reconciliation Ready</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">34 Beneficiaries approved for Direct Benefit Transfer</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigateToAlerts();
                    }}
                    className="text-blue-800 hover:underline text-xs font-medium"
                  >
                    View All Grievances & Legal Stays →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Officer Profile & Role Context */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-left bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#1B365D] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden xl:block min-w-0 max-w-[140px]">
                <p className="font-medium text-slate-900 truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{currentUser.designation}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded shadow-xl z-50 p-3 text-xs">
                <div className="pb-2.5 border-b border-slate-200">
                  <p className="font-bold text-slate-900 text-sm">{currentUser.name}</p>
                  <p className="text-slate-600 font-medium">{currentUser.designation}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{currentUser.department}</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-[10px] font-semibold uppercase">
                      {currentUser.state} Jurisdiction
                    </span>
                  </div>
                </div>

                <div className="py-2">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1.5">
                    Authorized Designations
                  </p>
                  <div className="space-y-1">
                    {availableUsers.map(u => (
                      <button
                        key={u.id}
                        onClick={() => {
                          onSwitchUser(u);
                          setShowProfileMenu(false);
                        }}
                        className={`w-full text-left p-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                          currentUser.id === u.id 
                            ? 'bg-blue-50 text-blue-900 font-semibold border border-blue-200' 
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span className="truncate">{u.name}</span>
                        <span className="text-[10px] text-slate-500 shrink-0 ml-1">
                          {u.role.replace(/_/g, ' ')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <button
                    onClick={() => {
                      onToggleMode(!isOfficerMode);
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left text-blue-800 hover:underline font-medium flex items-center gap-1.5 py-1"
                  >
                    <span>Switch to {isOfficerMode ? 'Citizen Public View' : 'Officer Workspace'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Mode Switcher Bar */}
      <div className="md:hidden flex border-t border-slate-200 bg-slate-100 p-1">
        <button
          onClick={() => onToggleMode(false)}
          className={`flex-1 py-1.5 text-xs font-semibold text-center rounded ${
            !isOfficerMode ? 'bg-white text-[#1B365D] shadow-xs' : 'text-slate-600'
          }`}
        >
          Citizen Public Portal
        </button>
        <button
          onClick={() => onToggleMode(true)}
          className={`flex-1 py-1.5 text-xs font-semibold text-center rounded ${
            isOfficerMode ? 'bg-[#1B365D] text-white shadow-xs' : 'text-slate-600'
          }`}
        >
          Officer Workspace
        </button>
      </div>
    </header>
  );
};
