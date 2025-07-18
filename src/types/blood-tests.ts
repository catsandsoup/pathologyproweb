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

export const PARAMETERS: Parameter[] = [
  // Haematology Parameters
  {
    name: 'RBC',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'x10^12/L',
    referenceRange: { min: 4.5, max: 6.5, unit: 'x10^12/L' },
    description: 'Red Blood Cell Count - measures the number of red blood cells'
  },
  {
    name: 'Haemoglobin',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'g/L',
    referenceRange: { min: 130, max: 170, unit: 'g/L' },
    description: 'Protein in red blood cells that carries oxygen throughout the body'
  },
  {
    name: 'Haematocrit',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'L/L',
    referenceRange: { min: 0.4, max: 0.54, unit: 'L/L' },
    description: 'Percentage of blood volume that is red blood cells'
  },
  {
    name: 'MCV',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'fL',
    referenceRange: { min: 80, max: 100, unit: 'fL' },
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
    referenceRange: { min: 4.0, max: 11.0, unit: 'x10^9/L' },
    description: 'White Cell Count (Leukocytes) - measures infection-fighting white blood cells'
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
    referenceRange: { min: 150, max: 400, unit: 'x10^9/L' },
    description: 'Blood cells that help with clotting'
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
    referenceRange: { min: 60, max: 110, unit: 'μmol/L' },
    description: 'Waste product filtered by kidneys'
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
    referenceRange: { min: 1.0, max: 2.0, unit: 'mmol/L' },
    description: 'High-Density Lipoprotein - "good" cholesterol'
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
    referenceRange: { min: 30, max: 300, unit: 'μg/L' },
    description: 'Protein that stores iron'
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
    referenceRange: { min: 0.15, max: 0.45, unit: 'mmol/L' },
    description: 'Uric acid - waste product that can cause gout if elevated'
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
    referenceRange: { min: 20, max: 50, unit: '%' },
    description: 'Percentage of transferrin saturated with iron'
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