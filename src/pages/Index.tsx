import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { DataPoint, Metric } from '@/types/blood-test';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { FileUpload } from '@/components/FileUpload';
import { processExcelData } from '@/utils/excel-processor';
import { TrendChart } from '@/components/TrendChart';
import { PARAMETER_CATEGORIES } from '@/types/blood-tests';

const BloodTestDashboard: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [parameters, setParameters] = useState<string[]>([]);
  const [selectedParameter, setSelectedParameter] = useState<string>('');
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [hasData, setHasData] = useState(false);

  const handleFileUpload = (fileData: Uint8Array) => {
    try {
      const { chartData, calculatedMetrics, parameters: processedParams } = processExcelData(fileData);
      
      if (chartData && chartData.length > 0 && processedParams && processedParams.length > 0) {
        setData(chartData);
        setParameters(processedParams);
        setSelectedParameter(processedParams[0]);
        
        // Filter out metrics that don't have any data
        const metricsWithData = calculatedMetrics.filter(metric => {
          const hasValue = chartData.some(point => 
            point[metric.name] !== undefined && 
            point[metric.name] !== null
          );
          return hasValue;
        });
        
        setMetrics(metricsWithData);
        setHasData(true);
      } else {
        throw new Error('No valid data found in the file');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while processing the file');
    }
  };

  const getLatestReading = (parameter: string): number | null => {
    for (let i = data.length - 1; i >= 0; i--) {
      const value = data[i][parameter];
      if (value !== undefined && value !== null && !isNaN(value)) {
        return value;
      }
    }
    return null;
  };

  // Group metrics by category
  const groupedMetrics = metrics.reduce((acc, metric) => {
    const category = Object.entries(PARAMETER_CATEGORIES).find(([_, value]) => 
      metrics.find(m => m.name === metric.name)?.category === value
    )?.[1] || 'Other';
    
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(metric);
    return acc;
  }, {} as Record<string, Metric[]>);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {!hasData ? (
        <FileUpload onFileUpload={handleFileUpload} />
      ) : (
        <>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-red-500" />
              <h1 className="text-2xl font-semibold">Blood Tests</h1>
            </div>
          </div>

          <TrendChart
            data={data}
            parameters={parameters}
            selectedParameter={selectedParameter}
            onParameterChange={setSelectedParameter}
          />

          <div className="space-y-6">
            {Object.entries(groupedMetrics).map(([category, categoryMetrics]) => (
              <div key={category} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryMetrics.map((metric) => {
                    const latestValue = getLatestReading(metric.name);
                    return latestValue !== null && (
                      <HealthMetricCard
                        key={metric.name}
                        title={metric.name}
                        value={latestValue}
                        unit={metric.unit}
                        trend={metric.trend}
                        isSelected={selectedParameter === metric.name}
                        onClick={() => setSelectedParameter(metric.name)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BloodTestDashboard;