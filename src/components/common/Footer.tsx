import React from 'react';
import { ExternalLink, Phone, Mail, HelpCircle, Shield, FileText } from 'lucide-react';

interface FooterProps {
  onNavigateTab?: (tab: string) => void;
  onOpenGrievance?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenGrievance }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm mt-auto">
      {/* Top tricolor indicator stripe */}
      <div className="h-1 w-full flex">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-white"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Identity & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">BHOOMISETU</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              National Land Acquisition & Project Management Platform for transparent statutory workflows, electronic compensation disbursement, rehabilitation tracking, and citizen public notices.
            </p>
            <div className="pt-2">
              <span className="inline-block text-[11px] bg-slate-800 text-amber-300 px-2.5 py-1 rounded border border-slate-700">
                Demonstration & Digital Governance Platform
              </span>
            </div>
          </div>

          {/* Citizen Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-1.5">
              Citizen Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigateTab?.('public-portal')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Search Land & Survey Records
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab?.('public-portal')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Track Public Land Notices (3A / 3D)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab?.('public-portal')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  LARR 2013 Statutory Valuation Guidance
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenGrievance || (() => onNavigateTab?.('public-portal'))}
                  className="hover:text-amber-400 transition-colors text-left font-medium text-amber-300"
                >
                  Register / Track Public Grievance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab?.('rehabilitation-rr')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Rehabilitation & Resettlement Entitlements
                </button>
              </li>
            </ul>
          </div>

          {/* Relevant Ministries & Statutory Standards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-1.5">
              Statutory Framework
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>RFCTLARR Act 2013 (First, Second & Third Schedules)</li>
              <li>National Highways Act 1956 (Section 3A to 3J)</li>
              <li>PM GatiShakti National Master Plan (NMP)</li>
              <li>Public Financial Management System (PFMS DBT)</li>
              <li>Digital India Land Records Modernization Programme (DILRMP)</li>
            </ul>
          </div>

          {/* Citizen Helpdesk & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 border-b border-slate-800 pb-1.5">
              Citizen Helpdesk
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Toll-Free Helpline: 1800-11-2026 (09:30 - 18:00 IST)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>helpdesk.bhoomisetu@gov.in</span>
              </p>
              <p className="flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Office of the Competent Authority (CALA) Help Desks</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Compliance Links */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="hover:text-slate-300 cursor-pointer">Terms of Use</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Hyperlink Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Accessibility Statement</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Website Policies</span>
          </div>
          <p className="text-[11px] text-slate-400 text-center sm:text-right">
            Content Designed for Transparent Public Land Acquisition & Digital Governance Monitoring
          </p>
        </div>
      </div>
    </footer>
  );
};
