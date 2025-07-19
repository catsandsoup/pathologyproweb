import { TrendingUp, TrendingDown, Circle, AlertCircle, Info } from 'lucide-react';
import { HealthMetricCardProps } from '@/types/blood-test';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PARAMETERS } from '@/types/blood-tests';
import { ReferenceRangeResolver } from '@/utils/reference-range-resolver';
import { TEST_INFORMATION } from '@/utils/test-information';
import { AppleHeadline, AppleTitle2, AppleCaption1, AppleFootnote } from '@/components/ui/apple-typography';

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
    if (!referenceRange) return 'apple-bg-system apple-border-separator';
    
    const { min, max } = referenceRange;
    const criticalLow = min - (min * 0.3);
    const criticalHigh = max + (max * 0.3);
    
    if (value <= criticalLow || value >= criticalHigh) {
      return 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-red-100/50';
    }
    if (value < min || value > max) {
      return 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-orange-100/50';
    }
    return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-green-100/50';
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
      className={`apple-p-4 apple-rounded-medium cursor-pointer transition-all duration-200 ease-out border apple-shadow-small hover:apple-shadow-medium active:scale-95 transform ${
        isSelected ? 'border-2 border-apple-blue apple-shadow-medium' : severityColor
      }`}
    >
      <div className="flex items-center justify-between">
        <AppleCaption1 className="apple-text-secondary">{title}</AppleCaption1>
        <div className="flex items-center apple-gap-2">
          {valueStatus?.status === 'High' || valueStatus?.status === 'Low' ? (
            <AlertCircle className="w-4 h-4 text-apple-red" />
          ) : null}
          {trend > 0 ? (
            <TrendingUp className="w-4 h-4 text-apple-green" />
          ) : trend < 0 ? (
            <TrendingDown className="w-4 h-4 text-apple-red" />
          ) : (
            <Circle className="w-4 h-4 text-apple-gray" />
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="p-1 apple-rounded-small hover:bg-apple-blue/10 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Info className="w-4 h-4 text-apple-blue" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="w-96 p-4 max-w-md">
              <div className="space-y-4">
                <div className="font-semibold text-lg text-gray-900">{title}</div>
                
                {/* Test Purpose */}
                {TEST_INFORMATION[title] && (
                  <div className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-medium text-gray-900">Purpose:</span> {TEST_INFORMATION[title].purpose}
                  </div>
                )}
                
                {/* Reference Range */}
                {referenceRange && (
                  <div className="text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="font-medium text-blue-900 mb-1">Normal Range</div>
                    <div className="text-blue-800">{referenceRange.min}-{referenceRange.max} {referenceRange.unit}</div>
                    {hasSexSpecificRanges && biologicalSex && (
                      <div className="text-xs text-blue-600 mt-1">
                        Using {biologicalSex}-specific ranges
                      </div>
                    )}
                    {hasSexSpecificRanges && !biologicalSex && (
                      <div className="text-xs text-blue-600 mt-1">
                        Broad ranges (specify biological sex for more accuracy)
                      </div>
                    )}
                  </div>
                )}

                {/* Current Status and Specific Causes */}
                {valueStatus && TEST_INFORMATION[title] && (
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg ${
                      valueStatus.status === 'High' ? 'bg-red-50 border border-red-200' : 
                      valueStatus.status === 'Low' ? 'bg-yellow-50 border border-yellow-200' : 
                      'bg-green-50 border border-green-200'
                    }`}>
                      <div className={`font-medium mb-2 ${
                        valueStatus.status === 'High' ? 'text-red-700' : 
                        valueStatus.status === 'Low' ? 'text-yellow-700' : 
                        'text-green-700'
                      }`}>
                        Current Status: {valueStatus.status}
                      </div>
                      
                      {valueStatus.status === 'High' && TEST_INFORMATION[title].highCauses.length > 0 && (
                        <div className="text-sm text-red-700">
                          <div className="font-medium mb-1">Common causes of high levels:</div>
                          <ul className="space-y-1">
                            {TEST_INFORMATION[title].highCauses.slice(0, 4).map((cause, index) => (
                              <li key={index} className="flex items-start">
                                <span className="w-1 h-1 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {cause}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {valueStatus.status === 'Low' && TEST_INFORMATION[title].lowCauses.length > 0 && (
                        <div className="text-sm text-yellow-700">
                          <div className="font-medium mb-1">Common causes of low levels:</div>
                          <ul className="space-y-1">
                            {TEST_INFORMATION[title].lowCauses.slice(0, 4).map((cause, index) => (
                              <li key={index} className="flex items-start">
                                <span className="w-1 h-1 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {cause}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {valueStatus.status === 'Normal' && (
                        <div className="text-sm text-green-700">
                          Your levels are within the healthy range.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Clinical Significance */}
                {TEST_INFORMATION[title] && (
                  <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    <span className="font-medium">Clinical significance:</span> {TEST_INFORMATION[title].clinicalSignificance}
                  </div>
                )}
                
                <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                  Click the card to view this parameter's trend chart
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="apple-spacing-2">
        <div className="flex items-baseline apple-gap-2">
          <AppleTitle2 className="apple-text-label">{formattedValue}</AppleTitle2>
          <AppleCaption1 className="apple-text-secondary">{unit}</AppleCaption1>
        </div>
        {referenceRange && (
          <div className="mt-2 p-2 bg-white/60 apple-rounded-small border border-gray-200/50">
            <div className="flex items-center justify-between">
              <AppleFootnote className="apple-text-secondary font-medium">
                Normal: {referenceRange.min}-{referenceRange.max}
              </AppleFootnote>
              {hasSexSpecificRanges && (
                <div className="flex items-center apple-gap-1">
                  {biologicalSex ? (
                    <div className="px-2 py-0.5 bg-blue-100 text-blue-700 apple-rounded-small">
                      <AppleCaption1 className="font-medium">
                        {biologicalSex === 'male' ? '♂' : '♀'} Specific
                      </AppleCaption1>
                    </div>
                  ) : (
                    <div className="px-2 py-0.5 bg-gray-100 text-gray-600 apple-rounded-small">
                      <AppleCaption1 className="font-medium">Broad</AppleCaption1>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};