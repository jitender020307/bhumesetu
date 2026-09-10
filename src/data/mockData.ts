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
  User 
} from '../types';

export const CURRENT_USER: User = {
  id: 'usr_001',
  name: 'Dr. Rajeshwar Sharma, IAS',
  role: 'national_admin',
  designation: 'Joint Secretary & Mission Director (Land Acquisition)',
  department: 'PM GatiShakti National Master Plan / MoRTH',
  state: 'National Portal (New Delhi)',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
};

export const AVAILABLE_ROLES: { role: User['role']; label: string; desc: string; sampleUser: string }[] = [
  { 
    role: 'national_admin', 
    label: 'National Administrator', 
    desc: 'Full read/write authority, apex decision dashboard, inter-ministerial sanctions',
    sampleUser: 'Dr. R. Sharma, IAS (Joint Secy, MoRTH)'
  },
  { 
    role: 'central_ministry', 
    label: 'Central Ministry Reviewer', 
    desc: 'Ministry of Railways / MoRTH / Jal Shakti corridor monitoring & fund approvals',
    sampleUser: 'Smt. Priya Nair (Director, Infra Projects)'
  },
  { 
    role: 'state_cala', 
    label: 'State CALA Officer', 
    desc: 'Competent Authority Land Acquisition: Section 11 awards & solatium sign-offs',
    sampleUser: 'Shri Vikram Desai (CALA, Vadodara Corridor)'
  },
  { 
    role: 'district_collector', 
    label: 'District Collector / DM', 
    desc: 'Revenue court decisions, section 23 hearings & mutation authorization',
    sampleUser: 'Shri Anand Verma, IAS (Collector, Palghar)'
  },
  { 
    role: 'field_surveyor', 
    label: 'Field Surveyor / Amin', 
    desc: 'Ground verification, drone GIS tag verification, crop/structure valuation',
    sampleUser: 'K. Mohan Rao (Senior Revenue Inspector / GIS)'
  },
  { 
    role: 'public_beneficiary', 
    label: 'Land Owner / Beneficiary Portal', 
    desc: 'Public view to track claim, compensation calculation, and DBT status',
    sampleUser: 'Shri Rameshwar Patil (Khatedar / Landowner)'
  }
];

export const MOCK_PROJECTS: InfrastructureProject[] = [
  {
    id: 'PRJ_DME_01',
    code: 'NHAI-DME-PKG4',
    name: 'Delhi-Mumbai Expressway (Vadodara-Mumbai Section)',
    corridor: 'Delhi-Mumbai Green Corridor NH-48',
    ministry: 'MoRTH',
    executingAgency: 'National Highways Authority of India (NHAI)',
    states: ['Gujarat', 'Maharashtra'],
    totalLengthKm: 378,
    totalLandRequiredHa: 4250,
    landAcquiredHa: 3825,
    acquisitionPercentage: 90,
    totalBudgetCr: 32500,
    compensationDisbursedCr: 9450,
    startDate: '2021-04-01',
    targetCompletionDate: '2026-12-31',
    status: 'In Progress',
    riskScore: 28,
    activeDisputes: 14,
    parcelsCount: 3840,
    currentMilestone: 'Section 38: Final Physical Possession & Tree Clearance in Palghar Sector',
    coordinates: [20.9467, 72.9520]
  },
  {
    id: 'PRJ_WDFC_02',
    code: 'DFCCIL-WDFC-07',
    name: 'Western Dedicated Freight Corridor (Vaitarna-JNPT Section)',
    corridor: 'Dadri to JNPT Freight Trunk',
    ministry: 'Indian Railways',
    executingAgency: 'Dedicated Freight Corridor Corporation of India (DFCCIL)',
    states: ['Maharashtra'],
    totalLengthKm: 135,
    totalLandRequiredHa: 1680,
    landAcquiredHa: 1478,
    acquisitionPercentage: 88,
    totalBudgetCr: 14200,
    compensationDisbursedCr: 4120,
    startDate: '2020-08-15',
    targetCompletionDate: '2026-09-30',
    status: 'In Progress',
    riskScore: 64,
    activeDisputes: 29,
    parcelsCount: 1950,
    currentMilestone: 'High Court stay hearing for 42.4 Ha CRZ mangrove buffer zone near Vasai',
    coordinates: [19.4259, 72.8225]
  },
  {
    id: 'PRJ_MAHSR_03',
    code: 'NHSRCL-MAHSR-HSR',
    name: 'Mumbai-Ahmedabad High Speed Rail (Bullet Train)',
    corridor: 'BKC Mumbai - Sabarmati Ahmedabad',
    ministry: 'Indian Railways',
    executingAgency: 'National High Speed Rail Corp (NHSRCL)',
    states: ['Maharashtra', 'Gujarat', 'Dadra & Nagar Haveli'],
    totalLengthKm: 508,
    totalLandRequiredHa: 1396,
    landAcquiredHa: 1385,
    acquisitionPercentage: 99.2,
    totalBudgetCr: 108000,
    compensationDisbursedCr: 12400,
    startDate: '2018-09-01',
    targetCompletionDate: '2027-08-15',
    status: 'In Progress',
    riskScore: 12,
    activeDisputes: 4,
    parcelsCount: 7120,
    currentMilestone: 'Underground BKC Station C1 tunnel possession hand-over completed',
    coordinates: [21.1702, 72.8311]
  },
  {
    id: 'PRJ_KBLP_04',
    code: 'NWDA-KBLP-LINK1',
    name: 'Ken-Betwa River Interlinking National Project',
    corridor: 'Daudhan Dam & 221 km Link Canal',
    ministry: 'Jal Shakti',
    executingAgency: 'National Water Development Agency (NWDA)',
    states: ['Madhya Pradesh', 'Uttar Pradesh'],
    totalLengthKm: 221,
    totalLandRequiredHa: 9000,
    landAcquiredHa: 4950,
    acquisitionPercentage: 55,
    totalBudgetCr: 44605,
    compensationDisbursedCr: 3150,
    startDate: '2022-03-01',
    targetCompletionDate: '2030-03-31',
    status: 'In Progress',
    riskScore: 78,
    activeDisputes: 46,
    parcelsCount: 5400,
    currentMilestone: 'Panna Tiger Reserve buffer land stage-II compensatory afforestation handover',
    coordinates: [24.6366, 79.8660]
  },
  {
    id: 'PRJ_BCE_05',
    code: 'NHAI-BCE-NE7',
    name: 'Bengaluru-Chennai Expressway (NE-7 Corridor)',
    corridor: 'Hoskote (Karnataka) to Sriperumbudur (Tamil Nadu)',
    ministry: 'MoRTH',
    executingAgency: 'NHAI PIU-Vellore & Bengaluru',
    states: ['Karnataka', 'Andhra Pradesh', 'Tamil Nadu'],
    totalLengthKm: 262,
    totalLandRequiredHa: 2650,
    landAcquiredHa: 2570,
    acquisitionPercentage: 97,
    totalBudgetCr: 17930,
    compensationDisbursedCr: 5890,
    startDate: '2021-01-10',
    targetCompletionDate: '2026-06-30',
    status: 'In Progress',
    riskScore: 19,
    activeDisputes: 8,
    parcelsCount: 3100,
    currentMilestone: 'Sriperumbudur industrial belt utility shifting & final compensation tranche',
    coordinates: [12.9815, 79.4124]
  }
];

