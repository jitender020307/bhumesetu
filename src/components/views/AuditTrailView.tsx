import React from 'react';
import { AuditLogEntry } from '../../types';
import { Badge } from '../common/Badge';
import { 
  ShieldCheck, 
  Lock, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  FileCheck2,
  Terminal,
  Download,
  Printer
} from 'lucide-react';

interface AuditTrailViewProps {
  logs: AuditLogEntry[];
}

export const AuditTrailView: React.FC<AuditTrailViewProps> = ({ logs }) => {
  const handleExportCsv = () => {
    const headers = ['Timestamp', 'IP Address', 'User', 'Role', 'Action', 'Target Ref', 'Target Entity', 'SHA256 Hash'];
    const rows = logs.map(l => [
      `"${l.timestamp}"`,
      `"${l.ipAddress}"`,
      `"${l.userName}"`,
      `"${l.userRole}"`,
      `"${l.action}"`,
      `"${l.targetId}"`,
      `"${l.targetEntity}"`,
      `"${l.immutableHash}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BhoomiSetu_Audit_Trail_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Statutory Non-Repudiation Audit Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Vigilance & Judicial Compliance Ledger
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Immutable Audit Trail & Officer Activity Logs
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl mt-0.5">
            Every statutory notice, compensation sanction, survey upload, and court stay modification is cryptographically signed and hash-chained to provide forensic proof for vigilance and judicial review.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-300 text-xs text-emerald-800 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Integrity: Validated</span>
          </div>

          <button
            onClick={handleExportCsv}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export Audit Log (CSV)</span>
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Chronological Transaction Chain ({logs.length} Entries Recorded)
          </h2>
          <span className="text-slate-500 font-mono">Timestamp Standard: Asia/Kolkata (IST)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-2.5 px-4">Timestamp & IP</th>
                <th className="py-2.5 px-4">Officer / User</th>
                <th className="py-2.5 px-4">Role</th>
                <th className="py-2.5 px-4">Statutory Action</th>
                <th className="py-2.5 px-4">Target Entity / Ref</th>
                <th className="py-2.5 px-4">SHA-256 Ledger Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-700 whitespace-nowrap">
                    <div className="font-semibold text-slate-900">{log.timestamp}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">IP: {log.ipAddress}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#1B365D]">{log.userName}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-300 uppercase">
                      {log.userRole.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-900 font-medium">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className="text-slate-900 font-semibold">{log.targetId}</span>
                    <span className="block text-[10px] text-slate-500 font-sans">{log.targetEntity}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-600">
                    <div className="flex items-center gap-1.5" title={log.immutableHash}>
                      <Lock className="w-3 h-3 text-emerald-700 shrink-0" />
                      <span className="truncate max-w-[140px]">{log.immutableHash}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
