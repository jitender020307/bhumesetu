import React, { useState } from 'react';
import { 
  LandParcel, 
  Beneficiary, 
  InfrastructureProject,
  DocumentRecord
} from '../../types';
import { Badge } from '../common/Badge';
import { 
  Search, 
  CheckCircle2, 
  FileText, 
  AlertCircle, 
  HelpCircle, 
  Building2,
  Calendar,
  Download,
  Eye,
  Send,
  Phone,
  ArrowRight,
  Clock,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  MapPin,
  Users,
  Check,
  Briefcase
} from 'lucide-react';

interface PublicPortalViewProps {
  parcels: LandParcel[];
  beneficiaries: Beneficiary[];
  projects: InfrastructureProject[];
  documents?: DocumentRecord[];
  onOpenCalculator: () => void;
  onSelectProjectForOfficer?: (projectId: string) => void;
}

interface SubmittedGrievance {
  referenceNumber: string;
  submissionDate: string;
  name: string;
  contact: string;
  district: string;
  village: string;
  surveyNumber: string;
  project: string;
  issueType: string;
  description: string;
  status: 'Registered' | 'Under Investigation' | 'Hearing Scheduled' | 'Resolved';
  assignedAuthority: string;
  expectedActionDate: string;
}

export const PublicPortalView: React.FC<PublicPortalViewProps> = ({
  parcels = [],
  beneficiaries = [],
  projects = [],
  documents = [],
  onOpenCalculator,
  onSelectProjectForOfficer
}) => {
  // Navigation within Public Portal
  const [activeSubTab, setActiveSubTab] = useState<'home' | 'search' | 'projects' | 'notices' | 'grievances' | 'faqs'>('home');

  // Land Search State
  const [searchSurvey, setSearchSurvey] = useState('');
  const [searchKhata, setSearchKhata] = useState('');
  const [searchVillage, setSearchVillage] = useState('Vadodara Rural');
  const [searchDistrict, setSearchDistrict] = useState('Vadodara');
  const [searchProjectId, setSearchProjectId] = useState('ALL');
  const [hasSearched, setHasSearched] = useState(true);

  // Selected Project for Public Project Detail View
  const [selectedPublicProject, setSelectedPublicProject] = useState<InfrastructureProject | null>(
    (projects && projects.length > 0 ? projects[0] : null)
  );

  React.useEffect(() => {
    if (!selectedPublicProject && projects && projects.length > 0) {
      setSelectedPublicProject(projects[0]);
    }
  }, [projects, selectedPublicProject]);

  // Grievance Form State
  const [gName, setGName] = useState('');
  const [gContact, setGContact] = useState('');
  const [gDistrict, setGDistrict] = useState('Vadodara');
  const [gVillage, setGVillage] = useState('Chapad');
  const [gSurvey, setGSurvey] = useState('');
  const [gProject, setGProject] = useState('Delhi-Mumbai Expressway');
  const [gIssueType, setGIssueType] = useState('Compensation Discrepancy');
  const [gDescription, setGDescription] = useState('');
  const [submittedGrievance, setSubmittedGrievance] = useState<SubmittedGrievance | null>(null);

  // Grievance Tracking State
  const [trackRefNumber, setTrackRefNumber] = useState('GRV-2026-4819');
  const [trackedResult, setTrackedResult] = useState<SubmittedGrievance | null>({
    referenceNumber: 'GRV-2026-4819',
    submissionDate: '02-Sep-2026',
    name: 'Rameshwar Patil',
    contact: '+91 98250 14819',
    district: 'Vadodara',
    village: 'Chapad',
    surveyNumber: '142/2A',
    project: 'Delhi-Mumbai Expressway',
    issueType: 'Solatium Calculation Clarification',
    description: 'Seeking breakdown of Section 30(1) 100% solatium for joint-ownership share on Khata #KH-819.',
    status: 'Hearing Scheduled',
    assignedAuthority: 'Competent Authority Land Acquisition (CALA), Vadodara Division',
    expectedActionDate: '18-Sep-2026 (11:00 AM at Collectorate Room 14)'
  });

  // Filtered parcels for citizen search
  const filteredParcels = parcels.filter(p => {
    const matchSurvey = !searchSurvey.trim() || p.surveyNumber.toLowerCase().includes(searchSurvey.trim().toLowerCase());
    const matchKhata = !searchKhata.trim() || p.khataNumber.toLowerCase().includes(searchKhata.trim().toLowerCase());
    const matchVillage = !searchVillage || searchVillage === 'ALL' || p.village.toLowerCase().includes(searchVillage.toLowerCase());
    const matchDistrict = !searchDistrict || searchDistrict === 'ALL' || p.district.toLowerCase().includes(searchDistrict.toLowerCase());
    const matchProj = !searchProjectId || searchProjectId === 'ALL' || p.projectId === searchProjectId;
    return matchSurvey && matchKhata && matchVillage && matchDistrict && matchProj;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gName || !gContact || !gDescription) return;

    const newRef = `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newGrievance: SubmittedGrievance = {
      referenceNumber: newRef,
      submissionDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      name: gName,
      contact: gContact,
      district: gDistrict,
      village: gVillage,
      surveyNumber: gSurvey || 'N/A',
      project: gProject,
      issueType: gIssueType,
      description: gDescription,
      status: 'Registered',
      assignedAuthority: `Competent Authority Land Acquisition (CALA), ${gDistrict} Division`,
      expectedActionDate: 'Within 15 statutory working days'
    };

    setSubmittedGrievance(newGrievance);
    setTrackedResult(newGrievance);
    setTrackRefNumber(newRef);
  };

  const handleTrackGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackRefNumber.trim().toUpperCase() === 'GRV-2026-4819') {
      setTrackedResult({
        referenceNumber: 'GRV-2026-4819',
        submissionDate: '02-Sep-2026',
        name: 'Rameshwar Patil',
        contact: '+91 98250 14819',
        district: 'Vadodara',
        village: 'Chapad',
        surveyNumber: '142/2A',
        project: 'Delhi-Mumbai Expressway',
        issueType: 'Solatium Calculation Clarification',
        description: 'Seeking breakdown of Section 30(1) 100% solatium for joint-ownership share on Khata #KH-819.',
        status: 'Hearing Scheduled',
        assignedAuthority: 'Competent Authority Land Acquisition (CALA), Vadodara Division',
        expectedActionDate: '18-Sep-2026 (11:00 AM at Collectorate Room 14)'
      });
    } else if (submittedGrievance && trackRefNumber.trim() === submittedGrievance.referenceNumber) {
      setTrackedResult(submittedGrievance);
    } else {
      setTrackedResult({
        referenceNumber: trackRefNumber.trim().toUpperCase(),
        submissionDate: '08-Sep-2026',
        name: 'Citizen Applicant',
        contact: '+91 98XXXX XXXX',
        district: 'Vadodara',
        village: 'Chapad',
        surveyNumber: 'Survey Record Check',
        project: 'Delhi-Mumbai Expressway',
        issueType: 'Status Verification',
        description: 'Verification of joint ownership record under Section 19 declaration.',
        status: 'Under Investigation',
        assignedAuthority: 'Sub-Divisional Magistrate (Revenue) & CALA Office',
        expectedActionDate: '22-Sep-2026'
      });
    }
  };

  // Mock public notices
  const publicNotices = [
    {
      id: 'NOT-2026-01',
      date: '04-Sep-2026',
      title: 'Public Hearing Notice under Section 15 of RFCTLARR Act 2013 for Package-04 Vadodara Bypass',
      authority: 'Office of the District Magistrate & Competent Authority (CALA), Vadodara',
      project: 'Delhi-Mumbai Expressway',
      category: 'Public Hearing',
      documentUrl: '#'
    },
    {
      id: 'NOT-2026-02',
      date: '28-Aug-2026',
      title: 'Gazette Declaration under Section 3(D) of National Highways Act 1956 for Bharuch-Surat Link',
      authority: 'Ministry of Road Transport and Highways (MoRTH), Gazette of India Notification No. S.O. 4182(E)',
      project: 'Delhi-Mumbai Expressway',
      category: 'Statutory Declaration',
      documentUrl: '#'
    },
    {
      id: 'NOT-2026-03',
      date: '15-Aug-2026',
      title: 'Preliminary Notification under Section 11 for High-Speed Rail Corridor Palghar Section',
      authority: 'Revenue Department, Government of Maharashtra',
      project: 'Mumbai-Ahmedabad High-Speed Rail',
      category: 'Preliminary Notification',
      documentUrl: '#'
    },
    {
      id: 'NOT-2026-04',
      date: '01-Aug-2026',
      title: 'Rehabilitation & Resettlement Award Schedule Publication under Section 31 for PAFs in Kheda District',
      authority: 'Administrator (R&R), District Collectorate Kheda',
      project: 'Western Dedicated Freight Corridor',
      category: 'R&R Scheme',
      documentUrl: '#'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Public Sub-Navigation Bar */}
      <div className="bg-white border border-slate-200 rounded shadow-xs p-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setActiveSubTab('home')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              activeSubTab === 'home'
                ? 'bg-[#1B365D] text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Portal Home
          </button>
          <button
            onClick={() => setActiveSubTab('search')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'search'
                ? 'bg-[#1B365D] text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Land Records</span>
          </button>
          <button
            onClick={() => setActiveSubTab('projects')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'projects'
                ? 'bg-[#1B365D] text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>National Projects</span>
          </button>
          <button
            onClick={() => setActiveSubTab('notices')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'notices'
                ? 'bg-[#1B365D] text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Public Notices & Gazette</span>
          </button>
          <button
            onClick={() => setActiveSubTab('grievances')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'grievances'
                ? 'bg-[#1B365D] text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Submit & Track Grievance</span>
          </button>
          <button
            onClick={() => setActiveSubTab('faqs')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'faqs'
                ? 'bg-[#1B365D] text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Citizen FAQs & Rights</span>
          </button>
        </div>

        {/* Quick Utility */}
        <button
          onClick={onOpenCalculator}
          className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded text-xs font-semibold transition-colors"
        >
          Statutory Compensation Calculator
        </button>
      </div>

      {/* VIEW 1: PORTAL HOME / LANDING PAGE */}
      {activeSubTab === 'home' && (
        <div className="space-y-8">
          {/* Institutional Hero Banner */}
          <div className="bg-[#1B365D] text-white rounded-md p-6 sm:p-8 shadow-sm border-t-4 border-[#FF9933]">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-2 py-0.5 rounded-xs">
                  Unified National Land Governance
                </span>
                <span className="text-xs text-slate-300">• Public Transparency Window</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Transparent Land Acquisition & Project Information
              </h1>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                Access project information, land acquisition status, compensation updates and rehabilitation services through a single digital platform.
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveSubTab('search')}
                  className="px-5 py-2.5 bg-[#FF9933] hover:bg-[#E68A00] text-slate-900 font-bold rounded text-xs sm:text-sm transition-colors shadow-xs flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Land / Project</span>
                </button>
                <button
                  onClick={() => setActiveSubTab('grievances')}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded text-xs sm:text-sm transition-colors border border-white/30 flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-amber-300" />
                  <span>Track Grievance</span>
                </button>
                <button
                  onClick={() => setActiveSubTab('projects')}
                  className="px-4 py-2.5 text-slate-200 hover:text-white text-xs sm:text-sm font-medium underline underline-offset-4"
                >
                  View National Projects →
                </button>
              </div>
            </div>
          </div>

          {/* Quick Search Widget on Home Page */}
          <div className="bg-white border border-slate-200 rounded p-5 shadow-xs">
            <div className="border-b border-slate-200 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-900">
                Quick Land Search
              </h2>
              <p className="text-xs text-slate-600">
                Verify whether your survey parcel or village is under statutory notification.
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setActiveSubTab('search'); setHasSearched(true); }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Survey / Khasra No.
                </label>
                <input
                  type="text"
                  value={searchSurvey}
                  onChange={e => setSearchSurvey(e.target.value)}
                  placeholder="e.g. 142/2A"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Village
                </label>
                <input
                  type="text"
                  value={searchVillage}
                  onChange={e => setSearchVillage(e.target.value)}
                  placeholder="e.g. Vadodara Rural"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  District
                </label>
                <input
                  type="text"
                  value={searchDistrict}
                  onChange={e => setSearchDistrict(e.target.value)}
                  placeholder="e.g. Vadodara"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#1B365D] hover:bg-[#122642] text-white font-semibold text-xs rounded transition-colors flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Land Records</span>
                </button>
              </div>
            </form>
          </div>

          {/* Why BhoomiSetu / Core Pillars */}
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Platform Principles
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Why BhoomiSetu
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
                <div className="w-8 h-8 rounded bg-blue-50 text-[#1B365D] flex items-center justify-center font-bold mb-2.5">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Transparent Records
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct digital access to RoR 7/12 land titles, Gazette Section 3A/3D publications, and surveyed parcel boundary maps.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
                <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold mb-2.5">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Citizen Access
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Empowering Khatedars and landowners to verify compensation schedules, solatium multipliers, and direct bank disbursement status.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
                <div className="w-8 h-8 rounded bg-amber-50 text-amber-800 flex items-center justify-center font-bold mb-2.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Faster Verification
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Drone orthomosaic surveys, RTK-GPS ground boundaries, and DigiLocker integration eliminate duplicate claims and field delays.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
                <div className="w-8 h-8 rounded bg-purple-50 text-purple-800 flex items-center justify-center font-bold mb-2.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Accountable Processes
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  PFMS Direct Benefit Transfer directly into Aadhaar-seeded accounts with cryptographic audit trails and statutory grievance hearings.
                </p>
              </div>
            </div>
          </div>

          {/* Featured Projects & Recent Public Notices */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Projects (2 cols) */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Major Infrastructure Corridors
                  </h3>
                  <p className="text-xs text-slate-600">
                    National highway, freight, rail, and water projects monitored under PM GatiShakti.
                  </p>
                </div>
                <button
                  onClick={() => setActiveSubTab('projects')}
                  className="text-xs font-semibold text-blue-800 hover:underline"
                >
                  View All Projects →
                </button>
              </div>

              <div className="space-y-3">
                {projects.slice(0, 3).map(proj => (
                  <div
                    key={proj.id}
                    className="p-3.5 rounded border border-slate-200 hover:border-blue-400 hover:bg-slate-50/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1B365D]">
                          {proj.name}
                        </span>
                        <Badge variant="blue">{proj.type || proj.ministry}</Badge>
                      </div>
                      <p className="text-xs text-slate-600">
                        {proj.leadAgency || proj.executingAgency} • States: {(proj.statesInvolved || proj.states || []).join(', ')}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                        <span>Total Land: <strong>{proj.totalLandRequiredHa} Ha</strong></span>
                        <span>•</span>
                        <span>Acquired: <strong className="text-emerald-700">{proj.landAcquiredHa} Ha ({Math.round((proj.landAcquiredHa / proj.totalLandRequiredHa) * 100)}%)</strong></span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPublicProject(proj);
                        setActiveSubTab('projects');
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-900 border border-slate-300 rounded text-xs font-semibold self-start sm:self-center transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Public Notices (1 col) */}
            <div className="bg-white border border-slate-200 rounded p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Recent Public Notices
                </h3>
                <button
                  onClick={() => setActiveSubTab('notices')}
                  className="text-xs font-semibold text-blue-800 hover:underline"
                >
                  All Notices
                </button>
              </div>

              <div className="space-y-3">
                {publicNotices.slice(0, 3).map(notice => (
                  <div key={notice.id} className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1 text-xs">
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      {notice.date}
                    </span>
                    <h4 className="font-semibold text-slate-900 leading-snug mt-1">
                      {notice.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {notice.authority}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 23: Trust Section */}
          <div className="bg-slate-50 border border-slate-200 rounded p-6 shadow-xs space-y-3">
            <div className="border-b border-slate-200 pb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Statutory Accountability
              </span>
              <h3 className="text-base font-bold text-[#1B365D]">
                One platform for transparent and accountable land acquisition
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              BhoomiSetu establishes an unbroken digital chain of custody from preliminary Section 11/3A notifications through to physical possession and rehabilitation under the RFCTLARR Act 2013 and National Highways Act 1956. By connecting state cadastral databases directly with PFMS, compensation reaches legitimate landholders with zero intermediaries.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 text-xs">
              <div className="p-2 bg-white rounded border border-slate-200 text-center">
                <span className="font-bold text-slate-800 block">Centralized</span>
                <span className="text-[11px] text-slate-500">GIS & Land Records</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200 text-center">
                <span className="font-bold text-slate-800 block">Statutory</span>
                <span className="text-[11px] text-slate-500">Workflow Rules</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200 text-center">
                <span className="font-bold text-slate-800 block">PFMS DBT</span>
                <span className="text-[11px] text-slate-500">Direct Bank Credit</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200 text-center">
                <span className="font-bold text-slate-800 block">Field Truth</span>
                <span className="text-[11px] text-slate-500">Drone & RTK-GPS</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200 text-center">
                <span className="font-bold text-slate-800 block">R&R Support</span>
                <span className="text-[11px] text-slate-500">PAF Entitlements</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200 text-center">
                <span className="font-bold text-slate-800 block">Grievances</span>
                <span className="text-[11px] text-slate-500">Public Redressal</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SEARCH LAND / PROJECT INFORMATION */}
      {activeSubTab === 'search' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-slate-900">
                Search Land & Project Acquisition Information
              </h2>
              <p className="text-xs text-slate-600">
                Search by Survey / Khasra number, Khata number, Village, Tehsil, or District to inspect acquisition status and compensation records.
              </p>
            </div>

            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Survey / Khasra No.
                </label>
                <input
                  type="text"
                  value={searchSurvey}
                  onChange={e => setSearchSurvey(e.target.value)}
                  placeholder="e.g. 142/2A or 89/1B"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Khata / Patta Number
                </label>
                <input
                  type="text"
                  value={searchKhata}
                  onChange={e => setSearchKhata(e.target.value)}
                  placeholder="e.g. KH-819"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Village
                </label>
                <input
                  type="text"
                  value={searchVillage}
                  onChange={e => setSearchVillage(e.target.value)}
                  placeholder="Village Name"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  District
                </label>
                <input
                  type="text"
                  value={searchDistrict}
                  onChange={e => setSearchDistrict(e.target.value)}
                  placeholder="District Name"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#1B365D] hover:bg-[#122642] text-white font-semibold text-xs rounded transition-colors flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Records</span>
                </button>
              </div>
            </form>
          </div>

          {/* Search Results Table (Plain Language, Accessible) */}
          <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Search Results ({filteredParcels.length} Records Found)
                </h3>
                <p className="text-xs text-slate-600">
                  Showing statutory land acquisition records matching your criteria
                </p>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Last Synchronized: Today, 09:30 IST
              </span>
            </div>

            {filteredParcels.length === 0 ? (
              <div className="p-10 text-center text-slate-500 text-xs">
                No matching land parcels found for the entered Survey / Village. Please check spelling or verify with your local CALA / Tehsil office.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="py-2.5 px-4">Survey / Khasra No.</th>
                      <th className="py-2.5 px-4">Project Name</th>
                      <th className="py-2.5 px-4">Village & District</th>
                      <th className="py-2.5 px-4">Area Affected</th>
                      <th className="py-2.5 px-4">Acquisition Stage</th>
                      <th className="py-2.5 px-4">Compensation Status</th>
                      <th className="py-2.5 px-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredParcels.map(p => {
                      const isPaid = p.status === 'Compensation_Paid';
                      const isPossessed = p.status === 'Possession_Handed_Over';
                      return (
                        <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-bold text-[#1B365D]">
                            Survey #{p.surveyNumber}
                            <span className="block text-[11px] text-slate-500 font-normal">
                              Khata: {p.khataNumber}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-800 font-medium">
                            {p.projectName}
                          </td>
                          <td className="py-3 px-4 text-slate-700">
                            {p.village}, {p.district}
                          </td>
                          <td className="py-3 px-4 text-slate-800 font-semibold">
                            {p.areaAcres} Acres
                          </td>
                          <td className="py-3 px-4">
                            <Badge 
                              variant={
                                isPossessed ? 'emerald' :
                                isPaid ? 'blue' :
                                p.status === 'Objection_Hearing_Section15' ? 'amber' : 'slate'
                              }
                            >
                              {p.status.replace(/_/g, ' ')}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            {isPaid ? (
                              <span className="text-emerald-800 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Disbursed (PFMS)
                              </span>
                            ) : (
                              <span className="text-amber-800 font-medium">
                                Under Valuation / Sanction
                              </span>
                            )}
                            <span className="block text-[11px] text-slate-500">
                              Estimated: ₹{(p.totalCompensationRupees / 100000).toFixed(2)} Lakhs
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => {
                                alert(`Public Land Record Details:\nSurvey Number: ${p.surveyNumber}\nVillage: ${p.village}\nKhatedar: ${p.landOwnerName}\nArea: ${p.areaAcres} Acres\nCompensation: ₹${p.totalCompensationRupees.toLocaleString('en-IN')}\nStatus: ${p.status.replace(/_/g, ' ')}`);
                              }}
                              className="px-2.5 py-1 bg-white hover:bg-slate-100 text-blue-900 border border-slate-300 rounded font-semibold text-xs"
                            >
                              View Record
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: DEDICATED PUBLIC PROJECT PAGE */}
      {activeSubTab === 'projects' && (
        <div className="space-y-6">
          {/* Project Selector Bar */}
          <div className="bg-white border border-slate-200 rounded p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Select Infrastructure Project
              </label>
              <select
                value={selectedPublicProject?.id || ''}
                onChange={e => {
                  const found = projects.find(p => p.id === e.target.value);
                  if (found) setSelectedPublicProject(found);
                }}
                className="bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 font-semibold focus:outline-none"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.type || p.ministry})</option>
                ))}
              </select>
            </div>

            <div className="text-xs text-slate-500">
              Corridor Authority: <strong>{selectedPublicProject?.leadAgency || selectedPublicProject?.executingAgency}</strong>
            </div>
          </div>

          {selectedPublicProject && (
            <div className="space-y-6">
              {/* Project Overview Card */}
              <div className="bg-white border border-slate-200 rounded p-6 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
                      Project Information Dossier
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                      {selectedPublicProject.name}
                    </h2>
                    <p className="text-xs text-slate-600">
                      {selectedPublicProject.leadAgency || selectedPublicProject.executingAgency} • States: {(selectedPublicProject.statesInvolved || selectedPublicProject.states || []).join(', ')}
                    </p>
                  </div>
                  <Badge variant="blue" size="md">
                    {selectedPublicProject.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-slate-500 block">Total Corridor Length</span>
                    <span className="text-sm font-bold text-slate-900">{selectedPublicProject.totalLengthKm} Km</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-slate-500 block">Total Land Area Required</span>
                    <span className="text-sm font-bold text-slate-900">{selectedPublicProject.totalLandRequiredHa} Ha</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-slate-500 block">Land Acquired to Date</span>
                    <span className="text-sm font-bold text-emerald-800">
                      {selectedPublicProject.landAcquiredHa} Ha ({Math.round((selectedPublicProject.landAcquiredHa / selectedPublicProject.totalLandRequiredHa) * 100)}%)
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-slate-500 block">Compensation Disbursed</span>
                    <span className="text-sm font-bold text-[#1B365D]">
                      ₹{selectedPublicProject.compensationDisbursedCr} Cr / ₹{selectedPublicProject.totalBudgetCr} Cr
                    </span>
                  </div>
                </div>
              </div>

              {/* Statutory Project Timeline (7 Stages) */}
              <div className="bg-white border border-slate-200 rounded p-6 shadow-xs space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    Statutory Acquisition Timeline & Current Stage
                  </h3>
                  <p className="text-xs text-slate-600">
                    RFCTLARR Act 2013 / National Highways Act statutory progress milestones
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2 pt-2">
                  {[
                    { step: 1, name: 'Preliminary Notification', desc: 'Sec 11 / NH 3(A)', done: true },
                    { step: 2, name: 'Social Impact Assessment', desc: 'Sec 4(1) SIA Study', done: true },
                    { step: 3, name: 'Declaration & Hearing', desc: 'Sec 15 / 19 / NH 3(D)', done: true },
                    { step: 4, name: 'Land Acquisition Claims', desc: 'Sec 21 Notice & Survey', done: true },
                    { step: 5, name: 'Compensation Award', desc: 'Sec 23 / 30 Solatium', done: true },
                    { step: 6, name: 'Possession of Land', desc: 'Sec 38 Transfer', done: false, current: true },
                    { step: 7, name: 'Rehabilitation & Resettlement', desc: 'Second/Third Schedule', done: false }
                  ].map((s) => (
                    <div
                      key={s.step}
                      className={`p-3 rounded border text-xs flex flex-col justify-between ${
                        s.done
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : s.current
                          ? 'bg-blue-50 border-blue-400 text-blue-950 ring-1 ring-blue-400'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded inline-block mb-1.5 ${
                          s.done ? 'bg-emerald-200 text-emerald-900' :
                          s.current ? 'bg-blue-200 text-blue-900' : 'bg-slate-200 text-slate-700'
                        }`}>
                          Stage 0{s.step}
                        </span>
                        <h4 className="font-bold text-xs leading-tight">{s.name}</h4>
                        <p className="text-[10px] text-slate-500 mt-1">{s.desc}</p>
                      </div>
                      <div className="mt-2 text-[10px] font-semibold">
                        {s.done ? '✓ Completed' : s.current ? '● In Progress' : '○ Scheduled'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Land Impact, Compensation & Rehabilitation Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Land Impact */}
                <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-2.5 text-xs">
                  <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1.5">
                    Land Impact Details
                  </h4>
                  <div className="space-y-1.5 text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Villages Affected:</span>
                      <span className="font-bold">42 Revenue Villages</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Survey Parcels:</span>
                      <span className="font-bold">{selectedPublicProject.parcelsCount} Parcels</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Registered Landowners:</span>
                      <span className="font-bold">2,840 Khatedars</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Acquisition Velocity:</span>
                      <span className="font-bold text-emerald-800">84.2% Complete</span>
                    </div>
                  </div>
                </div>

                {/* Compensation */}
                <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-2.5 text-xs">
                  <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1.5">
                    Compensation Status (PFMS)
                  </h4>
                  <div className="space-y-1.5 text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Sanctioned:</span>
                      <span className="font-bold">₹{selectedPublicProject.totalBudgetCr} Cr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Directly Disbursed:</span>
                      <span className="font-bold text-emerald-800">₹{selectedPublicProject.compensationDisbursedCr} Cr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Under Aadhaar Validation:</span>
                      <span className="font-bold text-amber-800">₹420 Cr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">PFMS Success Rate:</span>
                      <span className="font-bold text-emerald-800">99.4% Electronic</span>
                    </div>
                  </div>
                </div>

                {/* Rehabilitation & Resettlement */}
                <div className="bg-white border border-slate-200 rounded p-4 shadow-xs space-y-2.5 text-xs">
                  <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1.5">
                    Rehabilitation & Resettlement
                  </h4>
                  <div className="space-y-1.5 text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Families Affected (PAFs):</span>
                      <span className="font-bold">384 Displaced Families</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Plots Allotted (Model Colony):</span>
                      <span className="font-bold text-emerald-800">328 Allotted</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Subsistence Grants:</span>
                      <span className="font-bold">₹36,000 / PAF Paid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">R&R Approvals:</span>
                      <span className="font-bold text-emerald-800">91% Settled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: PUBLIC NOTICES & GAZETTE */}
      {activeSubTab === 'notices' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-slate-900">
                Official Gazette Notifications & Public Hearings
              </h2>
              <p className="text-xs text-slate-600">
                Statutory notifications issued by Central Ministries, State Revenue Departments, and District Collectors under RFCTLARR Act 2013 and National Highways Act 1956.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-2.5 px-4">Date</th>
                    <th className="py-2.5 px-4">Notification Title</th>
                    <th className="py-2.5 px-4">Issuing Authority</th>
                    <th className="py-2.5 px-4">Project</th>
                    <th className="py-2.5 px-4">Category</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {publicNotices.map(notice => (
                    <tr key={notice.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-slate-800 font-semibold whitespace-nowrap">
                        {notice.date}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#1B365D] max-w-md">
                        {notice.title}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {notice.authority}
                      </td>
                      <td className="py-3 px-4 text-slate-800 font-medium">
                        {notice.project}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="blue">{notice.category}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => alert(`Official Document Record: ${notice.title}\nIssued by: ${notice.authority}\nDate: ${notice.date}\nThis document is authenticated on DigiLocker.`)}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 text-blue-900 border border-slate-300 rounded font-semibold text-xs inline-flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: GRIEVANCE REDRESSAL (SUBMIT & TRACK) */}
      {activeSubTab === 'grievances' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submit Grievance Form */}
            <div className="bg-white border border-slate-200 rounded p-6 shadow-xs space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  Statutory Redressal
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">
                  Submit a Land Acquisition Grievance
                </h2>
                <p className="text-xs text-slate-600">
                  Lodge an objection or dispute under Section 15 or Section 64 of RFCTLARR Act 2013 directly to the Competent Authority.
                </p>
              </div>

              <form onSubmit={handleGrievanceSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Applicant Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={gName}
                      onChange={e => setGName(e.target.value)}
                      placeholder="e.g. Rameshwar Patil"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Mobile Number (Aadhaar linked) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={gContact}
                      onChange={e => setGContact(e.target.value)}
                      placeholder="e.g. +91 98250 14819"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      District
                    </label>
                    <input
                      type="text"
                      value={gDistrict}
                      onChange={e => setGDistrict(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Village
                    </label>
                    <input
                      type="text"
                      value={gVillage}
                      onChange={e => setGVillage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Survey / Khasra No.
                    </label>
                    <input
                      type="text"
                      value={gSurvey}
                      onChange={e => setGSurvey(e.target.value)}
                      placeholder="e.g. 142/2A"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Related Project
                  </label>
                  <select
                    value={gProject}
                    onChange={e => setGProject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Grievance / Dispute Category
                  </label>
                  <select
                    value={gIssueType}
                    onChange={e => setGIssueType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none"
                  >
                    <option value="Compensation Discrepancy">Compensation Discrepancy / Rural Multiplier</option>
                    <option value="Solatium Calculation">Section 30(1) 100% Solatium Apportionment</option>
                    <option value="Joint Ownership Share">Joint Khatedar Share Division</option>
                    <option value="Field Boundary Discrepancy">Cadastral Boundary / Area Discrepancy</option>
                    <option value="Tree / Structure Valuation">Horticulture Tree / Well / Structure Valuation</option>
                    <option value="Rehabilitation Entitlement">R&R House Plot / Subsistence Grant</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Grievance Description & Facts *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={gDescription}
                    onChange={e => setGDescription(e.target.value)}
                    placeholder="Provide full details of your parcel, notice reference, and specific relief requested..."
                    className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#1B365D] hover:bg-[#122642] text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Grievance to Competent Authority</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Track Grievance Status Widget */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded p-6 shadow-xs space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Live Status Tracking
                  </span>
                  <h2 className="text-base font-bold text-slate-900 mt-0.5">
                    Track Grievance Status
                  </h2>
                  <p className="text-xs text-slate-600">
                    Enter your grievance reference number (e.g. GRV-2026-4819) to inspect current hearing date and authority remarks.
                  </p>
                </div>

                <form onSubmit={handleTrackGrievance} className="flex gap-2">
                  <input
                    type="text"
                    value={trackRefNumber}
                    onChange={e => setTrackRefNumber(e.target.value)}
                    placeholder="Enter Reference Number"
                    className="flex-1 bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1B365D] hover:bg-[#122642] text-white text-xs font-semibold rounded"
                  >
                    Track Status
                  </button>
                </form>

                {trackedResult && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div>
                        <span className="text-[11px] text-slate-500">Reference Number:</span>
                        <span className="font-bold text-[#1B365D] block text-sm">
                          {trackedResult.referenceNumber}
                        </span>
                      </div>
                      <Badge variant={trackedResult.status === 'Hearing Scheduled' ? 'amber' : 'blue'}>
                        {trackedResult.status}
                      </Badge>
                    </div>

                    <div className="space-y-1.5 text-slate-700">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Date Registered:</span>
                        <span className="font-semibold">{trackedResult.submissionDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Complainant:</span>
                        <span className="font-semibold">{trackedResult.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Village & Survey:</span>
                        <span className="font-semibold">{trackedResult.village}, Survey #{trackedResult.surveyNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Assigned Authority:</span>
                        <span className="font-semibold text-slate-900">{trackedResult.assignedAuthority}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Hearing / Next Action:</span>
                        <span className="font-bold text-amber-900">{trackedResult.expectedActionDate}</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white border border-slate-200 rounded text-[11px] text-slate-600">
                      <strong>Docket Note:</strong> {trackedResult.description}
                    </div>
                  </div>
                )}
              </div>

              {/* Citizen Grievance Guidance */}
              <div className="bg-amber-50 border border-amber-200 rounded p-4 text-xs text-amber-950 space-y-1.5">
                <h4 className="font-bold flex items-center gap-1.5 text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  Statutory Limitation under Section 64
                </h4>
                <p className="leading-relaxed">
                  Any person interested who has not accepted the award may, by written application to the Collector within 6 weeks of notice under section 21, require that the matter be referred by the Collector for the determination of the Authority.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 6: FAQS & CITIZEN GUIDANCE */}
      {activeSubTab === 'faqs' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-slate-900">
                Frequently Asked Questions & Citizen Rights
              </h2>
              <p className="text-xs text-slate-600">
                Statutory answers regarding land acquisition, RFCTLARR Act 2013 multipliers, direct bank credits, and rehabilitation.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              {[
                {
                  q: 'How is the market value and compensation calculated for rural vs urban land?',
                  a: 'Under the First Schedule of the RFCTLARR Act 2013, the base market value is calculated from the registered sale deeds or circle rate (whichever is higher). In rural areas, this is multiplied by a statutory factor between 1.5x and 2.0x depending on distance from urban boundaries. In addition, 12% per annum additional market value is provided under Section 30(3), followed by a mandatory 100% Solatium under Section 30(1).'
                },
                {
                  q: 'What is Section 30(1) Solatium, and am I entitled to it?',
                  a: 'Yes. Solatium is a statutory 100% mandatory addition imposed by the Central Government on the final market value of the land, assets attached, and standing crops. It is paid in consideration of the compulsory nature of the acquisition.'
                },
                {
                  q: 'How does the compensation money reach my bank account?',
                  a: 'All compensation is electronically disbursed through the Public Financial Management System (PFMS) via Direct Benefit Transfer (DBT). Money is deposited directly into the Aadhaar-seeded bank account of verified Khatedars with an official Unique Transaction Reference (UTR) number.'
                },
                {
                  q: 'What rehabilitation entitlements are provided to displaced families?',
                  a: 'Under the Second Schedule of the RFCTLARR Act 2013, Project Affected Families (PAFs) whose dwellings are acquired are entitled to an alternative constructed house or constructed plot in a model colony, a monthly subsistence allowance of ₹3,000/month for one year (₹36,000), a one-time displacement transportation allowance of ₹50,000, and vocational training/employment assistance.'
                },
                {
                  q: 'What should I do if my name is missing from the preliminary notification or RoR 7/12?',
                  a: 'You can immediately submit an objection under Section 15 of the RFCTLARR Act within 60 days of publication. You can use this portal to lodge a grievance with your title deed, mutation certificate, or revenue receipt.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-sm flex items-start gap-2">
                    <span className="text-[#1B365D]">Q{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
