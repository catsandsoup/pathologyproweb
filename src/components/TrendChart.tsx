import React from 'react';
import { Line, ReferenceLine, ReferenceArea } from 'recharts';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { PARAMETERS, PARAMETER_CATEGORIES, Parameter } from '@/types/blood-tests';
import { ReferenceRangeResolver } from '@/utils/reference-range-resolver';
import { Info } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';
import { AppleTitle2, AppleCaption1 } from '@/components/ui/apple-typography';

interface TrendChartProps {
  data: any[];
  parameters: string[];
  selectedParameter: string;
  onParameterChange: (value: string) => void;
  biologicalSex?: 'male' | 'female';
}

export const TrendChart = ({
  data,
  parameters,
  selectedParameter,
  onParameterChange,
  biologicalSex,
}: TrendChartProps) => {
  const isMobile = useIsMobile();
  const selectedParamInfo = PARAMETERS.find(p => p.name === selectedParameter);
  
  // Filter out data points with invalid dates and get values for selected parameter
  const validData = data.filter(item => {
    const date = new Date(item.date);
    return isValid(date);
  });

  // Use ReferenceRangeResolver for sex-specific ranges
  const referenceRange = ReferenceRangeResolver.getRangeForParameter(selectedParameter, biologicalSex);
  const hasSexSpecificRanges = ReferenceRangeResolver.hasSexSpecificRanges(selectedParameter);

  const formatXAxis = (tickItem: string) => {
    if (!tickItem) return '';
    const date = new Date(tickItem);
    if (!isValid(date)) return '';
    return format(date, isMobile ? 'MMM yy' : 'MMM yyyy');
  };

  const formatTooltipDate = (label: string) => {
    const date = new Date(label);
    if (!isValid(date)) return '';
    return format(date, 'dd MMM yyyy');
  };

  const availableParameters = PARAMETERS.map(param => ({
    ...param,
    hasData: parameters.includes(param.name)
  }));

  const firstAvailableParameter = parameters[0];

  const formatValue = (value: any) => {
    if (typeof value !== 'number') return value;
    return value.toFixed(2);
  };

  const getRecommendedFrequency = () => {
    if (!selectedParamInfo) return null;
    const category = selectedParamInfo.category;
    switch (category) {
      case 'Lipids':
        return 'Recommended every 6 months';
      case 'Liver Function':
        return 'Recommended annually';
      case 'Kidney Function':
        return 'Recommended every 6-12 months';
      default:
        return 'Frequency varies based on medical history';
    }
  };

  // Calculate Y-axis domain based on data values and reference range
  const getYAxisDomain = () => {
    const values = validData
      .map(item => item[selectedParameter])
      .filter(val => val !== undefined && val !== null && !isNaN(val));
    
    if (values.length === 0) return ['auto', 'auto'];
    
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    
    let domainMin = minValue;
    let domainMax = maxValue;
    
    // Include reference range in domain calculation if available
    if (referenceRange) {
      domainMin = Math.min(domainMin, referenceRange.min);
      domainMax = Math.max(domainMax, referenceRange.max);
    }
    
    // Calculate padding as 20% of the range for better visualization
    const range = domainMax - domainMin;
    const padding = Math.max(range * 0.2, Math.abs(domainMax) * 0.05); // Dynamic padding
    
    // Smart domain calculation - don't force to 0 unless values are close to 0
    const lowestReasonableValue = Math.min(domainMin, referenceRange?.min || domainMin);
    if (lowestReasonableValue > 10) {
      // If the lowest reasonable value is well above 0, don't force the chart to start at 0
      domainMin = Math.max(lowestReasonableValue - padding, lowestReasonableValue * 0.8);
    } else {
      // For values close to 0, it makes sense to start from 0
      domainMin = Math.max(0, domainMin - padding);
    }
    
    domainMax = domainMax + padding;
    
    // Ensure we have a reasonable range
    if (domainMax - domainMin < 2) {
      const center = (domainMax + domainMin) / 2;
      const minRange = Math.max(2, center * 0.1);
      domainMin = center - minRange / 2;
      domainMax = center + minRange / 2;
      
      // Still respect the 0 floor for most medical parameters
      if (domainMin < 0 && center > 0) {
        domainMin = 0;
        domainMax = center + minRange;
      }
    }
    
    console.log('Domain calculation:', {
      selectedParameter,
      values: values.slice(0, 3),
      referenceRange,
      calculatedDomain: [domainMin, domainMax],
      originalRange: [minValue, maxValue]
    });
    
    return [domainMin, domainMax];
  };

  return (
    <Card className={`apple-p-4 md:apple-p-6 apple-gap-4 apple-rounded-medium apple-shadow-small ${isMobile ? 'h-[500px]' : ''}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center apple-gap-4">
        <div className="flex items-center apple-gap-2">
          <AppleTitle2 className="apple-text-label">Trends</AppleTitle2>
          {selectedParamInfo && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-5 w-5 text-apple-blue" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-2">
                    <p className="max-w-xs">
                      {selectedParamInfo.description}
                    </p>
                    {referenceRange && (
                      <p className="text-sm text-muted-foreground">
                        Normal range: {referenceRange.min}-{referenceRange.max} {referenceRange.unit}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {getRecommendedFrequency()}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <Select 
          value={selectedParameter || firstAvailableParameter}
          onValueChange={onParameterChange}
          defaultValue={firstAvailableParameter}
        >
          <SelectTrigger className="w-full md:w-[220px]">
            <SelectValue placeholder="Select parameter" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {Object.entries(PARAMETER_CATEGORIES).map(([key, category]) => {
              const categoryParams = availableParameters.filter(p => p.category === category);
              if (categoryParams.length === 0) return null;
              
              return (
                <SelectGroup key={key}>
                  <SelectLabel className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                    {category}
                  </SelectLabel>
                  {categoryParams.map((param) => (
                    <SelectItem 
                      key={param.name} 
                      value={param.name}
                      className={!param.hasData ? "text-muted-foreground" : ""}
                    >
                      {param.name} {!param.hasData && "(No data)"}
                    </SelectItem>
                  ))}
                </SelectGroup>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className={`${isMobile ? 'h-[400px]' : 'h-[400px]'} w-full`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={validData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxis}
              minTickGap={30}
            />
            <YAxis domain={getYAxisDomain()} />
            <RechartsTooltip 
              labelFormatter={formatTooltipDate}
              formatter={(value, name) => [
                formatValue(value),
                name + (referenceRange ? ` (Normal: ${referenceRange.min}-${referenceRange.max} ${referenceRange.unit})` : '')
              ]}
              position={{ x: undefined, y: undefined }}
              allowEscapeViewBox={{ x: false, y: false }}
              wrapperStyle={{ 
                maxWidth: '280px', 
                wordWrap: 'break-word',
                zIndex: 1000
              }}
            />
            {referenceRange && (
              <>
                <ReferenceArea
                  y1={referenceRange.min}
                  y2={referenceRange.max}
                  fill="#f3f4f6"
                  fillOpacity={0.3}
                  stroke="none"
                />
                <ReferenceLine 
                  y={referenceRange.max} 
                  label={{ 
                    value: "Upper", 
                    position: "topRight",
                    style: { fill: "#9ca3af", fontWeight: "500", fontSize: "11px" }
                  }}
                  stroke="#d1d5db" 
                  strokeDasharray="2 2" 
                  strokeWidth={1}
                  strokeOpacity={0.8}
                />
                <ReferenceLine 
                  y={referenceRange.min} 
                  label={{ 
                    value: "Lower", 
                    position: "bottomRight",
                    style: { fill: "#9ca3af", fontWeight: "500", fontSize: "11px" }
                  }}
                  stroke="#d1d5db" 
                  strokeDasharray="2 2" 
                  strokeWidth={1}
                  strokeOpacity={0.8}
                />
              </>
            )}
            <Line
              type="monotone"
              dataKey={selectedParameter}
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: "#ef4444", strokeWidth: 2, stroke: "#ffffff", r: 4 }}
              activeDot={{ r: 6, fill: "#ef4444", stroke: "#ffffff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};