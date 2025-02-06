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
    name: 'Platelets',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    unit: 'x10^9/L',
    referenceRange: { min: 150, max: 400, unit: 'x10^9/L' },
    description: 'Blood cells that help with clotting'
  },
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
    name: 'Cholesterol',
    category: PARAMETER_CATEGORIES.LIPIDS,
    unit: 'mmol/l',
    referenceRange: { min: 0, max: 5.2, unit: 'mmol/l' },
    description: 'Total blood cholesterol level'
  }
];