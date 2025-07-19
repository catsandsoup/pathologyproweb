export interface ReferenceRange {
  min: number;
  max: number;
  unit: string;
  sex?: 'male' | 'female' | 'both'; // default 'both' for backward compatibility
  source?: string; // e.g., 'medscape', 'existing'
}

export interface Parameter {
  name: string;
  category: string;
  unit: string;
  referenceRange?: ReferenceRange; // Keep for backward compatibility
  referenceRanges?: ReferenceRange[]; // New array-based approach
  aliases?: string[]; // Alternative spellings
  description: string;
  isNew?: boolean; // Flag for newly added tests
  migrationStatus?: 'pending' | 'migrated' | 'verified'; // Track migration progress
}

export const PARAMETER_CATEGORIES = {
  HAEMATOLOGY: 'Complete Blood Count',
  BIOCHEMISTRY: 'Biochemistry',
  LIPIDS: 'Lipid Profile',
  INFLAMMATION: 'Inflammation Markers',
  IRON_STUDIES: 'Iron Studies',
  HORMONES: 'Hormone Tests',
  VITAMINS: 'Vitamins and Minerals',
  SPECIALIZED: 'Specialized Tests',
  CARDIAC: 'Cardiac Enzymes',
  COAGULATION: 'Coagulation Studies',
  TUMOR_MARKERS: 'Tumor Markers',
  OTHER: 'Other'
} as const;

// Parameter alias mapping for common spelling variations and abbreviations
export const PARAMETER_ALIASES: Record<string, string> = {
  // Haemoglobin variations
  'Hemoglobin': 'Haemoglobin',
  'Hgb': 'Haemoglobin',
  'Hb': 'Haemoglobin',
  'HGB': 'Haemoglobin',
  'HB': 'Haemoglobin',
  
  // Haematocrit variations
  'Hematocrit': 'Haematocrit',
  'Hct': 'Haematocrit',
  'HCT': 'Haematocrit',
  'PCV': 'Haematocrit',
  'Packed Cell Volume': 'Haematocrit',
  
  // White Cell Count variations
  'WBC': 'WCC',
  'White Blood Cell Count': 'WCC',
  'White Cell Count': 'WCC',
  'Leukocytes': 'WCC',
  'LEUK': 'WCC',
  
  // Red Blood Cell variations
  'Red Blood Cell Count': 'RBC',
  'Red Cell Count': 'RBC',
  'RCC': 'RBC',
  'Erythrocytes': 'RBC',
  'ERYTH': 'RBC',
  
  // Platelet variations
  'Platelet Count': 'Platelets',
  'PLT': 'Platelets',
  'PLAT': 'Platelets',
  'Thrombocytes': 'Platelets',
  
  // Cholesterol variations
  'Cholesterol': 'Total Cholesterol',
  'CHOL': 'Total Cholesterol',
  'Total Chol': 'Total Cholesterol',
  'T-CHOL': 'Total Cholesterol',
  
  // HDL variations
  'HDL Cholesterol': 'HDL',
  'HDL-C': 'HDL',
  'High Density Lipoprotein': 'HDL',
  'Good Cholesterol': 'HDL',
  
  // LDL variations
  'LDL Cholesterol': 'LDL',
  'LDL-C': 'LDL',
  'Low Density Lipoprotein': 'LDL',
  'Bad Cholesterol': 'LDL',
  
  // Triglyceride variations
  'Triglyceride': 'Triglycerides',
  'TRIG': 'Triglycerides',
  'TG': 'Triglycerides',
  
  // Glucose variations
  'Glucose': 'F Glucose Plasma',
  'Blood Sugar': 'F Glucose Plasma',
  'Fasting Glucose': 'F Glucose Plasma',
  'FPG': 'F Glucose Plasma',
  'Random Glucose': 'R Glucose Serum',
  'RBS': 'R Glucose Serum',
  
  // Liver enzyme variations
  'SGPT': 'ALT',
  'Alanine Aminotransferase': 'ALT',
  'SGOT': 'AST',
  'Aspartate Aminotransferase': 'AST',
  'Alkaline Phosphatase': 'ALP',
  'ALKP': 'ALP',
  'Gamma GT': 'GGT',
  'Gamma-Glutamyl Transferase': 'GGT',
  'γ-GT': 'GGT',
  
  // Kidney function variations
  'Blood Urea Nitrogen': 'Urea',
  'BUN': 'Urea',
  'Creat': 'Creatinine',
  'CREA': 'Creatinine',
  'eGFR CKD-EPI': 'eGFR',
  'Estimated GFR': 'eGFR',
  
  // Electrolyte variations
  'Na': 'Sodium',
  'Na+': 'Sodium',
  'K': 'Potassium',
  'K+': 'Potassium',
  'Cl': 'Chloride',
  'Cl-': 'Chloride',
  'HCO3': 'Bicarbonate',
  'CO2': 'Bicarbonate',
  
  // Protein variations
  'Total Prot': 'Total Protein',
  'TP': 'Total Protein',
  'Alb': 'Albumin',
  'ALB': 'Albumin',
  'Glob': 'Globulin',
  'GLOB': 'Globulin',
  
  // Bilirubin variations
  'Total Bilirubin': 'Bilirubin Total',
  'T.Bil': 'Bilirubin Total',
  'TBIL': 'Bilirubin Total',
  'Bili Total': 'Bilirubin Total',
  
  // Iron studies variations
  'Serum Iron': 'Iron',
  'Fe': 'Iron',
  'TIBC': 'TIBC',
  'Total Iron Binding Capacity': 'TIBC',
  'Iron Sat': 'Iron Saturation',
  'Transferrin Saturation': 'Iron Saturation',
  'Ferr': 'Ferritin',
  'FERR': 'Ferritin',
  
  // Thyroid variations
  'Thyroid Stimulating Hormone': 'TSH',
  'Thyrotropin': 'TSH',
  'Free Thyroxine': 'Free T4',
  'FT4': 'Free T4',
  'Free Triiodothyronine': 'Free T3',
  'FT3': 'Free T3',
  
  // Inflammation markers
  'C-Reactive Protein': 'CRP',
  'C Reactive Protein': 'CRP',
  'Erythrocyte Sedimentation Rate': 'ESR',
  'Sed Rate': 'ESR',
  
  // Vitamin variations
  'Vitamin D': '25-OH Vitamin D',
  'Vit D': '25-OH Vitamin D',
  '25(OH)D': '25-OH Vitamin D',
  'Calcidiol': '25-OH Vitamin D',
  
  // Hormone variations
  'Testosterone Total': 'Testosterone',
  'Total Testosterone': 'Testosterone',
  'Test': 'Testosterone',
  'Estradiol': 'Oestradiol',
  'E2': 'Oestradiol',
  'Luteinizing Hormone': 'LH',
  'Follicle Stimulating Hormone': 'FSH',
  'Dehydroepiandrosterone Sulfate': 'DHEA-S',
  'DHEAS': 'DHEA-S',
  
  // Cardiac markers
  'Lactate Dehydrogenase': 'LDH',
  'LD': 'LDH',
  'LDH': 'LDH',
  
  // Mineral variations
  'Ca': 'Calcium',
  'Ca++': 'Calcium',
  'Mg': 'Magnesium',
  'Mg++': 'Magnesium',
  'PO4': 'Phosphate',
  'Phosphorus': 'Phosphate',
  'Uric Acid': 'Urate',
  'UA': 'Urate'
};

