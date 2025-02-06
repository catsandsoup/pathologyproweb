import React from 'react';
import { TrendingUp, TrendingDown, Circle, AlertCircle, Info } from 'lucide-react';
import { HealthMetricCardProps } from '@/types/blood-test';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PARAMETERS } from '@/types/blood-tests';
import { Line } from 'recharts';

export const HealthMetricCard: React.FC<HealthMetricCardProps> = ({ 
  title, 
  value, 
  unit, 
  trend, 
  onClick, 
  isSelected,
  historicalData = [] 
}) => {
  const formattedValue = typeof value === 'number' 
    ? value < 1 
      ? value.toFixed(3)
      : value.toFixed(2)
    : 'N/A';

  const paramInfo = PARAMETERS.find(p => p.name === title);
  const referenceRange = paramInfo?.referenceRange;
  
  const getSeverityColor = (value: number) => {
    if (!referenceRange) return 'bg-white';
    
    const { min, max } = referenceRange;
    const criticalLow = min - (min * 0.3); // 30% below min
    const criticalHigh = max + (max * 0.3); // 30% above max
    
    if (value <= criticalLow || value >= criticalHigh) {
      return 'bg-red-50 border-red-500';
    }
    if (value < min || value > max) {
      return 'bg-yellow-50 border-yellow-500';
    }
    return 'bg-green-50 border-green-500';
  };

  const getValueStatus = (value: number) => {
    if (!referenceRange) return null;
    const { min, max } = referenceRange;
    
    if (value < min) {
      return {
        status: 'Low',
        implications: [
          'May indicate deficiency',
          'Could affect body functions',
          'Common causes:',
          '- Nutritional deficiency',
          '- Underlying medical condition',
          '- Medication effects'
        ]
      };
    }
    if (value > max) {
      return {
        status: 'High',
        implications: [
          'May indicate excess',
          'Could suggest underlying condition',
          'Common causes:',
          '- Inflammation',
          '- Organ dysfunction',
          '- Medication effects'
        ]
      };
    }
    return {
      status: 'Normal',
      implications: ['Within healthy range']
    };
  };

  const valueStatus = typeof value === 'number' ? getValueStatus(value) : null;
  const severityColor = typeof value === 'number' ? getSeverityColor(value) : 'bg-white';

  const miniChartData = historicalData.map(point => ({
    value: point[title],
    date: new Date(point.date)
  })).filter(point => point.value !== undefined && point.value !== null);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            onClick={onClick}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
              isSelected ? 'border-2 border-blue-500' : severityColor
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">{title}</span>
              <div className="flex items-center gap-2">
                {valueStatus?.status === 'High' || valueStatus?.status === 'Low' ? (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                ) : null}
                {trend > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : trend < 0 ? (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-400" />
                )}
                <Info className="w-4 h-4 text-blue-500" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-semibold">{formattedValue}</span>
              <span className="ml-1 text-sm text-gray-500">{unit}</span>
            </div>
            {miniChartData.length > 1 && (
              <div className="h-10 mt-2">
                <Line
                  data={miniChartData}
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  dot={false}
                />
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-64 p-3">
          <div className="space-y-2">
            <div className="font-semibold">{title}</div>
            {referenceRange && (
              <div className="text-sm">
                Normal range: {referenceRange.min}-{referenceRange.max} {referenceRange.unit}
              </div>
            )}
            {paramInfo?.description && (
              <div className="text-sm text-gray-500">{paramInfo.description}</div>
            )}
            {valueStatus && (
              <div className="mt-2">
                <div className="font-medium">{valueStatus.status}</div>
                <ul className="text-sm text-gray-500 list-disc pl-4 mt-1">
                  {valueStatus.implications.map((implication, index) => (
                    <li key={index}>{implication}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};