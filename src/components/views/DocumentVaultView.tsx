import React, { useState } from 'react';
import { DocumentRecord } from '../../types';
import { Badge } from '../common/Badge';
import { 
  FileCheck2, 
  UploadCloud, 
  ShieldCheck, 
  Search, 
  FileText, 
  Download, 
  ExternalLink,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface DocumentVaultViewProps {
  documents: DocumentRecord[];
  onUploadDoc: (doc: Omit<DocumentRecord, 'id' | 'sha256Hash'>) => Promise<void>;
}

export const DocumentVaultView: React.FC<DocumentVaultViewProps> = ({
  documents,
  onUploadDoc
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<DocumentRecord['docType']>('Gazette_3A');
  const [newProject, setNewProject] = useState('NHAI-DME-PKG4');
  const [uploading, setUploading] = useState(false);

  const filteredDocs = documents.filter(d => {
    if (selectedType !== 'ALL' && d.docType !== selectedType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.projectCode.toLowerCase().includes(q) ||
        (d.village && d.village.toLowerCase().includes(q)) ||
        (d.surveyNumber && d.surveyNumber.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    setUploading(true);
    try {
      await onUploadDoc({
        title: newTitle,
        docType: newType,
        projectCode: newProject,
        dateUploaded: new Date().toISOString().split('T')[0],
        fileSize: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
        verifiedByDigiLocker: true,
        uploadedBy: 'Current Officer Session',
        verificationBadge: 'Verified'
      });
      setNewTitle('');
      setShowUploadModal(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald">DigiLocker Digital Titling</Badge>
            <span className="text-xs text-slate-400">Cryptographically Signed Gazette & Revenue Records</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Statutory Document Vault & DigiLocker Repository
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Immutable document store with SHA-256 integrity hashing for 7/12 RoRs, Gazette 3(A)/3(D) notifications, drone orthomosaics, and CALA statutory awards.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-medium transition-all shadow-md flex items-center gap-1.5 shrink-0"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Gazette / Record</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 rounded-xl">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search document title, Gazette ref, survey #..."
            className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </div>

        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-sky-500"
        >
          <option value="ALL">All Document Types</option>
          <option value="Gazette_3A">Gazette Notifications</option>
          <option value="RoR_7_12">RoR 7/12 e-Extracts</option>
          <option value="Valuation_Report">Valuation Schedules</option>
          <option value="Drone_Ortho_Map">Drone Orthomosaics</option>
          <option value="CALA_Award_Copy">CALA Award Orders</option>
        </select>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {doc.docType.replace(/_/g, ' ')}
                </span>
                <Badge variant={doc.verifiedByDigiLocker ? 'emerald' : 'amber'} size="sm">
                  {doc.verifiedByDigiLocker ? 'DigiLocker Verified' : 'Pending Audit'}
                </Badge>
              </div>

              <h3 className="text-xs font-bold text-slate-100 mt-2.5 line-clamp-2">
                {doc.title}
              </h3>

              <div className="mt-2 space-y-1 text-[11px] text-slate-400">
                <div>Project: <span className="text-slate-200 font-mono">{doc.projectCode}</span></div>
                {doc.village && <div>Village / Survey: <span className="text-slate-200">{doc.village} {doc.surveyNumber ? `(#${doc.surveyNumber})` : ''}</span></div>}
                <div>Uploaded: <span className="text-slate-300">{doc.dateUploaded}</span> ({doc.fileSize})</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-slate-400 truncate max-w-[170px]" title={doc.sha256Hash}>
                  <Lock className="w-3 h-3 text-emerald-400" />
                  SHA-256: {doc.sha256Hash.slice(0, 14)}...
                </span>
                <button 
                  onClick={() => alert(`Simulating secure download for ${doc.title} with SHA-256 verification.`)}
                  className="p-1 rounded bg-slate-800 hover:bg-sky-900/60 text-sky-400 border border-slate-700"
                  title="Download verified copy"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-100">Upload Statutory Gazette / Record</h3>
            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Gazette Notification 3(A) Bharuch Sector"
                  className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Document Type</label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as DocumentRecord['docType'])}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-sky-500"
                >
                  <option value="Gazette_3A">Gazette 3(A) / Preliminary Notification</option>
                  <option value="Gazette_3D">Gazette 3(D) / Final Declaration</option>
                  <option value="RoR_7_12">Record of Rights (7/12 Extract)</option>
                  <option value="Valuation_Report">Approved Valuation Schedule</option>
                  <option value="CALA_Award_Copy">CALA Statutory Award Copy</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Infrastructure Project</label>
                <input
                  type="text"
                  value={newProject}
                  onChange={e => setNewProject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="p-3 border-2 border-dashed border-slate-700 rounded text-center text-slate-400">
                <UploadCloud className="w-6 h-6 mx-auto text-sky-400 mb-1" />
                <span>Drag and drop PDF/TIFF or browse file</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-3.5 py-1.5 bg-sky-600 text-white rounded hover:bg-sky-500 font-medium"
                >
                  {uploading ? 'Signing...' : 'Upload & Sign Hash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
