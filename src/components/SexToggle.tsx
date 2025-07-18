import { User } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SexToggleProps {
  currentSex: 'male' | 'female';
  onSexChange: (sex: 'male' | 'female') => void;
  className?: string;
}

export const SexToggle = ({
  currentSex,
  onSexChange,
  className = '',
}: SexToggleProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
              <User className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                Reference ranges:
              </span>
              <Select value={currentSex} onValueChange={onSexChange}>
                <SelectTrigger className="w-20 h-7 text-sm border-0 bg-transparent p-0 focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">
                    <div className="flex items-center space-x-2">
                      <span>Male</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="female">
                    <div className="flex items-center space-x-2">
                      <span>Female</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-center">
              <p className="font-medium">Sex-specific reference ranges</p>
              <p className="text-xs text-gray-600 mt-1">
                Switch between male and female ranges for more accurate results
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};