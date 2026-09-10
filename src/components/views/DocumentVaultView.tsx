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
  Eye,
  CheckCircle2,
  Lock,
  Building2,
  Calendar,
  X
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
  const [newProject, setNewProject] = useState('Delhi-Mumbai Expressway');
  const [uploading, setUploading] = useState(false);

  const filteredDocs = documents.filter(d => {
    if (selectedType !== 'ALL' && d.docType !== selectedType) return false;
    if (searchQuery.trim()) {
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
        dateUploaded: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        fileSize: `${(Math.random() * 3 + 1).toFixed(1)} MB (PDF)`,
        verifiedByDigiLocker: true,
        uploadedBy: 'Competent Authority Office',
        verificationBadge: 'Verified'
      });
      setNewTitle('');
      setShowUploadModal(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              DigiLocker & Official Gazette Repository
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Cryptographically Signed Gazette & Revenue Records
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Statutory Document Repository & Legal Archives
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl mt-0.5">
            Immutable document store with SHA-256 integrity hashing for 7/12 RoRs, Gazette 3(A)/3(D) notifications, drone orthomosaics, and CALA statutory awards.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-3.5 py-2 bg-[#1B365D] hover:bg-[#122642] text-white rounded text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Official Document</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search document title, Gazette ref, survey #..."
            className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-700"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-slate-600 font-semibold">Category:</label>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="bg-slate-50 text-xs text-slate-900 font-semibold border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Statutory Categories</option>
            <option value="Gazette_3A">Gazette Notifications & Declarations</option>
            <option value="RoR_7_12">RoR 7/12 Land Records</option>
            <option value="Valuation_Report">Valuation & Solatium Schedules</option>
            <option value="Drone_Ortho_Map">Drone Orthomosaics & GIS Surveys</option>
            <option value="CALA_Award_Copy">CALA Award Orders & Possession Deeds</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            Authenticated Document Records ({filteredDocs.length})
          </h2>
          <span className="text-xs text-slate-500">
            SHA-256 Checksum Verified via DigiLocker
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-2.5 px-4">Document Title</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4">Project / Corridor</th>
                <th className="py-2.5 px-4">Issuing Authority</th>
                <th className="py-2.5 px-4">Date Uploaded</th>
                <th className="py-2.5 px-4">Verification</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#1B365D] max-w-sm">
                    {doc.title}
                    <span className="block font-mono text-[10px] text-slate-400 font-normal">
                      SHA: {doc.sha256Hash.slice(0, 16)}...
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
                      {doc.docType.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-medium">
                    {doc.projectCode}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {doc.uploadedBy}
                  </td>
                  <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                    {doc.dateUploaded}
                    <span className="block text-[10px] text-slate-400">{doc.fileSize}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={doc.verifiedByDigiLocker ? 'emerald' : 'amber'}>
                      {doc.verifiedByDigiLocker ? 'DigiLocker Verified' : 'Pending Verification'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => alert(`Opening official document: ${doc.title}\nSHA-256: ${doc.sha256Hash}\nAuthority: ${doc.uploadedBy}\nVerification: DigiLocker Signed.`)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-blue-900 border border-slate-300 rounded font-semibold text-xs inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white border border-slate-300 rounded max-w-md w-full shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold text-slate-900">Upload Statutory Gazette / Record</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Gazette Notification 3(A) Bharuch Sector"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category</label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as DocumentRecord['docType'])}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none"
                >
                  <option value="Gazette_3A">Gazette Notification</option>
                  <option value="RoR_7_12">RoR 7/12 e-Extract</option>
                  <option value="Valuation_Report">Valuation Schedule</option>
                  <option value="Drone_Ortho_Map">Drone Orthomosaic</option>
                  <option value="CALA_Award_Copy">CALA Award Order</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Project</label>
                <input
                  type="text"
                  value={newProject}
                  onChange={e => setNewProject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#122642] text-white rounded font-semibold"
                >
                  {uploading ? 'Signing...' : 'Upload & Compute Hash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