export const MOCK_PARCELS: LandParcel[] = [
  {
    id: 'PCL-GJ-VAD-01',
    parcelCode: 'GJ-VAD-PADRA-142/2A',
    surveyNumber: '142/2A',
    subDivision: 'Hissa 2',
    village: 'Chokari',
    taluk: 'Padra',
    district: 'Vadodara',
    state: 'Gujarat',
    projectId: 'PRJ_DME_01',
    projectName: 'Delhi-Mumbai Expressway',
    areaAcres: 3.45,
    landCategory: 'Agricultural',
    landOwnerName: 'Patel Bhikhabhai Dahyabhai & Co-sharers',
    aadhaarMasked: 'XXXX-XXXX-4912',
    khataNumber: 'KH-819',
    status: 'Compensation_Paid',
    marketRatePerAcre: 2400000,
    multiplierFactor: 1.5,
    solatiumPercentage: 100,
    totalCompensationRupees: 27945000, // (3.45 * 2.4M * 1.5) = 12.42M base + 100% solatium (12.42M) + 12% int (3.1M)
    disbursedAmountRupees: 27945000,
    disbursedStatus: 'Disbursed',
    dbtUtrNumber: 'PFMS202409028918231',
    coordinates: [
      [22.215, 73.082],
      [22.219, 73.087],
      [22.216, 73.092],
      [22.212, 73.085]
    ],
    centerCoordinate: [22.2155, 73.0865],
    digiLockerVerified: true,
    droneSurveyCompleted: true,
    lastInspectionDate: '2026-08-14'
  },
  {
    id: 'PCL-MH-PLG-02',
    parcelCode: 'MH-PLG-DAH-89/1B',
    surveyNumber: '89/1B',
    subDivision: 'Hissa 1',
    village: 'Vangaon',
    taluk: 'Dahanu',
    district: 'Palghar',
    state: 'Maharashtra',
    projectId: 'PRJ_DME_01',
    projectName: 'Delhi-Mumbai Expressway',
    areaAcres: 1.80,
    landCategory: 'Agricultural',
    landOwnerName: 'Suresh Kashinath Tare',
    aadhaarMasked: 'XXXX-XXXX-9844',
    khataNumber: 'KH-402',
    status: 'In_Dispute',
    marketRatePerAcre: 3100000,
    multiplierFactor: 1.5,
    solatiumPercentage: 100,
    totalCompensationRupees: 18414000,
    disbursedAmountRupees: 0,
    disbursedStatus: 'Escrow_Deposited',
    disputeId: 'DISP-MH-2024-091',
    coordinates: [
      [19.865, 72.765],
      [19.868, 72.769],
      [19.864, 72.773],
      [19.861, 72.768]
    ],
    centerCoordinate: [19.8645, 72.7687],
    digiLockerVerified: true,
    droneSurveyCompleted: true,
    lastInspectionDate: '2026-08-20'
  },
  {
    id: 'PCL-MH-VAS-03',
    parcelCode: 'MH-PLG-VAS-214/3',
    surveyNumber: '214/3',
    subDivision: 'C-Block',
    village: 'Sasunavghar',
    taluk: 'Vasai',
    district: 'Palghar',
    state: 'Maharashtra',
    projectId: 'PRJ_WDFC_02',
    projectName: 'Western Dedicated Freight Corridor',
    areaAcres: 4.20,
    landCategory: 'Forest_Buffer',
    landOwnerName: 'Gram Sabha Sasunavghar (Community Rights)',
    aadhaarMasked: 'COMMUNITY-PANCHAYAT',
    khataNumber: 'KH-001',
    status: 'In_Dispute',
    marketRatePerAcre: 4800000,
    multiplierFactor: 1.25,
    solatiumPercentage: 100,
    totalCompensationRupees: 56448000,
    disbursedAmountRupees: 0,
    disbursedStatus: 'Pending',
    disputeId: 'DISP-HC-BOM-1028',
    coordinates: [
      [19.345, 72.912],
      [19.349, 72.918],
      [19.346, 72.923],
      [19.341, 72.916]
    ],
    centerCoordinate: [19.3452, 72.9172],
    digiLockerVerified: false,
    droneSurveyCompleted: true,
    lastInspectionDate: '2026-07-28'
  },
  {
    id: 'PCL-GJ-NAV-04',
    parcelCode: 'GJ-NAV-GAN-45/1',
    surveyNumber: '45/1',
    subDivision: 'A1',
    village: 'Amalsad',
    taluk: 'Gandevi',
    district: 'Navsari',
    state: 'Gujarat',
    projectId: 'PRJ_MAHSR_03',
    projectName: 'Mumbai-Ahmedabad High Speed Rail',
    areaAcres: 0.95,
    landCategory: 'Agricultural',
    landOwnerName: 'Jayeshbhai Mohanbhai Naik',
    aadhaarMasked: 'XXXX-XXXX-6120',
    khataNumber: 'KH-194',
    status: 'Possession_Taken',
    marketRatePerAcre: 3500000,
    multiplierFactor: 1.5,
    solatiumPercentage: 100,
    totalCompensationRupees: 11151000,
    disbursedAmountRupees: 11151000,
    disbursedStatus: 'Disbursed',
    dbtUtrNumber: 'PFMS202410889912441',
    coordinates: [
      [20.781, 72.981],
      [20.784, 72.985],
      [20.782, 72.989],
      [20.778, 72.984]
    ],
    centerCoordinate: [20.7812, 72.9847],
    digiLockerVerified: true,
    droneSurveyCompleted: true,
    lastInspectionDate: '2026-08-30'
  },
  {
    id: 'PCL-MP-PAN-05',
    parcelCode: 'MP-PAN-AJAY-310/P',
    surveyNumber: '310/P',
    subDivision: 'Part B',
    village: 'Madla',
    taluk: 'Ajaigarh',
    district: 'Panna',
    state: 'Madhya Pradesh',
    projectId: 'PRJ_KBLP_04',
    projectName: 'Ken-Betwa River Interlinking National Project',
    areaAcres: 6.80,
    landCategory: 'Forest_Buffer',
    landOwnerName: 'Ramprasad Gond & 4 Co-tenants',
    aadhaarMasked: 'XXXX-XXXX-3199',
    khataNumber: 'KH-552',
    status: 'Sec_11_Awarded',
    marketRatePerAcre: 1100000,
    multiplierFactor: 2.0,
    solatiumPercentage: 100,
    totalCompensationRupees: 33528000,
    disbursedAmountRupees: 0,
    disbursedStatus: 'DBT_Initiated',
    coordinates: [
      [24.685, 80.012],
      [24.691, 80.021],
      [24.686, 80.028],
      [24.679, 80.018]
    ],
    centerCoordinate: [24.6852, 80.0197],
    digiLockerVerified: true,
    droneSurveyCompleted: true,
    lastInspectionDate: '2026-08-11'
  },
  {
    id: 'PCL-TN-KAN-06',
    parcelCode: 'TN-KAN-SRIP-77/4',
    surveyNumber: '77/4',
    subDivision: 'Sub 4',
    village: 'Mambakkam',
    taluk: 'Sriperumbudur',
    district: 'Kanchipuram',
    state: 'Tamil Nadu',
    projectId: 'PRJ_BCE_05',
    projectName: 'Bengaluru-Chennai Expressway',
    areaAcres: 2.10,
    landCategory: 'Commercial',
    landOwnerName: 'Muruganandam S. & Sons Logistics',
    aadhaarMasked: 'XXXX-XXXX-7703',
    khataNumber: 'PATTA-904',
    status: 'Mutated_To_Govt',
    marketRatePerAcre: 5200000,
    multiplierFactor: 1.0,
    solatiumPercentage: 100,
    totalCompensationRupees: 24460800,
    disbursedAmountRupees: 24460800,
    disbursedStatus: 'Disbursed',
    dbtUtrNumber: 'PFMS202407119024155',
    coordinates: [
      [12.915, 79.982],
      [12.919, 79.987],
      [12.916, 79.992],
      [12.912, 79.986]
    ],
    centerCoordinate: [12.9155, 79.9867],
    digiLockerVerified: true,
    droneSurveyCompleted: true,
    lastInspectionDate: '2026-08-01'
  }
];

