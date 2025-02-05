
export interface HealthMetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  trend: number;
  onClick: () => void;
  isSelected: boolean;
}

export interface FileUploadProps {
  onFileUpload: (data: Uint8Array) => void;
}

export interface DataPoint {
  date: Date;
  [key: string]: any;
}

export interface Metric {
  name: string;
  value: string;
  unit: string;
  trend: number;
}
