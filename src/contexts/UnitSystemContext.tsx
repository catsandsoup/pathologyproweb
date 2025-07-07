import React, { createContext, useContext, useState, useEffect } from 'react';
import { UnitSystem } from '@/types/blood-tests';

interface UnitSystemContextType {
  unitSystem: UnitSystem;
  setUnitSystem: (system: UnitSystem) => void;
}

const UnitSystemContext = createContext<UnitSystemContextType | undefined>(undefined);

export const UnitSystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unitSystem, setUnitSystemState] = useState<UnitSystem>(() => {
    const saved = localStorage.getItem('pathology-pro-unit-system');
    return (saved as UnitSystem) || 'imperial';
  });

  const setUnitSystem = (system: UnitSystem) => {
    setUnitSystemState(system);
    localStorage.setItem('pathology-pro-unit-system', system);
  };

  const value = {
    unitSystem,
    setUnitSystem
  };

  return (
    <UnitSystemContext.Provider value={value}>
      {children}
    </UnitSystemContext.Provider>
  );
};

export const useUnitSystem = () => {
  const context = useContext(UnitSystemContext);
  if (context === undefined) {
    throw new Error('useUnitSystem must be used within a UnitSystemProvider');
  }
  return context;
};