export const MOCK_WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 'sec_4_sia',
    stepNumber: 1,
    title: 'Section 4: Social Impact Assessment (SIA)',
    sectionReference: 'RFCTLARR Act 2013 Sec 4 & 7',
    description: 'Mandatory public hearing, livelihood assessment, multi-crop land study by independent state SIA unit.',
    statutorySlaDays: 180,
    averageCompletedDays: 145,
    status: 'Completed',
    responsibleAuthority: 'State SIA Directorate / District Collector',
    gazetteRef: 'CG-DL-E-18042021-226814',
    parcelsAtStage: 0,
    totalParcels: 3840
  },
  {
    id: 'sec_6_prelim',
    stepNumber: 2,
    title: 'Section 6: Preliminary Notification',
    sectionReference: 'RFCTLARR Act 2013 Sec 11 (or NHAI 3A)',
    description: 'Publication in Gazette & local newspapers. Prohibits any transaction or building on affected survey numbers.',
    statutorySlaDays: 60,
    averageCompletedDays: 52,
    status: 'Completed',
    responsibleAuthority: 'Competent Authority Land Acquisition (CALA)',
    gazetteRef: 'SO-1922(E) / 2021-08-12',
    parcelsAtStage: 0,
    totalParcels: 3840
  },
  {
    id: 'sec_9_objection',
    stepNumber: 3,
    title: 'Section 15: Hearing of Objections',
    sectionReference: 'RFCTLARR Act 2013 Sec 15 (or NHAI 3C)',
    description: '60 days statutory window for Khatedars to submit claims regarding boundary, ownership rights or public utility.',
    statutorySlaDays: 60,
    averageCompletedDays: 68,
    status: 'Completed',
    responsibleAuthority: 'Special Land Acquisition Officer (SLAO)',
    parcelsAtStage: 18,
    totalParcels: 3840
  },
  {
    id: 'sec_11_declaration',
    stepNumber: 4,
    title: 'Section 19: Final Declaration of Acquisition',
    sectionReference: 'RFCTLARR Act 2013 Sec 19 (or NHAI 3D)',
    description: 'Vests land in Central Government. Must be published within 12 calendar months of preliminary notification.',
    statutorySlaDays: 365,
    averageCompletedDays: 310,
    status: 'Completed',
    responsibleAuthority: 'Ministry of Road Transport & Highways / CALA',
    gazetteRef: 'SO-3814(E) / 2022-07-24',
    parcelsAtStage: 0,
    totalParcels: 3840
  },
  {
    id: 'sec_19_land_plan',
    stepNumber: 5,
    title: 'Section 21: Notice to Persons Interested',
    sectionReference: 'RFCTLARR Act 2013 Sec 21 (or NHAI 3E)',
    description: 'Notice to claim compensation amounts, submit title deeds, bank accounts, and crop/structure valuation claims.',
    statutorySlaDays: 30,
    averageCompletedDays: 28,
    status: 'Completed',
    responsibleAuthority: 'CALA / Sub-Divisional Magistrate',
    parcelsAtStage: 42,
    totalParcels: 3840
  },
  {
    id: 'sec_23_award',
    stepNumber: 6,
    title: 'Section 23: Collector / CALA Award Determination',
    sectionReference: 'RFCTLARR Act 2013 Sec 23 & 30 (First Schedule)',
    description: 'Determination of market value × multiplier factor (1.0 to 2.0) + 100% Solatium + 12% additional market value interest.',
    statutorySlaDays: 90,
    averageCompletedDays: 84,
    status: 'In Progress',
    responsibleAuthority: 'District Collector & CALA',
    parcelsAtStage: 145,
    totalParcels: 3840
  },
  {
    id: 'sec_31_rr_scheme',
    stepNumber: 7,
    title: 'Section 31: Rehabilitation & Resettlement Scheme',
    sectionReference: 'RFCTLARR Act 2013 Second & Third Schedule',
    description: 'Provision of alternate dwelling units, one-time resettlement allowances, vocational training vouchers.',
    statutorySlaDays: 90,
    averageCompletedDays: 110,
    status: 'In Progress',
    responsibleAuthority: 'R&R Administrator & Project Directorate',
    parcelsAtStage: 88,
    totalParcels: 3840
  },
  {
    id: 'sec_38_possession',
    stepNumber: 8,
    title: 'Section 38: Physical Possession & Handover',
    sectionReference: 'RFCTLARR Act 2013 Sec 38 (or NHAI 3G/3H)',
    description: 'Physical handover only after full compensation deposit in beneficiary account / PFMS escrow.',
    statutorySlaDays: 60,
    averageCompletedDays: 50,
    status: 'In Progress',
    responsibleAuthority: 'CALA, Revenue Circle Officer & NHAI PIU',
    parcelsAtStage: 215,
    totalParcels: 3840
  },
  {
    id: 'mutation_revenue',
    stepNumber: 9,
    title: 'Revenue Mutation & DigiLocker Digital Titling',
    sectionReference: 'State Land Revenue Code & Digital India Land Records (DILRMP)',
    description: 'Automated entry into state RoR portal (AnyRoR/MahaBhumi/Bhoomi) vesting rights in NHAI / Indian Railways.',
    statutorySlaDays: 30,
    averageCompletedDays: 22,
    status: 'In Progress',
    responsibleAuthority: 'Tehsildar & District Land Records Dept',
    parcelsAtStage: 3350,
    totalParcels: 3840
  }
];