export const PARAMETERS: Parameter[] = [
  // Haematology Parameters
  {
    name: 'RBC',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'x10^12/L',
    referenceRange: { min: 4.5, max: 6.5, unit: 'x10^12/L' }, // Fallback broad range
    referenceRanges: [
      { min: 4.7, max: 6.1, unit: 'x10^12/L', sex: 'male', source: 'medscape' },
      { min: 4.2, max: 5.4, unit: 'x10^12/L', sex: 'female', source: 'medscape' },
      { min: 4.5, max: 6.5, unit: 'x10^12/L', sex: 'both', source: 'existing' }
    ],
    aliases: ['Red Blood Cell Count', 'Red Cell Count', 'RCC', 'Erythrocytes'],
    description: 'Red Blood Cell Count - measures the number of red blood cells',
    migrationStatus: 'migrated'
  },
  {
    name: 'Haemoglobin',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'g/L',
    referenceRange: { min: 130, max: 170, unit: 'g/L' }, // Fallback broad range
    referenceRanges: [
      { min: 140, max: 180, unit: 'g/L', sex: 'male', source: 'medscape' },
      { min: 120, max: 160, unit: 'g/L', sex: 'female', source: 'medscape' },
      { min: 130, max: 170, unit: 'g/L', sex: 'both', source: 'existing' }
    ],
    aliases: ['Hemoglobin', 'Hgb', 'Hb'],
    description: 'Protein in red blood cells that carries oxygen throughout the body',
    migrationStatus: 'migrated'
  },
  {
    name: 'Haematocrit',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'L/L',
    referenceRange: { min: 0.4, max: 0.54, unit: 'L/L' }, // Fallback broad range
    referenceRanges: [
      { min: 0.42, max: 0.50, unit: 'L/L', sex: 'male', source: 'medscape' },
      { min: 0.37, max: 0.47, unit: 'L/L', sex: 'female', source: 'medscape' },
      { min: 0.4, max: 0.54, unit: 'L/L', sex: 'both', source: 'existing' }
    ],
    aliases: ['Hematocrit', 'Hct', 'PCV'],
    description: 'Percentage of blood volume that is red blood cells',
    migrationStatus: 'migrated'
  },
  {
    name: 'MCV',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'fL',
    referenceRange: { min: 80, max: 100, unit: 'fL' },
    aliases: ['Mean Corpuscular Volume', 'Mean Cell Volume'],
    description: 'Mean Corpuscular Volume - average size of red blood cells'
  },
  {
    name: 'MCH',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'pg',
    referenceRange: { min: 27, max: 32, unit: 'pg' },
    description: 'Mean Corpuscular Hemoglobin - average amount of hemoglobin per red blood cell'
  },
  {
    name: 'MCHC',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'g/L',
    referenceRange: { min: 320, max: 360, unit: 'g/L' },
    description: 'Mean Corpuscular Hemoglobin Concentration - concentration of hemoglobin in red blood cells'
  },
  {
    name: 'RDW',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: '%',
    referenceRange: { min: 11.5, max: 14.5, unit: '%' },
    description: 'Red Cell Distribution Width - variation in red blood cell size'
  },
  {
    name: 'WCC',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'x10^9/L',
    referenceRange: { min: 4.0, max: 11.0, unit: 'x10^9/L' }, // Fallback broad range
    referenceRanges: [
      { min: 4.5, max: 11.0, unit: 'x10^9/L', sex: 'male', source: 'medscape' },
      { min: 4.0, max: 10.0, unit: 'x10^9/L', sex: 'female', source: 'medscape' },
      { min: 4.0, max: 11.0, unit: 'x10^9/L', sex: 'both', source: 'existing' }
    ],
    aliases: ['WBC', 'White Blood Cell Count', 'White Cell Count', 'Leukocytes'],
    description: 'White Cell Count (Leukocytes) - measures infection-fighting white blood cells',
    migrationStatus: 'migrated'
  },
  {
    name: 'Neutrophils',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'x10^9/L',
    referenceRange: { min: 2.0, max: 7.5, unit: 'x10^9/L' },
    description: 'Type of white blood cell that fights bacterial infections'
  },
  {
    name: 'Lymphocytes',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'x10^9/L',
    referenceRange: { min: 1.0, max: 4.0, unit: 'x10^9/L' },
    description: 'Type of white blood cell that fights viral infections'
  },
  {
    name: 'Monocytes',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'x10^9/L',
    referenceRange: { min: 0.2, max: 1.0, unit: 'x10^9/L' },
    description: 'Type of white blood cell that fights infection and helps other white blood cells'
  },
  {
    name: 'Eosinophils',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'x10^9/L',
    referenceRange: { min: 0.0, max: 0.5, unit: 'x10^9/L' },
    description: 'Type of white blood cell that fights parasites and is involved in allergic responses'
  },
  {
    name: 'Basophils',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'x10^9/L',
    referenceRange: { min: 0.0, max: 0.1, unit: 'x10^9/L' },
    description: 'Type of white blood cell involved in inflammatory reactions'
  },
  {
    name: 'Platelets',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'x10^9/L',
    referenceRange: { min: 150, max: 400, unit: 'x10^9/L' }, // Fallback broad range
    referenceRanges: [
      { min: 150, max: 450, unit: 'x10^9/L', sex: 'male', source: 'medscape' },
      { min: 150, max: 400, unit: 'x10^9/L', sex: 'female', source: 'medscape' },
      { min: 150, max: 400, unit: 'x10^9/L', sex: 'both', source: 'existing' }
    ],
    aliases: ['Platelet Count', 'PLT', 'Thrombocytes'],
    description: 'Blood cells that help with clotting',
    migrationStatus: 'migrated'
  },
  {
    name: 'MPV',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'fL',
    referenceRange: { min: 7.5, max: 11.5, unit: 'fL' },
    description: 'Mean Platelet Volume - average size of platelets'
  },
  // Biochemistry Parameters
  {
    name: 'Urea',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'mmol/L',
    referenceRange: { min: 2.5, max: 7.8, unit: 'mmol/L' },
    description: 'Blood Urea Nitrogen (BUN) - waste product from protein breakdown'
  },
  {
    name: 'Creatinine',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'μmol/L',
    referenceRange: { min: 60, max: 110, unit: 'μmol/L' }, // Fallback broad range
    referenceRanges: [
      { min: 62, max: 106, unit: 'μmol/L', sex: 'male', source: 'medscape' },
      { min: 44, max: 80, unit: 'μmol/L', sex: 'female', source: 'medscape' },
      { min: 60, max: 110, unit: 'μmol/L', sex: 'both', source: 'existing' }
    ],
    aliases: ['Creat', 'CREA', 'Serum Creatinine'],
    description: 'Waste product filtered by kidneys',
    migrationStatus: 'migrated'
  },
  {
    name: 'ALT',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'U/L',
    referenceRange: { min: 0, max: 41, unit: 'U/L' },
    description: 'Liver enzyme that indicates liver health'
  },
  {
    name: 'AST',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'U/L',
    referenceRange: { min: 0, max: 40, unit: 'U/L' },
    description: 'Liver enzyme that can indicate liver damage'
  },
  {
    name: 'ALP',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'U/L',
    referenceRange: { min: 30, max: 120, unit: 'U/L' },
    description: 'Enzyme found in liver and bones'
  },
  {
    name: 'Sodium',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'mmol/L',
    referenceRange: { min: 135, max: 145, unit: 'mmol/L' },
    description: 'Essential electrolyte for nerve and muscle function'
  },
  {
    name: 'Potassium',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'mmol/L',
    referenceRange: { min: 3.5, max: 5.0, unit: 'mmol/L' },
    description: 'Essential electrolyte for heart function'
  },
  // Lipids Parameters
  {
    name: 'Total Cholesterol',
    category: PARAMETER_CATEGORIES.LIPIDS,
    unit: 'mmol/L',
    referenceRange: { min: 0, max: 5.2, unit: 'mmol/L' },
    description: 'Total blood cholesterol level'
  },
  {
    name: 'HDL',
    category: PARAMETER_CATEGORIES.LIPIDS,
    unit: 'mmol/L',
    referenceRange: { min: 1.0, max: 2.0, unit: 'mmol/L' }, // Fallback broad range
    referenceRanges: [
      { min: 1.0, max: 1.6, unit: 'mmol/L', sex: 'male', source: 'medscape' },
      { min: 1.2, max: 2.0, unit: 'mmol/L', sex: 'female', source: 'medscape' },
      { min: 1.0, max: 2.0, unit: 'mmol/L', sex: 'both', source: 'existing' }
    ],
    aliases: ['HDL Cholesterol', 'HDL-C', 'High Density Lipoprotein', 'Good Cholesterol'],
    description: 'High-Density Lipoprotein - "good" cholesterol',
    migrationStatus: 'migrated'
  },
  {
    name: 'LDL',
    category: PARAMETER_CATEGORIES.LIPIDS,
    unit: 'mmol/L',
    referenceRange: { min: 0, max: 3.4, unit: 'mmol/L' },
    description: 'Low-Density Lipoprotein - "bad" cholesterol'
  },
  // Inflammation Markers
  {
    name: 'CRP',
    category: PARAMETER_CATEGORIES.INFLAMMATION,
    unit: 'mg/L',
    referenceRange: { min: 0, max: 5, unit: 'mg/L' },
    description: 'C-Reactive Protein - indicates inflammation'
  },
  {
    name: 'ESR',
    category: PARAMETER_CATEGORIES.INFLAMMATION,
    unit: 'mm/h',
    referenceRange: { min: 0, max: 20, unit: 'mm/h' },
    description: 'Erythrocyte Sedimentation Rate - indicates inflammation'
  },
  // Iron Studies
  {
    name: 'Ferritin',
    category: PARAMETER_CATEGORIES.IRON_STUDIES,
    unit: 'μg/L',
    referenceRange: { min: 30, max: 300, unit: 'μg/L' }, // Fallback broad range
    referenceRanges: [
      { min: 12, max: 300, unit: 'μg/L', sex: 'male', source: 'medscape' },
      { min: 10, max: 150, unit: 'μg/L', sex: 'female', source: 'medscape' },
      { min: 30, max: 300, unit: 'μg/L', sex: 'both', source: 'existing' }
    ],
    aliases: ['Ferr', 'FERR', 'Serum Ferritin'],
    description: 'Protein that stores iron',
    migrationStatus: 'migrated'
  },
  {
    name: 'Iron',
    category: PARAMETER_CATEGORIES.IRON_STUDIES,
    unit: 'μmol/L',
    referenceRange: { min: 10, max: 30, unit: 'μmol/L' },
    description: 'Serum iron level'
  },
  // Additional Haematology Parameters from your data
  {
    name: 'RCC',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'x10^12/L',
    referenceRange: { min: 4.5, max: 6.5, unit: 'x10^12/L' },
    description: 'Red Cell Count - measures the number of red blood cells'
  },
  // Cardiac Enzymes
  {
    name: 'CK',
    category: PARAMETER_CATEGORIES.CARDIAC,
    unit: 'U/L',
    referenceRange: { min: 20, max: 200, unit: 'U/L' }, // Fallback broad range
    referenceRanges: [
      { min: 30, max: 200, unit: 'U/L', sex: 'male', source: 'medscape' },
      { min: 20, max: 180, unit: 'U/L', sex: 'female', source: 'medscape' },
      { min: 20, max: 200, unit: 'U/L', sex: 'both', source: 'existing' }
    ],
    aliases: ['Creatine Kinase', 'CPK', 'Creatine Phosphokinase'],
    description: 'Creatine kinase - enzyme released when heart or skeletal muscle is damaged',
    isNew: true,
    migrationStatus: 'migrated'
  },
  {
    name: 'CK-MB',
    category: PARAMETER_CATEGORIES.CARDIAC,
    unit: '% of total CK',
    referenceRange: { min: 0, max: 5, unit: '% of total CK' },
    aliases: ['CKMB', 'CK MB', 'Creatine Kinase MB'],
    description: 'Creatine kinase MB - heart-specific enzyme, should be <5% of total CK',
    isNew: true
  },
  {
    name: 'Troponin T',
    category: PARAMETER_CATEGORIES.CARDIAC,
    unit: 'ng/mL',
    referenceRange: { min: 0, max: 0.01, unit: 'ng/mL' },
    aliases: ['cTnT', 'Cardiac Troponin T', 'TnT'],
    description: 'Cardiac Troponin T - highly specific marker for heart muscle damage',
    isNew: true
  },
  {
    name: 'Troponin I',
    category: PARAMETER_CATEGORIES.CARDIAC,
    unit: 'ng/mL',
    referenceRange: { min: 0, max: 0.04, unit: 'ng/mL' },
    aliases: ['cTnI', 'Cardiac Troponin I', 'TnI'],
    description: 'Cardiac Troponin I - highly specific marker for heart muscle damage',
    isNew: true
  },
  {
    name: 'hs-Troponin T',
    category: PARAMETER_CATEGORIES.CARDIAC,
    unit: 'ng/L',
    referenceRange: { min: 0, max: 14, unit: 'ng/L' }, // Fallback broad range
    referenceRanges: [
      { min: 0, max: 15, unit: 'ng/L', sex: 'male', source: 'medscape' },
      { min: 0, max: 10, unit: 'ng/L', sex: 'female', source: 'medscape' },
      { min: 0, max: 14, unit: 'ng/L', sex: 'both', source: 'existing' }
    ],
    aliases: ['High-sensitivity Troponin T', 'hsTnT', 'Ultra-sensitive Troponin T'],
    description: 'High-sensitivity Troponin T - ultra-sensitive test for heart muscle damage',
    isNew: true,
    migrationStatus: 'migrated'
  },

  // Coagulation Studies
  {
    name: 'PT',
    category: PARAMETER_CATEGORIES.COAGULATION,
    unit: 's',
    referenceRange: { min: 11, max: 12.5, unit: 's' },
    aliases: ['Prothrombin Time', 'Pro Time', 'PT/INR'],
    description: 'Prothrombin Time - measures how long it takes blood to clot',
    isNew: true
  },
  {
    name: 'INR',
    category: PARAMETER_CATEGORIES.COAGULATION,
    unit: 'ratio',
    referenceRange: { min: 0.8, max: 1.1, unit: 'ratio' },
    aliases: ['International Normalized Ratio', 'PT INR'],
    description: 'International Normalized Ratio - standardized measure of clotting time',
    isNew: true
  },
  {
    name: 'aPTT',
    category: PARAMETER_CATEGORIES.COAGULATION,
    unit: 's',
    referenceRange: { min: 30, max: 40, unit: 's' },
    aliases: ['APTT', 'Activated Partial Thromboplastin Time', 'PTT'],
    description: 'Activated Partial Thromboplastin Time - measures intrinsic clotting pathway',
    isNew: true
  },
  {
    name: 'Fibrinogen',
    category: PARAMETER_CATEGORIES.COAGULATION,
    unit: 'g/L',
    referenceRange: { min: 2.0, max: 4.0, unit: 'g/L' }, // Converted from mg/dL to g/L
    aliases: ['Factor I', 'Fibrinogen Level'],
    description: 'Fibrinogen - protein essential for blood clotting',
    isNew: true
  },
  {
    name: 'D-dimer',
    category: PARAMETER_CATEGORIES.COAGULATION,
    unit: 'μg/L',
    referenceRange: { min: 0, max: 500, unit: 'μg/L' },
    aliases: ['D-Dimer', 'DD', 'Fibrin Degradation Product'],
    description: 'D-dimer - indicates recent blood clot formation and breakdown',
    isNew: true
  },

  // Tumor Markers
  {
    name: 'AFP',
    category: PARAMETER_CATEGORIES.TUMOR_MARKERS,
    unit: 'ng/mL',
    referenceRange: { min: 0, max: 40, unit: 'ng/mL' },
    aliases: ['Alpha Fetoprotein', 'α-Fetoprotein', 'Alpha-FP'],
    description: 'Alpha fetoprotein - tumor marker for liver and testicular cancers',
    isNew: true
  },
  {
    name: 'β-hCG',
    category: PARAMETER_CATEGORIES.TUMOR_MARKERS,
    unit: 'mIU/mL',
    referenceRange: { min: 0, max: 5, unit: 'mIU/mL' }, // Fallback broad range
    referenceRanges: [
      { min: 0, max: 2, unit: 'mIU/mL', sex: 'male', source: 'medscape' },
      { min: 0, max: 5, unit: 'mIU/mL', sex: 'female', source: 'medscape' }, // Non-pregnant
      { min: 0, max: 5, unit: 'mIU/mL', sex: 'both', source: 'existing' }
    ],
    aliases: ['Beta hCG', 'Human Chorionic Gonadotropin', 'hCG', 'β-Human Chorionic Gonadotropin'],
    description: 'Beta human chorionic gonadotropin - pregnancy hormone and tumor marker',
    isNew: true,
    migrationStatus: 'migrated'
  },
  {
    name: 'CA19-9',
    category: PARAMETER_CATEGORIES.TUMOR_MARKERS,
    unit: 'U/mL',
    referenceRange: { min: 0, max: 37, unit: 'U/mL' },
    aliases: ['CA 19-9', 'Carbohydrate Antigen 19-9', 'Cancer Antigen 19-9'],
    description: 'CA19-9 - tumor marker primarily for pancreatic cancer',
    isNew: true
  },
  {
    name: 'CEA',
    category: PARAMETER_CATEGORIES.TUMOR_MARKERS,
    unit: 'ng/mL',
    referenceRange: { min: 0, max: 2.5, unit: 'ng/mL' },
    aliases: ['Carcinoembryonic Antigen', 'CEA Level'],
    description: 'Carcinoembryonic antigen - tumor marker for colorectal and other cancers',
    isNew: true
  },
  {
    name: 'PSA',
    category: PARAMETER_CATEGORIES.TUMOR_MARKERS,
    unit: 'ng/mL',
    referenceRange: { min: 0, max: 2.5, unit: 'ng/mL' }, // Male-specific only
    referenceRanges: [
      { min: 0, max: 2.5, unit: 'ng/mL', sex: 'male', source: 'medscape' },
      { min: 0, max: 2.5, unit: 'ng/mL', sex: 'both', source: 'existing' }
    ],
    aliases: ['Prostate Specific Antigen', 'Prostate-Specific Antigen', 'PSA Total'],
    description: 'Prostate-specific antigen - male-specific tumor marker for prostate cancer screening',
    isNew: true,
    migrationStatus: 'migrated'
  },

  // Additional Biochemistry Parameters
  {
    name: 'GGT',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'U/L',
    referenceRange: { min: 0, max: 60, unit: 'U/L' },
    description: 'Gamma-glutamyl transferase - liver enzyme'
  },
  {
    name: 'Bilirubin Total',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'μmol/L',
    referenceRange: { min: 0, max: 20, unit: 'μmol/L' },
    description: 'Total bilirubin - waste product from red blood cell breakdown'
  },
  {
    name: 'Bili.Total',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'μmol/L',
    referenceRange: { min: 0, max: 20, unit: 'μmol/L' },
    description: 'Total bilirubin - waste product from red blood cell breakdown'
  },
  {
    name: 'Bicarbonate',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'mmol/L',
    referenceRange: { min: 22, max: 28, unit: 'mmol/L' },
    description: 'Bicarbonate - helps maintain acid-base balance'
  },
  {
    name: 'Globulin',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'g/L',
    referenceRange: { min: 20, max: 35, unit: 'g/L' },
    description: 'Globulin proteins in blood'
  },
  {
    name: 'Albumin',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'g/L',
    referenceRange: { min: 35, max: 50, unit: 'g/L' },
    description: 'Main protein in blood plasma'
  },
  {
    name: 'Total Protein',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'g/L',
    referenceRange: { min: 60, max: 80, unit: 'g/L' },
    description: 'Total protein in blood'
  },
  {
    name: 'Chloride',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'mmol/L',
    referenceRange: { min: 98, max: 107, unit: 'mmol/L' },
    description: 'Chloride electrolyte'
  },
  {
    name: 'eGFR',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'mL/min/1.73m²',
    referenceRange: { min: 90, max: 120, unit: 'mL/min/1.73m²' },
    description: 'Estimated glomerular filtration rate - kidney function'
  },
  {
    name: 'LDH',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'U/L',
    referenceRange: { min: 140, max: 280, unit: 'U/L' },
    description: 'Lactate dehydrogenase - enzyme found in many tissues'
  },
  {
    name: 'LD',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'U/L',
    referenceRange: { min: 140, max: 280, unit: 'U/L' },
    description: 'Lactate dehydrogenase - enzyme found in many tissues'
  },
  // Additional Lipid Parameters
  {
    name: 'Cholesterol',
    category: PARAMETER_CATEGORIES.LIPIDS,
    unit: 'mmol/L',
    referenceRange: { min: 0, max: 5.2, unit: 'mmol/L' },
    description: 'Total blood cholesterol level'
  },
  {
    name: 'Triglycerides',
    category: PARAMETER_CATEGORIES.LIPIDS,
    unit: 'mmol/L',
    referenceRange: { min: 0, max: 1.7, unit: 'mmol/L' },
    description: 'Blood triglyceride level'
  },
  {
    name: 'Non-HDL Cholesterol',
    category: PARAMETER_CATEGORIES.LIPIDS,
    unit: 'mmol/L',
    referenceRange: { min: 0, max: 3.4, unit: 'mmol/L' },
    description: 'Non-HDL cholesterol calculation'
  },
  // Additional Biochemistry Parameters
  {
    name: 'Calcium',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'mmol/L',
    referenceRange: { min: 2.15, max: 2.55, unit: 'mmol/L' },
    description: 'Essential mineral for bones and muscle function'
  },
  {
    name: 'Magnesium',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'mmol/L',
    referenceRange: { min: 0.7, max: 1.0, unit: 'mmol/L' },
    description: 'Essential mineral for enzyme function'
  },
  {
    name: 'Phosphate',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'mmol/L',
    referenceRange: { min: 0.8, max: 1.5, unit: 'mmol/L' },
    description: 'Essential mineral for bones and energy metabolism'
  },
  {
    name: 'Urate',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'mmol/L',
    referenceRange: { min: 0.15, max: 0.45, unit: 'mmol/L' }, // Fallback broad range
    referenceRanges: [
      { min: 0.24, max: 0.51, unit: 'mmol/L', sex: 'male', source: 'medscape' },
      { min: 0.16, max: 0.43, unit: 'mmol/L', sex: 'female', source: 'medscape' },
      { min: 0.15, max: 0.45, unit: 'mmol/L', sex: 'both', source: 'existing' }
    ],
    aliases: ['Uric Acid', 'UA', 'Serum Urate'],
    description: 'Uric acid - waste product that can cause gout if elevated',
    migrationStatus: 'migrated'
  },
  {
    name: 'F Glucose Plasma',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'mmol/L',
    referenceRange: { min: 3.0, max: 6.0, unit: 'mmol/L' },
    description: 'Fasting blood glucose level'
  },
  {
    name: 'R Glucose Serum',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'mmol/L',
    referenceRange: { min: 3.0, max: 7.8, unit: 'mmol/L' },
    description: 'Random blood glucose level'
  },
  // Additional Iron Studies
  {
    name: 'Iron Saturation',
    category: PARAMETER_CATEGORIES.IRON_STUDIES,
    unit: '%',
    referenceRange: { min: 20, max: 50, unit: '%' }, // Fallback broad range
    referenceRanges: [
      { min: 20, max: 50, unit: '%', sex: 'male', source: 'medscape' },
      { min: 15, max: 45, unit: '%', sex: 'female', source: 'medscape' },
      { min: 20, max: 50, unit: '%', sex: 'both', source: 'existing' }
    ],
    aliases: ['Iron Sat', 'Transferrin Saturation', 'TSAT'],
    description: 'Percentage of transferrin saturated with iron',
    migrationStatus: 'migrated'
  },
  {
    name: 'TIBC',
    category: PARAMETER_CATEGORIES.IRON_STUDIES,
    unit: 'μmol/L',
    referenceRange: { min: 45, max: 70, unit: 'μmol/L' },
    description: 'Total Iron Binding Capacity - measures transferrin capacity'
  },
  {
    name: 'Transferrin',
    category: PARAMETER_CATEGORIES.IRON_STUDIES,
    unit: 'g/L',
    referenceRange: { min: 2.0, max: 3.6, unit: 'g/L' },
    description: 'Protein that transports iron in blood'
  },
  // Hormone Tests
  {
    name: 'TSH',
    category: PARAMETER_CATEGORIES.HORMONES,
    unit: 'mU/L',
    referenceRange: { min: 0.27, max: 4.2, unit: 'mU/L' },
    description: 'Thyroid Stimulating Hormone - controls thyroid function'
  },
  {
    name: 'Free T4',
    category: PARAMETER_CATEGORIES.HORMONES,
    unit: 'pmol/L',
    referenceRange: { min: 12, max: 22, unit: 'pmol/L' },
    description: 'Free Thyroxine - main thyroid hormone'
  },
  {
    name: 'Free T3',
    category: PARAMETER_CATEGORIES.HORMONES,
    unit: 'pmol/L',
    referenceRange: { min: 3.1, max: 6.8, unit: 'pmol/L' },
    description: 'Free Triiodothyronine - active thyroid hormone'
  },
  {
    name: 'Testosterone',
    category: PARAMETER_CATEGORIES.HORMONES,
    unit: 'nmol/L',
    referenceRange: { min: 8.6, max: 29, unit: 'nmol/L' },
    description: 'Male hormone - important for muscle mass and energy (male range)'
  },
  {
    name: 'Testosterone (Female)',
    category: PARAMETER_CATEGORIES.HORMONES,
    unit: 'nmol/L',
    referenceRange: { min: 0.3, max: 2.4, unit: 'nmol/L' },
    description: 'Testosterone level in females - important for energy and wellbeing'
  },
  {
    name: 'Oestradiol',
    category: PARAMETER_CATEGORIES.HORMONES,
    unit: 'pmol/L',
    referenceRange: { min: 46, max: 607, unit: 'pmol/L' },
    description: 'Main female hormone - varies with menstrual cycle'
  },
  {
    name: 'Progesterone',
    category: PARAMETER_CATEGORIES.HORMONES,
    unit: 'nmol/L',
    referenceRange: { min: 16, max: 85, unit: 'nmol/L' },
    description: 'Female hormone - important for menstrual cycle and pregnancy'
  },
  {
    name: 'LH',
    category: PARAMETER_CATEGORIES.HORMONES,
    unit: 'IU/L',
    referenceRange: { min: 2.4, max: 12.6, unit: 'IU/L' },
    description: 'Luteinizing Hormone - regulates reproductive function'
  },
  {
    name: 'FSH',
    category: PARAMETER_CATEGORIES.HORMONES,
    unit: 'IU/L',
    referenceRange: { min: 3.5, max: 12.5, unit: 'IU/L' },
    description: 'Follicle Stimulating Hormone - regulates reproductive function'
  },
  {
    name: 'Prolactin',
    category: PARAMETER_CATEGORIES.HORMONES,
    unit: 'mIU/L',
    referenceRange: { min: 102, max: 496, unit: 'mIU/L' },
    description: 'Hormone that stimulates milk production'
  },
  {
    name: 'Cortisol',
    category: PARAMETER_CATEGORIES.HORMONES,
    unit: 'nmol/L',
    referenceRange: { min: 166, max: 507, unit: 'nmol/L' },
    description: 'Stress hormone - important for metabolism and immune function'
  },
  {
    name: 'DHEA-S',
    category: PARAMETER_CATEGORIES.HORMONES,
    unit: 'μmol/L',
    referenceRange: { min: 2.2, max: 11.2, unit: 'μmol/L' },
    description: 'Dehydroepiandrosterone sulfate - adrenal hormone'
  },
  // Vitamins and Minerals
  {
    name: '25-OH Vitamin D',
    category: PARAMETER_CATEGORIES.VITAMINS,
    unit: 'nmol/L',
    referenceRange: { min: 50, max: 125, unit: 'nmol/L' },
    description: 'Vitamin D level - important for bone health and immunity'
  },
  // Specialized Tests
  {
    name: 'NRBC',
    category: PARAMETER_CATEGORIES.SPECIALIZED,
    unit: '/100 WBC',
    referenceRange: { min: 0, max: 2, unit: '/100 WBC' },
    description: 'Nucleated red blood cells'
  },
  {
    name: 'Hep B Surface Ab',
    category: PARAMETER_CATEGORIES.SPECIALIZED,
    unit: 'IU/L',
    referenceRange: { min: 10, max: 1000, unit: 'IU/L' },
    description: 'Hepatitis B surface antibody - immunity marker'
  }
];