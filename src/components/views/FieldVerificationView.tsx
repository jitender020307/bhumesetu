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
  CheckCircle2
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
  const [village, setVillage] = useState('Vangaon');
  const [surveyorName, setSurveyorName] = useState('K. Mohan Rao (Sr. Surveyor)');
  const [treesCount, setTreesCount] = useState<number>(32);
  const [structureVal, setStructureVal] = useState<number>(450000);
  const [cropVal, setCropVal] = useState<number>(120000);
  const [saving, setSaving] = useState(false);

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
        timestamp: new Date().toLocaleString('en-IN') + ' IST',
        latitude: 19.865,
        longitude: 72.768,
        gpsAccuracyMeters: 0.9,
        treesCount,
        structuresIdentified: ['Borewell with 3HP pump', 'Stone boundary'],
        standingCropsPresent: true,
        cropValuationRupees: cropVal,
        structureValuationRupees: structureVal,
        photoCount: 16,
        droneFlightId: 'DRN-FLT-NEW-101',
        status: 'Verified'
      });
      setShowAddModal(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="sky">Drone-LiDAR & Ground Truth</Badge>
            <span className="text-xs text-slate-400">Mobile Geo-Tagged Field Verification Module</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Ground Verification & Asset Valuation Logs
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Centimeter-accurate RTK-GPS stamps and drone orthomosaic image matching to eliminate fictitious tree counts, phantom structures, and fraudulent compensation claims.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium transition-all shadow-md flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Ground Inspection Entry</span>
        </button>
      </div>

      {/* Field Surveys List */}
      <div className="space-y-4">
        {surveys.map(item => {
          const isDiscrepancy = item.status === 'Flagged Discrepancy';

          return (
            <div 
              key={item.id} 
              className={`p-4 rounded-xl border transition-all ${
                isDiscrepancy 
                  ? 'bg-rose-950/20 border-rose-800/70 shadow-lg' 
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-100 font-mono">
                      Survey #{item.surveyNumber}
                    </span>
                    <span className="text-xs text-slate-400">({item.village})</span>
                    <Badge variant={isDiscrepancy ? 'rose' : 'emerald'} size="sm">
                      {item.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex flex-wrap gap-x-4">
                    <span>Officer: <strong className="text-slate-200">{item.surveyorName}</strong></span>
                    <span>GPS Stamp: <strong className="text-sky-400 font-mono">±{item.gpsAccuracyMeters}m ({item.latitude.toFixed(4)}°N, {item.longitude.toFixed(4)}°E)</strong></span>
                    <span>Time: <span className="text-slate-300">{item.timestamp}</span></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-right">
                  {item.droneFlightId && (
                    <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Drone Flight: {item.droneFlightId}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-sky-400" /> {item.photoCount} Geo-Photos
                  </span>
                </div>
              </div>

              {/* Assets Count Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded bg-emerald-950 text-emerald-400">
                    <TreePine className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Horticulture Trees</span>
                    <span className="text-sm font-bold font-mono text-slate-100">{item.treesCount} Recorded</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded bg-sky-950 text-sky-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Structures & Assets</span>
                    <span className="text-sm font-bold font-mono text-slate-100">
                      ₹{(item.structureValuationRupees / 100000).toFixed(2)} Lakhs
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded bg-amber-950 text-amber-400">
                    <ClipboardCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Standing Crops Valuation</span>
                    <span className="text-sm font-bold font-mono text-slate-100">
                      {item.standingCropsPresent ? `₹${(item.cropValuationRupees / 100000).toFixed(2)} Lakhs` : 'None / Fallow'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Discrepancy Alert Note if present */}
              {item.discrepancyNote && (
                <div className="mt-3 p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  <div>
                    <strong className="block text-rose-200">Discrepancy Flagged by Field Officer:</strong>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-100">Add Field Inspection & Valuation Log</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">Survey Number</label>
                  <input
                    type="text"
                    required
                    value={surveyNumber}
                    onChange={e => setSurveyNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Village</label>
                  <input
                    type="text"
                    required
                    value={village}
                    onChange={e => setVillage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Surveyor Name & Designation</label>
                <input
                  type="text"
                  required
                  value={surveyorName}
                  onChange={e => setSurveyorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">Trees Count</label>
                  <input
                    type="number"
                    value={treesCount}
                    onChange={e => setTreesCount(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Structure (₹)</label>
                  <input
                    type="number"
                    value={structureVal}
                    onChange={e => setStructureVal(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Crops (₹)</label>
                  <input
                    type="number"
                    value={cropVal}
                    onChange={e => setCropVal(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-100"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                <span className="text-emerald-400 font-medium">GPS Auto-Lock:</span> 19.8650°N, 72.7680°E (Accuracy: 0.9m)
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-3.5 py-1.5 bg-emerald-700 text-white rounded hover:bg-emerald-600 font-medium"
                >
                  {saving ? 'Syncing...' : 'Save & Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
