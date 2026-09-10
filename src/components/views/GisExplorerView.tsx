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
  Filter,
  Check,
  Building2,
  Clock,
  IndianRupee,
  RefreshCw
} from 'lucide-react';

interface GisExplorerViewProps {
  parcels: LandParcel[];
  projects: InfrastructureProject[];
  selectedParcel: LandParcel | null;
  onSelectParcel: (parcel: LandParcel) => void;
  onUpdateParcelStatus: (parcelId: string, newStatus: ParcelStatus) => void;
  onOpenCalculator: () => void;
  onOpenDocModal?: (parcel: LandParcel) => void;
  onInspectParcel?: (parcel: LandParcel) => void;
}

export const GisExplorerView: React.FC<GisExplorerViewProps> = ({
  parcels,
  projects,
  selectedParcel,
  onSelectParcel,
  onUpdateParcelStatus,
  onOpenCalculator,
  onOpenDocModal,
  onInspectParcel
}) => {
  // Left Column Filters
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [selectedTehsil, setSelectedTehsil] = useState('ALL');
  const [selectedVillage, setSelectedVillage] = useState('ALL');
  const [selectedProjectId, setSelectedProjectId] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Map Layer Toggles
  const [showBufferZone, setShowBufferZone] = useState(true);
  const [showCadastralGrid, setShowCadastralGrid] = useState(true);
  const [showDroneLayer, setShowDroneLayer] = useState(false);

  // Status updating state in right panel
  const [statusDraft, setStatusDraft] = useState<ParcelStatus | ''>('');

  const filteredParcels = parcels.filter(p => {
    if (selectedState !== 'ALL' && p.state !== selectedState) return false;
    if (selectedDistrict !== 'ALL' && p.district !== selectedDistrict) return false;
    if (selectedVillage !== 'ALL' && p.village !== selectedVillage) return false;
    if (selectedProjectId !== 'ALL' && p.projectId !== selectedProjectId) return false;
    if (selectedStatus !== 'ALL' && p.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.surveyNumber.toLowerCase().includes(q) ||
        p.khataNumber.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q) ||
        p.landOwnerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeParcel = selectedParcel || filteredParcels[0] || parcels[0];

  const handleApplyStatusChange = () => {
    if (!statusDraft || !activeParcel) return;
    onUpdateParcelStatus(activeParcel.id, statusDraft as ParcelStatus);
    setStatusDraft('');
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3 bg-white p-4 rounded shadow-xs">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Cadastral Survey & Infrastructure Alignment
          </span>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            GIS & Land Parcels Spatial Explorer
          </h1>
          <p className="text-xs text-slate-600">
            Integrated spatial registry linking revenue maps (RoR 7/12) to corridor linear alignments and buffer zones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCalculator}
            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-blue-900 border border-slate-300 rounded text-xs font-semibold transition-colors"
          >
            LARR Compensation Calculator
          </button>
        </div>
      </div>

      {/* 3-Column GIS Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-210px)] min-h-[580px]">
        {/* LEFT COLUMN: FILTERS (Col span 3) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded shadow-xs p-3.5 flex flex-col justify-between overflow-y-auto text-xs space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-600" />
                Filters
              </span>
              <button
                onClick={() => {
                  setSelectedState('ALL');
                  setSelectedDistrict('ALL');
                  setSelectedTehsil('ALL');
                  setSelectedVillage('ALL');
                  setSelectedProjectId('ALL');
                  setSelectedStatus('ALL');
                  setSearchQuery('');
                }}
                className="text-[11px] text-blue-700 hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Search Input */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Survey # / Khata
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="e.g. 142/2A or KH-819"
                  className="w-full bg-slate-50 border border-slate-300 rounded pl-8 pr-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                />
              </div>
            </div>

            {/* State Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                State
              </label>
              <select
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none"
              >
                <option value="ALL">All States</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>

            {/* District Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                District
              </label>
              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none"
              >
                <option value="ALL">All Districts</option>
                <option value="Vadodara">Vadodara</option>
                <option value="Bharuch">Bharuch</option>
                <option value="Palghar">Palghar</option>
                <option value="Thane">Thane</option>
              </select>
            </div>

            {/* Tehsil / Taluka Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Tehsil / Taluka
              </label>
              <select
                value={selectedTehsil}
                onChange={e => setSelectedTehsil(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none"
              >
                <option value="ALL">All Tehsils</option>
                <option value="Vadodara Rural">Vadodara Rural</option>
                <option value="Waghodia">Waghodia</option>
                <option value="Karjan">Karjan</option>
              </select>
            </div>

            {/* Village Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Village
              </label>
              <select
                value={selectedVillage}
                onChange={e => setSelectedVillage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none"
              >
                <option value="ALL">All Revenue Villages</option>
                <option value="Chapad">Chapad</option>
                <option value="Ankhol">Ankhol</option>
                <option value="Kelanpur">Kelanpur</option>
                <option value="Varnama">Varnama</option>
              </select>
            </div>

            {/* Project Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Project
              </label>
              <select
                value={selectedProjectId}
                onChange={e => setSelectedProjectId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none"
              >
                <option value="ALL">All Infrastructure Projects</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Acquisition Status */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Acquisition Status
              </label>
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="Survey_Section3A_Notified">Section 3A / 11 Preliminary</option>
                <option value="Objection_Hearing_Section15">Section 15 Objections</option>
                <option value="Declaration_Section3D">Section 3D Declaration</option>
                <option value="Award_Declared_Section3G">Section 3G / 23 Award</option>
                <option value="Compensation_Paid">Compensation Paid (PFMS)</option>
                <option value="Possession_Handed_Over">Possession Handed Over</option>
              </select>
            </div>

            {/* Spatial Layers */}
            <div className="pt-2 border-t border-slate-200 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                GIS Layers
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={showCadastralGrid}
                  onChange={e => setShowCadastralGrid(e.target.checked)}
                  className="rounded text-blue-900"
                />
                <span>Cadastral Survey Polygons</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={showBufferZone}
                  onChange={e => setShowBufferZone(e.target.checked)}
                  className="rounded text-blue-900"
                />
                <span>500m Buffer / ROW Zone</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={showDroneLayer}
                  onChange={e => setShowDroneLayer(e.target.checked)}
                  className="rounded text-blue-900"
                />
                <span>Drone Orthomosaic (5cm)</span>
              </label>
            </div>
          </div>

          {/* Matches Counter */}
          <div className="pt-2 border-t border-slate-200 text-slate-500 text-[11px] flex justify-between items-center">
            <span>Filtered: <strong>{filteredParcels.length}</strong> parcels</span>
            <span>Total: {parcels.length}</span>
          </div>
        </div>

        {/* CENTER COLUMN: LARGE MAP (Col span 6) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded shadow-xs overflow-hidden flex flex-col relative">
          <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-800" />
              PM GatiShakti NMP Alignment Map
            </span>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>Projection: EPSG:4326</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Survey of India Base</span>
            </div>
          </div>

          <div className="flex-1 relative min-h-[400px]">
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

        {/* RIGHT COLUMN: SELECTED PARCEL DETAILS (Col span 3) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded shadow-xs p-4 flex flex-col justify-between overflow-y-auto text-xs space-y-4">
          {activeParcel ? (
            <div className="space-y-3.5">
              {/* Header */}
              <div className="border-b border-slate-200 pb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Selected Land Parcel
                </span>
                <h3 className="text-base font-bold text-[#1B365D]">
                  Survey / Khasra #{activeParcel.surveyNumber}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Sub-division: {activeParcel.subDivision} • Khata: {activeParcel.khataNumber}
                </p>
              </div>

              {/* Basic & Ownership Details */}
              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Village:</span>
                  <span className="font-semibold">{activeParcel.village}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Area:</span>
                  <span className="font-bold text-slate-900">{activeParcel.areaAcres} Acres ({activeParcel.areaHectares} Ha)</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Landowner (Khatedar):</span>
                  <span className="font-semibold text-[#1B365D]">{activeParcel.landOwnerName}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Project:</span>
                  <span className="font-medium text-slate-900 truncate max-w-[140px]">{activeParcel.projectName}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Acquisition Status:</span>
                  <Badge 
                    variant={
                      activeParcel.status === 'Compensation_Paid' ? 'emerald' :
                      activeParcel.status === 'Possession_Handed_Over' ? 'blue' : 'amber'
                    }
                  >
                    {activeParcel.status.replace(/_/g, ' ')}
                  </Badge>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Compensation:</span>
                  <span className="font-bold text-emerald-800">
                    ₹{(activeParcel.totalCompensationRupees / 100000).toFixed(2)} Lakhs
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Verification Status:</span>
                  <span className="text-emerald-800 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    RoR 7/12 & GPS Verified
                  </span>
                </div>
              </div>

              {/* Status Update Form */}
              <div className="pt-2 border-t border-slate-200 space-y-2 bg-slate-50 p-2.5 rounded">
                <span className="text-[11px] font-bold text-slate-700 block">
                  Update Statutory Status
                </span>
                <select
                  value={statusDraft || activeParcel.status}
                  onChange={e => setStatusDraft(e.target.value as ParcelStatus)}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-900 focus:outline-none"
                >
                  <option value="Survey_Section3A_Notified">Survey Section 3A / 11 Notified</option>
                  <option value="Objection_Hearing_Section15">Objection Hearing Section 15</option>
                  <option value="Declaration_Section3D">Declaration Section 3D Published</option>
                  <option value="Award_Declared_Section3G">Award Declared Section 3G / 23</option>
                  <option value="Compensation_Paid">Compensation Paid (PFMS)</option>
                  <option value="Possession_Handed_Over">Possession Handed Over</option>
                </select>
                <button
                  onClick={handleApplyStatusChange}
                  disabled={!statusDraft || statusDraft === activeParcel.status}
                  className="w-full py-1.5 bg-[#1B365D] hover:bg-[#122642] disabled:bg-slate-300 text-white font-semibold text-xs rounded transition-colors"
                >
                  Save Status Change
                </button>
              </div>

              {/* Actions */}
              <div className="space-y-1.5 pt-2">
                <button
                  onClick={() => onInspectParcel?.(activeParcel)}
                  className="w-full py-1.5 bg-white hover:bg-slate-100 text-blue-900 border border-slate-300 rounded text-xs font-semibold"
                >
                  View Structured Land Record
                </button>
                <button
                  onClick={() => onOpenDocModal?.(activeParcel)}
                  className="w-full py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded text-xs font-medium"
                >
                  Open Statutory Documents
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              Select a parcel from the map or filter list to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
