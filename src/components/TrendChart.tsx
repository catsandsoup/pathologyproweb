import { Line, ReferenceLine } from 'recharts';
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
import { format } from 'date-fns';

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
  const selectedParamInfo = PARAMETERS.find(p => p.name === selectedParameter);
  const referenceRange = selectedParamInfo?.referenceRange;

  // Format date for X-axis
  const formatXAxis = (tickItem: string) => {
    if (!tickItem) return '';
    const date = new Date(tickItem);
    return format(date, 'MMM yyyy');
  };

  // Show all parameters in the dropdown, but indicate which ones have data
  const availableParameters = PARAMETERS.map(param => ({
    ...param,
    hasData: parameters.includes(param.name)
  }));

  // Find first parameter with data to use as default
  const firstAvailableParameter = parameters[0] || availableParameters[0]?.name;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-semibold">Trends</h2>
          {selectedParamInfo && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    {selectedParamInfo.description}
                    {referenceRange && (
                      <span className="block mt-1 text-sm text-muted-foreground">
                        Normal range: {referenceRange.min}-{referenceRange.max} {referenceRange.unit}
                      </span>
                    )}
                  </p>
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
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select parameter" />
          </SelectTrigger>
          <SelectContent>
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
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxis}
              minTickGap={50}
            />
            <YAxis />
            <RechartsTooltip 
              labelFormatter={(label) => format(new Date(label), 'dd MMM yyyy')}
              formatter={(value) => (typeof value === 'number' ? value.toFixed(2) : value)}
            />
            {referenceRange && (
              <>
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