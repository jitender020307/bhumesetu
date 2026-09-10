export type UserRole = 
  | 'national_admin'
  | 'central_ministry'
  | 'state_cala'
  | 'district_collector'
  | 'field_surveyor'
  | 'public_beneficiary';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  designation: string;
  department: string;
  state?: string;
  district?: string;
  avatar?: string;
}

export type ProjectStatus = 'Planning' | 'In Progress' | 'Land Acquired' | 'Stalled' | 'Completed';
export type MinistryType = 'MoRTH' | 'Indian Railways' | 'MoPNG' | 'MoP' | 'Jal Shakti' | 'Civil Aviation';

export interface InfrastructureProject {
  id: string;
  code: string;
  name: string;
  corridor: string;
  ministry: MinistryType;
  executingAgency: string; // e.g. NHAI, DFCCIL, NHSRCL, NWDA
  states: string[];
  totalLengthKm: number;
  totalLandRequiredHa: number;
  landAcquiredHa: number;
  acquisitionPercentage: number;
  totalBudgetCr: number;
  compensationDisbursedCr: number;
  startDate: string;
  targetCompletionDate: string;
  status: ProjectStatus;
  riskScore: number; // 0 to 100
  activeDisputes: number;
  parcelsCount: number;
  currentMilestone: string;
  coordinates: [number, number]; // [lat, lng]
  leadAgency?: string;
  statesInvolved?: string[];
  type?: string;
}

export type ParcelStatus = 
  | 'Identified'
  | 'Sec_4_Notified'
  | 'Survey_Complete'
  | 'Sec_6_Declared'
  | 'Valuation_Done'
  | 'Sec_11_Awarded'
  | 'Compensation_Paid'
  | 'Possession_Taken'
  | 'Mutated_To_Govt'
  | 'In_Dispute';

export type LandCategory = 'Agricultural' | 'Commercial' | 'Residential' | 'Barren' | 'Forest_Buffer' | 'Gram_Sabha';

export interface LandParcel {
  id: string;
  parcelCode: string;
  surveyNumber: string;
  subDivision: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  projectId: string;
  projectName: string;
  areaAcres: number;
  landCategory: LandCategory;
  landOwnerName: string;
  aadhaarMasked: string;
  khataNumber: string;
  status: ParcelStatus;
  marketRatePerAcre: number;
  multiplierFactor: number; // 1.0 (urban) to 2.0 (rural)
  solatiumPercentage: number; // 100%
  totalCompensationRupees: number;
  disbursedAmountRupees: number;
  disbursedStatus: 'Pending' | 'Escrow_Deposited' | 'DBT_Initiated' | 'Disbursed' | 'Rejected';
  dbtUtrNumber?: string;
  disputeId?: string;
  coordinates: [number, number][]; // Polygon coordinates
  centerCoordinate: [number, number];
  digiLockerVerified: boolean;
  droneSurveyCompleted: boolean;
  lastInspectionDate: string;
}

export type WorkflowStepId = 
  | 'sec_4_sia'
  | 'sec_6_prelim'
  | 'sec_9_objection'
  | 'sec_11_declaration'
  | 'sec_19_land_plan'
  | 'sec_23_award'
  | 'sec_31_rr_scheme'
  | 'sec_38_possession'
  | 'mutation_revenue';

export interface WorkflowStage {
  id: WorkflowStepId;
  stepNumber: number;
  title: string;
  sectionReference: string;
  description: string;
  statutorySlaDays: number;
  averageCompletedDays: number;
  status: 'Completed' | 'In Progress' | 'Delayed' | 'Upcoming';
  responsibleAuthority: string;
  gazetteRef?: string;
  parcelsAtStage: number;
  totalParcels: number;
}

