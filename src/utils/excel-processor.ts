import * as XLSX from 'xlsx';
import { DataPoint, Metric } from '@/types/blood-test';

export const processExcelData = (fileData: Uint8Array) => {
  try {
    const workbook = XLSX.read(fileData, {
      type: 'array',
      cellDates: true,
      dateNF: 'yyyy-mm-dd'
    });
    
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    // Get header row with dates
    const headerRow = rawData[0] as string[];
    const dateColumns: { index: number; date: Date }[] = [];
    
    // Process date columns (starting from index 2)
    for (let i = 2; i < headerRow.length; i++) {
      const dateStr = headerRow[i];
      if (dateStr) {
        try {
          // Handle different date formats
          let date: Date;
          if (dateStr.includes('/')) {
            const [day, month, year] = dateStr.split('/').map(Number);
            date = new Date(year, month - 1, day);
          } else {
            date = new Date(dateStr);
          }
          if (!isNaN(date.getTime())) {
            dateColumns.push({ index: i, date });
          }
        } catch (e) {
          console.warn(`Invalid date format for column ${i}: ${dateStr}`);
        }
      }
    }

    // Sort date columns chronologically
    dateColumns.sort((a, b) => a.date.getTime() - b.date.getTime());

    const params = new Set<string>();
    const testData: { [key: string]: { date: Date; value: number }[] } = {};
    const units: { [key: string]: string } = {};

    // Process each row
    for (let rowIndex = 1; rowIndex < rawData.length; rowIndex++) {
      const row = rawData[rowIndex] as (string | number)[];
      const paramName = row[0]?.toString();
      const unit = row[1]?.toString() || '';
      
      if (paramName && paramName !== 'Unit' && !paramName.includes('(')) {
        params.add(paramName);
        units[paramName] = unit;
        testData[paramName] = [];
        
        // Process values for each date column
        dateColumns.forEach(({ index, date }) => {
          const value = row[index];
          if (value !== undefined && value !== '') {
            const numValue = typeof value === 'number' ? value : parseFloat(value);
            if (!isNaN(numValue)) {
              testData[paramName].push({ date, value: numValue });
            }
          }
        });
      }
    }

    // Create chartData array
    const chartData: DataPoint[] = dateColumns.map(({ date }) => {
      const dataPoint: DataPoint = { date };
      params.forEach(param => {
        const paramData = testData[param];
        const matchingData = paramData.find(d => d.date.getTime() === date.getTime());
        if (matchingData) {
          dataPoint[param] = matchingData.value;
        }
      });
      return dataPoint;
    });

    // Calculate metrics
    const calculatedMetrics: Metric[] = Array.from(params).map(param => {
      const paramData = testData[param];
      const latestValue = paramData.length > 0 ? paramData[paramData.length - 1].value : undefined;
      const previousValue = paramData.length > 1 ? paramData[paramData.length - 2].value : undefined;
      
      const trend = latestValue !== undefined && previousValue !== undefined 
        ? latestValue - previousValue 
        : 0;
      
      return {
        name: param,
        value: latestValue !== undefined ? latestValue.toString() : 'N/A',
        unit: units[param],
        trend
      };
    });

    return {
      chartData,
      calculatedMetrics,
      parameters: Array.from(params)
    };
  } catch (error) {
    console.error('Error processing file:', error);
    throw new Error('Error processing file. Please make sure it matches the expected format.');
  }
};