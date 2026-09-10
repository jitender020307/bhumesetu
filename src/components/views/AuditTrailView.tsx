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
  Terminal
} from 'lucide-react';

interface AuditTrailViewProps {
  logs: AuditLogEntry[];
}

export const AuditTrailView: React.FC<AuditTrailViewProps> = ({ logs }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald" pulse>Cryptographic Integrity Ledger</Badge>
            <span className="text-xs text-slate-400">Non-Repudiation Statutory Audit Trail</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Immutable Audit Trail & Role-Based Action Logs
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Every statutory notice, compensation sanction, survey upload, and court stay modification is cryptographically signed and hash-chained to provide forensic proof for vigilance and judicial review.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800 text-xs text-emerald-400 font-mono">
          <ShieldCheck className="w-4 h-4" />
          <span>Ledger Hash Chain: VALID</span>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-sky-400" />
            Chronological Transaction Chain ({logs.length} Entries Recorded)
          </h3>
          <span className="text-xs text-slate-400 font-mono">Timezone: Asia/Kolkata (IST)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Timestamp & IP</th>
                <th className="py-3 px-4">Authorized User & Role</th>
                <th className="py-3 px-4">Statutory Action</th>
                <th className="py-3 px-4">Target Entity / Ref</th>
                <th className="py-3 px-4">SHA-256 Ledger Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                    <div className="text-slate-200 font-medium">{log.timestamp}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{log.ipAddress}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-100">{log.userName}</span>
                    <span className="block text-[10px] text-sky-400 uppercase font-mono mt-0.5">
                      {log.userRole.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-slate-200 font-medium">{log.action}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <span className="text-slate-300 font-semibold">{log.targetId}</span>
                    <span className="block text-[10px] text-slate-500">{log.targetEntity}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400">
                    <div className="flex items-center gap-1.5" title={log.immutableHash}>
                      <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
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
