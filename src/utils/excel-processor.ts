import * as XLSX from 'xlsx';
import { DataPoint, Metric } from '@/types/blood-test';

export const processExcelData = (fileData: Uint8Array) => {
  try {
    const workbook = XLSX.read(fileData, {
      type: 'array',
      cellDates: true,
      dateNF: 'dd/mm/yyyy'
    });
    
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const dates: Date[] = [];
    const dateColumns: string[] = [];
    
    // Find all date columns (starting from C column)
    for (let col = 'C'.charCodeAt(0); col <= 'G'.charCodeAt(0); col++) {
      const colLetter = String.fromCharCode(col);
      const cellRef = `${colLetter}1`;
      const cell = sheet[cellRef];
      
      if (cell) {
        let date: Date | null = null;
        
        // Handle different date formats
        if (cell.t === 'd') {
          // If it's already a date object
          date = cell.v;
        } else if (typeof cell.v === 'string' && cell.v.includes('/')) {
          // If it's a date string in DD/MM/YYYY format
          const [day, month, year] = cell.v.split('/').map(Number);
          date = new Date(year, month - 1, day);
        } else if (typeof cell.v === 'number') {
          // If it's an Excel date number
          date = XLSX.SSF.parse_date_code(cell.v);
        }
        
        if (date && !isNaN(date.getTime())) {
          dates.push(date);
          dateColumns.push(colLetter);
        }
      }
    }

    if (dates.length === 0) {
      throw new Error('No valid dates found in the file');
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
        const param = paramCell.v.toString();
        params.add(param);
        units[param] = unitCell?.v?.toString() || '';
        
        testData[param] = [];
        
        // Use sorted date columns to collect values
        sortedDateInfo.forEach(({ date, column }) => {
          const cell = sheet[`${column}${row}`];
          if (cell && typeof cell.v === 'number' && !isNaN(cell.v)) {
            testData[param].push({ date, value: cell.v });
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
