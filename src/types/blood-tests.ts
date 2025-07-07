export interface ReferenceRange {
  min: number;
  max: number;
  unit: string;
}

export interface Parameter {
  name: string;
  category: string;
  unit: string;
  referenceRange?: ReferenceRange;
  description: string;
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
  }
];