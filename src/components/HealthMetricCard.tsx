import React from 'react';
import { TrendingUp, TrendingDown, Circle } from 'lucide-react';
import { HealthMetricCardProps } from '@/types/blood-test';

export const HealthMetricCard: React.FC<HealthMetricCardProps> = ({ 
  title, 
  value, 
  unit, 
  trend, 
  onClick, 
  isSelected 
}) => {
  // Format the value to 2 decimal places if it's a number
  const formattedValue = typeof value === 'number' 
    ? value.toFixed(2)
    : value === 'N/A' 
      ? '0.00' 
      : value;

  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
        isSelected ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white border border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        {trend > 0 ? (
          <TrendingUp className="w-4 h-4 text-green-500" />
        ) : trend < 0 ? (
          <TrendingDown className="w-4 h-4 text-red-500" />
        ) : (
          <Circle className="w-4 h-4 text-gray-400" />
        )}
      </div>
      <div className="mt-2">
        <span className="text-2xl font-semibold">{formattedValue}</span>
        <span className="ml-1 text-sm text-gray-500">{unit}</span>
      </div>
    </div>
  );
};