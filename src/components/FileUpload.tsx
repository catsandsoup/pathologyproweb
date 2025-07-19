import React from 'react';
import { Upload } from 'lucide-react';
import { FileUploadProps } from '@/types/blood-test';
import { AppleLargeTitle, AppleTitle2, AppleBody, AppleCallout, AppleCaption1 } from '@/components/ui/apple-typography';

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
      <div className="text-center apple-spacing-12 apple-gap-4">
        <AppleLargeTitle className="apple-text-label tracking-tight">
          Take Control of Your Health
        </AppleLargeTitle>
        <AppleTitle2 className="apple-text-secondary max-w-2xl mx-auto leading-relaxed">
          Transform your blood test results into actionable health insights with beautiful visualizations
        </AppleTitle2>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 apple-gap-6 apple-spacing-12 w-full max-w-3xl">
        <div className="text-center apple-p-4">
          <div className="w-12 h-12 mx-auto apple-spacing-3 apple-rounded-medium bg-apple-green/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-apple-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <AppleBody className="apple-text-label mb-1">100% Private</AppleBody>
          <AppleCaption1 className="apple-text-secondary">All processing happens locally in your browser</AppleCaption1>
        </div>
        <div className="text-center apple-p-4">
          <div className="w-12 h-12 mx-auto apple-spacing-3 apple-rounded-medium bg-apple-blue/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <AppleBody className="apple-text-label mb-1">Smart Analysis</AppleBody>
          <AppleCaption1 className="apple-text-secondary">Automatic trend detection and health insights</AppleCaption1>
        </div>
        <div className="text-center apple-p-4">
          <div className="w-12 h-12 mx-auto apple-spacing-3 apple-rounded-medium bg-apple-purple/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-apple-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <AppleBody className="apple-text-label mb-1">Instant Results</AppleBody>
          <AppleCaption1 className="apple-text-secondary">Beautiful charts and insights in seconds</AppleCaption1>
        </div>
      </div>
      
      {/* Upload Section */}
      <div className="w-full max-w-2xl">
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="w-full apple-p-12 apple-bg-secondary border-2 border-dashed border-apple-separator apple-rounded-large 
                     text-center transition-all duration-200 hover:border-apple-red hover:apple-bg-tertiary
                     focus-within:border-apple-red focus-within:apple-bg-tertiary
                     apple-shadow-small"
        >
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer apple-gap-6">
            <div className="w-20 h-20 mx-auto apple-spacing-8 apple-rounded-xlarge bg-apple-red/10 
                          flex items-center justify-center
                          transition-all duration-200 hover:bg-apple-red/20">
              <Upload className="w-10 h-10 text-apple-red" />
            </div>
            <div className="apple-gap-3">
              <AppleTitle2 className="apple-text-label tracking-tight">
                Drop your blood test file here
              </AppleTitle2>
              <AppleBody className="apple-text-secondary">
                or click to upload
              </AppleBody>
              <div className="apple-spacing-4 apple-gap-2">
                <AppleCaption1 className="apple-text-secondary">
                  Supports Excel (.xlsx, .xls) and CSV files
                </AppleCaption1>
                <div className="flex items-center justify-center">
                  <a 
                    href="/PathologyPro_Template.xlsx" 
                    download="PathologyPro_Template.xlsx"
                    className="apple-caption-1 text-apple-red hover:text-apple-red/80 underline"
                  >
                    Download Template File
                  </a>
                </div>
              </div>
            </div>
          </label>
        </div>
        
        {/* Privacy Notice */}
        <div className="apple-spacing-6 apple-p-4 bg-apple-green/10 border border-apple-green/30 apple-rounded-medium">
          <div className="flex items-start apple-gap-3">
            <svg className="w-5 h-5 text-apple-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <AppleCallout className="text-apple-green mb-1 font-medium">Your data stays private</AppleCallout>
              <AppleCaption1 className="text-apple-green/80">
                Files are processed locally in your browser and never leave your device. No data is stored on our servers.
              </AppleCaption1>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="apple-spacing-4 apple-p-4 bg-apple-red/10 border border-apple-red/30 apple-rounded-medium">
          <div className="flex items-start apple-gap-3">
            <svg className="w-5 h-5 text-apple-red mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <AppleCallout className="text-apple-red mb-1 font-medium">Important Legal Notice</AppleCallout>
              <AppleCaption1 className="text-apple-red/80">
                This tool displays data only - no medical advice, diagnosis, or treatment recommendations are provided. 
                Use at your own risk. By using this tool, you agree to hold the creator harmless from any claims or liability.
              </AppleCaption1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};