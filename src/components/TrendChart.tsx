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
        <Select value={selectedParameter} onValueChange={onParameterChange}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select parameter" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(PARAMETER_CATEGORIES).map((category) => (
              <SelectGroup key={category}>
                <SelectLabel className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                  {category}
                </SelectLabel>
                {parameters
                  .filter(param => PARAMETERS.find(p => p.name === param)?.category === category)
                  .map((param) => (
                    <SelectItem key={param} value={param}>
                      {param}
                    </SelectItem>
                  ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <RechartsTooltip />
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