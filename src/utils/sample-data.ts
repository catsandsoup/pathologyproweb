
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
  
  // Apply profile-specific adjustments
  if (profile === 'healthy-female') {
    // Female-specific adjustments
    if (paramName === 'Haemoglobin') {
      adjustedMin = 115; adjustedMax = 155; // Lower range for females
    } else if (paramName === 'Haematocrit') {
      adjustedMin = 0.36; adjustedMax = 0.46; // Lower range for females
    } else if (paramName === 'Testosterone') {
      return 0; // Skip male testosterone for females
    }
  } else if (profile === 'healthy-male') {
    // Skip female-specific hormones for males
    if (['Oestradiol', 'Progesterone', 'Testosterone (Female)'].includes(paramName)) {
      return 0;
    }
  } else if (profile.includes('elderly')) {
    // Elderly adjustments - slightly different ranges
    if (paramName === 'eGFR') {
      adjustedMin = 60; adjustedMax = 90; // Lower kidney function in elderly
    } else if (paramName === 'Creatinine') {
      adjustedMin = 70; adjustedMax = 120; // Slightly higher in elderly
    }
    
    // Gender-specific elderly adjustments
    if (profile === 'elderly-female') {
      if (paramName === 'Haemoglobin') {
        adjustedMin = 110; adjustedMax = 150;
      } else if (['Oestradiol', 'Progesterone'].includes(paramName)) {
        adjustedMin = 10; adjustedMax = 50; // Post-menopausal levels
      } else if (paramName === 'Testosterone') {
        return 0; // Skip male testosterone
      }
    } else if (profile === 'elderly-male') {
      if (['Oestradiol', 'Progesterone', 'Testosterone (Female)'].includes(paramName)) {
        return 0; // Skip female hormones
      } else if (paramName === 'Testosterone') {
        adjustedMin = 6; adjustedMax = 25; // Lower testosterone in elderly males
      }
    }
  }
  
  // Skip if adjusted to 0 (gender-inappropriate test)
  if (adjustedMax === 0) return 0;
  
  // Generate a value in the middle 60% of the reference range
  const range = adjustedMax - adjustedMin;
  const safeMin = adjustedMin + (range * 0.2);
  const safeMax = adjustedMax - (range * 0.2);
  return Number((safeMin + Math.random() * (safeMax - safeMin)).toFixed(2));
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
