import { Card } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  trend: number;
}

export const MetricCard = ({ title, value, unit, trend }: MetricCardProps) => {
  // Format value only if it's a valid number
  const formattedValue = typeof value === 'number' && !isNaN(value) ? value.toFixed(1) : '-';
  
  return (
    <Card className="p-6 space-y-2 hover:shadow-md transition-shadow duration-200">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="flex items-baseline gap-2">
        <div className="text-4xl font-semibold tracking-tight">{formattedValue}</div>
        <div className="text-sm text-gray-500">{unit}</div>
      </div>
      {trend !== 0 && typeof trend === 'number' && !isNaN(trend) && (
        <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} />}
          <span>{Math.abs(trend).toFixed(1)}%</span>
        </div>
      )}
    </Card>
  );
};