export const MOCK_BENEFICIARIES: Beneficiary[] = [
  {
    id: 'BEN-001',
    parcelId: 'PCL-GJ-VAD-01',
    name: 'Bhikhabhai Dahyabhai Patel',
    fatherHusbandName: 'Late Dahyabhai Somabhai Patel',
    aadhaarLast4: '4912',
    panMasked: 'ABCDE****K',
    bankAccountNumber: '3098101004921',
    ifscCode: 'SBIN0001824',
    bankName: 'State Bank of India, Padra Branch',
    village: 'Chokari',
    district: 'Vadodara',
    sharePercentage: 60,
    awardedAmountRupees: 16767000,
    disbursedAmountRupees: 16767000,
    paymentStatus: 'DBT Success',
    pfmsTxnId: 'PFMS-DBT-2024-884129',
    disbursementDate: '2026-08-18',
    phoneMasked: '+91 98250 XXXXX'
  },
  {
    id: 'BEN-002',
    parcelId: 'PCL-GJ-VAD-01',
    name: 'Manishaben Bhikhabhai Patel',
    fatherHusbandName: 'Bhikhabhai Dahyabhai Patel',
    aadhaarLast4: '8821',
    panMasked: 'BFKLP****M',
    bankAccountNumber: '5010042891901',
    ifscCode: 'HDFC0000412',
    bankName: 'HDFC Bank, Vadodara Race Course',
    village: 'Chokari',
    district: 'Vadodara',
    sharePercentage: 40,
    awardedAmountRupees: 11178000,
    disbursedAmountRupees: 11178000,
    paymentStatus: 'DBT Success',
    pfmsTxnId: 'PFMS-DBT-2024-884130',
    disbursementDate: '2026-08-18',
    phoneMasked: '+91 94260 XXXXX'
  },
  {
    id: 'BEN-003',
    parcelId: 'PCL-MH-PLG-02',
    name: 'Suresh Kashinath Tare',
    fatherHusbandName: 'Kashinath Tare',
    aadhaarLast4: '9844',
    panMasked: 'AHWPT****F',
    bankAccountNumber: '0321101003491',
    ifscCode: 'BARB0VANGAN',
    bankName: 'Bank of Baroda, Vangaon',
    village: 'Vangaon',
    district: 'Palghar',
    sharePercentage: 100,
    awardedAmountRupees: 18414000,
    disbursedAmountRupees: 0,
    paymentStatus: 'Under Grievance',
    phoneMasked: '+91 98901 XXXXX'
  },
  {
    id: 'BEN-004',
    parcelId: 'PCL-GJ-NAV-04',
    name: 'Jayeshbhai Mohanbhai Naik',
    fatherHusbandName: 'Mohanbhai Naik',
    aadhaarLast4: '6120',
    panMasked: 'AZNPN****Q',
    bankAccountNumber: '91802003881920',
    ifscCode: 'UTIB0000192',
    bankName: 'Axis Bank, Navsari Main',
    village: 'Amalsad',
    district: 'Navsari',
    sharePercentage: 100,
    awardedAmountRupees: 11151000,
    disbursedAmountRupees: 11151000,
    paymentStatus: 'DBT Success',
    pfmsTxnId: 'PFMS-DBT-2024-651209',
    disbursementDate: '2026-08-25',
    phoneMasked: '+91 97230 XXXXX'
  },
  {
    id: 'BEN-005',
    parcelId: 'PCL-MP-PAN-05',
    name: 'Ramprasad Gond',
    fatherHusbandName: 'Bhanwar Singh Gond',
    aadhaarLast4: '3199',
    panMasked: 'CMYPG****R',
    bankAccountNumber: '49010100084192',
    ifscCode: 'PUNB0490100',
    bankName: 'Punjab National Bank, Ajaigarh',
    village: 'Madla',
    district: 'Panna',
    sharePercentage: 100,
    awardedAmountRupees: 33528000,
    disbursedAmountRupees: 0,
    paymentStatus: 'PFMS Verified',
    phoneMasked: '+91 99931 XXXXX'
  }
];

