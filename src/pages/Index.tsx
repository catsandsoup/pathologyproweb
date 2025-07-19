import React, { useState, useEffect } from 'react';
import { Activity, FileDown, Calendar, Play, ArrowLeft, BarChart3 } from 'lucide-react';
import { DataPoint, Metric, UserProfile, SessionState } from '@/types/blood-test';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { FileUpload } from '@/components/FileUpload';
import { BiologicalSexPrompt } from '@/components/BiologicalSexPrompt';
import { SexToggle } from '@/components/SexToggle';
import { processExcelData } from '@/utils/excel-processor';
import { generateSampleData, DemoProfile } from '@/utils/sample-data';
import {
  createInitialSessionState,
  updateUserProfileWithSex
} from '@/utils/biological-sex';
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
import { AppleLargeTitle, AppleTitle2, AppleBody, AppleCallout, AppleHeadline } from '@/components/ui/apple-typography';
import { ApplePrimaryButton, AppleSecondaryButton, AppleTertiaryButton } from '@/components/ui/apple-button';

const BloodTestDashboard: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [parameters, setParameters] = useState<string[]>([]);
  const [selectedParameter, setSelectedParameter] = useState<string>('');
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [hasData, setHasData] = useState(false);
  const [isUsingDemoData, setIsUsingDemoData] = useState(false);
  const [currentDemoProfile, setCurrentDemoProfile] = useState<DemoProfile>('healthy-male');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // New biological sex state management with error handling
  const [sessionState, setSessionState] = useState<SessionState>(() => {
    try {
      return createInitialSessionState();
    } catch (error) {
      console.error('Failed to create initial session state:', error);
      // Fallback to minimal safe state
      return {
        userProfile: {
          biologicalSex: undefined,
          sessionId: `fallback_${Date.now()}`,
          preferences: { showSexPrompt: true, rememberChoice: true }
        },
        dataProcessingComplete: false,
        sexPromptShown: false,
        currentReferenceMode: 'broad'
      };
    }
  });

  const { toast } = useToast();

  // Listen for demo loading from the landing page
  useEffect(() => {
    const handleLoadDemoFromEvent = () => {
      handleLoadDemo('healthy-male');
    };
    
    window.addEventListener('loadDemo', handleLoadDemoFromEvent);
    return () => window.removeEventListener('loadDemo', handleLoadDemoFromEvent);
  }, []);

  // Regenerate demo data when biological sex changes (only for demo data)
  useEffect(() => {
    if (isUsingDemoData && sessionState.userProfile.biologicalSex) {
      // Determine the appropriate demo profile based on current profile and new biological sex
      let newProfile: DemoProfile;
      
      if (currentDemoProfile.includes('elderly')) {
        newProfile = sessionState.userProfile.biologicalSex === 'male' ? 'elderly-male' : 'elderly-female';
      } else {
        newProfile = sessionState.userProfile.biologicalSex === 'male' ? 'healthy-male' : 'healthy-female';
      }
      
      // Only regenerate if the profile actually changed
      if (newProfile !== currentDemoProfile) {
        const { chartData, calculatedMetrics, parameters: demoParams } = generateSampleData(newProfile);
        setData(chartData);
        setParameters(demoParams);
        setMetrics(calculatedMetrics);
        setCurrentDemoProfile(newProfile);
        
        // Keep the same selected parameter if it exists in the new data
        if (selectedParameter && demoParams.includes(selectedParameter)) {
          setSelectedParameter(selectedParameter);
        } else if (demoParams.length > 0) {
          setSelectedParameter(demoParams[0]);
        }
      }
    }
  }, [sessionState.userProfile.biologicalSex, isUsingDemoData]);

  // Function to return to landing page
  const handleReturnToHome = () => {
    setHasData(false);
    setIsUsingDemoData(false);
    setData([]);
    setParameters([]);
    setMetrics([]);
    setDateRange(undefined);
    setSessionState(createInitialSessionState());
  };

  // Biological sex prompt handlers
  const handleBiologicalSexSelect = (biologicalSex: 'male' | 'female') => {
    setSessionState(prevState => ({
      ...prevState,
      userProfile: updateUserProfileWithSex(prevState.userProfile, biologicalSex),
      sexPromptShown: true,
      currentReferenceMode: 'sex-specific'
    }));

    toast({
      title: "Reference ranges updated",
      description: `Now using ${biologicalSex}-specific reference ranges for more accurate results.`,
    });
  };

  const handleBiologicalSexDismiss = () => {
    setSessionState(prevState => ({
      ...prevState,
      sexPromptShown: true,
      userProfile: {
        ...prevState.userProfile,
        preferences: {
          ...prevState.userProfile.preferences,
          showSexPrompt: false
        }
      }
    }));
  };

  // Sex toggle handler
  const handleSexToggle = (biologicalSex: 'male' | 'female') => {
    setSessionState(prevState => ({
      ...prevState,
      userProfile: updateUserProfileWithSex(prevState.userProfile, biologicalSex),
      currentReferenceMode: 'sex-specific'
    }));

    toast({
      title: "Reference ranges updated",
      description: `Switched to ${biologicalSex}-specific reference ranges.`,
    });
  };

  // Check if biological sex prompt should be shown (but not for demo data)
  const shouldShowSexPrompt =
    sessionState.dataProcessingComplete &&
    !sessionState.sexPromptShown &&
    sessionState.userProfile.preferences.showSexPrompt &&
    !sessionState.userProfile.biologicalSex &&
    !isUsingDemoData; // Don't show prompt for demo data

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

        // Update session state to indicate data processing is complete
        setSessionState(prevState => ({
          ...prevState,
          dataProcessingComplete: true
        }));
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

    // Update session state to indicate data processing is complete
    setSessionState(prevState => ({
      ...prevState,
      dataProcessingComplete: true
    }));

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
    <div className="max-w-7xl mx-auto apple-p-6 apple-gap-6 flex flex-col">
      {/* Biological Sex Prompt */}
      <BiologicalSexPrompt
        isOpen={shouldShowSexPrompt}
        onSelect={handleBiologicalSexSelect}
        onDismiss={handleBiologicalSexDismiss}
      />

      {!hasData ? (
        <div className="space-y-4">
          <FileUpload onFileUpload={handleFileUpload} />
          <div className="flex justify-center">
            <ApplePrimaryButton
              onClick={() => handleLoadDemo(currentDemoProfile)}
              className="mt-4"
            >
              <Play className="w-4 h-4 mr-2" />
              Load Demo Data
            </ApplePrimaryButton>
          </div>
        </div>
      ) : (
        <>


          {/* Mobile-Optimized Navigation Header */}
          <nav className="w-full bg-white border-b border-gray-200 shadow-sm mb-4 md:mb-6">
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
              <div className="flex items-center space-x-3 md:space-x-4">
                <button
                  onClick={handleReturnToHome}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors touch-manipulation"
                >
                  <ArrowLeft className="w-5 h-5 md:w-5 md:h-5" />
                  <span className="font-medium text-sm md:text-base">Back to Home</span>
                </button>
                <div className="hidden md:block h-6 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-base md:text-lg font-bold text-gray-900">Pathologist Pro</h1>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 bg-white p-4 md:apple-p-6 apple-rounded-large border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 md:apple-gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500 apple-rounded-medium flex items-center justify-center shadow-sm">
                <Activity className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  Blood Tests
                </div>
                {isUsingDemoData && (
                  <div className="text-xs md:text-sm text-gray-500 font-medium">Demo Mode</div>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
              {/* Sex Toggle - only show when biological sex is specified */}
              {sessionState.userProfile.biologicalSex && (
                <div className="w-full md:w-auto">
                  <SexToggle
                    currentSex={sessionState.userProfile.biologicalSex}
                    onSexChange={handleSexToggle}
                  />
                </div>
              )}

              {isUsingDemoData && (
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                  <Select value={currentDemoProfile} onValueChange={(value: DemoProfile) => setCurrentDemoProfile(value)}>
                    <SelectTrigger className="w-full md:w-[180px] h-11 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthy-male">Healthy Adult Male</SelectItem>
                      <SelectItem value="healthy-female">Healthy Adult Female</SelectItem>
                      <SelectItem value="elderly-male">Healthy Elderly Male</SelectItem>
                      <SelectItem value="elderly-female">Healthy Elderly Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <AppleTertiaryButton
                    onClick={() => {
                      setHasData(false);
                      setIsUsingDemoData(false);
                      setData([]);
                      setParameters([]);
                      setMetrics([]);
                      setDateRange(undefined);
                      setSessionState(createInitialSessionState());
                    }}
                    className="w-full md:w-auto h-11 text-sm px-4"
                  >
                    Upload Your Data
                  </AppleTertiaryButton>
                </div>
              )}
              {!isUsingDemoData && (
                <AppleTertiaryButton
                  onClick={() => {
                    setHasData(false);
                    setIsUsingDemoData(false);
                    setData([]);
                    setParameters([]);
                    setMetrics([]);
                    setDateRange(undefined);
                    setSessionState(createInitialSessionState());
                  }}
                  className="w-full md:w-auto h-11 text-sm px-4"
                >
                  Upload New File
                </AppleTertiaryButton>
              )}
              
              {/* Mobile-optimized controls */}
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal w-full md:min-w-[200px] h-11 text-sm",
                        !dateRange && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
                          </>
                        ) : (
                          format(dateRange.from, "MMM dd, y")
                        )
                      ) : (
                        <span>Filter by date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <div className="p-3">
                      <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from || new Date()}
                        selected={dateRange}
                        onSelect={(range) => {
                          setDateRange(range);
                        }}
                        numberOfMonths={1}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="text-xs text-muted-foreground">
                          {dateRange?.from && dateRange?.to
                            ? `${Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))} days`
                            : "Select dates"
                          }
                        </div>
                        {dateRange && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDateRange(undefined)}
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <PDFDownloadLink
                  document={<BloodTestPDF data={filteredData} metrics={metrics} />}
                  fileName="blood-test-results.pdf"
                >
                  {({ loading }) => (
                    <Button 
                      disabled={loading}
                      className="w-full md:w-auto h-11 text-sm px-4"
                    >
                      <FileDown className="mr-2 h-4 w-4" />
                      {loading ? "Generating..." : "Export PDF"}
                    </Button>
                  )}
                </PDFDownloadLink>
              </div>
            </div>
          </div>

          <TrendChart
            data={filteredData}
            parameters={parameters}
            selectedParameter={selectedParameter}
            onParameterChange={setSelectedParameter}
            biologicalSex={sessionState.userProfile.biologicalSex}
          />

          <div className="space-y-8">
            {Object.entries(groupedMetrics).map(([category, categoryMetrics]) => (
              <div key={category} className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{category}</h3>
                  <div className="h-px bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryMetrics.map((metric: Metric) => {
                    const latestValue = getLatestReading(metric.name);
                    return latestValue !== null ? (
                      <HealthMetricCard
                        key={metric.name}
                        title={metric.name}
                        value={latestValue}
                        unit={metric.unit}
                        trend={metric.trend}
                        isSelected={selectedParameter === metric.name}
                        onClick={() => setSelectedParameter(metric.name)}
                        historicalData={filteredData}
                        biologicalSex={sessionState.userProfile.biologicalSex}
                      />
                    ) : null;
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
