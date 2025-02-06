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
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto pt-12">
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-3xl font-semibold text-[#1C1C1E] tracking-tight">
          Import Blood Test Results
        </h1>
        <p className="text-[#8E8E93] text-lg">
          Upload your lab results to track your health metrics over time
        </p>
      </div>
      
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
            <div className="pt-8 flex items-center justify-center space-x-2">
              <p className="text-sm text-[#8E8E93]">
                Supports Excel (.xlsx, .xls) and CSV files
              </p>
            </div>
          </div>
        </label>
      </div>
      
      <p className="text-sm text-[#8E8E93] mt-6 text-center max-w-lg">
        Your privacy is important to us. Files are processed locally in your browser and are not stored on our servers. Data is only used to display your health metrics.
      </p>
    </div>
  );
};