export const MOCK_REHABILITATIONS: RehabilitationRecord[] = [
  {
    id: 'RR-001',
    beneficiaryId: 'BEN-003',
    beneficiaryName: 'Suresh Kashinath Tare',
    village: 'Vangaon (Palghar)',
    projectCode: 'NHAI-DME-PKG4',
    isDisplacedFamily: true,
    entitlements: {
      alternativeHousePlotAllotted: true,
      colonyName: 'Vangaon R&R Model Colony Sector 2',
      plotNumber: 'R-42 (150 sq. mtrs)',
      subsistenceGrantAmount: 36000, // ₹3,000 / month for 1 year
      subsistenceGrantDisbursed: true,
      displacementAllowanceAmount: 50000, // One-time relocation grant
      displacementAllowanceDisbursed: true,
      vocationalTrainingStatus: 'Enrolled',
      employmentAssistance: 'Grant Disbursed'
    },
    grievanceStatus: 'Pending'
  },
  {
    id: 'RR-002',
    beneficiaryId: 'BEN-005',
    beneficiaryName: 'Ramprasad Gond',
    village: 'Madla (Panna)',
    projectCode: 'NWDA-KBLP-LINK1',
    isDisplacedFamily: true,
    entitlements: {
      alternativeHousePlotAllotted: true,
      colonyName: 'Ajaigarh Model Tribal Settlement',
      plotNumber: 'T-18 (200 sq. mtrs)',
      subsistenceGrantAmount: 60000, // Tribal enhanced grant
      subsistenceGrantDisbursed: false,
      displacementAllowanceAmount: 75000,
      displacementAllowanceDisbursed: false,
      vocationalTrainingStatus: 'Enrolled',
      employmentAssistance: 'Pending'
    },
    grievanceStatus: 'None'
  },
  {
    id: 'RR-003',
    beneficiaryId: 'BEN-001',
    beneficiaryName: 'Bhikhabhai Dahyabhai Patel',
    village: 'Chokari (Vadodara)',
    projectCode: 'NHAI-DME-PKG4',
    isDisplacedFamily: false,
    entitlements: {
      alternativeHousePlotAllotted: false,
      subsistenceGrantAmount: 0,
      subsistenceGrantDisbursed: false,
      displacementAllowanceAmount: 25000, // Cattle shed / boundary wall
      displacementAllowanceDisbursed: true,
      vocationalTrainingStatus: 'Not Opted',
      employmentAssistance: 'Grant Disbursed'
    },
    grievanceStatus: 'Resolved'
  }
];

export const MOCK_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'DOC-GZ-3A-01',
    title: 'Gazette Notification 3(A) - NH-48 Corridor Expansion',
    docType: 'Gazette_3A',
    projectCode: 'NHAI-DME-PKG4',
    village: 'Chokari & Vangaon clusters',
    dateUploaded: '2024-03-12',
    fileSize: '4.8 MB',
    verifiedByDigiLocker: true,
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    uploadedBy: 'CALA Regional Office, Vadodara',
    verificationBadge: 'Verified'
  },
  {
    id: 'DOC-ROR-142',
    title: 'Record of Rights (7/12 e-Extract) - Survey 142/2A',
    docType: 'RoR_7_12',
    projectCode: 'NHAI-DME-PKG4',
    village: 'Chokari',
    surveyNumber: '142/2A',
    dateUploaded: '2024-05-18',
    fileSize: '1.2 MB',
    verifiedByDigiLocker: true,
    sha256Hash: 'a7c93e4a2981a8f9024f9234b92134ae11234901bc0932dae81249fae019234b',
    uploadedBy: 'AnyRoR Revenue Connector (Gujarat)',
    verificationBadge: 'Verified'
  },
  {
    id: 'DOC-VAL-89',
    title: 'Approved Joint Measurement & Tree Valuation Schedule - 89/1B',
    docType: 'Valuation_Report',
    projectCode: 'NHAI-DME-PKG4',
    village: 'Vangaon',
    surveyNumber: '89/1B',
    dateUploaded: '2024-06-20',
    fileSize: '8.4 MB',
    verifiedByDigiLocker: true,
    sha256Hash: 'bc83109a243fe8a101239aaeb1049281bc093821dfa0129384eb19230fae0912',
    uploadedBy: 'District Forest Officer & Horticulture Valuer, Palghar',
    verificationBadge: 'Verified'
  },
  {
    id: 'DOC-DRN-VAS',
    title: 'High-Resolution 5cm Drone Orthomosaic - Vasai Creek Mangrove Corridor',
    docType: 'Drone_Ortho_Map',
    projectCode: 'DFCCIL-WDFC-07',
    village: 'Sasunavghar',
    surveyNumber: '214/3',
    dateUploaded: '2024-07-02',
    fileSize: '242.0 MB',
    verifiedByDigiLocker: false,
    sha256Hash: 'f41298ab012389feac1029384bcdae0192834012bc09182390fade0192834012',
    uploadedBy: 'Survey of India Drone Unit #04',
    verificationBadge: 'Pending'
  },
  {
    id: 'DOC-AWD-01',
    title: 'CALA Statutory Final Award Copy - Order No. LA/2024/718',
    docType: 'CALA_Award_Copy',
    projectCode: 'NHAI-DME-PKG4',
    village: 'Chokari',
    surveyNumber: '142/2A',
    dateUploaded: '2024-07-29',
    fileSize: '3.1 MB',
    verifiedByDigiLocker: true,
    sha256Hash: '381920ae0192834bcdae0192834012bc09182390fade019283401298ab012389',
    uploadedBy: 'CALA Vadodara Magistracy',
    verificationBadge: 'Verified'
  }
];

