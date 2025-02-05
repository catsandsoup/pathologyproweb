
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';
import { DataPoint, Metric } from '@/types/blood-test';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { FileUpload } from '@/components/FileUpload';
import { processExcelData } from '@/utils/excel-processor';

const BloodTestDashboard: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [parameters, setParameters] = useState<string[]>([]);
  const [selectedParameter, setSelectedParameter] = useState<string>('');
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [hasData, setHasData] = useState(false);

  const handleFileUpload = (fileData: Uint8Array) => {
    try {
      const { chartData, calculatedMetrics, parameters: processedParams } = processExcelData(fileData);
      setData(chartData);
      setParameters(processedParams);
      setSelectedParameter(processedParams[0]);
      setMetrics(calculatedMetrics);
      setHasData(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred while processing the file');
    }
  };

  const formatDate = (date: Date): string => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {!hasData ? (
        <FileUpload onFileUpload={handleFileUpload} />
      ) : (
        <>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-red-500" />
              <h1 className="text-2xl font-semibold">Blood Tests</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">Select Parameter:</span>
              <select
                value={selectedParameter}
                onChange={(e) => setSelectedParameter(e.target.value)}
                className="p-2 rounded-lg border border-gray-200 min-w-[200px] bg-white"
              >
                {parameters.map((param) => (
                  <option key={param} value={param}>{param}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">{selectedParameter}</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 text-sm">Latest Reading</span>
                    <div className="text-2xl font-semibold">
                      {data[data.length - 1]?.[selectedParameter] || 'N/A'}
                      <span className="text-sm text-gray-500 ml-1">
                        {metrics.find(m => m.name === selectedParameter)?.unit}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Change</span>
                    <div className={`text-xl font-semibold ${
                      metrics.find(m => m.name === selectedParameter)?.trend > 0 
                        ? 'text-green-500' 
                        : metrics.find(m => m.name === selectedParameter)?.trend < 0 
                          ? 'text-red-500' 
                          : ''
                    }`}>
                      {metrics.find(m => m.name === selectedParameter)?.trend > 0 ? '+' : ''}
                      {metrics.find(m => m.name === selectedParameter)?.trend.toFixed(1) || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDate}
                      stroke="#9CA3AF"
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                      labelFormatter={(date: Date) => {
                        if (!date || !(date instanceof Date)) return '';
                        return date.toLocaleDateString('en-US', { 
                          month: 'long',
                          year: 'numeric'
                        });
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey={selectedParameter}
                      stroke="#FF2D55"
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#FF2D55' }}
                      activeDot={{ r: 6, fill: '#FF2D55' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <HealthMetricCard
                key={metric.name}
                title={metric.name}
                value={metric.value}
                unit={metric.unit}
                trend={metric.trend}
                isSelected={selectedParameter === metric.name}
                onClick={() => setSelectedParameter(metric.name)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BloodTestDashboard;
