import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

interface FileUploadProps {
  onDataLoaded: (data: any[]) => void;
}

export const FileUpload = ({ onDataLoaded }: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        onDataLoaded(jsonData);
        toast.success('File uploaded successfully');
      } catch (error) {
        toast.error('Error processing file');
      }
    };

    reader.readAsBinaryString(file);
  }, [onDataLoaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary"
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        <div className="text-4xl text-gray-300">📊</div>
        {isDragActive ? (
          <p className="text-primary">Drop the file here...</p>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-600">Drag & drop your blood test file here</p>
            <p className="text-sm text-gray-400">Supports Excel and CSV files</p>
          </div>
        )}
      </div>
    </div>
  );
};