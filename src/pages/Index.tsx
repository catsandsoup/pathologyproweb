import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { TrendChart } from '@/components/TrendChart';
import { MetricCard } from '@/components/MetricCard';

const Index = () => {
  const [data, setData] = useState<any[]>([]);
  const [parameters, setParameters] = useState<string[]>([]);
  const [selectedParameter, setSelectedParameter] = useState<string>('');

  const handleDataLoaded = (loadedData: any[]) => {
    if (loadedData.length > 0) {
      // Filter out the date column and any empty columns
      const params = Object.keys(loadedData[0]).filter(key => 
        key !== 'date' && loadedData[0][key] !== undefined
      );
      setParameters(params);
      setSelectedParameter(params[0]);
      setData(loadedData);
    }
  };

  const calculateTrend = (param: string) => {
    if (data.length < 2) return 0;
    const currentValue = Number(data[data.length - 1][param]);
    const previousValue = Number(data[data.length - 2][param]);
    
    if (isNaN(currentValue) || isNaN(previousValue) || previousValue === 0) {
      return 0;
    }
    
    return ((currentValue - previousValue) / previousValue) * 100;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold mb-8">Blood Test Tracker</h1>
      
      {data.length === 0 ? (
        <FileUpload onDataLoaded={handleDataLoaded} />
      ) : (
        <div className="space-y-6">
          <TrendChart
            data={data}
            parameters={parameters}
            selectedParameter={selectedParameter}
            onParameterChange={setSelectedParameter}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {parameters.map((param) => {
              const latestValue = data[data.length - 1]?.[param];
              const trend = calculateTrend(param);
              
              return (
                <MetricCard
                  key={param}
                  title={param}
                  value={Number(latestValue)}
                  unit="units"
                  trend={trend}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;