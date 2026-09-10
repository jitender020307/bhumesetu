import React, { useState } from 'react';
import { ApiConnectorStatus } from '../../types';
import { Badge } from '../common/Badge';
import { 
  Network, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Server, 
  ShieldCheck, 
  Activity 
} from 'lucide-react';

interface ApiGatewayViewProps {
  connectors: ApiConnectorStatus[];
  onSyncConnector: (id: string) => Promise<void>;
}

export const ApiGatewayView: React.FC<ApiGatewayViewProps> = ({
  connectors,
  onSyncConnector
}) => {
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleSyncClick = async (id: string) => {
    setSyncingId(id);
    try {
      await onSyncConnector(id);
    } finally {
      setSyncingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald" pulse>National Interoperability Gateway</Badge>
            <span className="text-xs text-slate-400">Open API & GatiShakti NMP Federated Bridge</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Inter-Ministerial & State Land Records Connectors
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Real-time multi-agency synchronization connecting PM GatiShakti NMP geospatial layers, state RoR cadastral registries (Bhoomi/Bhulekh), PFMS DBT gateways, and e-Courts litigation feeds.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400">Overall Gateway Health:</span>
          <Badge variant="emerald">99.4% Operational</Badge>
        </div>
      </div>

      {/* Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connectors.map(connector => {
          const isSyncing = syncingId === connector.id;
          const isOnline = connector.status === 'ONLINE';

          return (
            <div 
              key={connector.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {connector.protocol}
                  </span>
                  <Badge variant={isOnline ? 'emerald' : 'amber'} size="sm" pulse={isOnline}>
                    {connector.status}
                  </Badge>
                </div>

                <h3 className="text-sm font-bold text-slate-100 mt-3">
                  {connector.serviceName}
                </h3>
                <span className="text-[11px] text-sky-400 font-medium block mt-0.5">
                  {connector.agency}
                </span>

                <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Network Latency:</span>
                    <span className="font-mono font-semibold text-emerald-400">{connector.latencyMs} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">24h Uptime / Success:</span>
                    <span className="font-mono font-semibold text-slate-200">{connector.successRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Records Synced (24h):</span>
                    <span className="font-mono font-bold text-slate-100">{connector.recordsSynced24h.toLocaleString()}</span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-800 text-[10px] text-slate-400">
                    <span>Endpoint: </span>
                    <span className="font-mono text-slate-400 truncate block">{connector.endpoint}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-500 font-mono">
                  Synced: {connector.lastSyncTimestamp.split(' ')[1]}
                </span>
                <button
                  onClick={() => handleSyncClick(connector.id)}
                  disabled={isSyncing}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-sky-900/60 text-sky-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Force Sync'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
