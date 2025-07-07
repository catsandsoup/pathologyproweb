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
import { Info } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

interface TrendChartProps {
  data: any[];
  parameters: string[];
  selectedParameter: string;
  onParameterChange: (value: string) => void;
}

export const TrendChart = ({
  data,
  parameters,
  selectedParameter,
  onParameterChange,
}: TrendChartProps) => {
  const isMobile = useIsMobile();
  const selectedParamInfo = PARAMETERS.find(p => p.name === selectedParameter);
  const referenceRange = selectedParamInfo?.referenceRange;

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

  // Filter out data points with invalid dates
  const validData = data.filter(item => {
    const date = new Date(item.date);
    return isValid(date);
  });

  return (
    <Card className={`p-4 md:p-6 space-y-4 ${isMobile ? 'h-[500px]' : ''}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl md:text-2xl font-semibold">Trends</h2>
          {selectedParamInfo && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-5 w-5 text-muted-foreground" />
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
            <YAxis />
            <RechartsTooltip 
              labelFormatter={formatTooltipDate}
              formatter={formatValue}
            />
            {referenceRange && (
              <>
                <ReferenceArea
                  y1={referenceRange.min}
                  y2={referenceRange.max}
                  fill="hsl(var(--primary) / 0.1)"
                  fillOpacity={0.3}
                />
                <ReferenceLine 
                  y={referenceRange.max} 
                  label="Max" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeDasharray="3 3" 
                />
                <ReferenceLine 
                  y={referenceRange.min} 
                  label="Min" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeDasharray="3 3" 
                />
              </>
            )}
            <Line
              type="monotone"
              dataKey={selectedParameter}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};