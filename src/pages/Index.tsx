
import React, { useState } from 'react';
import { Activity, FileDown, Calendar, Play } from 'lucide-react';
import { DataPoint, Metric } from '@/types/blood-test';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { FileUpload } from '@/components/FileUpload';
import { processExcelData } from '@/utils/excel-processor';
import { generateSampleData } from '@/utils/sample-data';
import { TrendChart } from '@/components/TrendChart';
import { PARAMETER_CATEGORIES } from '@/types/blood-tests';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { BloodTestPDF } from '@/components/BloodTestPDF';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from '@/lib/utils';

const BloodTestDashboard: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [parameters, setParameters] = useState<string[]>([]);
  const [selectedParameter, setSelectedParameter] = useState<string>('');
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [hasData, setHasData] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { toast } = useToast();

  const handleFileUpload = (fileData: Uint8Array) => {
    try {
      const { chartData, calculatedMetrics, parameters: processedParams } = processExcelData(fileData);
      
      if (chartData && chartData.length > 0 && processedParams && processedParams.length > 0) {
        setData(chartData);
        setParameters(processedParams);
        setSelectedParameter(processedParams[0]);
        
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

  const handleLoadDemo = () => {
    const { chartData, calculatedMetrics, parameters: demoParams } = generateSampleData();
    setData(chartData);
    setParameters(demoParams);
    setSelectedParameter(demoParams[0]);
    setMetrics(calculatedMetrics);
    setHasData(true);
    toast({
      title: "Demo data loaded",
      description: "Sample blood test results for a healthy individual have been loaded.",
    });
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

  const filteredData = React.useMemo(() => {
    if (!dateRange?.from) return data;
    
    return data.filter(point => {
      const date = new Date(point.date);
      if (dateRange.to) {
        return date >= dateRange.from && date <= dateRange.to;
      }
      return date >= dateRange.from;
    });
  }, [data, dateRange]);

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
        <div className="space-y-4">
          <FileUpload onFileUpload={handleFileUpload} />
          <div className="flex justify-center">
            <Button 
              onClick={handleLoadDemo}
              className="mt-4"
              variant="outline"
            >
              <Play className="w-4 h-4 mr-2" />
              Load Demo Data
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-red-500" />
              <h1 className="text-2xl font-semibold">Blood Tests</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleLoadDemo} 
                variant="outline"
                size="sm"
              >
                <Play className="w-4 h-4 mr-2" />
                Reload Demo
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              
              <PDFDownloadLink
                document={<BloodTestPDF data={filteredData} metrics={metrics} />}
                fileName="blood-test-results.pdf"
              >
                {({ loading }) => (
                  <Button disabled={loading}>
                    <FileDown className="mr-2 h-4 w-4" />
                    {loading ? "Generating PDF..." : "Export PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          </div>

          <TrendChart
            data={filteredData}
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
                        historicalData={filteredData}
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
