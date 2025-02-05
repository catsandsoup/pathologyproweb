import { Card } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  trend: number;
}

export const MetricCard = ({ title, value, unit, trend }: MetricCardProps) => {
  return (
    <Card className="p-6 space-y-2">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="flex items-end gap-2">
        <div className="text-3xl font-semibold">{value}</div>
        <div className="text-sm text-gray-500 mb-1">{unit}</div>
      </div>
      <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend > 0 ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} />}
        <span>{Math.abs(trend)}%</span>
      </div>
    </Card>
  );
};