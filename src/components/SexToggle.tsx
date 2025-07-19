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
    <div className={`flex items-center ${className}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-3 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <User className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-blue-700 whitespace-nowrap">
                  Reference ranges:
                </span>
                <Select value={currentSex} onValueChange={onSexChange}>
                  <SelectTrigger className="w-[80px] h-8 text-sm border border-blue-300 bg-white hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">
                      <span className="font-medium">Male</span>
                    </SelectItem>
                    <SelectItem value="female">
                      <span className="font-medium">Female</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
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