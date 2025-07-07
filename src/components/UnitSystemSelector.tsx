import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUnitSystem } from '@/contexts/UnitSystemContext';
import { UnitSystem } from '@/types/blood-tests';

export const UnitSystemSelector = () => {
  const { unitSystem, setUnitSystem } = useUnitSystem();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Units
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Unit System</h4>
            <p className="text-sm text-muted-foreground">
              Choose the unit system that matches your lab reports
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Preferred Units</label>
            <Select
              value={unitSystem}
              onValueChange={(value: UnitSystem) => setUnitSystem(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="imperial">
                  Imperial/US (mg/dL, K/cu mm, etc.)
                </SelectItem>
                <SelectItem value="metric">
                  Metric/SI (mmol/L, x10^9/L, etc.)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-xs text-muted-foreground">
            <p>• Imperial units are commonly used in US labs</p>
            <p>• Metric units are commonly used internationally</p>
            <p>• Change anytime to match your lab report</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};