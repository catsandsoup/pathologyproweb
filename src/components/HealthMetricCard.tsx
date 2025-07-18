import { TrendingUp, TrendingDown, Circle, AlertCircle, Info } from 'lucide-react';
import { HealthMetricCardProps } from '@/types/blood-test';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PARAMETERS } from '@/types/blood-tests';
import { ReferenceRangeResolver } from '@/utils/reference-range-resolver';
import { Line } from 'recharts';

export const HealthMetricCard = ({ 
  title, 
  value, 
  unit, 
  trend, 
  onClick, 
  isSelected,
  historicalData = [],
  biologicalSex
}: HealthMetricCardProps) => {
  const formattedValue = typeof value === 'number' 
    ? value < 1 
      ? value.toFixed(3)
      : value.toFixed(2)
    : 'N/A';

  const paramInfo = PARAMETERS.find(p => p.name === title);
  
  // Use ReferenceRangeResolver for sex-specific ranges
  const referenceRange = ReferenceRangeResolver.getRangeForParameter(title, biologicalSex);
  const hasSexSpecificRanges = ReferenceRangeResolver.hasSexSpecificRanges(title);
  
  const getSeverityColor = (value: number) => {
    if (!referenceRange) return 'bg-white';
    
    const { min, max } = referenceRange;
    const criticalLow = min - (min * 0.3);
    const criticalHigh = max + (max * 0.3);
    
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
    
    const status = ReferenceRangeResolver.isValueInRange(value, title, biologicalSex);
    
    switch (status) {
      case 'low':
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
      case 'high':
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
      case 'normal':
        return {
          status: 'Normal',
          implications: ['Within healthy range']
        };
      default:
        return null;
    }
  };

  const valueStatus = typeof value === 'number' ? getValueStatus(value) : null;
  const severityColor = typeof value === 'number' ? getSeverityColor(value) : 'bg-white';

  const miniChartData = historicalData.map(point => ({
    value: point[title],
    date: new Date(point.date)
  })).filter(point => point.value !== undefined && point.value !== null);

  return (
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
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="p-1 rounded-full hover:bg-blue-100 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Info className="w-4 h-4 text-blue-500" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="w-80 p-4 max-w-sm">
              <div className="space-y-3">
                <div className="font-semibold text-base">{title}</div>
                {referenceRange && (
                  <div className="text-sm bg-gray-50 p-2 rounded">
                    <span className="font-medium">Normal range:</span> {referenceRange.min}-{referenceRange.max} {referenceRange.unit}
                    {hasSexSpecificRanges && biologicalSex && (
                      <div className="text-xs text-blue-600 mt-1">
                        Using {biologicalSex}-specific ranges
                      </div>
                    )}
                    {hasSexSpecificRanges && !biologicalSex && (
                      <div className="text-xs text-gray-500 mt-1">
                        Broad ranges (specify biological sex for more accuracy)
                      </div>
                    )}
                  </div>
                )}
                {paramInfo?.description && (
                  <div className="text-sm text-gray-600 leading-relaxed">{paramInfo.description}</div>
                )}
                {valueStatus && (
                  <div className="mt-3 p-3 rounded-lg bg-gray-50">
                    <div className={`font-medium mb-2 ${
                      valueStatus.status === 'High' ? 'text-red-600' : 
                      valueStatus.status === 'Low' ? 'text-yellow-600' : 
                      'text-green-600'
                    }`}>
                      Status: {valueStatus.status}
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {valueStatus.implications.map((implication, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {implication}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="text-xs text-gray-500 pt-2 border-t">
                  Click the card to view this parameter's trend chart
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="mt-2">
        <span className="text-2xl font-semibold">{formattedValue}</span>
        <span className="ml-1 text-sm text-gray-500">{unit}</span>
        {referenceRange && (
          <div className="text-xs text-gray-400 mt-1">
            Normal: {referenceRange.min}-{referenceRange.max}
          </div>
        )}
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
  );
};