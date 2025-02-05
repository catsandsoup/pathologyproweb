import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, TrendingDown, Circle, Upload } from 'lucide-react';
import * as XLSX from 'xlsx';

const HealthMetricCard = ({ title, value, unit, trend, onClick, isSelected }) => (
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
      <span className="text-2xl font-semibold">{value}</span>
      <span className="ml-1 text-sm text-gray-500">{unit}</span>
    </div>
  </div>
);

const FileUpload = ({ onFileUpload }) => {
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        onFileUpload(data);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="w-full p-8 border-2 border-dashed border-gray-300 rounded-xl text-center">
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500">
          Drop your blood test Excel file here or click to upload
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Supports .xlsx, .xls, and .csv files
        </p>
      </label>
    </div>
  );
};

const AppleHealthBloodTests = () => {
  const [data, setData] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState('');
  const [metrics, setMetrics] = useState([]);
  const [hasData, setHasData] = useState(false);

  const processExcelData = (fileData) => {
    try {
      const workbook = XLSX.read(fileData, {
        cellDates: true,
        cellStyles: true
      });
      
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const dates = [];
      for (let col = 'C'.charCodeAt(0); col <= 'G'.charCodeAt(0); col++) {
        const cellRef = `${String.fromCharCode(col)}1`;
        if (sheet[cellRef]) {
          dates.push(new Date(sheet[cellRef].v));
        }
      }

      const params = new Set();
      const testData = {};
      const units = {};

      // Scan for parameters and their values
      for (let row = 2; row <= 50; row++) {
        const paramCell = sheet[`A${row}`];
        const unitCell = sheet[`B${row}`];
        if (paramCell && paramCell.v && paramCell.v !== 'Unit') {
          const param = paramCell.v;
          params.add(param);
          units[param] = unitCell?.v || '';
          testData[param] = dates.map((date, index) => {
            const colLetter = String.fromCharCode('C'.charCodeAt(0) + index);
            const value = sheet[`${colLetter}${row}`]?.v;
            return { date, value };
          });
        }
      }

      const chartData = dates.map((date, index) => {
        const dataPoint = { date };
        params.forEach(param => {
          dataPoint[param] = testData[param][index]?.value;
        });
        return dataPoint;
      });

      // Calculate metrics for each parameter
      const calculatedMetrics = Array.from(params).map(param => {
        const values = testData[param].map(d => d.value).filter(v => v !== undefined);
        const latestValue = values[values.length - 1];
        const previousValue = values[values.length - 2];
        const trend = latestValue && previousValue ? latestValue - previousValue : 0;
        
        return {
          name: param,
          value: latestValue?.toFixed(1) || 'N/A',
          unit: units[param],
          trend
        };
      });

      setData(chartData);
      setParameters(Array.from(params));
      setSelectedParameter(Array.from(params)[0]);
      setMetrics(calculatedMetrics);
      setHasData(true);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please make sure it matches the expected format.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Activity className="w-8 h-8 text-red-500" />
          <h1 className="text-2xl font-semibold">Blood Tests</h1>
        </div>
        {hasData && (
          <select
            value={selectedParameter}
            onChange={(e) => setSelectedParameter(e.target.value)}
            className="p-2 rounded-lg border border-gray-200"
          >
            {parameters.map((param) => (
              <option key={param} value={param}>{param}</option>
            ))}
          </select>
        )}
      </div>

      {!hasData ? (
        <FileUpload onFileUpload={processExcelData} />
      ) : (
        <>
          {/* Summary Section - Moved to top */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-medium mb-4">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Latest Reading</span>
                <span className="font-medium">
                  {data[data.length - 1]?.[selectedParameter] || 'N/A'} {
                    metrics.find(m => m.name === selectedParameter)?.unit
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Change from Previous</span>
                <span className={`font-medium ${
                  metrics.find(m => m.name === selectedParameter)?.trend > 0 
                    ? 'text-green-500' 
                    : metrics.find(m => m.name === selectedParameter)?.trend < 0 
                      ? 'text-red-500' 
                      : ''
                }`}>
                  {metrics.find(m => m.name === selectedParameter)?.trend > 0 ? '+' : ''}
                  {metrics.find(m => m.name === selectedParameter)?.trend?.toFixed(1) || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
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

          {/* Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-medium mb-4">{selectedParameter} Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => {
                      if (!(date instanceof Date)) return '';
                      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }}
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
                    labelFormatter={(date) => {
                      if (!(date instanceof Date)) return '';
                      return date.toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
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
        </>
      )}
    </div>
  );
};

export default AppleHealthBloodTests;