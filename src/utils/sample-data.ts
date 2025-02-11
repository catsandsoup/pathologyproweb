
import { DataPoint, Metric } from '@/types/blood-test';
import { PARAMETERS } from '@/types/blood-tests';

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

// Generate a healthy value within the reference range
const generateHealthyValue = (min: number, max: number): number => {
  // Generate a value in the middle 60% of the reference range
  const range = max - min;
  const safeMin = min + (range * 0.2);
  const safeMax = max - (range * 0.2);
  return Number((safeMin + Math.random() * (safeMax - safeMin)).toFixed(2));
};

export const generateSampleData = () => {
  const dates = generateDates(6); // 6 months of data
  const parameters = PARAMETERS.filter(param => param.referenceRange);

  // Generate chart data
  const chartData: DataPoint[] = dates.map(date => {
    const dataPoint: DataPoint = { date };
    parameters.forEach(param => {
      if (param.referenceRange) {
        dataPoint[param.name] = generateHealthyValue(
          param.referenceRange.min,
          param.referenceRange.max
        );
      }
    });
    return dataPoint;
  });

  // Generate metrics
  const calculatedMetrics: Metric[] = parameters.map(param => {
    if (!param.referenceRange) return null;
    
    const latestValue = generateHealthyValue(
      param.referenceRange.min,
      param.referenceRange.max
    );
    
    const previousValue = generateHealthyValue(
      param.referenceRange.min,
      param.referenceRange.max
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
    parameters: parameters.map(p => p.name)
  };
};