export const MOCK_FIELD_SURVEYS: FieldSurveyRecord[] = [
  {
    id: 'SURV-2026-081',
    parcelId: 'PCL-GJ-VAD-01',
    surveyNumber: '142/2A',
    village: 'Chokari',
    surveyorName: 'K. Mohan Rao (Senior Surveyor #42)',
    surveyorId: 'SURV_ID_4291',
    timestamp: '2026-08-14 10:45 AM IST',
    latitude: 22.2155,
    longitude: 73.0865,
    gpsAccuracyMeters: 0.8,
    treesCount: 24, // 16 Mango, 8 Teak
    structuresIdentified: ['Tube well with 5HP pump', '120m RCC boundary wall', 'Pack-house shed'],
    standingCropsPresent: true,
    cropValuationRupees: 385000,
    structureValuationRupees: 640000,
    photoCount: 14,
    droneFlightId: 'DRN-FLT-GJ-991',
    status: 'Verified'
  },
  {
    id: 'SURV-2026-082',
    parcelId: 'PCL-MH-PLG-02',
    surveyNumber: '89/1B',
    village: 'Vangaon',
    surveyorName: 'Sachin Kamble (Field Inspector #19)',
    surveyorId: 'SURV_ID_1904',
    timestamp: '2026-08-20 02:15 PM IST',
    latitude: 19.8645,
    longitude: 72.7687,
    gpsAccuracyMeters: 1.2,
    treesCount: 48, // Chikoo orchards
    structuresIdentified: ['Residential farmhouse (ground + 1)', 'Water storage tank'],
    standingCropsPresent: false,
    cropValuationRupees: 0,
    structureValuationRupees: 1850000,
    photoCount: 22,
    droneFlightId: 'DRN-FLT-MH-338',
    status: 'Flagged Discrepancy',
    discrepancyNote: 'Khatedar claims 84 fruit-bearing Chikoo trees; physical geo-tag count validates only 48 trees. PWD structural rate disputed by owner.'
  },
  {
    id: 'SURV-2026-083',
    parcelId: 'PCL-MH-VAS-03',
    surveyNumber: '214/3',
    village: 'Sasunavghar',
    surveyorName: 'Devendra Patil (Circle Amin)',
    surveyorId: 'SURV_ID_8812',
    timestamp: '2026-07-28 11:30 AM IST',
    latitude: 19.3452,
    longitude: 72.9172,
    gpsAccuracyMeters: 2.1,
    treesCount: 0,
    structuresIdentified: ['Fishermen net drying platform', 'Temporary jetty'],
    standingCropsPresent: false,
    cropValuationRupees: 0,
    structureValuationRupees: 420000,
    photoCount: 18,
    droneFlightId: 'DRN-FLT-MH-401',
    status: 'Flagged Discrepancy',
    discrepancyNote: 'Survey line intersects coastal wetland CRZ-I boundary. High Court stay active for community fishing easement.'
  }
];

export const MOCK_ALERTS_DISPUTES: AlertDispute[] = [
  {
    id: 'DISP-HC-BOM-1028',
    projectCode: 'DFCCIL-WDFC-07',
    projectName: 'Western Dedicated Freight Corridor',
    type: 'High Court Stay',
    severity: 'Critical',
    surveyNumber: '214/3 & adjacent 12 parcels',
    village: 'Sasunavghar',
    state: 'Maharashtra',
    description: 'Bombay High Court interim stay order in WP No. 4419/2023 on mangrove cutting and land transfer pending environmental clearance review.',
    financialImplicationCr: 380,
    impactedAreaAcres: 42.4,
    hearingDate: '2026-09-24',
    courtName: 'High Court of Bombay (Division Bench)',
    daysPending: 184,
    status: 'Under Hearing'
  },
  {
    id: 'DISP-MH-2024-091',
    projectCode: 'NHAI-DME-PKG4',
    projectName: 'Delhi-Mumbai Expressway',
    type: 'Valuation Protest',
    severity: 'High',
    surveyNumber: '89/1B',
    village: 'Vangaon',
    state: 'Maharashtra',
    description: 'Khatedar application under Section 64 (Reference to Land Acquisition Authority) challenging tree valuation and multiplier factor (seeking 2.0 vs applied 1.5).',
    financialImplicationCr: 2.8,
    impactedAreaAcres: 1.8,
    hearingDate: '2026-09-15',
    courtName: 'Land Acquisition, Rehabilitation & Resettlement Authority (LARR Authority, Thane)',
    daysPending: 48,
    status: 'Open'
  },
  {
    id: 'DISP-MP-KBLP-401',
    projectCode: 'NWDA-KBLP-LINK1',
    projectName: 'Ken-Betwa River Interlinking National Project',
    type: 'Forest Right Act Delay',
    severity: 'Critical',
    surveyNumber: 'Panna Tiger Reserve Buffer parcels',
    village: 'Madla & Sukwaha',
    state: 'Madhya Pradesh',
    description: 'Gram Sabha non-consent resolution under Forest Rights Act 2006 for 120 hectares of community forest land.',
    financialImplicationCr: 650,
    impactedAreaAcres: 296.5,
    hearingDate: '2026-10-02',
    courtName: 'District Level Committee (DLC) under FRA, Panna',
    daysPending: 112,
    status: 'Negotiation in Progress'
  },
  {
    id: 'DISP-TN-BCE-012',
    projectCode: 'NHAI-BCE-NE7',
    projectName: 'Bengaluru-Chennai Expressway',
    type: 'Title Conflict',
    severity: 'Medium',
    surveyNumber: '77/4 Sub-block',
    village: 'Mambakkam',
    state: 'Tamil Nadu',
    description: 'Cross-suit between legal heirs regarding ancestral partition deed affecting compensation disbursement escrow.',
    financialImplicationCr: 4.2,
    impactedAreaAcres: 2.1,
    hearingDate: '2026-09-30',
    courtName: 'Principal Sub-Court, Kanchipuram',
    daysPending: 65,
    status: 'Under Hearing'
  }
];

