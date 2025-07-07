export interface ReferenceRange {
  min: number;
  max: number;
  unit: string;
}

export interface MultiUnitReferenceRange {
  metric: ReferenceRange;
  imperial: ReferenceRange;
}

export interface Parameter {
  name: string;
  category: string;
  referenceRanges?: MultiUnitReferenceRange;
  description: string;
}

export type UnitSystem = 'metric' | 'imperial';

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
    referenceRanges: {
      metric: { min: 4.5, max: 6.5, unit: 'x10^12/L' },
      imperial: { min: 4.5, max: 5.9, unit: 'M/cu mm' }
    },
    description: 'Red Blood Cell Count - measures the number of red blood cells'
  },
  {
    name: 'Haemoglobin',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    referenceRanges: {
      metric: { min: 130, max: 170, unit: 'g/L' },
      imperial: { min: 13.0, max: 16.3, unit: 'g/dL' }
    },
    description: 'Protein in red blood cells that carries oxygen throughout the body'
  },
  {
    name: 'Haematocrit',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    referenceRanges: {
      metric: { min: 0.4, max: 0.54, unit: 'L/L' },
      imperial: { min: 40.0, max: 53.0, unit: '%' }
    },
    description: 'Percentage of blood volume that is red blood cells'
  },
  {
    name: 'MCV',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    referenceRanges: {
      metric: { min: 80, max: 100, unit: 'fL' },
      imperial: { min: 80.0, max: 100.0, unit: 'fL' }
    },
    description: 'Mean Corpuscular Volume - average size of red blood cells'
  },
  {
    name: 'MCH',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    referenceRanges: {
      metric: { min: 27, max: 32, unit: 'pg' },
      imperial: { min: 26.0, max: 34.0, unit: 'pg' }
    },
    description: 'Mean Corpuscular Hemoglobin - average amount of hemoglobin per red blood cell'
  },
  {
    name: 'MCHC',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    referenceRanges: {
      metric: { min: 320, max: 360, unit: 'g/L' },
      imperial: { min: 31.0, max: 37.0, unit: 'g/dL' }
    },
    description: 'Mean Corpuscular Hemoglobin Concentration - concentration of hemoglobin in red blood cells'
  },
  {
    name: 'RDW',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    referenceRanges: {
      metric: { min: 11.5, max: 14.5, unit: '%' },
      imperial: { min: 11.5, max: 14.5, unit: '%' }
    },
    description: 'Red Cell Distribution Width - variation in red blood cell size'
  },
  {
    name: 'WCC',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    referenceRanges: {
      metric: { min: 4.0, max: 11.0, unit: 'x10^9/L' },
      imperial: { min: 4.50, max: 11.00, unit: 'K/cu mm' }
    },
    description: 'White Cell Count (Leukocytes) - measures infection-fighting white blood cells'
  },
  {
    name: 'Neutrophils',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    referenceRanges: {
      metric: { min: 2.0, max: 7.5, unit: 'x10^9/L' },
      imperial: { min: 40.0, max: 70.0, unit: '%' }
    },
    description: 'Type of white blood cell that fights bacterial infections'
  },
  {
    name: 'Lymphocytes',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    referenceRanges: {
      metric: { min: 1.0, max: 4.0, unit: 'x10^9/L' },
      imperial: { min: 24, max: 44, unit: '%' }
    },
    description: 'Type of white blood cell that fights viral infections'
  },
  {
    name: 'Monocytes',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    referenceRanges: {
      metric: { min: 0.2, max: 1.0, unit: 'x10^9/L' },
      imperial: { min: 2, max: 11, unit: '%' }
    },
    description: 'Type of white blood cell that fights infection and helps other white blood cells'
  },
  {
    name: 'Eosinophils',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    referenceRanges: {
      metric: { min: 0.0, max: 0.5, unit: 'x10^9/L' },
      imperial: { min: 1, max: 4, unit: '%' }
    },
    description: 'Type of white blood cell that fights parasites and is involved in allergic responses'
  },
  {
    name: 'Basophils',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    referenceRanges: {
      metric: { min: 0.0, max: 0.1, unit: 'x10^9/L' },
      imperial: { min: 0, max: 2, unit: '%' }
    },
    description: 'Type of white blood cell involved in inflammatory reactions'
  },
  {
    name: 'Platelets',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    referenceRanges: {
      metric: { min: 150, max: 400, unit: 'x10^9/L' },
      imperial: { min: 150, max: 350, unit: 'K/cu mm' }
    },
    description: 'Blood cells that help with clotting'
  },
  {
    name: 'MPV',
    category: PARAMETER_CATEGORIES.HAEMATOLOGY,
    referenceRanges: {
      metric: { min: 7.5, max: 11.5, unit: 'fL' },
      imperial: { min: 9.2, max: 12.7, unit: 'fL' }
    },
    description: 'Mean Platelet Volume - average size of platelets'
  },
  // Biochemistry Parameters
  {
    name: 'Urea',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    referenceRanges: {
      metric: { min: 2.5, max: 7.8, unit: 'mmol/L' },
      imperial: { min: 7.0, max: 22.0, unit: 'mg/dL' }
    },
    description: 'Blood Urea Nitrogen (BUN) - waste product from protein breakdown'
  },
  {
    name: 'Creatinine',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    referenceRanges: {
      metric: { min: 60, max: 110, unit: 'μmol/L' },
      imperial: { min: 0.6, max: 1.3, unit: 'mg/dL' }
    },
    description: 'Waste product filtered by kidneys'
  },
  {
    name: 'ALT',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    referenceRanges: {
      metric: { min: 0, max: 41, unit: 'U/L' },
      imperial: { min: 0, max: 40, unit: 'U/L' }
    },
    description: 'Liver enzyme that indicates liver health'
  },
  {
    name: 'AST',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    referenceRanges: {
      metric: { min: 0, max: 40, unit: 'U/L' },
      imperial: { min: 0, max: 37, unit: 'U/L' }
    },
    description: 'Liver enzyme that can indicate liver damage'
  },
  {
    name: 'ALP',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    referenceRanges: {
      metric: { min: 30, max: 120, unit: 'U/L' },
      imperial: { min: 30, max: 120, unit: 'U/L' }
    },
    description: 'Enzyme found in liver and bones'
  },
  {
    name: 'Sodium',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    referenceRanges: {
      metric: { min: 135, max: 145, unit: 'mmol/L' },
      imperial: { min: 135, max: 148, unit: 'mmol/L' }
    },
    description: 'Essential electrolyte for nerve and muscle function'
  },
  {
    name: 'Potassium',
    category: PARAMETER_CATEGORIES.BIOCHEMISTRY,
    referenceRanges: {
      metric: { min: 3.5, max: 5.0, unit: 'mmol/L' },
      imperial: { min: 3.5, max: 5.1, unit: 'mmol/L' }
    },
    description: 'Essential electrolyte for heart function'
  },
  // Lipids Parameters
  {
    name: 'Total Cholesterol',
    category: PARAMETER_CATEGORIES.LIPIDS,
    referenceRanges: {
      metric: { min: 0, max: 5.2, unit: 'mmol/L' },
      imperial: { min: 0, max: 200, unit: 'mg/dL' }
    },
    description: 'Total blood cholesterol level'
  },
  {
    name: 'HDL',
    category: PARAMETER_CATEGORIES.LIPIDS,
    referenceRanges: {
      metric: { min: 1.0, max: 2.0, unit: 'mmol/L' },
      imperial: { min: 40, max: 80, unit: 'mg/dL' }
    },
    description: 'High-Density Lipoprotein - "good" cholesterol'
  },
  {
    name: 'LDL',
    category: PARAMETER_CATEGORIES.LIPIDS,
    referenceRanges: {
      metric: { min: 0, max: 3.4, unit: 'mmol/L' },
      imperial: { min: 0, max: 130, unit: 'mg/dL' }
    },
    description: 'Low-Density Lipoprotein - "bad" cholesterol'
  },
  // Inflammation Markers
  {
    name: 'CRP',
    category: PARAMETER_CATEGORIES.INFLAMMATION,
    referenceRanges: {
      metric: { min: 0, max: 5, unit: 'mg/L' },
      imperial: { min: 0, max: 5, unit: 'mg/L' }
    },
    description: 'C-Reactive Protein - indicates inflammation'
  },
  {
    name: 'ESR',
    category: PARAMETER_CATEGORIES.INFLAMMATION,
    referenceRanges: {
      metric: { min: 0, max: 20, unit: 'mm/h' },
      imperial: { min: 0, max: 20, unit: 'mm/h' }
    },
    description: 'Erythrocyte Sedimentation Rate - indicates inflammation'
  },
  // Iron Studies
  {
    name: 'Ferritin',
    category: PARAMETER_CATEGORIES.IRON_STUDIES,
    referenceRanges: {
      metric: { min: 30, max: 300, unit: 'μg/L' },
      imperial: { min: 30, max: 400, unit: 'ng/mL' }
    },
    description: 'Protein that stores iron'
  },
  {
    name: 'Iron',
    category: PARAMETER_CATEGORIES.IRON_STUDIES,
    referenceRanges: {
      metric: { min: 10, max: 30, unit: 'μmol/L' },
      imperial: { min: 65, max: 170, unit: 'μg/dL' }
    },
    description: 'Serum iron level'
  }
];

// Helper function to get reference range for preferred unit system
export const getReferenceRange = (parameter: Parameter, unitSystem: UnitSystem): ReferenceRange | undefined => {
  if (!parameter.referenceRanges) return undefined;
  return parameter.referenceRanges[unitSystem];
};

// Helper function to get display unit for parameter
export const getDisplayUnit = (parameter: Parameter, unitSystem: UnitSystem): string => {
  const range = getReferenceRange(parameter, unitSystem);
  return range?.unit || '';
};