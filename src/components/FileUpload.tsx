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
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Hero Section - Mobile Optimized */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight tracking-tight">
            Pathologist Pro
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 md:mb-12 px-2">
            Upload your blood test results and instantly visualize trends, understand reference ranges, 
            and gain insights into your health data with professional-grade analysis tools.
          </p>
        </div>

        {/* Upload Section - Mobile Optimized */}
        <div className="max-w-2xl mx-auto mb-12 md:mb-16">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-2xl md:rounded-3xl p-8 md:p-16 text-center 
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
              <div className="w-20 h-20 md:w-24 md:h-24 bg-red-500 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8
                           transition-all duration-300 hover:bg-red-600 hover:scale-105 touch-manipulation">
                <Upload className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3 md:mb-4">
                Upload Your Results
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                Drag and drop your blood test file or click to browse
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Supports Excel (.xlsx, .xls) and CSV files
              </p>
              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-center md:gap-6">
                <ApplePrimaryButton
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="w-full md:w-auto px-8 py-3 h-12 text-base touch-manipulation"
                >
                  Choose File
                </ApplePrimaryButton>
                <button
                  onClick={() => {
                    const event = new CustomEvent('loadDemo');
                    window.dispatchEvent(event);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium text-base py-3 px-6 rounded-lg transition-colors touch-manipulation"
                >
                  Try Demo Data
                </button>
              </div>
              <div className="mt-6">
                <a 
                  href="/PathologyPro_Template.xlsx" 
                  download="PathologyPro_Template.xlsx"
                  className="text-sm text-gray-500 hover:text-gray-700 underline touch-manipulation"
                >
                  Download Template File
                </a>
              </div>
            </label>
          </div>
        </div>

        {/* Apple TV Style Feature Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-16 md:mb-24">
          {/* Privacy Feature - Apple TV Style */}
          <div className="text-left">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">Privacy First</h3>
            <p className="text-gray-600 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
              Up to unlimited blood test analysis with everything processed locally in your browser. 
              Your sensitive health data never leaves your device — synced across all your sessions. 
              Plus powerful features to protect your privacy.
            </p>
            <button className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors touch-manipulation">
              Learn more →
            </button>
          </div>
          
          {/* Analysis Feature - Apple TV Style */}
          <div className="text-left">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">Smart Analysis</h3>
            <p className="text-gray-600 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
              Advanced trend detection, sex-specific reference ranges, and comprehensive health insights. 
              Watch patterns, identify changes, and discover trends from the most sophisticated analysis tools 
              — with new insights added every upload.
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors touch-manipulation">
              Learn more →
            </button>
          </div>
          
          {/* Results Feature - Apple TV Style */}
          <div className="text-left">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">Instant Insights</h3>
            <p className="text-gray-600 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
              Experience professional-grade visualizations and beautiful charts.
            </p>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors touch-manipulation">
              Learn more →
            </button>
          </div>
        </div>


      </div>
    </div>
  );
};