export const MOCK_AI_RISKS: AiRiskInsight[] = [
  {
    id: 'AI-RSK-001',
    projectId: 'PRJ_WDFC_02',
    projectName: 'Western Dedicated Freight Corridor (Vasai-JNPT)',
    riskCategory: 'Litigation Cluster',
    riskScore: 88,
    trend: 'increasing',
    predictedDelayDays: 140,
    predictedEscalationCr: 215,
    keyDrivers: [
      'High Court stay on 42.4 Ha wetland section',
      'Local fishermen cooperative legal representation',
      'High valuation disparity with adjacent urban CIDCO land'
    ],
    recommendedAction: 'Engage Advocate General for urgent vacation motion; propose elevated viaduct section to eliminate mangrove cutting footprints.',
    confidenceScore: 92
  },
  {
    id: 'AI-RSK-002',
    projectId: 'PRJ_KBLP_04',
    projectName: 'Ken-Betwa River Interlinking National Project',
    riskCategory: 'Forest Clearance Bottleneck',
    riskScore: 82,
    trend: 'increasing',
    predictedDelayDays: 210,
    predictedEscalationCr: 490,
    keyDrivers: [
      'Stage-II Forest Clearance compensatory afforestation non-mutation',
      'Gram Sabha pending consensus in 3 tribal villages',
      'Monsoon seasonal survey interruptions'
    ],
    recommendedAction: 'Convene Joint Task Force with Ministry of Environment, Forest & Climate Change (MoEFCC); sanction enhanced special tribal development corpus.',
    confidenceScore: 89
  },
  {
    id: 'AI-RSK-003',
    projectId: 'PRJ_DME_01',
    projectName: 'Delhi-Mumbai Expressway (Vadodara-Mumbai)',
    riskCategory: 'Surveyor Discrepancy',
    riskScore: 34,
    trend: 'decreasing',
    predictedDelayDays: 25,
    predictedEscalationCr: 18,
    keyDrivers: [
      'Orchard tree valuation disputes in Palghar sector',
      'Minor boundary alignment shifts requested by local farmers'
    ],
    recommendedAction: 'Deploy drone LiDAR survey verification unit; conduct on-site Lok Adalat settlement with CALA team.',
    confidenceScore: 95
  }
];

