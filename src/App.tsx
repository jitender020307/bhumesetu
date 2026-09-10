import React, { useState, useEffect } from 'react';
import { 
  mockProjects, 
  mockParcels, 
  mockWorkflowStages, 
  mockBeneficiaries, 
  mockAlerts, 
  mockAiRisks, 
  mockDocuments, 
  mockSurveys, 
  mockConnectors, 
  mockAuditLogs, 
  mockUsers 
} from './data/mockData';
import { 
  InfrastructureProject, 
  LandParcel, 
  ParcelStatus, 
  Beneficiary, 
  AlertDispute, 
  DocumentRecord, 
  FieldSurveyRecord, 
  User 
} from './types';
import { apiService } from './services/api';

// Official Gov UI Components
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { Modal } from './components/common/Modal';
import { Badge } from './components/common/Badge';

// View Modules
import { PublicPortalView } from './components/views/PublicPortalView';
import { CommandCenterView } from './components/views/CommandCenterView';
import { ProjectDigitalTwinView } from './components/views/ProjectDigitalTwinView';
import { GisExplorerView } from './components/views/GisExplorerView';
import { WorkflowPipelineView } from './components/views/WorkflowPipelineView';
import { CompensationDbtView } from './components/views/CompensationDbtView';
import { RehabilitationView } from './components/views/RehabilitationView';
import { DocumentVaultView } from './components/views/DocumentVaultView';
import { FieldVerificationView } from './components/views/FieldVerificationView';
import { AlertsDisputesView } from './components/views/AlertsDisputesView';
import { AiRiskAnalyticsView } from './components/views/AiRiskAnalyticsView';
import { ReportsAnalyticsView } from './components/views/ReportsAnalyticsView';
import { ApiGatewayView } from './components/views/ApiGatewayView';
import { AuditTrailView } from './components/views/AuditTrailView';
import { CompensationCalculatorModal } from './components/views/CompensationCalculatorModal';

import { 
  ShieldCheck, 
  IndianRupee, 
  MapPin, 
  HelpCircle, 
  FileText, 
  Building2, 
  ExternalLink,
  BookOpen
} from 'lucide-react';

