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
  Activity,
  ArrowRight,
  Database
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              PM GatiShakti NMP Federated Bridge
            </span>
            <span className="text-xs text-slate-500 font-medium">
              National Interoperability Gateway & Data Mesh
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Inter-Agency & State Land Records Interoperability
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl mt-0.5">
            Real-time multi-agency synchronization connecting PM GatiShakti NMP geospatial layers, state RoR cadastral registries (Bhoomi/Bhulekh), PFMS DBT gateways, and e-Courts litigation feeds.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-500 font-semibold">Federation Health:</span>
          <Badge variant="emerald">99.4% Operational</Badge>
        </div>
      </div>

      {/* Connectors Table */}
      <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Active Government Integration Nodes ({connectors.length})
          </h2>
          <span className="text-slate-500 font-mono">Protocol: REST / OGC WFS / ISO 20022</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-2.5 px-4">Integration Service</th>
                <th className="py-2.5 px-4">Authority / Agency</th>
                <th className="py-2.5 px-4">Protocol & Interface</th>
                <th className="py-2.5 px-4">24h Records Synced</th>
                <th className="py-2.5 px-4">Latency</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {connectors.map(connector => {
                const isSyncing = syncingId === connector.id;
                const isOnline = connector.status === 'ONLINE';

                return (
                  <tr key={connector.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1B365D] text-sm">
                        {connector.serviceName}
                      </div>
                      <div className="font-mono text-[10px] text-slate-400 mt-0.5 truncate max-w-xs">
                        {connector.endpoint}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-semibold">
                      {connector.agency}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-700 border border-slate-300">
                        {connector.protocol}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {connector.recordsSynced24h.toLocaleString()} Records
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-emerald-800">
                      {connector.latencyMs} ms
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={isOnline ? 'emerald' : 'amber'} size="sm">
                        {isOnline ? 'Connected' : connector.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleSyncClick(connector.id)}
                        disabled={isSyncing}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 text-[#1B365D] border border-slate-300 rounded font-semibold text-xs inline-flex items-center gap-1 transition-colors"
                      >
                        <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span>{isSyncing ? 'Syncing...' : 'Sync Ping'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
