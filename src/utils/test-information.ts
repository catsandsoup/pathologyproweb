// Comprehensive test information for enhanced tooltips
export interface TestInfo {
  purpose: string;
  highCauses: string[];
  lowCauses: string[];
  clinicalSignificance: string;
}

export const TEST_INFORMATION: Record<string, TestInfo> = {
  'RBC': {
    purpose: 'Measures the number of red blood cells that carry oxygen throughout your body',
    highCauses: ['Dehydration', 'Lung disease', 'Heart disease', 'Smoking', 'Living at high altitude'],
    lowCauses: ['Anemia', 'Blood loss', 'Bone marrow problems', 'Nutritional deficiencies', 'Chronic kidney disease'],
    clinicalSignificance: 'Essential for diagnosing anemia and polycythemia'
  },
  'Haemoglobin': {
    purpose: 'Measures the protein in red blood cells that carries oxygen from lungs to body tissues',
    highCauses: ['Dehydration', 'Smoking', 'Living at high altitude', 'Lung disease', 'Heart disease'],
    lowCauses: ['Iron deficiency anemia', 'Blood loss', 'Chronic disease', 'Nutritional deficiencies', 'Bone marrow disorders'],
    clinicalSignificance: 'Primary indicator of anemia and oxygen-carrying capacity'
  },
  'Haematocrit': {
    purpose: 'Measures the percentage of blood volume made up of red blood cells',
    highCauses: ['Dehydration', 'Polycythemia', 'Smoking', 'Living at high altitude', 'Heart or lung disease'],
    lowCauses: ['Anemia', 'Blood loss', 'Overhydration', 'Bone marrow problems', 'Chronic disease'],
    clinicalSignificance: 'Helps diagnose anemia, polycythemia, and dehydration'
  },
  'MCV': {
    purpose: 'Measures the average size of red blood cells to help classify types of anemia',
    highCauses: ['Vitamin B12 deficiency', 'Folate deficiency', 'Alcohol use', 'Thyroid disease', 'Liver disease'],
    lowCauses: ['Iron deficiency', 'Thalassemia', 'Chronic disease', 'Lead poisoning'],
    clinicalSignificance: 'Helps classify anemia as microcytic, normocytic, or macrocytic'
  },
  'MCH': {
    purpose: 'Measures the average amount of hemoglobin in each red blood cell',
    highCauses: ['Vitamin B12 deficiency', 'Folate deficiency', 'Thyroid disease', 'Liver disease'],
    lowCauses: ['Iron deficiency', 'Thalassemia', 'Chronic disease'],
    clinicalSignificance: 'Helps determine the cause of anemia'
  },
  'MCHC': {
    purpose: 'Measures the concentration of hemoglobin in red blood cells',
    highCauses: ['Hereditary spherocytosis', 'Severe dehydration', 'Autoimmune hemolytic anemia'],
    lowCauses: ['Iron deficiency', 'Thalassemia', 'Chronic disease'],
    clinicalSignificance: 'Most sensitive indicator of iron deficiency'
  },
  'RDW': {
    purpose: 'Measures variation in red blood cell size to detect early nutritional deficiencies',
    highCauses: ['Iron deficiency', 'Vitamin B12/folate deficiency', 'Mixed anemia types', 'Blood transfusion'],
    lowCauses: ['Normal finding', 'Thalassemia trait'],
    clinicalSignificance: 'Early indicator of nutritional deficiencies before anemia develops'
  },
  'WCC': {
    purpose: 'Measures white blood cells that fight infection and disease',
    highCauses: ['Bacterial infection', 'Viral infection', 'Leukemia', 'Stress', 'Smoking', 'Medications'],
    lowCauses: ['Viral infections', 'Bone marrow problems', 'Autoimmune disorders', 'Chemotherapy', 'Severe infections'],
    clinicalSignificance: 'Primary indicator of immune system status and infection'
  },
  'Neutrophils': {
    purpose: 'Measures neutrophils, the most common white blood cells that fight bacterial infections',
    highCauses: ['Bacterial infection', 'Physical stress', 'Burns', 'Heart attack', 'Smoking'],
    lowCauses: ['Viral infections', 'Chemotherapy', 'Autoimmune disorders', 'Severe bacterial infections'],
    clinicalSignificance: 'First line of defense against bacterial infections'
  },
  'Lymphocytes': {
    purpose: 'Measures lymphocytes that fight viral infections and produce antibodies',
    highCauses: ['Viral infections', 'Chronic infections', 'Leukemia', 'Lymphoma'],
    lowCauses: ['HIV/AIDS', 'Chemotherapy', 'Radiation therapy', 'Steroid use', 'Severe illness'],
    clinicalSignificance: 'Key component of adaptive immune response'
  },
  'Platelets': {
    purpose: 'Measures platelets that help blood clot and stop bleeding',
    highCauses: ['Cancer', 'Inflammatory conditions', 'Iron deficiency', 'Spleen removal', 'Blood disorders'],
    lowCauses: ['Bone marrow problems', 'Enlarged spleen', 'Autoimmune disorders', 'Medications', 'Viral infections'],
    clinicalSignificance: 'Essential for blood clotting and bleeding control'
  },
  'Creatinine': {
    purpose: 'Measures waste product filtered by kidneys to assess kidney function',
    highCauses: ['Kidney disease', 'Dehydration', 'High protein diet', 'Muscle breakdown', 'Certain medications'],
    lowCauses: ['Low muscle mass', 'Malnutrition', 'Liver disease', 'Pregnancy'],
    clinicalSignificance: 'Most important test for kidney function assessment'
  },
  'Urea': {
    purpose: 'Measures waste product from protein breakdown to assess kidney function',
    highCauses: ['Kidney disease', 'Dehydration', 'High protein diet', 'Heart failure', 'GI bleeding'],
    lowCauses: ['Liver disease', 'Low protein diet', 'Overhydration', 'Pregnancy'],
    clinicalSignificance: 'Indicates kidney function and protein metabolism'
  },
  'eGFR': {
    purpose: 'Estimates how well kidneys filter waste from blood',
    highCauses: ['Normal kidney function', 'Hyperfiltration in early diabetes'],
    lowCauses: ['Chronic kidney disease', 'Acute kidney injury', 'Dehydration', 'Heart failure'],
    clinicalSignificance: 'Best overall measure of kidney function'
  },
  'Total Cholesterol': {
    purpose: 'Measures total cholesterol to assess cardiovascular disease risk',
    highCauses: ['Diet high in saturated fat', 'Genetics', 'Diabetes', 'Hypothyroidism', 'Kidney disease'],
    lowCauses: ['Malnutrition', 'Hyperthyroidism', 'Liver disease', 'Certain medications'],
    clinicalSignificance: 'Key indicator of cardiovascular disease risk'
  },
  'HDL': {
    purpose: 'Measures "good" cholesterol that removes bad cholesterol from arteries',
    highCauses: ['Regular exercise', 'Moderate alcohol consumption', 'Genetics', 'Estrogen'],
    lowCauses: ['Sedentary lifestyle', 'Smoking', 'Diabetes', 'Obesity', 'Genetics'],
    clinicalSignificance: 'Higher levels protect against heart disease'
  },
  'LDL': {
    purpose: 'Measures "bad" cholesterol that can build up in arteries',
    highCauses: ['Diet high in saturated fat', 'Genetics', 'Diabetes', 'Hypothyroidism'],
    lowCauses: ['Low-fat diet', 'Statin medications', 'Hyperthyroidism', 'Malnutrition'],
    clinicalSignificance: 'Major risk factor for heart disease and stroke'
  },
  'ALT': {
    purpose: 'Measures liver enzyme to detect liver damage or disease',
    highCauses: ['Hepatitis', 'Fatty liver disease', 'Alcohol use', 'Medications', 'Muscle damage'],
    lowCauses: ['Normal finding', 'Vitamin B6 deficiency'],
    clinicalSignificance: 'Most specific indicator of liver cell damage'
  },
  'AST': {
    purpose: 'Measures enzyme found in liver and other tissues to detect damage',
    highCauses: ['Liver disease', 'Heart attack', 'Muscle damage', 'Alcohol use', 'Medications'],
    lowCauses: ['Normal finding', 'Vitamin B6 deficiency'],
    clinicalSignificance: 'Indicates liver or muscle tissue damage'
  },
  'TSH': {
    purpose: 'Measures thyroid stimulating hormone to assess thyroid function',
    highCauses: ['Hypothyroidism', 'Thyroid hormone resistance', 'Pituitary tumors'],
    lowCauses: ['Hyperthyroidism', 'Pituitary problems', 'Excessive thyroid medication'],
    clinicalSignificance: 'Primary test for thyroid function screening'
  },
  'Ferritin': {
    purpose: 'Measures iron storage protein to assess iron status in the body',
    highCauses: ['Iron overload', 'Inflammation', 'Liver disease', 'Cancer', 'Alcohol use'],
    lowCauses: ['Iron deficiency', 'Blood loss', 'Poor iron absorption', 'Pregnancy'],
    clinicalSignificance: 'Best indicator of iron deficiency and iron overload'
  }
};