export default function App() {
  // Mode & Navigation State
  const [isOfficerMode, setIsOfficerMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(mockProjects[0].id);
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(mockParcels[0]);
  const [inspectingParcel, setInspectingParcel] = useState<LandParcel | null>(null);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  // Accessibility State
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Data State
  const [projects, setProjects] = useState<InfrastructureProject[]>(mockProjects);
  const [parcels, setParcels] = useState<LandParcel[]>(mockParcels);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(mockBeneficiaries);
  const [alerts, setAlerts] = useState<AlertDispute[]>(mockAlerts);
  const [documents, setDocuments] = useState<DocumentRecord[]>(mockDocuments);
  const [surveys, setSurveys] = useState<FieldSurveyRecord[]>(mockSurveys);
  const [connectors, setConnectors] = useState(mockConnectors);
  const [auditLogs, setAuditLogs] = useState(mockAuditLogs);

  // Load initial data from api service
  useEffect(() => {
    const initData = async () => {
      const [projList, pclList, benList, alrList] = await Promise.all([
        apiService.getProjects(),
        apiService.getParcels(),
        apiService.getBeneficiaries(),
        apiService.getAlerts()
      ]);
      setProjects(projList);
      setParcels(pclList);
      setBeneficiaries(benList);
      setAlerts(alrList);
    };
    initData();
  }, []);

  // Handlers
  const handleSelectParcel = (parcel: LandParcel) => {
    setSelectedParcel(parcel);
  };

  const handleInspectParcel = (parcel: LandParcel) => {
    setInspectingParcel(parcel);
  };

  const handleUpdateParcelStatus = async (parcelId: string, newStatus: ParcelStatus) => {
    const updated = await apiService.updateParcelStatus(parcelId, newStatus);
    if (updated) {
      setParcels(prev => prev.map(p => p.id === parcelId ? updated : p));
      if (selectedParcel?.id === parcelId) {
        setSelectedParcel(updated);
      }
      if (inspectingParcel?.id === parcelId) {
        setInspectingParcel(updated);
      }
      const updatedLogs = await apiService.getAuditLogs();
      setAuditLogs(updatedLogs);
    }
  };

  const handleProcessDbt = async (beneficiaryId: string) => {
    const updated = await apiService.processDbtDisbursement(beneficiaryId);
    if (updated) {
      setBeneficiaries(prev => prev.map(b => b.id === beneficiaryId ? updated : b));
      const [newParcels, newLogs] = await Promise.all([
        apiService.getParcels(),
        apiService.getAuditLogs()
      ]);
      setParcels(newParcels);
      setAuditLogs(newLogs);
    }
  };

  const handleResolveDispute = async (id: string, note: string) => {
    const updated = await apiService.resolveDispute(id, note);
    if (updated) {
      setAlerts(prev => prev.map(a => a.id === id ? updated : a));
      const newLogs = await apiService.getAuditLogs();
      setAuditLogs(newLogs);
    }
  };

  const handleUploadDoc = async (doc: Omit<DocumentRecord, 'id' | 'sha256Hash'>) => {
    const newDoc = await apiService.uploadDocument(doc);
    setDocuments(prev => [newDoc, ...prev]);
    const newLogs = await apiService.getAuditLogs();
    setAuditLogs(newLogs);
  };

  const handleAddSurvey = async (survey: Omit<FieldSurveyRecord, 'id'>) => {
    const newRecord = await apiService.addFieldSurvey(survey);
    setSurveys(prev => [newRecord, ...prev]);
    const newLogs = await apiService.getAuditLogs();
    setAuditLogs(newLogs);
  };

  const handleSyncConnector = async (id: string) => {
    const updated = await apiService.syncConnector(id);
    if (updated) {
      setConnectors(prev => prev.map(c => c.id === id ? updated : c));
    }
  };

  const unreadAlertsCount = alerts.filter(a => a.status !== 'Stay Vacated').length;

  const fontClass = 
    fontSizeLevel === 'large' ? 'text-[17px]' :
    fontSizeLevel === 'xlarge' ? 'text-[19px]' : 'text-[15px]';

  return (
    <div className={`min-h-screen w-screen flex flex-col bg-[#F4F6F9] text-slate-900 ${fontClass} ${highContrast ? 'contrast-125' : ''}`}>
      {/* Official Government Header */}
      <Header 
        currentUser={currentUser}
        onSwitchUser={setCurrentUser}
        availableUsers={mockUsers}
        isOfficerMode={isOfficerMode}
        onToggleMode={(mode) => {
          setIsOfficerMode(mode);
          if (!mode) {
            setActiveTab('public-portal');
          } else if (activeTab === 'public-portal') {
            setActiveTab('overview');
          }
        }}
        onOpenCalculator={() => setShowCalculator(true)}
        onOpenHelpModal={() => setShowHelpModal(true)}
        language={language}
        onToggleLanguage={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
        fontSizeLevel={fontSizeLevel}
        onChangeFontSize={setFontSizeLevel}
        highContrast={highContrast}
        onToggleContrast={() => setHighContrast(c => !c)}
        unreadAlertsCount={unreadAlertsCount}
        onNavigateToAlerts={() => {
          setIsOfficerMode(true);
          setActiveTab('disputes-grievances');
        }}
      />

      {/* Main App Body */}
      <div className="flex-1 flex min-w-0 overflow-hidden">
        {/* Officer Left Navigation Sidebar (Only in Officer Mode) */}
        {isOfficerMode && (
          <Sidebar 
            activeTab={activeTab} 
            onSelectTab={setActiveTab}
            disputesCount={unreadAlertsCount}
          />
        )}

        {/* Central Workspace Canvas */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#F8FAFC]">
          <div className="p-4 sm:p-6 lg:p-8 flex-1">
            {/* PUBLIC PORTAL VIEW */}
            {!isOfficerMode && (
              <PublicPortalView
                parcels={parcels}
                beneficiaries={beneficiaries}
                projects={projects}
                documents={documents}
                onOpenCalculator={() => setShowCalculator(true)}
                onSelectProjectForOfficer={(projId) => {
                  setSelectedProjectId(projId);
                  setIsOfficerMode(true);
                  setActiveTab('projects');
                }}
              />
            )}

            {/* OFFICER WORKSPACE VIEWS */}
            {isOfficerMode && (
              <>
                {(activeTab === 'overview' || activeTab === 'command-center') && (
                  <CommandCenterView
                    projects={projects}
                    parcels={parcels}
                    alerts={alerts}
                    onNavigate={(tab) => {
                      if (tab === 'project-twin') setActiveTab('projects');
                      else if (tab === 'gis-explorer') setActiveTab('gis-map');
                      else if (tab === 'workflow-pipeline') setActiveTab('acquisition-workflow');
                      else if (tab === 'compensation-dbt') setActiveTab('compensation');
                      else if (tab === 'alerts-disputes') setActiveTab('disputes-grievances');
                      else setActiveTab(tab);
                    }}
                    onSelectProject={(id) => {
                      setSelectedProjectId(id);
                      setActiveTab('projects');
                    }}
                    onOpenCalculator={() => setShowCalculator(true)}
                  />
                )}

                {(activeTab === 'projects' || activeTab === 'project-twin') && (
                  <ProjectDigitalTwinView
                    projects={projects}
                    parcels={parcels}
                    alerts={alerts}
                    selectedProjectId={selectedProjectId}
                    onSelectProject={setSelectedProjectId}
                    onInspectParcel={handleInspectParcel}
                    onOpenGis={() => setActiveTab('gis-map')}
                  />
                )}

                {activeTab === 'land-parcels' && (
                  <div className="space-y-6 max-w-7xl mx-auto">
                    <div className="bg-white border border-slate-200 rounded p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-[#1B365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            Cadastral Land Ledger
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            Survey Number Registry & Demarcation
                          </span>
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 mt-1">
                          Consolidated National Cadastral Parcel Registry
                        </h1>
                        <p className="text-xs text-slate-600 max-w-2xl mt-0.5">
                          Comprehensive cadastral database linking State RoRs, field survey boundaries, compensation award status, and possession verification.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('gis-map')}
                        className="px-3.5 py-2 bg-[#1B365D] hover:bg-[#122642] text-white rounded text-xs font-semibold shadow-xs flex items-center gap-1.5 shrink-0"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>Inspect Parcels on GIS Map</span>
                      </button>
                    </div>

                    <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
                      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                        <h2 className="text-sm font-bold text-slate-900">
                          Total Survey Parcels Under Acquisition ({parcels.length} Records)
                        </h2>
                        <span className="text-slate-500">Click inspect to view complete legal details</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                              <th className="py-2.5 px-4">Survey #</th>
                              <th className="py-2.5 px-4">Khata #</th>
                              <th className="py-2.5 px-4">Khatedar (Landowner)</th>
                              <th className="py-2.5 px-4">Project / Corridor</th>
                              <th className="py-2.5 px-4">Village & District</th>
                              <th className="py-2.5 px-4">Area (Acres)</th>
                              <th className="py-2.5 px-4">Award Amount</th>
                              <th className="py-2.5 px-4">Status</th>
                              <th className="py-2.5 px-4 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {parcels.map(p => (
                              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-3 px-4 font-bold text-[#1B365D]">#{p.surveyNumber}</td>
                                <td className="py-3 px-4 font-mono text-slate-700">{p.khataNumber}</td>
                                <td className="py-3 px-4 font-semibold text-slate-900">{p.landOwnerName}</td>
                                <td className="py-3 px-4 text-slate-700">{p.projectName}</td>
                                <td className="py-3 px-4 text-slate-600">{p.village}, {p.district}</td>
                                <td className="py-3 px-4 font-semibold text-slate-900">{p.areaAcres} Acres</td>
                                <td className="py-3 px-4 font-bold text-slate-900">₹{(p.totalCompensationRupees / 100000).toFixed(2)} Lakhs</td>
                                <td className="py-3 px-4">
                                  <Badge variant={p.status === 'Compensation_Paid' ? 'emerald' : 'blue'}>
                                    {p.status.replace(/_/g, ' ')}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <button
                                    onClick={() => handleInspectParcel(p)}
                                    className="px-2.5 py-1 bg-white hover:bg-slate-100 text-blue-900 border border-slate-300 rounded font-semibold text-xs"
                                  >
                                    Inspect
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

                {(activeTab === 'gis-map' || activeTab === 'gis-explorer') && (
                  <GisExplorerView
                    parcels={parcels}
                    projects={projects}
                    selectedParcel={selectedParcel}
                    onSelectParcel={handleSelectParcel}
                    onUpdateParcelStatus={handleUpdateParcelStatus}
                    onOpenCalculator={() => setShowCalculator(true)}
                  />
                )}

                {(activeTab === 'acquisition-workflow' || activeTab === 'workflow-pipeline') && (
                  <WorkflowPipelineView
                    stages={mockWorkflowStages}
                    projects={projects}
                    selectedProjectId={selectedProjectId}
                    onSelectProject={setSelectedProjectId}
                  />
                )}

                {(activeTab === 'compensation' || activeTab === 'compensation-dbt') && (
                  <CompensationDbtView
                    beneficiaries={beneficiaries}
                    parcels={parcels}
                    onProcessDbt={handleProcessDbt}
                    onOpenCalculator={() => setShowCalculator(true)}
                  />
                )}

                {activeTab === 'rehabilitation' && (
                  <RehabilitationView records={mockParcels.map((p, idx) => ({
                    id: `RR-${idx + 1}`,
                    parcelId: p.id,
                    projectCode: p.projectId,
                    beneficiaryName: p.landOwnerName,
                    village: p.village,
                    isDisplacedFamily: idx % 2 === 0,
                    entitlements: {
                      alternativeHousePlotAllotted: idx % 2 === 0,
                      plotNumber: idx % 2 === 0 ? `PLT-COL-${100 + idx}` : undefined,
                      colonyName: idx % 2 === 0 ? 'Vadodara Model R&R Enclave' : undefined,
                      subsistenceGrantAmount: 36000,
                      subsistenceGrantDisbursed: true,
                      displacementAllowanceAmount: 50000,
                      displacementAllowanceDisbursed: idx % 2 === 0,
                      employmentAssistance: 'One-Time Cash Grant ₹5 Lakhs',
                      vocationalTrainingStatus: 'Completed'
                    },
                    grievanceStatus: idx === 1 ? 'Pending' : 'Resolved'
                  }))} />
                )}

                {activeTab === 'field-verification' && (
                  <FieldVerificationView
                    surveys={surveys}
                    parcels={parcels}
                    onAddSurvey={handleAddSurvey}
                  />
                )}

                {(activeTab === 'documents' || activeTab === 'document-vault') && (
                  <DocumentVaultView
                    documents={documents}
                    onUploadDoc={handleUploadDoc}
                  />
                )}

                {(activeTab === 'disputes-grievances' || activeTab === 'alerts-disputes') && (
                  <AlertsDisputesView
                    alerts={alerts}
                    onResolveDispute={handleResolveDispute}
                  />
                )}

                {(activeTab === 'risk-insights' || activeTab === 'ai-risk-analytics') && (
                  <AiRiskAnalyticsView risks={mockAiRisks} />
                )}

                {activeTab === 'reports' && (
                  <ReportsAnalyticsView
                    projects={projects}
                    parcels={parcels}
                    alerts={alerts}
                  />
                )}

                {(activeTab === 'audit-compliance' || activeTab === 'audit-trail') && (
                  <AuditTrailView logs={auditLogs} />
                )}

                {(activeTab === 'system-admin' || activeTab === 'api-gateway') && (
                  <ApiGatewayView
                    connectors={connectors}
                    onSyncConnector={handleSyncConnector}
                  />
                )}
              </>
            )}
          </div>

          {/* Official Gov Footer */}
          <Footer 
            onNavigateTab={(tab) => {
              if (tab === 'public-portal') {
                setIsOfficerMode(false);
                setActiveTab('public-portal');
              } else {
                setIsOfficerMode(true);
                setActiveTab(tab);
              }
            }}
          />
        </div>
      </div>

      {/* Statutory Valuation Calculator Modal */}
      <CompensationCalculatorModal
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />

      {/* Parcel Detail Inspector Modal */}
      {inspectingParcel && (
        <Modal
          isOpen={true}
          onClose={() => setInspectingParcel(null)}
          title={`Cadastral Inspection — Survey #${inspectingParcel.surveyNumber} (${inspectingParcel.village})`}
          size="lg"
        >
          <div className="space-y-4 text-xs text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-slate-500 text-[11px] block">Project Alignment:</span>
                <span className="font-bold text-[#1B365D] text-sm">{inspectingParcel.projectName}</span>
              </div>
              <Badge variant={inspectingParcel.status === 'Compensation_Paid' ? 'emerald' : 'blue'}>
                {inspectingParcel.status.replace(/_/g, ' ')}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Khatedar (Landowner)</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{inspectingParcel.landOwnerName}</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Khata Number</span>
                <span className="font-mono font-bold text-slate-900 mt-0.5 block">{inspectingParcel.khataNumber}</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Acquired Extent</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{inspectingParcel.areaAcres} Acres</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Statutory Multiplier Factor</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{inspectingParcel.multiplierFactor}x (Rural)</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Total Statutory Award (LARR)</span>
                <span className="font-bold text-emerald-800 mt-0.5 block text-sm">
                  ₹{(inspectingParcel.totalCompensationRupees / 100000).toFixed(2)} Lakhs
                </span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">PFMS DBT UTR</span>
                <span className="font-mono font-semibold text-slate-900 mt-0.5 block">
                  {inspectingParcel.dbtUtrNumber || 'Awaiting Disbursal Trigger'}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => {
                  setSelectedParcel(inspectingParcel);
                  setInspectingParcel(null);
                  setIsOfficerMode(true);
                  setActiveTab('gis-map');
                }}
                className="px-3.5 py-1.5 rounded bg-[#1B365D] hover:bg-[#122642] text-white font-semibold flex items-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Locate on GIS Map</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Statutory Guidelines & Help Modal */}
      {showHelpModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowHelpModal(false)}
          title="BhoomiSetu — Statutory Legal Framework & Guidelines"
          size="lg"
        >
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-900">
              <strong className="block font-bold text-sm">Government of India Digital Land Governance Platform</strong>
              <span>
                Designed for end-to-end monitoring under the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (RFCTLARR), National Highways Act 1956, and Railways Act 1989.
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">1. Key Statutory Provisions</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Section 11 / 3(A):</strong> Preliminary notification of intent to acquire land with gazette publication.</li>
                <li><strong>Section 15 / 3(C):</strong> Hearing of objections by landowners and affected families within 60 days.</li>
                <li><strong>Section 19 / 3(D):</strong> Final statutory declaration of acquisition (must be issued within 12 months of Section 11 to avoid lapsing).</li>
                <li><strong>Section 26-30:</strong> Determination of market value, rural multiplier (1.0 - 2.0), 100% Solatium, and 12% additional interest.</li>
                <li><strong>Section 31 & Schedule 2/3:</strong> Mandatory Rehabilitation and Resettlement entitlements.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">2. Dual Access Architecture</h4>
              <p>
                <strong>Public Citizen Portal:</strong> Open to all citizens and landowners for checking Khasra/Survey acquisition status, viewing gazette notifications, calculating compensation entitlements, and submitting grievances.
              </p>
              <p>
                <strong>Officer Workspace:</strong> Restricted to Competent Authorities (CALA), District Collectors, and Project Engineers for workflow approvals, RTK-GPS drone verification, and PFMS DBT disbursals.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-1.5 bg-[#1B365D] hover:bg-[#122642] text-white rounded font-semibold text-xs"
              >
                Close Guidelines
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