export const MOCK_API_CONNECTORS: ApiConnectorStatus[] = [
  {
    id: 'API-GATISHAKTI',
    serviceName: 'PM GatiShakti National Master Plan (NMP) GIS Portal',
    agency: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
    endpoint: 'https://gatishakti.bisag-n.gov.in/api/v2/corridor-sync',
    protocol: 'REST / WMS / OGC GeoJSON',
    status: 'ONLINE',
    latencyMs: 124,
    successRate: 99.8,
    lastSyncTimestamp: '2026-09-08 05:45:00 UTC',
    recordsSynced24h: 18450
  },
  {
    id: 'API-PFMS',
    serviceName: 'Public Financial Management System (PFMS) DBT Gateway',
    agency: 'Ministry of Finance / Controller General of Accounts',
    endpoint: 'https://pfms.nic.in/secure/api/dbt/disbursement-v3',
    protocol: 'ISO 20022 / HTTPS Encrypted',
    status: 'ONLINE',
    latencyMs: 188,
    successRate: 99.2,
    lastSyncTimestamp: '2026-09-08 05:50:12 UTC',
    recordsSynced24h: 3120
  },
  {
    id: 'API-DIGILOCKER',
    serviceName: 'DigiLocker Digital Land Records Verification Service',
    agency: 'National Informatics Centre (NIC) / MeitY',
    endpoint: 'https://digilocker.gov.in/api/v1/landrecords/verify',
    protocol: 'OAuth2 / JSON Web Token',
    status: 'ONLINE',
    latencyMs: 95,
    successRate: 99.9,
    lastSyncTimestamp: '2026-09-08 05:52:45 UTC',
    recordsSynced24h: 8940
  },
  {
    id: 'API-BHULEKH',
    serviceName: 'Unified State Land Records (Bhoomi / AnyRoR / MahaBhumi)',
    agency: 'Department of Land Resources (DoLR) / NIC',
    endpoint: 'https://bhulekh.gov.in/federated/api/v4/ror-extract',
    protocol: 'SOAP / REST XML-JSON',
    status: 'ONLINE',
    latencyMs: 310,
    successRate: 97.4,
    lastSyncTimestamp: '2026-09-08 05:30:00 UTC',
    recordsSynced24h: 42100
  },
  {
    id: 'API-ECOURTS',
    serviceName: 'e-Courts Case Information System (CIS) Litigation Bridge',
    agency: 'e-Committee, Supreme Court of India',
    endpoint: 'https://services.ecourts.gov.in/api/v2/case-lookup',
    protocol: 'REST / JSON',
    status: 'DEGRADED',
    latencyMs: 820,
    successRate: 93.1,
    lastSyncTimestamp: '2026-09-08 04:15:22 UTC',
    recordsSynced24h: 1240
  },
  {
    id: 'API-SOI',
    serviceName: 'Survey of India (SoI) National Geo-spatial Data Infrastructure',
    agency: 'Survey of India, Department of Science & Technology',
    endpoint: 'https://soinakshe.gov.in/api/v1/orthomosaic-mesh',
    protocol: 'WMTS / Cloud Optimized GeoTIFF',
    status: 'ONLINE',
    latencyMs: 240,
    successRate: 98.9,
    lastSyncTimestamp: '2026-09-08 05:10:00 UTC',
    recordsSynced24h: 560
  }
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-88912',
    timestamp: '2026-09-08 05:42:19 IST',
    userName: 'Shri Vikram Desai (CALA Vadodara)',
    userRole: 'state_cala',
    action: 'Disbursed Compensation DBT Sanction',
    targetEntity: 'LandParcel / PFMS Order',
    targetId: 'GJ-VAD-PADRA-142/2A',
    ipAddress: '10.14.88.42 (NIC Gujarat WAN)',
    state: 'Gujarat',
    immutableHash: '0x9fa1bc8201de3984afbc99104812de4981a89201de48201fa91029384aebc812'
  },
  {
    id: 'AUD-88911',
    timestamp: '2026-09-08 04:18:02 IST',
    userName: 'K. Mohan Rao (Senior Surveyor)',
    userRole: 'field_surveyor',
    action: 'Uploaded Geo-Tagged Field Inspection & Tree Geo-stamps',
    targetEntity: 'FieldSurveyRecord',
    targetId: 'SURV-2026-081',
    ipAddress: '172.24.19.102 (Mobile Field Client)',
    state: 'Gujarat',
    immutableHash: '0x381920ae0192834bcdae0192834012bc09182390fade019283401298ab012389'
  },
  {
    id: 'AUD-88910',
    timestamp: '2026-09-08 02:30:44 IST',
    userName: 'Dr. Rajeshwar Sharma, IAS',
    userRole: 'national_admin',
    action: 'Triggered AI Risk Bottleneck Simulation & Corridor Forecast',
    targetEntity: 'AiRiskInsight / All Corridors',
    targetId: 'AI-SIM-2026-09-NATIONAL',
    ipAddress: '164.100.24.11 (Transport Bhawan, New Delhi)',
    state: 'All India',
    immutableHash: '0x41029384bcdae0192834012bc09182390fade019283401298ab012389f41298ab'
  },
  {
    id: 'AUD-88909',
    timestamp: '2026-09-07 18:22:15 IST',
    userName: 'Shri Anand Verma, IAS (Collector Palghar)',
    userRole: 'district_collector',
    action: 'Registered Section 64 Valuation Dispute & Forwarded to LARR Authority',
    targetEntity: 'AlertDispute',
    targetId: 'DISP-MH-2024-091',
    ipAddress: '10.28.14.8 (Palghar Collectorate)',
    state: 'Maharashtra',
    immutableHash: '0x1029384bcdae0192834012bc09182390fade019283401298ab012389bc83109a'
  },
  {
    id: 'AUD-88908',
    timestamp: '2026-09-07 14:05:30 IST',
    userName: 'PFMS Automated System',
    userRole: 'national_admin',
    action: 'Direct Benefit Transfer Bulk Credit Acknowledgment (₹27.94 Cr)',
    targetEntity: 'PFMS Webhook',
    targetId: 'PFMS202409028918231',
    ipAddress: '164.100.12.98 (PFMS Gateway NIC)',
    state: 'Gujarat',
    immutableHash: '0xbc83109a243fe8a101239aaeb1049281bc093821dfa0129384eb19230fae0912'
  }
];

export const mockUsers: User[] = [
  CURRENT_USER,
  {
    id: 'usr_002',
    name: 'Smt. Priya Nair',
    role: 'central_ministry',
    designation: 'Director (Infrastructure & Monitoring)',
    department: 'Ministry of Road Transport & Highways (MoRTH)',
    state: 'New Delhi',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_003',
    name: 'Shri Vikram Desai',
    role: 'state_cala',
    designation: 'Competent Authority Land Acquisition (CALA)',
    department: 'National Highways & Vadodara Revenue Division',
    state: 'Gujarat',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_004',
    name: 'Shri Anand Verma, IAS',
    role: 'district_collector',
    designation: 'District Magistrate & Collector',
    department: 'Revenue & Land Reforms Department',
    state: 'Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_005',
    name: 'K. Mohan Rao',
    role: 'field_surveyor',
    designation: 'Senior Revenue Inspector & Drone GIS Lead',
    department: 'Survey and Settlement Department',
    state: 'Gujarat',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_006',
    name: 'Shri Rameshwar Patil',
    role: 'public_beneficiary',
    designation: 'Khatedar / Landowner (Survey #142/2A)',
    department: 'Public Citizen Portal',
    state: 'Gujarat',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
];

export const mockProjects = MOCK_PROJECTS;
export const mockParcels = MOCK_PARCELS;
export const mockWorkflowStages = MOCK_WORKFLOW_STAGES;
export const mockBeneficiaries = MOCK_BENEFICIARIES;
export const mockRehabilitations = MOCK_REHABILITATIONS;
export const mockDocuments = MOCK_DOCUMENTS;
export const mockSurveys = MOCK_FIELD_SURVEYS;
export const mockAlerts = MOCK_ALERTS_DISPUTES;
export const mockAiRisks = MOCK_AI_RISKS;
export const mockConnectors = MOCK_API_CONNECTORS;
export const mockAuditLogs = MOCK_AUDIT_LOGS;

