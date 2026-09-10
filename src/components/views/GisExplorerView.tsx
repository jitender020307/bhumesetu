import React, { useState } from 'react';
import { InfrastructureProject, LandParcel, ParcelStatus } from '../../types';
import { LeafletMap } from '../gis/LeafletMap';
import { Badge } from '../common/Badge';
import { 
  Layers, 
  Search, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Maximize2,
  Filter,
  AlertTriangle
} from 'lucide-react';

interface GisExplorerViewProps {
  parcels: LandParcel[];
  projects: InfrastructureProject[];
  selectedParcel: LandParcel | null;
  onSelectParcel: (parcel: LandParcel) => void;
  onUpdateParcelStatus: (parcelId: string, newStatus: ParcelStatus) => void;
  onOpenCalculator: () => void;
}

export const GisExplorerView: React.FC<GisExplorerViewProps> = ({
  parcels,
  projects,
  selectedParcel,
  onSelectParcel,
  onUpdateParcelStatus,
  onOpenCalculator
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [showBufferZone, setShowBufferZone] = useState(true);
  const [showCadastralGrid, setShowCadastralGrid] = useState(true);
  const [showDroneLayer, setShowDroneLayer] = useState(false);

  const filteredParcels = parcels.filter(p => {
    if (selectedStatus !== 'ALL' && p.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.surveyNumber.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q) ||
        p.landOwnerName.toLowerCase().includes(q) ||
        p.parcelCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeParcel = selectedParcel || parcels[0];

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-lg">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              National Cadastral GIS & Corridor Explorer
              <span className="text-[10px] text-emerald-400 font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                BISAG-N / SOI Engine
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Interactive cadastral revenue survey boundaries overlaid on PM GatiShakti corridor alignment
            </p>
          </div>
        </div>

        {/* Quick Search & Status Filter */}
        <div className="flex items-center gap-2">
          <div className="relative w-52">
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search Survey # or Village..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">All Parcel Statuses</option>
            <option value="Compensation_Paid">Compensation Paid</option>
            <option value="Possession_Taken">Possession Taken</option>
            <option value="Sec_11_Awarded">Sec 11 Awarded</option>
            <option value="In_Dispute">In Dispute / Stays</option>
          </select>
        </div>
      </div>

      {/* Main Map + Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-210px)] min-h-[550px]">
        {/* Left / Center Map View (8 cols) */}
        <div className="lg:col-span-8 flex flex-col h-full rounded-xl overflow-hidden shadow-xl">
          {/* Map Layer Toggles */}
          <div className="bg-slate-900 border-x border-t border-slate-800 px-3 py-2 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCadastralGrid}
                  onChange={e => setShowCadastralGrid(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
                />
                <span className="text-[11px] font-medium">Cadastral Revenue Polygons</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBufferZone}
                  onChange={e => setShowBufferZone(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"
                />
                <span className="text-[11px] font-medium">CRZ & Forest Buffer (500m)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDroneLayer}
                  onChange={e => setShowDroneLayer(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span className="text-[11px] font-medium">Drone Orthomosaic (5cm)</span>
              </label>
            </div>

            <span className="text-[11px] text-slate-400 font-mono">
              Displaying {filteredParcels.length} of {parcels.length} parcels
            </span>
          </div>

          <div className="flex-1 w-full relative">
            <LeafletMap
              parcels={filteredParcels}
              projects={projects}
              selectedParcelId={activeParcel?.id}
              onSelectParcel={onSelectParcel}
              showBufferZone={showBufferZone}
              showCadastralGrid={showCadastralGrid}
            />
          </div>
        </div>

        {/* Right Cadastral Parcel Inspector (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-full overflow-hidden shadow-xl">
          <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Parcel Inspector
              </span>
              <span className="font-mono text-xs font-bold text-slate-100">
                #{activeParcel?.surveyNumber}
              </span>
            </div>
            <Badge 
              variant={
                activeParcel?.status === 'In_Dispute' 
                  ? 'rose' 
                  : activeParcel?.status === 'Compensation_Paid' 
                  ? 'emerald' 
                  : 'sky'
              }
              size="sm"
            >
              {activeParcel?.status.replace(/_/g, ' ')}
            </Badge>
          </div>

          {activeParcel ? (
            <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
              {/* Basic Ownership & Land Details */}
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Khatedar / Landowner:</span>
                  <span className="font-semibold text-slate-100 text-right">{activeParcel.landOwnerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Village & Taluk:</span>
                  <span className="text-slate-200">{activeParcel.village}, {activeParcel.taluk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">District & State:</span>
                  <span className="text-slate-200">{activeParcel.district}, {activeParcel.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Khata / RoR Record:</span>
                  <span className="font-mono text-sky-400 font-semibold">{activeParcel.khataNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Acquisition Extent:</span>
                  <span className="font-bold text-slate-100">{activeParcel.areaAcres} Acres ({activeParcel.landCategory})</span>
                </div>
              </div>

              {/* Digital Verification Badges */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded bg-slate-950/80 border border-slate-800 flex items-center gap-2">
                  <ShieldCheck className={`w-4 h-4 ${activeParcel.digiLockerVerified ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <div>
                    <span className="text-[10px] text-slate-400 block">DigiLocker</span>
                    <span className={`text-[11px] font-semibold ${activeParcel.digiLockerVerified ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {activeParcel.digiLockerVerified ? 'Verified RoR' : 'Unverified'}
                    </span>
                  </div>
                </div>

                <div className="p-2 rounded bg-slate-950/80 border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${activeParcel.droneSurveyCompleted ? 'text-sky-400' : 'text-slate-500'}`} />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Drone Survey</span>
                    <span className={`text-[11px] font-semibold ${activeParcel.droneSurveyCompleted ? 'text-sky-400' : 'text-slate-400'}`}>
                      {activeParcel.droneSurveyCompleted ? 'LiDAR Stamped' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Compensation Breakdown (RFCTLARR 2013) */}
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/50 space-y-2">
                <div className="flex justify-between items-center pb-1.5 border-b border-emerald-900/60">
                  <span className="font-semibold text-emerald-300 uppercase tracking-wider text-[11px]">
                    LARR Statutory Valuation
                  </span>
                  <span className="text-[10px] text-slate-400">Multiplier: {activeParcel.multiplierFactor}x</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Total Statutory Award:</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    ₹{(activeParcel.totalCompensationRupees / 10000000).toFixed(2)} Cr
                  </span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Disbursed via PFMS DBT:</span>
                  <span className="font-mono font-semibold text-slate-200">
                    ₹{(activeParcel.disbursedAmountRupees / 10000000).toFixed(2)} Cr
                  </span>
                </div>
                {activeParcel.dbtUtrNumber && (
                  <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                    <span>PFMS UTR: </span>
                    <span className="font-mono text-sky-400">{activeParcel.dbtUtrNumber}</span>
                  </div>
                )}
              </div>

              {/* Dispute warning if any */}
              {activeParcel.status === 'In_Dispute' && (
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-xs">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Active Dispute Reference: {activeParcel.disputeId}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Section 64 objection or High Court stay order active. Financial escrow secured under CALA registry.
                  </p>
                </div>
              )}

              {/* Status Update / Action Section */}
              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Advance Acquisition Stage:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onUpdateParcelStatus(activeParcel.id, 'Sec_11_Awarded')}
                    disabled={activeParcel.status === 'Possession_Taken'}
                    className="py-1.5 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-medium transition-colors disabled:opacity-50"
                  >
                    Pass Sec 11 Award
                  </button>
                  <button
                    onClick={() => onUpdateParcelStatus(activeParcel.id, 'Possession_Taken')}
                    disabled={activeParcel.status === 'Possession_Taken'}
                    className="py-1.5 px-2 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-[11px] font-medium transition-colors disabled:opacity-50"
                  >
                    Take Possession
                  </button>
                </div>

                <button
                  onClick={onOpenCalculator}
                  className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-400 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <span>Re-evaluate under LARR 2013 Calculator</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs">
              Click any land parcel on the map to inspect its cadastral schedule.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
