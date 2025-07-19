import React from 'react';
import { Upload, Shield, BarChart3, Zap, ArrowLeft } from 'lucide-react';
import { FileUploadProps } from '@/types/blood-test';
import { ApplePrimaryButton, AppleSecondaryButton } from '@/components/ui/apple-button';

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        onFileUpload(data);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Navigation Header */}
      <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BloodLog Pro</h1>
                <p className="text-xs text-gray-500">Professional Blood Test Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                About
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                Privacy
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                Support
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Take Control of Your Health
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Transform your blood test results into actionable health insights with professional-grade 
            visualizations and comprehensive analysis tools trusted by healthcare professionals.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>100% Private & Secure</span>
            <span className="mx-2">•</span>
            <span>No Data Stored</span>
            <span className="mx-2">•</span>
            <span>Instant Analysis</span>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">100% Private</h3>
            <p className="text-gray-600 leading-relaxed">
              All processing happens locally in your browser. Your sensitive health data never leaves your device.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Analysis</h3>
            <p className="text-gray-600 leading-relaxed">
              Advanced trend detection, sex-specific reference ranges, and comprehensive health insights.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Results</h3>
            <p className="text-gray-600 leading-relaxed">
              Beautiful charts, detailed explanations, and actionable insights generated in seconds.
            </p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Upload Your Blood Test Results
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Drag and drop your file or click to browse. We support Excel and CSV formats.
              </p>
              
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center 
                         transition-all duration-200 hover:border-red-400 hover:bg-red-50/50
                         focus-within:border-red-400 focus-within:bg-red-50/50"
              >
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6
                               transition-all duration-200 hover:bg-red-200">
                    <Upload className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drop your blood test file here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    or click to browse your files
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Supports Excel (.xlsx, .xls) and CSV files
                  </p>
                  <a 
                    href="/PathologyPro_Template.xlsx" 
                    download="PathologyPro_Template.xlsx"
                    className="inline-flex items-center text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Download Template File →
                  </a>
                </label>
              </div>
            </div>
            
            {/* Privacy & Legal Section */}
            <div className="bg-gray-50 p-6 space-y-4">
              {/* Privacy Notice */}
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Your Data Stays Private</h4>
                  <p className="text-sm text-green-800">
                    Files are processed locally in your browser and never leave your device. 
                    No data is stored on our servers or transmitted anywhere.
                  </p>
                </div>
              </div>

              {/* Legal Disclaimer */}
              <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1">Important Legal Notice</h4>
                  <p className="text-sm text-amber-800">
                    This tool displays data only - no medical advice, diagnosis, or treatment recommendations are provided. 
                    Use at your own risk. By using this tool, you agree to hold the creator harmless from any claims or liability.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Demo Button */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Want to see how it works first?</p>
            <ApplePrimaryButton
              onClick={() => {
                // This will be handled by the parent component
                const event = new CustomEvent('loadDemo');
                window.dispatchEvent(event);
              }}
              className="px-8 py-3"
            >
              Try Demo Data
            </ApplePrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};