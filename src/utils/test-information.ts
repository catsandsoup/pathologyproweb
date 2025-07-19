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
  },
  
  // Additional Hematology Parameters
  'Monocytes': {
    purpose: 'Help break down bacteria and are involved in chronic immune responses',
    highCauses: ['Chronic infections', 'Autoimmune diseases', 'Blood cancers', 'Recovery from acute infection'],
    lowCauses: ['Bone marrow disorders', 'Chemotherapy', 'Severe infections', 'Hairy cell leukemia'],
    clinicalSignificance: 'Elevated in chronic infections and autoimmune diseases'
  },
  'Eosinophils': {
    purpose: 'Involved in allergic reactions and fighting parasitic infections',
    highCauses: ['Allergies', 'Asthma', 'Parasitic infections', 'Eczema', 'Drug reactions'],
    lowCauses: ['Stress', 'Steroid use', 'Acute infections', 'Cushing syndrome'],
    clinicalSignificance: 'High levels suggest allergies, asthma, or parasites'
  },
  'Basophils': {
    purpose: 'Release histamine during allergic reactions and inflammatory responses',
    highCauses: ['Chronic inflammation', 'Allergic reactions', 'Blood cancers', 'Hypothyroidism'],
    lowCauses: ['Hyperthyroidism', 'Stress', 'Steroid use', 'Acute infections'],
    clinicalSignificance: 'Rarely elevated, but may indicate chronic inflammation or leukemia'
  },
  'MPV': {
    purpose: 'Indicates platelet size - larger platelets are younger and more active',
    highCauses: ['Increased platelet turnover', 'Bone marrow disorders', 'Vitamin B12/folate deficiency', 'Hyperthyroidism'],
    lowCauses: ['Bone marrow suppression', 'Chemotherapy', 'Aplastic anemia', 'Wiskott-Aldrich syndrome'],
    clinicalSignificance: 'High MPV may suggest increased platelet turnover'
  },
  'RCC': {
    purpose: 'Another measure of red blood cells, similar to RBC count',
    highCauses: ['Dehydration', 'Lung disease', 'Heart disease', 'Smoking', 'Living at high altitude'],
    lowCauses: ['Anemia', 'Blood loss', 'Bone marrow problems', 'Nutritional deficiencies', 'Chronic kidney disease'],
    clinicalSignificance: 'Essential for diagnosing anemia and polycythemia'
  },

  // Additional Biochemistry Parameters
  'ALP': {
    purpose: 'Enzyme found in liver and bones, elevated in liver or bone disorders',
    highCauses: ['Liver disease', 'Bone disorders', 'Bile duct obstruction', 'Pregnancy', 'Growing children'],
    lowCauses: ['Malnutrition', 'Hypothyroidism', 'Zinc deficiency', 'Certain medications'],
    clinicalSignificance: 'High levels indicate liver disease or bone disorders'
  },
  'Sodium': {
    purpose: 'Regulates fluid balance and is essential for nerve and muscle function',
    highCauses: ['Dehydration', 'Diabetes insipidus', 'Kidney disease', 'Excessive salt intake'],
    lowCauses: ['Overhydration', 'Heart failure', 'Kidney disease', 'SIADH', 'Diuretic use'],
    clinicalSignificance: 'Abnormal levels affect nerve and muscle function'
  },
  'Potassium': {
    purpose: 'Essential for heart and muscle function, maintains cellular electrical activity',
    highCauses: ['Kidney disease', 'Dehydration', 'ACE inhibitors', 'Cell breakdown', 'Addison disease'],
    lowCauses: ['Diuretics', 'Diarrhea', 'Poor diet', 'Hyperaldosteronism', 'Insulin use'],
    clinicalSignificance: 'High or low levels can cause dangerous heart arrhythmias'
  },
  'GGT': {
    purpose: 'Liver enzyme that is elevated with alcohol use or bile duct issues',
    highCauses: ['Alcohol use', 'Bile duct disease', 'Liver disease', 'Medications', 'Pancreatitis'],
    lowCauses: ['Normal finding', 'Hypothyroidism'],
    clinicalSignificance: 'Most sensitive marker for alcohol-related liver damage'
  },
  'Bilirubin Total': {
    purpose: 'Breakdown product of red blood cells, processed by the liver',
    highCauses: ['Liver dysfunction', 'Hemolysis', 'Gilbert syndrome', 'Bile duct obstruction'],
    lowCauses: ['Normal finding', 'Certain medications'],
    clinicalSignificance: 'High levels cause jaundice and indicate liver problems'
  },
  'Bili.Total': {
    purpose: 'Breakdown product of red blood cells, processed by the liver',
    highCauses: ['Liver dysfunction', 'Hemolysis', 'Gilbert syndrome', 'Bile duct obstruction'],
    lowCauses: ['Normal finding', 'Certain medications'],
    clinicalSignificance: 'High levels cause jaundice and indicate liver problems'
  },
  'Bicarbonate': {
    purpose: 'Reflects acid-base balance in the body',
    highCauses: ['Alkalosis', 'Vomiting', 'Diuretic use', 'Hyperaldosteronism'],
    lowCauses: ['Acidosis', 'Kidney disease', 'Diarrhea', 'Diabetic ketoacidosis'],
    clinicalSignificance: 'Low indicates acidosis; high indicates alkalosis'
  },
  'Globulin': {
    purpose: 'Group of proteins including antibodies and transport proteins',
    highCauses: ['Chronic inflammation', 'Liver disease', 'Multiple myeloma', 'Autoimmune diseases'],
    lowCauses: ['Immune deficiency', 'Malnutrition', 'Liver disease', 'Kidney disease'],
    clinicalSignificance: 'High levels suggest chronic inflammation; low suggests immune deficiency'
  },
  'Albumin': {
    purpose: 'Main blood protein that maintains fluid balance and transports substances',
    highCauses: ['Dehydration', 'High protein diet'],
    lowCauses: ['Liver disease', 'Malnutrition', 'Inflammation', 'Kidney disease', 'Burns'],
    clinicalSignificance: 'Low levels indicate poor nutrition, liver disease, or inflammation'
  },
  'Total Protein': {
    purpose: 'Sum of albumin and globulin, assesses nutritional and liver status',
    highCauses: ['Dehydration', 'Chronic inflammation', 'Multiple myeloma'],
    lowCauses: ['Malnutrition', 'Liver disease', 'Kidney disease', 'Malabsorption'],
    clinicalSignificance: 'Reflects overall protein status and liver function'
  },
  'Chloride': {
    purpose: 'Helps maintain acid-base balance and fluid distribution',
    highCauses: ['Dehydration', 'Kidney disease', 'Hyperparathyroidism', 'Respiratory alkalosis'],
    lowCauses: ['Vomiting', 'Diuretic use', 'Heart failure', 'Addison disease'],
    clinicalSignificance: 'Abnormal levels may indicate metabolic issues'
  },
  'LDH': {
    purpose: 'Enzyme released during tissue damage, found in many organs',
    highCauses: ['Cell injury', 'Hemolysis', 'Cancer', 'Heart attack', 'Liver disease'],
    lowCauses: ['Normal finding'],
    clinicalSignificance: 'High levels indicate tissue damage but are not organ-specific'
  },
  'LD': {
    purpose: 'Enzyme released during tissue damage, found in many organs',
    highCauses: ['Cell injury', 'Hemolysis', 'Cancer', 'Heart attack', 'Liver disease'],
    lowCauses: ['Normal finding'],
    clinicalSignificance: 'High levels indicate tissue damage but are not organ-specific'
  },
  'Calcium': {
    purpose: 'Important for bones, nerves, and muscles, regulated by parathyroid hormone',
    highCauses: ['Hyperparathyroidism', 'Cancer', 'Vitamin D excess', 'Sarcoidosis', 'Immobilization'],
    lowCauses: ['Hypoparathyroidism', 'Vitamin D deficiency', 'Kidney disease', 'Malabsorption'],
    clinicalSignificance: 'Abnormal levels affect heart and neuromuscular function'
  },
  'Magnesium': {
    purpose: 'Involved in muscle and nerve function, bone health, and enzyme activity',
    highCauses: ['Kidney disease', 'Dehydration', 'Antacid overuse', 'Hypothyroidism'],
    lowCauses: ['Poor diet', 'Alcohol use', 'Diarrhea', 'Diuretics', 'Diabetes'],
    clinicalSignificance: 'Low levels cause muscle cramps and heart arrhythmias'
  },
  'Phosphate': {
    purpose: 'Works with calcium for bone health and energy metabolism',
    highCauses: ['Kidney disease', 'Hypoparathyroidism', 'Vitamin D excess', 'Cell breakdown'],
    lowCauses: ['Malnutrition', 'Hyperparathyroidism', 'Vitamin D deficiency', 'Alcohol withdrawal'],
    clinicalSignificance: 'High levels indicate kidney disease; low levels affect bone health'
  },
  'Urate': {
    purpose: 'Product of purine metabolism, can form crystals in joints',
    highCauses: ['Gout', 'Kidney disease', 'High purine diet', 'Cell breakdown', 'Dehydration'],
    lowCauses: ['Allopurinol use', 'Low purine diet', 'Wilson disease'],
    clinicalSignificance: 'High levels cause gout and kidney stones'
  },
  'F Glucose Plasma': {
    purpose: 'Fasting glucose level used to diagnose diabetes',
    highCauses: ['Diabetes', 'Stress', 'Medications', 'Pancreatic disease', 'Cushing syndrome'],
    lowCauses: ['Hypoglycemia', 'Insulin excess', 'Liver disease', 'Addison disease'],
    clinicalSignificance: 'High levels indicate diabetes; low levels cause symptoms'
  },
  'R Glucose Serum': {
    purpose: 'Random glucose level used to screen for diabetes',
    highCauses: ['Diabetes', 'Recent meal', 'Stress', 'Medications', 'Pancreatic disease'],
    lowCauses: ['Hypoglycemia', 'Insulin excess', 'Liver disease', 'Prolonged fasting'],
    clinicalSignificance: 'Used to screen for diabetes when fasting is not possible'
  },

  // Lipid Profile
  'Cholesterol': {
    purpose: 'Measures total cholesterol to assess cardiovascular disease risk',
    highCauses: ['Diet high in saturated fat', 'Genetics', 'Diabetes', 'Hypothyroidism', 'Kidney disease'],
    lowCauses: ['Malnutrition', 'Hyperthyroidism', 'Liver disease', 'Certain medications'],
    clinicalSignificance: 'Key indicator of cardiovascular disease risk'
  },
  'Triglycerides': {
    purpose: 'Fat in the blood that increases risk of pancreatitis and heart disease',
    highCauses: ['High carbohydrate diet', 'Diabetes', 'Obesity', 'Alcohol use', 'Kidney disease'],
    lowCauses: ['Malnutrition', 'Hyperthyroidism', 'Malabsorption', 'Certain medications'],
    clinicalSignificance: 'High levels increase risk of pancreatitis and heart disease'
  },
  'Non-HDL Cholesterol': {
    purpose: 'Total cholesterol minus HDL, better predictor of heart risk than LDL alone',
    highCauses: ['High LDL', 'High VLDL', 'Diabetes', 'Metabolic syndrome', 'Genetics'],
    lowCauses: ['Low total cholesterol', 'High HDL', 'Statin use', 'Hyperthyroidism'],
    clinicalSignificance: 'Better predictor of cardiovascular risk than LDL alone'
  },

  // Inflammation Markers
  'CRP': {
    purpose: 'Marker of acute inflammation in the body',
    highCauses: ['Infection', 'Trauma', 'Chronic disease', 'Autoimmune disorders', 'Cancer'],
    lowCauses: ['Normal finding', 'Anti-inflammatory medications'],
    clinicalSignificance: 'High levels indicate infection, trauma, or chronic disease'
  },
  'ESR': {
    purpose: 'Measures how quickly red cells settle, indicates chronic inflammation',
    highCauses: ['Chronic inflammation', 'Autoimmune disease', 'Cancer', 'Infection', 'Kidney disease'],
    lowCauses: ['Polycythemia', 'Sickle cell disease', 'Heart failure'],
    clinicalSignificance: 'High levels suggest chronic inflammation or autoimmune disease'
  },

  // Iron Studies
  'Iron': {
    purpose: 'Circulating iron level, varies throughout the day',
    highCauses: ['Iron overload', 'Hemolysis', 'Liver disease', 'Iron supplements'],
    lowCauses: ['Iron deficiency', 'Chronic disease', 'Blood loss', 'Poor absorption'],
    clinicalSignificance: 'Low levels indicate iron deficiency; high levels suggest overload'
  },
  'Iron Saturation': {
    purpose: 'Percentage of transferrin bound to iron, reflects iron availability',
    highCauses: ['Iron overload', 'Hemolysis', 'Liver disease', 'Hemochromatosis'],
    lowCauses: ['Iron deficiency', 'Chronic disease', 'Blood loss'],
    clinicalSignificance: 'Low levels indicate iron deficiency; high levels suggest overload'
  },
  'TIBC': {
    purpose: 'Capacity of blood to bind iron, reflects transferrin levels',
    highCauses: ['Iron deficiency', 'Pregnancy', 'Oral contraceptives'],
    lowCauses: ['Iron overload', 'Malnutrition', 'Liver disease', 'Chronic disease'],
    clinicalSignificance: 'High levels indicate iron deficiency; low levels suggest overload'
  },
  'Transferrin': {
    purpose: 'Iron transport protein, increases when iron is low',
    highCauses: ['Iron deficiency', 'Pregnancy', 'Oral contraceptives'],
    lowCauses: ['Malnutrition', 'Liver disease', 'Chronic disease', 'Protein loss'],
    clinicalSignificance: 'High levels indicate iron deficiency; low levels suggest malnutrition'
  },

  // Hormone Tests
  'Free T4': {
    purpose: 'Active thyroid hormone that regulates metabolism',
    highCauses: ['Hyperthyroidism', 'Excessive thyroid medication', 'Thyroiditis'],
    lowCauses: ['Hypothyroidism', 'Pituitary problems', 'Severe illness'],
    clinicalSignificance: 'High levels cause hyperthyroidism; low levels cause hypothyroidism'
  },
  'Free T3': {
    purpose: 'Most active thyroid hormone, used to assess hyperthyroidism',
    highCauses: ['Hyperthyroidism', 'T3 thyrotoxicosis', 'Excessive T3 medication'],
    lowCauses: ['Hypothyroidism', 'Severe illness', 'Medications'],
    clinicalSignificance: 'Most active thyroid hormone, elevated in hyperthyroidism'
  },
  'Testosterone': {
    purpose: 'Male sex hormone important for muscle mass, energy, and libido',
    highCauses: ['Testicular tumors', 'Adrenal tumors', 'Anabolic steroid use'],
    lowCauses: ['Hypogonadism', 'Aging', 'Obesity', 'Chronic illness', 'Medications'],
    clinicalSignificance: 'Low levels cause fatigue and low libido; high levels indicate excess androgen'
  },
  'Oestradiol': {
    purpose: 'Main female hormone that varies with menstrual cycle',
    highCauses: ['Ovarian tumors', 'Pregnancy', 'Hormone replacement therapy'],
    lowCauses: ['Menopause', 'Ovarian failure', 'Anorexia', 'Excessive exercise'],
    clinicalSignificance: 'Regulates menstrual cycle and reproductive function'
  },
  'Progesterone': {
    purpose: 'Female hormone important for menstrual cycle and pregnancy',
    highCauses: ['Pregnancy', 'Ovarian cysts', 'Adrenal hyperplasia'],
    lowCauses: ['Anovulation', 'Menopause', 'Luteal phase defect'],
    clinicalSignificance: 'Important for menstrual cycle and maintaining pregnancy'
  },
  'LH': {
    purpose: 'Regulates testosterone production and ovulation',
    highCauses: ['Menopause', 'PCOS', 'Primary gonadal failure', 'Pituitary tumors'],
    lowCauses: ['Hypothalamic dysfunction', 'Pituitary failure', 'Anorexia'],
    clinicalSignificance: 'High or low levels indicate reproductive hormone issues'
  },
  'FSH': {
    purpose: 'Stimulates sperm and egg production, used to assess fertility',
    highCauses: ['Menopause', 'Primary gonadal failure', 'Pituitary tumors'],
    lowCauses: ['Hypothalamic dysfunction', 'Pituitary failure', 'Anorexia'],
    clinicalSignificance: 'Used to assess fertility and reproductive function'
  },
  'Prolactin': {
    purpose: 'Stimulates milk production, can affect reproductive function',
    highCauses: ['Pituitary tumors', 'Medications', 'Hypothyroidism', 'Stress'],
    lowCauses: ['Pituitary failure', 'Dopamine agonist medications'],
    clinicalSignificance: 'High levels cause reproductive problems and milk production'
  },
  'Cortisol': {
    purpose: 'Stress hormone important for metabolism and immune function',
    highCauses: ['Cushing syndrome', 'Stress', 'Depression', 'Medications'],
    lowCauses: ['Addison disease', 'Pituitary failure', 'Steroid withdrawal'],
    clinicalSignificance: 'High levels indicate Cushing syndrome; low levels indicate adrenal insufficiency'
  },
  'DHEA-S': {
    purpose: 'Precursor to sex hormones produced by adrenal glands',
    highCauses: ['PCOS', 'Adrenal tumors', 'Congenital adrenal hyperplasia'],
    lowCauses: ['Adrenal insufficiency', 'Aging', 'Chronic illness'],
    clinicalSignificance: 'High levels suggest PCOS or adrenal tumors; low levels indicate adrenal insufficiency'
  },

  // Vitamins and Minerals
  '25-OH Vitamin D': {
    purpose: 'Reflects vitamin D status, important for bone health and immunity',
    highCauses: ['Vitamin D supplements', 'Excessive sun exposure', 'Granulomatous diseases'],
    lowCauses: ['Limited sun exposure', 'Poor diet', 'Malabsorption', 'Kidney disease'],
    clinicalSignificance: 'Low levels cause bone problems and immune dysfunction; high levels cause toxicity'
  },

  // Specialized Tests
  'NRBC': {
    purpose: 'Immature red blood cells that normally stay in bone marrow',
    highCauses: ['Bone marrow stress', 'Severe anemia', 'Blood cancers', 'Hypoxia'],
    lowCauses: ['Normal finding'],
    clinicalSignificance: 'Presence may indicate bone marrow stress or severe anemia'
  },
  'Hep B Surface Ab': {
    purpose: 'Indicates immunity to hepatitis B virus',
    highCauses: ['Vaccination', 'Recovery from hepatitis B infection'],
    lowCauses: ['No vaccination', 'No previous infection', 'Immunocompromised'],
    clinicalSignificance: 'Positive result indicates immunity to hepatitis B'
  },

  // Cardiac Enzymes
  'CK': {
    purpose: 'Enzyme released when heart or skeletal muscle is damaged',
    highCauses: ['Heart attack', 'Muscle injury', 'Strenuous exercise', 'Muscular dystrophy', 'Hypothyroidism'],
    lowCauses: ['Low muscle mass', 'Sedentary lifestyle'],
    clinicalSignificance: 'Elevated levels indicate heart or muscle damage'
  },
  'CK-MB': {
    purpose: 'Heart-specific enzyme, should be less than 5% of total CK',
    highCauses: ['Heart attack', 'Heart surgery', 'Myocarditis', 'Defibrillation'],
    lowCauses: ['Normal finding'],
    clinicalSignificance: 'Elevated levels specifically indicate heart muscle damage'
  },
  'Troponin T': {
    purpose: 'Highly specific marker for heart muscle damage',
    highCauses: ['Heart attack', 'Heart failure', 'Myocarditis', 'Pulmonary embolism'],
    lowCauses: ['Normal finding'],
    clinicalSignificance: 'Most specific test for heart muscle damage'
  },
  'Troponin I': {
    purpose: 'Highly specific marker for heart muscle damage',
    highCauses: ['Heart attack', 'Heart failure', 'Myocarditis', 'Kidney disease'],
    lowCauses: ['Normal finding'],
    clinicalSignificance: 'Most specific test for heart muscle damage'
  },
  'hs-Troponin T': {
    purpose: 'Ultra-sensitive test for heart muscle damage, can detect very small amounts',
    highCauses: ['Heart attack', 'Heart failure', 'Myocarditis', 'Kidney disease', 'Sepsis'],
    lowCauses: ['Normal finding'],
    clinicalSignificance: 'Ultra-sensitive marker for early detection of heart damage'
  },

  // Coagulation Studies
  'PT': {
    purpose: 'Measures how long it takes blood to clot via the extrinsic pathway',
    highCauses: ['Warfarin use', 'Liver disease', 'Vitamin K deficiency', 'Clotting factor deficiency'],
    lowCauses: ['Thrombosis risk', 'Dehydration', 'Certain medications'],
    clinicalSignificance: 'Used to monitor warfarin therapy and assess bleeding risk'
  },
  'INR': {
    purpose: 'Standardized measure of clotting time, used to monitor blood thinners',
    highCauses: ['Warfarin therapy', 'Liver disease', 'Vitamin K deficiency'],
    lowCauses: ['Thrombosis risk', 'Inadequate anticoagulation'],
    clinicalSignificance: 'Target range varies by condition being treated with warfarin'
  },
  'aPTT': {
    purpose: 'Measures intrinsic clotting pathway, used to monitor heparin',
    highCauses: ['Heparin therapy', 'Hemophilia', 'Liver disease', 'Lupus anticoagulant'],
    lowCauses: ['Thrombosis risk', 'Early DIC'],
    clinicalSignificance: 'Used to monitor heparin therapy and detect clotting disorders'
  },
  'Fibrinogen': {
    purpose: 'Protein essential for blood clotting, acute phase reactant',
    highCauses: ['Inflammation', 'Infection', 'Cancer', 'Pregnancy', 'Smoking'],
    lowCauses: ['Liver disease', 'DIC', 'Congenital deficiency', 'Malnutrition'],
    clinicalSignificance: 'Low levels cause bleeding; high levels increase clot risk'
  },
  'D-dimer': {
    purpose: 'Indicates recent blood clot formation and breakdown',
    highCauses: ['Blood clots', 'Surgery', 'Trauma', 'Cancer', 'Pregnancy'],
    lowCauses: ['No recent clot formation'],
    clinicalSignificance: 'Elevated levels suggest recent clot formation but are not specific'
  },

  // Tumor Markers
  'AFP': {
    purpose: 'Tumor marker for liver and testicular cancers',
    highCauses: ['Liver cancer', 'Testicular cancer', 'Liver disease', 'Pregnancy'],
    lowCauses: ['Normal finding'],
    clinicalSignificance: 'Elevated levels may indicate liver or testicular cancer'
  },
  'β-hCG': {
    purpose: 'Pregnancy hormone and tumor marker',
    highCauses: ['Pregnancy', 'Testicular cancer', 'Ovarian cancer', 'Molar pregnancy'],
    lowCauses: ['Normal finding in non-pregnant individuals'],
    clinicalSignificance: 'Used for pregnancy testing and monitoring certain cancers'
  },
  'CA19-9': {
    purpose: 'Tumor marker primarily for pancreatic cancer',
    highCauses: ['Pancreatic cancer', 'Bile duct cancer', 'Liver disease', 'Pancreatitis'],
    lowCauses: ['Normal finding'],
    clinicalSignificance: 'Elevated levels may indicate pancreatic or bile duct cancer'
  },
  'CEA': {
    purpose: 'Tumor marker for colorectal and other cancers',
    highCauses: ['Colorectal cancer', 'Lung cancer', 'Breast cancer', 'Smoking', 'Inflammatory bowel disease'],
    lowCauses: ['Normal finding'],
    clinicalSignificance: 'Used to monitor treatment response in colorectal cancer'
  },
  'PSA': {
    purpose: 'Male-specific tumor marker for prostate cancer screening',
    highCauses: ['Prostate cancer', 'Benign prostatic hyperplasia', 'Prostatitis', 'Recent ejaculation'],
    lowCauses: ['Normal finding', 'Finasteride use'],
    clinicalSignificance: 'Used for prostate cancer screening in men over 50'
  }
};