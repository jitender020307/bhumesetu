import { 
  InfrastructureProject, 
  LandParcel, 
  Beneficiary, 
  WorkflowStage, 
  RehabilitationRecord, 
  DocumentRecord, 
  FieldSurveyRecord, 
  AlertDispute, 
  AiRiskInsight, 
  ApiConnectorStatus, 
  AuditLogEntry,
  ParcelStatus
} from '../types';
import { 
  MOCK_PROJECTS, 
  MOCK_PARCELS, 
  MOCK_WORKFLOW_STAGES, 
  MOCK_BENEFICIARIES, 
  MOCK_REHABILITATIONS, 
  MOCK_DOCUMENTS, 
  MOCK_FIELD_SURVEYS, 
  MOCK_ALERTS_DISPUTES, 
  MOCK_AI_RISKS, 
  MOCK_API_CONNECTORS, 
  MOCK_AUDIT_LOGS 
} from '../data/mockData';

// Configuration toggle for future FastAPI integration
export const USE_MOCK_API = true;
export const API_BASE_URL = 'http://localhost:8000/api/v1';

// In-memory mutable states initialized from mock data
let projects = [...MOCK_PROJECTS];
let parcels = [...MOCK_PARCELS];
let workflowStages = [...MOCK_WORKFLOW_STAGES];
let beneficiaries = [...MOCK_BENEFICIARIES];
let rehabilitations = [...MOCK_REHABILITATIONS];
let documents = [...MOCK_DOCUMENTS];
let fieldSurveys = [...MOCK_FIELD_SURVEYS];
let alertsDisputes = [...MOCK_ALERTS_DISPUTES];
let apiConnectors = [...MOCK_API_CONNECTORS];
let auditLogs = [...MOCK_AUDIT_LOGS];

