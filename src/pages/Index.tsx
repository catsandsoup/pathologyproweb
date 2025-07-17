import React, { useState } from 'react';
import { Activity, FileDown, Calendar, Play } from 'lucide-react';
import { DataPoint, Metric } from '@/types/blood-test';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { FileUpload } from '@/components/FileUpload';
import { processExcelData } from '@/utils/excel-processor';
import { generateSampleData, DemoProfile } from '@/utils/sample-data';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from '@/lib/utils';

const BloodTestDashboard: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [parameters, setParameters] = useState<string[]>([]);
  const [selectedParameter, setSelectedParameter] = useState<string>('');
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [hasData, setHasData] = useState(false);
  const [isUsingDemoData, setIsUsingDemoData] = useState(false);
  const [currentDemoProfile, setCurrentDemoProfile] = useState<DemoProfile>('healthy-male');
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
        setIsUsingDemoData(false);
      } else {
        throw new Error('No valid data found in the file');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while processing the file');
    }
  };

  const handleLoadDemo = (profile: DemoProfile = currentDemoProfile) => {
    const { chartData, calculatedMetrics, parameters: demoParams, profileDescription } = generateSampleData(profile);
    setData(chartData);
    setParameters(demoParams);
    setSelectedParameter(demoParams[0]);
    setMetrics(calculatedMetrics);
    setHasData(true);
    setIsUsingDemoData(true);
    setCurrentDemoProfile(profile);
    toast({
      title: "Demo data loaded",
      description: profileDescription,
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
        <div className="space-y-6">
          <FileUpload onFileUpload={handleFileUpload} />
          
          {/* Demo Data Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Or Try Demo Data</h3>
              <p className="text-sm text-gray-500 mb-4">
                Explore the interface with sample blood test results
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Select value={currentDemoProfile} onValueChange={(value: DemoProfile) => setCurrentDemoProfile(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select demo profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthy-male">Healthy Adult Male</SelectItem>
                  <SelectItem value="healthy-female">Healthy Adult Female</SelectItem>
                  <SelectItem value="elderly-male">Healthy Elderly Male</SelectItem>
                  <SelectItem value="elderly-female">Healthy Elderly Female</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={() => handleLoadDemo(currentDemoProfile)}
                className="bg-[#FF2D55] hover:bg-[#FF2D55]/90 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Load Demo Data
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Demo Data Banner */}
          {isUsingDemoData && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-800 mb-1">Demo Data Active</p>
                  <p className="text-sm text-blue-700">
                    You're viewing sample blood test results for a healthy individual. This data is fictional and for demonstration purposes only.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-[#FF2D55]" />
              <h1 className="text-2xl font-semibold">
                {isUsingDemoData ? "Blood Tests (Demo)" : "Blood Tests"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {isUsingDemoData && (
                <div className="flex items-center space-x-2">
                  <Select value={currentDemoProfile} onValueChange={(value: DemoProfile) => setCurrentDemoProfile(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthy-male">Healthy Adult Male</SelectItem>
                      <SelectItem value="healthy-female">Healthy Adult Female</SelectItem>
                      <SelectItem value="elderly-male">Healthy Elderly Male</SelectItem>
                      <SelectItem value="elderly-female">Healthy Elderly Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={() => handleLoadDemo(currentDemoProfile)} 
                    className="bg-[#FF2D55] hover:bg-[#FF2D55]/90 text-white"
                    size="sm"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Load Demo
                  </Button>
                  <Button 
                    onClick={() => {
                      setHasData(false);
                      setIsUsingDemoData(false);
                      setData([]);
                      setParameters([]);
                      setMetrics([]);
                      setDateRange(undefined);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Upload Your Data
                  </Button>
                </div>
              )}
              {!isUsingDemoData && (
                <Button 
                  onClick={() => {
                    setHasData(false);
                    setIsUsingDemoData(false);
                    setData([]);
                    setParameters([]);
                    setMetrics([]);
                    setDateRange(undefined);
                  }}
                  variant="outline"
                  size="sm"
                >
                  Upload New File
                </Button>
              )}
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
