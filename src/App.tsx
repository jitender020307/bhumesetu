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

// Components
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { CompensationCalculatorModal } from './components/views/CompensationCalculatorModal';
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
import { PublicPortalView } from './components/views/PublicPortalView';
import { Modal } from './components/common/Modal';
import { Badge } from './components/common/Badge';
import { ShieldCheck, IndianRupee, MapPin } from 'lucide-react';

export default function App() {
  // App State
  const [activeTab, setActiveTab] = useState<string>('command-center');
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(mockProjects[0].id);
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(mockParcels[0]);
  const [inspectingParcel, setInspectingParcel] = useState<LandParcel | null>(null);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);

  // Data State
  const [projects, setProjects] = useState<InfrastructureProject[]>(mockProjects);
  const [parcels, setParcels] = useState<LandParcel[]>(mockParcels);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(mockBeneficiaries);
  const [alerts, setAlerts] = useState<AlertDispute[]>(mockAlerts);
  const [documents, setDocuments] = useState<DocumentRecord[]>(mockDocuments);
  const [surveys, setSurveys] = useState<FieldSurveyRecord[]>(mockSurveys);
  const [connectors, setConnectors] = useState(mockConnectors);
  const [auditLogs, setAuditLogs] = useState(mockAuditLogs);

  // Load initial data
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
      // Refresh audit logs
      const updatedLogs = await apiService.getAuditLogs();
      setAuditLogs(updatedLogs);
    }
  };

  const handleProcessDbt = async (beneficiaryId: string) => {
    const updated = await apiService.processDbtDisbursement(beneficiaryId);
    if (updated) {
      setBeneficiaries(prev => prev.map(b => b.id === beneficiaryId ? updated : b));
      // Refresh parcels and audit logs
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

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab}
        alertsCount={alerts.filter(a => a.status !== 'Stay Vacated').length}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          currentUser={currentUser}
          onSwitchUser={setCurrentUser}
          availableUsers={mockUsers}
          onOpenCalculator={() => setShowCalculator(true)}
          activeAlertsCount={alerts.filter(a => a.status !== 'Stay Vacated').length}
          onNavigateToAlerts={() => setActiveTab('alerts-disputes')}
        />

        {/* Dynamic Tab Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 bg-[#0B1120]">
          {activeTab === 'command-center' && (
            <CommandCenterView
              projects={projects}
              parcels={parcels}
              alerts={alerts}
              onNavigate={setActiveTab}
              onSelectProject={(id) => {
                setSelectedProjectId(id);
                setActiveTab('project-twin');
              }}
              onOpenCalculator={() => setShowCalculator(true)}
            />
          )}

          {activeTab === 'project-twin' && (
            <ProjectDigitalTwinView
              projects={projects}
              parcels={parcels}
              alerts={alerts}
              selectedProjectId={selectedProjectId}
              onSelectProject={setSelectedProjectId}
              onInspectParcel={handleInspectParcel}
              onOpenGis={() => setActiveTab('gis-explorer')}
            />
          )}

          {activeTab === 'gis-explorer' && (
            <GisExplorerView
              parcels={parcels}
              projects={projects}
              selectedParcel={selectedParcel}
              onSelectParcel={handleSelectParcel}
              onUpdateParcelStatus={handleUpdateParcelStatus}
              onOpenCalculator={() => setShowCalculator(true)}
            />
          )}

          {activeTab === 'workflow-pipeline' && (
            <WorkflowPipelineView
              stages={mockWorkflowStages}
              projects={projects}
              selectedProjectId={selectedProjectId}
              onSelectProject={setSelectedProjectId}
            />
          )}

          {activeTab === 'compensation-dbt' && (
            <CompensationDbtView
              beneficiaries={beneficiaries}
              parcels={parcels}
              onProcessDbt={handleProcessDbt}
              onOpenCalculator={() => setShowCalculator(true)}
            />
          )}

          {activeTab === 'rehabilitation-rr' && (
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
                colonyName: idx % 2 === 0 ? 'Vadodara Pradhan Mantri R&R Enclave' : undefined,
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

          {activeTab === 'document-vault' && (
            <DocumentVaultView
              documents={documents}
              onUploadDoc={handleUploadDoc}
            />
          )}

          {activeTab === 'field-verification' && (
            <FieldVerificationView
              surveys={surveys}
              parcels={parcels}
              onAddSurvey={handleAddSurvey}
            />
          )}

          {activeTab === 'alerts-disputes' && (
            <AlertsDisputesView
              alerts={alerts}
              onResolveDispute={handleResolveDispute}
            />
          )}

          {activeTab === 'ai-risk-analytics' && (
            <AiRiskAnalyticsView risks={mockAiRisks} />
          )}

          {activeTab === 'reports-analytics' && (
            <ReportsAnalyticsView
              projects={projects}
              parcels={parcels}
              alerts={alerts}
            />
          )}

          {activeTab === 'api-gateway' && (
            <ApiGatewayView
              connectors={connectors}
              onSyncConnector={handleSyncConnector}
            />
          )}

          {activeTab === 'audit-trail' && (
            <AuditTrailView logs={auditLogs} />
          )}

          {activeTab === 'public-portal' && (
            <PublicPortalView
              parcels={parcels}
              beneficiaries={beneficiaries}
              onOpenCalculator={() => setShowCalculator(true)}
            />
          )}
        </main>
      </div>

      {/* LARR Statutory Valuation Calculator Modal */}
      <CompensationCalculatorModal
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />

      {/* Parcel Detail Inspector Quick Modal */}
      {inspectingParcel && (
        <Modal
          isOpen={true}
          onClose={() => setInspectingParcel(null)}
          title={`Survey #${inspectingParcel.surveyNumber} (${inspectingParcel.village})`}
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-slate-400 text-[11px] block">Corridor:</span>
                <span className="font-bold text-sky-400">{inspectingParcel.projectName}</span>
              </div>
              <Badge variant={inspectingParcel.status === 'Compensation_Paid' ? 'emerald' : 'sky'}>
                {inspectingParcel.status.replace(/_/g, ' ')}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Khatedar</span>
                <span className="font-bold text-slate-100">{inspectingParcel.landOwnerName}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Khata Number</span>
                <span className="font-mono text-slate-200">{inspectingParcel.khataNumber}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Acquired Extent</span>
                <span className="font-bold text-slate-100">{inspectingParcel.areaAcres} Acres</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Statutory Multiplier</span>
                <span className="font-bold text-slate-100">{inspectingParcel.multiplierFactor}x</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Total Award (LARR)</span>
                <span className="font-mono font-bold text-emerald-400">
                  ₹{(inspectingParcel.totalCompensationRupees / 10000000).toFixed(2)} Cr
                </span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">PFMS DBT UTR</span>
                <span className="font-mono text-sky-400">{inspectingParcel.dbtUtrNumber || 'Awaiting'}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedParcel(inspectingParcel);
                  setInspectingParcel(null);
                  setActiveTab('gis-explorer');
                }}
                className="px-3 py-1.5 rounded bg-sky-700 hover:bg-sky-600 text-white font-medium flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Locate on GIS Explorer</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
