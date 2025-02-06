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
  HAEMATOLOGY: 'Haematology',
  BIOCHEMISTRY: 'Biochemistry',
  LIPIDS: 'Lipids',
  OTHER: 'Other'
} as const;

export const PARAMETERS: Parameter[] = [
  // Haematology Parameters
  {
    name: 'Haemoglobin',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'g/L',
    referenceRange: { min: 130, max: 170, unit: 'g/L' },
    description: 'Protein in red blood cells that carries oxygen throughout the body'
  },
  {
    name: 'WCC',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'x10^9/L',
    referenceRange: { min: 4.0, max: 11.0, unit: 'x10^9/L' },
    description: 'White Cell Count - measures infection-fighting white blood cells'
  },
  {
    name: 'RCC',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'x10^12/L',
    referenceRange: { min: 4.5, max: 6.5, unit: 'x10^12/L' },
    description: 'Red Cell Count - measures the number of red blood cells'
  },
  {
    name: 'Platelets',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'x10^9/L',
    referenceRange: { min: 150, max: 400, unit: 'x10^9/L' },
    description: 'Blood cells that help with clotting'
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
    name: 'Haematocrit',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'L/L',
    referenceRange: { min: 0.4, max: 0.54, unit: 'L/L' },
    description: 'Percentage of blood volume that is red blood cells'
  },
  {
    name: 'RDW',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: '%',
    referenceRange: { min: 11.5, max: 14.5, unit: '%' },
    description: 'Red Cell Distribution Width - variation in red blood cell size'
  },
  {
    name: 'ESR',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'mm/h',
    referenceRange: { min: 0, max: 20, unit: 'mm/h' },
    description: 'Erythrocyte Sedimentation Rate - indicates inflammation'
  },
  // Biochemistry Parameters
  {
    name: 'ALT',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'U/L',
    referenceRange: { min: 0, max: 41, unit: 'U/L' },
    description: 'Liver enzyme that indicates liver health'
  },
  {
    name: 'Creatinine',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'umol/l',
    referenceRange: { min: 60, max: 110, unit: 'umol/l' },
    description: 'Waste product filtered by kidneys'
  },
  {
    name: 'Urea',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'mmol/l',
    referenceRange: { min: 2.5, max: 7.8, unit: 'mmol/l' },
    description: 'Waste product produced from protein breakdown'
  },
  {
    name: 'Potassium',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    unit: 'mmol/l',
    referenceRange: { min: 3.5, max: 5.0, unit: 'mmol/l' },
    description: 'Essential electrolyte for nerve and muscle function'
  },
  // Lipids Parameters
  {
    name: 'Cholesterol',
    category: PARAMETER_CATEGORIES.LIPIDS,
    unit: 'mmol/l',
    referenceRange: { min: 0, max: 5.2, unit: 'mmol/l' },
    description: 'Total blood cholesterol level'
  }
];