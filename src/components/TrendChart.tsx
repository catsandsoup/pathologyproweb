import { Line } from 'recharts';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

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
  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Trends</h2>
        <Select value={selectedParameter} onValueChange={onParameterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select parameter" />
          </SelectTrigger>
          <SelectContent>
            {parameters.map((param) => (
              <SelectItem key={param} value={param}>
                {param}
              </SelectItem>
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
            <Tooltip />
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