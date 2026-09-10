import React, { useState } from 'react';
import { FieldSurveyRecord, LandParcel } from '../../types';
import { Badge } from '../common/Badge';
import { 
  ClipboardCheck, 
  MapPin, 
  Camera, 
  TreePine, 
  Building, 
  AlertTriangle, 
  Plus, 
  ShieldCheck,
  CheckCircle2,
  Users,
  Layers,
  X
} from 'lucide-react';

interface FieldVerificationViewProps {
  surveys: FieldSurveyRecord[];
  parcels: LandParcel[];
  onAddSurvey: (survey: Omit<FieldSurveyRecord, 'id'>) => Promise<void>;
}

export const FieldVerificationView: React.FC<FieldVerificationViewProps> = ({
  surveys,
  parcels,
  onAddSurvey
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [surveyNumber, setSurveyNumber] = useState('89/1B');
  const [village, setVillage] = useState('Chapad');
  const [surveyorName, setSurveyorName] = useState('K. Mohan Rao (Sr. Surveyor)');
  const [treesCount, setTreesCount] = useState<number>(32);
  const [structureVal, setStructureVal] = useState<number>(450000);
  const [cropVal, setCropVal] = useState<number>(120000);
  const [saving, setSaving] = useState(false);

  // Metrics for Section 14
  const verifiedCount = surveys.filter(s => s.status === 'Verified').length;
  const discrepancyCount = surveys.filter(s => s.status === 'Flagged Discrepancy').length;
  const pendingCount = 18; // 18 parcels awaiting verification as per Officer Overview

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onAddSurvey({
        parcelId: `PCL-${Date.now()}`,
        surveyNumber,
        village,
        surveyorName,
        surveyorId: 'SURV_ID_9081',
        timestamp: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' 10:30 IST',
        latitude: 22.312,
        longitude: 73.181,
        gpsAccuracyMeters: 0.08, // RTK-GPS centimeter level
        treesCount,
        structuresIdentified: ['Borewell with 5HP solar pump', 'Stone masonry boundary'],
        standingCropsPresent: true,
        cropValuationRupees: cropVal,
        structureValuationRupees: structureVal,
        photoCount: 18,
        droneFlightId: 'DRN-FLT-VAD-2026',
        status: 'Verified'
      });
      setShowAddModal(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Drone-LiDAR & RTK-GPS Ground Truth
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Mobile Geo-Tagged Field Verification Module
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Ground Verification & Asset Valuation Logs
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl mt-0.5">
            Centimeter-accurate RTK-GPS stamps and drone orthomosaic image matching to eliminate fictitious tree counts, phantom structures, and fraudulent compensation claims.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2 bg-[#1B365D] hover:bg-[#122642] text-white rounded text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Ground Inspection Entry</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">Assigned Surveys</span>
          <div className="mt-2 text-2xl font-bold text-slate-900">42 Parcels</div>
          <span className="text-[11px] text-slate-500">Scheduled for Drone Orthomosaic</span>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">Active Field Teams</span>
          <div className="mt-2 text-2xl font-bold text-blue-900">6 Joint Teams</div>
          <span className="text-[11px] text-slate-500">Revenue Inspector + NHAI / Rail Eng.</span>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">Ground Truth Verified</span>
          <div className="mt-2 text-2xl font-bold text-emerald-800">{verifiedCount} Records</div>
          <span className="text-[11px] text-emerald-700 font-medium">Geo-Tagged & Signed</span>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">Discrepancies Flagged</span>
          <div className="mt-2 text-2xl font-bold text-rose-800">{discrepancyCount} Cases</div>
          <span className="text-[11px] text-rose-700 font-medium">Boundary / Area Discrepancy</span>
        </div>
      </div>

      {/* Field Surveys List */}
      <div className="space-y-4">
        {surveys.map(item => {
          const isDiscrepancy = item.status === 'Flagged Discrepancy';

          return (
            <div 
              key={item.id} 
              className={`p-4 rounded border transition-all text-xs ${
                isDiscrepancy 
                  ? 'bg-rose-50/40 border-rose-300 shadow-2xs' 
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#1B365D]">
                      Survey #{item.surveyNumber}
                    </span>
                    <span className="text-slate-600 font-medium">({item.village})</span>
                    <Badge variant={isDiscrepancy ? 'rose' : 'emerald'} size="sm">
                      {item.status}
                    </Badge>
                  </div>
                  <div className="text-slate-600 mt-1 flex flex-wrap gap-x-4">
                    <span>Officer: <strong className="text-slate-900">{item.surveyorName}</strong></span>
                    <span>RTK-GPS: <strong className="text-blue-900">±{item.gpsAccuracyMeters}m ({item.latitude.toFixed(4)}°N, {item.longitude.toFixed(4)}°E)</strong></span>
                    <span>Date: <span className="text-slate-700">{item.timestamp}</span></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-right">
                  {item.droneFlightId && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                      Drone Flight: {item.droneFlightId}
                    </span>
                  )}
                  <span className="text-slate-600 flex items-center gap-1 font-medium">
                    <Camera className="w-3.5 h-3.5 text-blue-700" /> {item.photoCount} Geo-Photos
                  </span>
                </div>
              </div>

              {/* Assets Count Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="p-2 rounded bg-emerald-50 text-emerald-800">
                    <TreePine className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Horticulture Trees</span>
                    <span className="text-sm font-bold text-slate-900">{item.treesCount} Trees Counted</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="p-2 rounded bg-blue-50 text-blue-800">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Structures Valuation</span>
                    <span className="text-sm font-bold text-slate-900">
                      ₹{(item.structureValuationRupees / 100000).toFixed(2)} Lakhs
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="p-2 rounded bg-amber-50 text-amber-800">
                    <ClipboardCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Standing Crops Valuation</span>
                    <span className="text-sm font-bold text-slate-900">
                      {item.standingCropsPresent ? `₹${(item.cropValuationRupees / 100000).toFixed(2)} Lakhs` : 'None / Fallow'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Discrepancy Alert Note if present */}
              {item.discrepancyNote && (
                <div className="mt-3 p-2.5 rounded bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <div>
                    <strong className="block text-rose-950 font-bold">Discrepancy Details Flagged by Joint Field Inspection:</strong>
                    <span>{item.discrepancyNote}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Survey Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white border border-slate-300 rounded max-w-md w-full shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold text-slate-900">
                New Ground Inspection & Valuation Log
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Survey Number</label>
                  <input
                    type="text"
                    required
                    value={surveyNumber}
                    onChange={e => setSurveyNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Village</label>
                  <input
                    type="text"
                    required
                    value={village}
                    onChange={e => setVillage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Assigned Field Surveyor</label>
                <input
                  type="text"
                  required
                  value={surveyorName}
                  onChange={e => setSurveyorName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Horticulture Trees</label>
                  <input
                    type="number"
                    value={treesCount}
                    onChange={e => setTreesCount(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Structures (₹)</label>
                  <input
                    type="number"
                    value={structureVal}
                    onChange={e => setStructureVal(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Crops (₹)</label>
                  <input
                    type="number"
                    value={cropVal}
                    onChange={e => setCropVal(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#122642] text-white rounded font-semibold text-xs"
                >
                  {saving ? 'Recording Entry...' : 'Save Inspection Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
