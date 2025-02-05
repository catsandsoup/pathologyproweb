import * as XLSX from 'xlsx';
import { DataPoint, Metric } from '@/types/blood-test';

export const processExcelData = (fileData: Uint8Array) => {
  try {
    const workbook = XLSX.read(fileData, {
      cellDates: true,
      cellStyles: true
    });
    
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const dates: Date[] = [];
    const dateColumns: string[] = [];
    
    // Find all date columns (starting from C column)
    for (let col = 'C'.charCodeAt(0); col <= 'G'.charCodeAt(0); col++) {
      const colLetter = String.fromCharCode(col);
      const cellRef = `${colLetter}1`;
      if (sheet[cellRef]) {
        const cellValue = sheet[cellRef].v;
        // Parse the date string (assuming DD/MM/YYYY format)
        const [day, month, year] = cellValue.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
          dates.push(date);
          dateColumns.push(colLetter);
        }
      }
    }

    // Sort dates in ascending order and keep track of column mapping
    const sortedDateInfo = dates.map((date, index) => ({
      date,
      column: dateColumns[index]
    })).sort((a, b) => a.date.getTime() - b.date.getTime());

    const params = new Set<string>();
    const testData: { [key: string]: { date: Date; value: number }[] } = {};
    const units: { [key: string]: string } = {};

    // Process parameters and their values
    for (let row = 2; row <= 50; row++) {
      const paramCell = sheet[`A${row}`];
      const unitCell = sheet[`B${row}`];
      
      if (paramCell && paramCell.v && paramCell.v !== 'Unit') {
        const param = paramCell.v as string;
        params.add(param);
        units[param] = unitCell?.v || '';
        
        testData[param] = [];
        
        // Use sorted date columns to collect values
        sortedDateInfo.forEach(({ date, column }) => {
          const cellValue = sheet[`${column}${row}`]?.v;
          if (typeof cellValue === 'number' && !isNaN(cellValue)) {
            testData[param].push({ date, value: cellValue });
          }
        });
      }
    }

    // Create chartData for all dates
    const chartData: DataPoint[] = sortedDateInfo.map(({ date }) => {
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

    // Calculate metrics using the latest available values
    const calculatedMetrics: Metric[] = Array.from(params).map(param => {
      const paramData = testData[param];
      // Get the latest non-null value
      const latestValue = paramData.length > 0 ? paramData[paramData.length - 1].value : undefined;
      const previousValue = paramData.length > 1 ? paramData[paramData.length - 2].value : undefined;
      
      const trend = latestValue !== undefined && previousValue !== undefined 
        ? latestValue - previousValue 
        : 0;
      
      return {
        name: param,
        value: latestValue !== undefined ? latestValue.toFixed(1) : 'N/A',
        unit: units[param],
        trend
      };
    });

    console.log('Processed Data:', { 
      chartData, 
      calculatedMetrics,
      parameters: Array.from(params),
      testData
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