export interface Beneficiary {
  id: string;
  parcelId: string;
  name: string;
  fatherHusbandName: string;
  aadhaarLast4: string;
  panMasked: string;
  bankAccountNumber: string;
  ifscCode: string;
  bankName: string;
  village: string;
  district: string;
  sharePercentage: number;
  awardedAmountRupees: number;
  disbursedAmountRupees: number;
  paymentStatus: 'Awaiting CALA Approval' | 'PFMS Verified' | 'DBT Success' | 'Payment Failed' | 'Under Grievance';
  pfmsTxnId?: string;
  disbursementDate?: string;
  phoneMasked: string;
}

export interface RehabilitationRecord {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  village: string;
  projectCode: string;
  isDisplacedFamily: boolean;
  entitlements: {
    alternativeHousePlotAllotted: boolean;
    colonyName?: string;
    plotNumber?: string;
    subsistenceGrantAmount: number;
    subsistenceGrantDisbursed: boolean;
    displacementAllowanceAmount: number;
    displacementAllowanceDisbursed: boolean;
    vocationalTrainingStatus: 'Enrolled' | 'Completed' | 'Not Opted';
    employmentAssistance: 'Grant Disbursed' | 'Job Allocated' | 'Pending';
  };
  grievanceStatus: 'None' | 'Pending' | 'Resolved';
}

export interface DocumentRecord {
  id: string;
  title: string;
  docType: 'Gazette_3A' | 'Gazette_3D' | 'RoR_7_12' | 'Valuation_Report' | 'Drone_Ortho_Map' | 'SIA_Report' | 'CALA_Award_Copy' | 'Court_Order';
  projectCode: string;
  village?: string;
  surveyNumber?: string;
  dateUploaded: string;
  fileSize: string;
  verifiedByDigiLocker: boolean;
  sha256Hash: string;
  uploadedBy: string;
  verificationBadge: 'Verified' | 'Pending' | 'Disputed';
}

export interface FieldSurveyRecord {
  id: string;
  parcelId: string;
  surveyNumber: string;
  village: string;
  surveyorName: string;
  surveyorId: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  gpsAccuracyMeters: number;
  treesCount: number;
  structuresIdentified: string[];
  standingCropsPresent: boolean;
  cropValuationRupees: number;
  structureValuationRupees: number;
  photoCount: number;
  droneFlightId?: string;
  status: 'Verified' | 'Flagged Discrepancy' | 'Pending Review';
  discrepancyNote?: string;
}

export interface AlertDispute {
  id: string;
  projectCode: string;
  projectName: string;
  type: 'High Court Stay' | 'Arbitration Claim' | 'Valuation Protest' | 'Title Conflict' | 'Environmental Clearance' | 'Forest Right Act Delay';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  surveyNumber: string;
  village: string;
  state: string;
  description: string;
  financialImplicationCr: number;
  impactedAreaAcres: number;
  hearingDate?: string;
  courtName?: string;
  daysPending: number;
  status: 'Open' | 'Under Hearing' | 'Negotiation in Progress' | 'Stay Vacated';
}

export interface AiRiskInsight {
  id: string;
  projectId: string;
  projectName: string;
  riskCategory: 'Acquisition Delay' | 'Budget Escalation' | 'Litigation Cluster' | 'Forest Clearance Bottleneck' | 'Surveyor Discrepancy';
  riskScore: number; // 0 - 100
  trend: 'increasing' | 'stable' | 'decreasing';
  predictedDelayDays: number;
  predictedEscalationCr: number;
  keyDrivers: string[];
  recommendedAction: string;
  confidenceScore: number; // 0 - 100
}

export interface ApiConnectorStatus {
  id: string;
  serviceName: string;
  agency: string;
  endpoint: string;
  protocol: string;
  status: 'ONLINE' | 'DEGRADED' | 'MAINTENANCE';
  latencyMs: number;
  successRate: number;
  lastSyncTimestamp: string;
  recordsSynced24h: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userName: string;
  userRole: UserRole;
  action: string;
  targetEntity: string;
  targetId: string;
  ipAddress: string;
  state: string;
  immutableHash: string;
}
