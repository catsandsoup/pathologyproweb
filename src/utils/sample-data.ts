
import { DataPoint, Metric } from '@/types/blood-test';
import { PARAMETERS } from '@/types/blood-tests';

export type DemoProfile = 'healthy-male' | 'healthy-female' | 'elderly-male' | 'elderly-female';

// Generate a series of dates for the last 6 months
const generateDates = (count: number): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date();
    date.setMonth(today.getMonth() - i);
    dates.push(date);
  }
  
  return dates;
};

// Generate a healthy value within the reference range with profile-specific adjustments
const generateHealthyValue = (min: number, max: number, profile: DemoProfile, paramName: string): number => {
  let adjustedMin = min;
  let adjustedMax = max;
  
  // Gender-inappropriate tests - return 0 to exclude
  const maleOnlyTests = [
    'PSA', 'Prostate Specific Antigen', 'Prostate-Specific Antigen', 'PSA Total'
  ];
  
  const femaleOnlyTests = [
    'Oestradiol', 'Estradiol', 'E2', 'Progesterone', 'Testosterone (Female)',
    'β-hCG', 'Beta hCG', 'Human Chorionic Gonadotropin', 'hCG', 'β-Human Chorionic Gonadotropin'
  ];
  
  // Apply profile-specific adjustments
  if (profile === 'healthy-female') {
    // Exclude male-only tests
    if (maleOnlyTests.includes(paramName) || paramName === 'Testosterone') {
      return 0;
    }
    
    // Female-specific adjustments for blood parameters
    if (paramName === 'Haemoglobin') {
      adjustedMin = 120; adjustedMax = 160; // WHO female range
    } else if (paramName === 'Haematocrit') {
      adjustedMin = 0.37; adjustedMax = 0.47; // Female range
    } else if (paramName === 'RBC') {
      adjustedMin = 4.2; adjustedMax = 5.4; // Female RBC range
    } else if (paramName === 'Ferritin') {
      adjustedMin = 15; adjustedMax = 120; // Lower for menstruating women
    } else if (paramName === 'Creatinine') {
      adjustedMin = 50; adjustedMax = 90; // Lower muscle mass in females
    } else if (paramName === 'Urate') {
      adjustedMin = 0.16; adjustedMax = 0.40; // Lower uric acid in females
    }
    
  } else if (profile === 'healthy-male') {
    // Exclude female-only tests
    if (femaleOnlyTests.includes(paramName)) {
      return 0;
    }
    
    // Male-specific adjustments
    if (paramName === 'Haemoglobin') {
      adjustedMin = 140; adjustedMax = 180; // WHO male range
    } else if (paramName === 'Haematocrit') {
      adjustedMin = 0.42; adjustedMax = 0.50; // Male range
    } else if (paramName === 'RBC') {
      adjustedMin = 4.7; adjustedMax = 6.1; // Male RBC range
    } else if (paramName === 'Ferritin') {
      adjustedMin = 30; adjustedMax = 250; // Higher in males
    } else if (paramName === 'Creatinine') {
      adjustedMin = 70; adjustedMax = 110; // Higher muscle mass in males
    } else if (paramName === 'Urate') {
      adjustedMin = 0.24; adjustedMax = 0.48; // Higher uric acid in males
    }
    
  } else if (profile.includes('elderly')) {
    // Age-related changes for elderly (65+ years)
    
    // Kidney function decline with age
    if (paramName === 'eGFR') {
      adjustedMin = 60; adjustedMax = 85; // Realistic decline for healthy elderly
    } else if (paramName === 'Creatinine') {
      adjustedMin = 80; adjustedMax = 130; // Slightly elevated but still healthy
    }
    
    // Bone markers change with age
    if (paramName === 'ALP') {
      adjustedMin = 40; adjustedMax = 140; // Can be slightly elevated
    } else if (paramName === 'Calcium') {
      adjustedMin = 2.20; adjustedMax = 2.50; // Slightly lower absorption
    }
    
    // Inflammation markers may be slightly higher
    if (paramName === 'ESR') {
      adjustedMin = 5; adjustedMax = 30; // Age-adjusted ESR
    } else if (paramName === 'CRP') {
      adjustedMin = 0; adjustedMax = 8; // Slightly higher baseline inflammation
    }
    
    // Lipid changes with age
    if (paramName === 'Total Cholesterol') {
      adjustedMin = 3.5; adjustedMax = 6.5; // Often higher in elderly
    }
    
    // Gender-specific elderly adjustments
    if (profile === 'elderly-female') {
      // Exclude male-only tests
      if (maleOnlyTests.includes(paramName) || paramName === 'Testosterone') {
        return 0;
      }
      
      // Post-menopausal changes
      if (paramName === 'Haemoglobin') {
        adjustedMin = 115; adjustedMax = 155; // Slightly lower than young females
      } else if (['Oestradiol', 'Estradiol', 'E2'].includes(paramName)) {
        adjustedMin = 10; adjustedMax = 80; // Post-menopausal levels
      } else if (paramName === 'Progesterone') {
        adjustedMin = 0.5; adjustedMax = 5; // Very low post-menopause
      } else if (paramName === 'FSH') {
        adjustedMin = 25; adjustedMax = 135; // Elevated post-menopause
      } else if (paramName === 'LH') {
        adjustedMin = 15; adjustedMax = 65; // Elevated post-menopause
      } else if (paramName === 'Ferritin') {
        adjustedMin = 20; adjustedMax = 200; // Higher after menopause
      }
      
    } else if (profile === 'elderly-male') {
      // Exclude female-only tests
      if (femaleOnlyTests.includes(paramName)) {
        return 0;
      }
      
      // Age-related male changes
      if (paramName === 'Testosterone') {
        adjustedMin = 8; adjustedMax = 22; // Natural decline with age
      } else if (paramName === 'PSA') {
        adjustedMin = 0; adjustedMax = 4.0; // Can be slightly elevated with age
      } else if (paramName === 'Haemoglobin') {
        adjustedMin = 130; adjustedMax = 170; // Slightly lower than young males
      }
    }
  }
  
  // Skip if adjusted to 0 (gender-inappropriate test)
  if (adjustedMax === 0) return 0;
  
  // Ensure we have valid ranges
  if (adjustedMin >= adjustedMax) {
    adjustedMax = adjustedMin + 1;
  }
  
  // Generate a value in the middle 70% of the reference range (healthy individuals)
  const range = adjustedMax - adjustedMin;
  const safeMin = adjustedMin + (range * 0.15);
  const safeMax = adjustedMax - (range * 0.15);
  
  const value = safeMin + Math.random() * (safeMax - safeMin);
  
  // Round appropriately based on typical precision
  if (value < 1) {
    return Number(value.toFixed(3));
  } else if (value < 10) {
    return Number(value.toFixed(2));
  } else if (value < 100) {
    return Number(value.toFixed(1));
  } else {
    return Number(value.toFixed(0));
  }
};