// Simulated network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // Projects
  async getProjects(): Promise<InfrastructureProject[]> {
    if (!USE_MOCK_API) {
      const res = await fetch(`${API_BASE_URL}/projects`);
      return res.json();
    }
    await delay(120);
    return [...projects];
  },

  async getProjectById(id: string): Promise<InfrastructureProject | undefined> {
    if (!USE_MOCK_API) {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`);
      return res.json();
    }
    await delay(80);
    return projects.find(p => p.id === id);
  },

  // Land Parcels
  async getParcels(filter?: { projectId?: string; search?: string; status?: string }): Promise<LandParcel[]> {
    if (!USE_MOCK_API) {
      const query = new URLSearchParams(filter as Record<string, string>).toString();
      const res = await fetch(`${API_BASE_URL}/parcels?${query}`);
      return res.json();
    }
    await delay(100);
    return parcels.filter(p => {
      if (filter?.projectId && p.projectId !== filter.projectId) return false;
      if (filter?.status && filter.status !== 'ALL' && p.status !== filter.status) return false;
      if (filter?.search) {
        const q = filter.search.toLowerCase();
        return (
          p.surveyNumber.toLowerCase().includes(q) ||
          p.parcelCode.toLowerCase().includes(q) ||
          p.village.toLowerCase().includes(q) ||
          p.landOwnerName.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q)
        );
      }
      return true;
    });
  },

  async updateParcelStatus(parcelId: string, status: ParcelStatus): Promise<LandParcel> {
    await delay(150);
    const index = parcels.findIndex(p => p.id === parcelId);
    if (index === -1) throw new Error('Parcel not found');
    parcels[index] = { ...parcels[index], status };
    
    // Add audit entry
    auditLogs.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      userName: 'Current Authorized Officer',
      userRole: 'state_cala',
      action: `Updated parcel status to: ${status}`,
      targetEntity: 'LandParcel',
      targetId: parcels[index].parcelCode,
      ipAddress: '10.14.88.42',
      state: parcels[index].state,
      immutableHash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')
    });

    return parcels[index];
  },

  // Workflow Stages
  async getWorkflowStages(): Promise<WorkflowStage[]> {
    await delay(80);
    return [...workflowStages];
  },

  // Beneficiaries & Compensation
  async getBeneficiaries(): Promise<Beneficiary[]> {
    await delay(80);
    return [...beneficiaries];
  },

  async processDbtDisbursement(beneficiaryId: string): Promise<Beneficiary> {
    await delay(250);
    const index = beneficiaries.findIndex(b => b.id === beneficiaryId);
    if (index === -1) throw new Error('Beneficiary not found');
    
    const txnId = `PFMS-DBT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    beneficiaries[index] = {
      ...beneficiaries[index],
      disbursedAmountRupees: beneficiaries[index].awardedAmountRupees,
      paymentStatus: 'DBT Success',
      pfmsTxnId: txnId,
      disbursementDate: new Date().toISOString().split('T')[0]
    };

    // Update corresponding parcel
    const pIdx = parcels.findIndex(p => p.id === beneficiaries[index].parcelId);
    if (pIdx !== -1) {
      parcels[pIdx] = {
        ...parcels[pIdx],
        disbursedAmountRupees: parcels[pIdx].totalCompensationRupees,
        disbursedStatus: 'Disbursed',
        status: 'Compensation_Paid',
        dbtUtrNumber: txnId
      };
    }

    auditLogs.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      userName: 'PFMS DBT Real-Time Settlement Engine',
      userRole: 'national_admin',
      action: `Credited ₹${(beneficiaries[index].awardedAmountRupees / 10000000).toFixed(2)} Cr to account ${beneficiaries[index].bankAccountNumber} via ${beneficiaries[index].ifscCode}`,
      targetEntity: 'Beneficiary / PFMS Order',
      targetId: beneficiaryId,
      ipAddress: '164.100.12.98 (PFMS Sec Gateway)',
      state: beneficiaries[index].district,
      immutableHash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')
    });

    return beneficiaries[index];
  },

  // R&R Records
  async getRehabilitations(): Promise<RehabilitationRecord[]> {
    await delay(80);
    return [...rehabilitations];
  },

  // Documents
  async getDocuments(): Promise<DocumentRecord[]> {
    await delay(80);
    return [...documents];
  },

  async uploadDocument(doc: Omit<DocumentRecord, 'id' | 'sha256Hash'>): Promise<DocumentRecord> {
    await delay(200);
    const newDoc: DocumentRecord = {
      ...doc,
      id: `DOC-USR-${Date.now()}`,
      sha256Hash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')
    };
    documents.unshift(newDoc);
    return newDoc;
  },

  // Field Surveys
  async getFieldSurveys(): Promise<FieldSurveyRecord[]> {
    await delay(80);
    return [...fieldSurveys];
  },

  async addFieldSurvey(survey: Omit<FieldSurveyRecord, 'id'>): Promise<FieldSurveyRecord> {
    await delay(200);
    const newSurvey: FieldSurveyRecord = {
      ...survey,
      id: `SURV-${Date.now().toString().slice(-6)}`
    };
    fieldSurveys.unshift(newSurvey);
    return newSurvey;
  },

  // Disputes & Alerts
  async getAlertsDisputes(): Promise<AlertDispute[]> {
    await delay(80);
    return [...alertsDisputes];
  },

  async getAlerts(): Promise<AlertDispute[]> {
    return this.getAlertsDisputes();
  },

  async resolveDispute(id: string, resolutionNote: string): Promise<AlertDispute> {
    await delay(150);
    const index = alertsDisputes.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Dispute not found');
    alertsDisputes[index] = {
      ...alertsDisputes[index],
      status: 'Stay Vacated',
      description: `${alertsDisputes[index].description} [RESOLVED: ${resolutionNote}]`
    };
    return alertsDisputes[index];
  },

  // AI Risks
  async getAiRisks(): Promise<AiRiskInsight[]> {
    await delay(80);
    return [...MOCK_AI_RISKS];
  },

  // API Connectors
  async getApiConnectors(): Promise<ApiConnectorStatus[]> {
    await delay(80);
    return [...apiConnectors];
  },

  async syncApiConnector(connectorId: string): Promise<ApiConnectorStatus> {
    await delay(400);
    const idx = apiConnectors.findIndex(c => c.id === connectorId);
    if (idx !== -1) {
      apiConnectors[idx] = {
        ...apiConnectors[idx],
        lastSyncTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        recordsSynced24h: apiConnectors[idx].recordsSynced24h + Math.floor(Math.random() * 50 + 10)
      };
      return apiConnectors[idx];
    }
    throw new Error('Connector not found');
  },

  async syncConnector(connectorId: string): Promise<ApiConnectorStatus> {
    return this.syncApiConnector(connectorId);
  },

  // Audit Logs
  async getAuditLogs(): Promise<AuditLogEntry[]> {
    await delay(60);
    return [...auditLogs];
  },

  // Statutory RFCTLARR Act 2013 Compensation Calculator Engine
  calculateRfctlarrCompensation(inputs: {
    areaAcres: number;
    circleRatePerAcre: number;
    isRural: boolean;
    treeValuation: number;
    structureValuation: number;
    monthsElapsedFromNotification: number; // 12% per annum = 1% per month
  }) {
    // 1. Multiplier factor: 1.0 for urban, 1.5 to 2.0 for rural
    const multiplier = inputs.isRural ? 1.5 : 1.0;
    
    // 2. Base Land Value
    const baseLandValue = inputs.areaAcres * inputs.circleRatePerAcre;
    
    // 3. Multiplied Land Value (Sec 26 & 30(2))
    const multipliedLandValue = baseLandValue * multiplier;
    
    // 4. Assets attached (trees, buildings, wells) (Sec 29)
    const assetsAttached = inputs.treeValuation + inputs.structureValuation;
    
    // 5. Total market value before solatium
    const totalMarketValue = multipliedLandValue + assetsAttached;
    
    // 6. Solatium: 100% of market value (Sec 30(1))
    const solatiumAmount = totalMarketValue; // 100%
    
    // 7. Additional Market Value (Sec 30(3)): 12% per annum from Sec 4 notification to award
    const annualInterestRate = 0.12;
    const additionalMarketValue = baseLandValue * (annualInterestRate * (inputs.monthsElapsedFromNotification / 12));
    
    // 8. Total Final Award Amount
    const totalAwardAmount = totalMarketValue + solatiumAmount + additionalMarketValue;

    return {
      baseLandValue,
      multiplier,
      multipliedLandValue,
      assetsAttached,
      totalMarketValue,
      solatiumAmount,
      additionalMarketValue,
      totalAwardAmount
    };
  }
};
