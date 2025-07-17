import React from 'react';
import { Upload } from 'lucide-react';
import { FileUploadProps } from '@/types/blood-test';

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
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto pt-8">
      {/* Hero Section */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1C1C1E] tracking-tight">
          Take Control of Your Health
        </h1>
        <p className="text-[#8E8E93] text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
          Transform your blood test results into actionable health insights with beautiful visualizations
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-3xl">
        <div className="text-center p-4">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#1C1C1E] mb-1">100% Private</h3>
          <p className="text-sm text-[#8E8E93]">All processing happens locally in your browser</p>
        </div>
        <div className="text-center p-4">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#1C1C1E] mb-1">Smart Analysis</h3>
          <p className="text-sm text-[#8E8E93]">Automatic trend detection and health insights</p>
        </div>
        <div className="text-center p-4">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#1C1C1E] mb-1">Instant Results</h3>
          <p className="text-sm text-[#8E8E93]">Beautiful charts and insights in seconds</p>
        </div>
      </div>
      
      {/* Upload Section */}
      <div className="w-full max-w-2xl">
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="w-full p-12 bg-[#F2F2F7] border-2 border-dashed border-[#C7C7CC] rounded-2xl 
                     text-center transition-all duration-200 hover:border-[#FF2D55] hover:bg-[#F9F9FC]
                     focus-within:border-[#FF2D55] focus-within:bg-[#F9F9FC]
                     shadow-sm"
        >
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer space-y-6">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#FF2D55] bg-opacity-10 
                          flex items-center justify-center
                          transition-all duration-200 hover:bg-opacity-20">
              <Upload className="w-10 h-10 text-[#FF2D55]" />
            </div>
            <div className="space-y-3">
              <p className="text-xl font-semibold text-[#1C1C1E] tracking-tight">
                Drop your blood test file here
              </p>
              <p className="text-base text-[#8E8E93]">
                or click to upload
              </p>
              <div className="pt-4 space-y-2">
                <p className="text-sm text-[#8E8E93]">
                  Supports Excel (.xlsx, .xls) and CSV files
                </p>
                <div className="flex items-center justify-center">
                  <a 
                    href="/PathologyPro_Template.xlsx" 
                    download="PathologyPro_Template.xlsx"
                    className="text-sm text-[#FF2D55] hover:text-[#FF2D55]/80 underline"
                  >
                    Download Template File
                  </a>
                </div>
              </div>
            </div>
          </label>
        </div>
        
        {/* Privacy Notice */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-green-800 mb-1">Your data stays private</p>
              <p className="text-sm text-green-700">
                Files are processed locally in your browser and never leave your device. No data is stored on our servers.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-red-800 mb-1">Important Legal Notice</p>
              <p className="text-sm text-red-700">
                This tool displays data only - no medical advice, diagnosis, or treatment recommendations are provided. 
                Use at your own risk. By using this tool, you agree to hold the creator harmless from any claims or liability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};