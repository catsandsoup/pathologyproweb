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
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero Section - Apple Style */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            Pathologist Pro
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Upload your blood test results and instantly visualize trends, understand reference ranges, 
            and gain insights into your health data with professional-grade analysis tools.
          </p>
        </div>

        {/* Upload Section - Centered and Prominent */}
        <div className="max-w-2xl mx-auto mb-16">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-3xl p-16 text-center 
                     transition-all duration-300 hover:border-red-400 hover:bg-red-50/30
                     focus-within:border-red-400 focus-within:bg-red-50/30"
          >
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="w-24 h-24 bg-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8
                           transition-all duration-300 hover:bg-red-600 hover:scale-105">
                <Upload className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Upload Your Results
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Drag and drop your blood test file or click to browse
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Supports Excel (.xlsx, .xls) and CSV files
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <ApplePrimaryButton
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="px-8 py-3"
                >
                  Choose File
                </ApplePrimaryButton>
                <button
                  onClick={() => {
                    const event = new CustomEvent('loadDemo');
                    window.dispatchEvent(event);
                  }}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Try Demo Data
                </button>
              </div>
              <div className="mt-6">
                <a 
                  href="/PathologyPro_Template.xlsx" 
                  download="PathologyPro_Template.xlsx"
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Download Template File
                </a>
              </div>
            </label>
          </div>
        </div>

        {/* Apple TV Style Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
          {/* Privacy Feature - Apple TV Style */}
          <div className="text-left">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Privacy First</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Up to unlimited blood test analysis with everything processed locally in your browser. 
              Your sensitive health data never leaves your device — synced across all your sessions. 
              Plus powerful features to protect your privacy.
            </p>
            <button className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
              Learn more →
            </button>
          </div>
          
          {/* Analysis Feature - Apple TV Style */}
          <div className="text-left">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Smart Analysis</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Advanced trend detection, sex-specific reference ranges, and comprehensive health insights. 
              Watch patterns, identify changes, and discover trends from the most sophisticated analysis tools 
              — with new insights added every upload.
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              Learn more →
            </button>
          </div>
          
          {/* Results Feature - Apple TV Style */}
          <div className="text-left">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Instant Insights</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Stream or analyze more than 100 million data points and 30,000 parameters. 
              Experience professional-grade visualizations, the world's largest medical reference 
              database, and beautiful charts — all ad-free.
            </p>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors">
              Learn more →
            </button>
          </div>
        </div>

        {/* Additional Apple TV Style Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
          {/* Trends Feature */}
          <div className="text-left">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Trend Analysis</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Get unlimited access to over 200 incredibly detailed trend analyses, all with no ads 
              or in-app purchases. Track patterns, identify changes across your favorite 
              health metrics.
            </p>
            <button className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors">
              Learn more →
            </button>
          </div>
          
          {/* Reference Ranges */}
          <div className="text-left">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Reference Ranges</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Choose from 12 reference types, everything from general population to sex-specific ranges. 
              With new parameters added every week, five to 45 minutes. 
              And get personalized recommendations just for you.
            </p>
            <button className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors">
              Learn more →
            </button>
          </div>
          
          {/* Export & Share */}
          <div className="text-left">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Export & Share</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Access to hundreds of export formats, leading healthcare providers and sports 
              medicine coverage featuring the week's best analysis tools.
            </p>
            <button className="text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors">
              Learn more →
            </button>
          </div>
        </div>
        
        {/* Legal Notices - Minimal */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-200">
            <p className="text-sm text-green-800">
              <Shield className="w-4 h-4 inline mr-2" />
              Your data stays private - files are processed locally and never leave your device
            </p>
          </div>

          <div className="text-center p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <p className="text-sm text-amber-800">
              This tool displays data only - no medical advice provided. Use at your own risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};