const getProfileDescription = (profile: DemoProfile): string => {
  switch (profile) {
    case 'healthy-male':
      return 'Sample blood test results for a healthy adult male';
    case 'healthy-female':
      return 'Sample blood test results for a healthy adult female';
    case 'elderly-male':
      return 'Sample blood test results for a healthy elderly male';
    case 'elderly-female':
      return 'Sample blood test results for a healthy elderly female';
    default:
      return 'Sample blood test results for a healthy individual';
  }
};

export const generateSampleData = (profile: DemoProfile = 'healthy-male') => {
  const dates = generateDates(6); // 6 months of data
  const parameters = PARAMETERS.filter(param => param.referenceRange);

  // Generate chart data
  const chartData: DataPoint[] = dates.map(date => {
    const dataPoint: DataPoint = { date };
    parameters.forEach(param => {
      if (param.referenceRange) {
        const value = generateHealthyValue(
          param.referenceRange.min,
          param.referenceRange.max,
          profile,
          param.name
        );
        if (value > 0) { // Only include if not skipped
          dataPoint[param.name] = value;
        }
      }
    });
    return dataPoint;
  });

  // Generate metrics - only for parameters that have data
  const calculatedMetrics: Metric[] = parameters.map(param => {
    if (!param.referenceRange) return null;
    
    const latestValue = generateHealthyValue(
      param.referenceRange.min,
      param.referenceRange.max,
      profile,
      param.name
    );
    
    if (latestValue === 0) return null; // Skip gender-inappropriate tests
    
    const previousValue = generateHealthyValue(
      param.referenceRange.min,
      param.referenceRange.max,
      profile,
      param.name
    );

    return {
      name: param.name,
      value: latestValue.toString(),
      unit: param.referenceRange.unit,
      trend: latestValue - previousValue,
      category: param.category
    };
  }).filter((metric): metric is Metric => metric !== null);

  return {
    chartData,
    calculatedMetrics,
    parameters: calculatedMetrics.map(m => m.name),
    profileDescription: getProfileDescription(profile)
  };
};
