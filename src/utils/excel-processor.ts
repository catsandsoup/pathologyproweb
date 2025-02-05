
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
    for (let col = 'C'.charCodeAt(0); col <= 'G'.charCodeAt(0); col++) {
      const cellRef = `${String.fromCharCode(col)}1`;
      if (sheet[cellRef]) {
        const dateValue = new Date(sheet[cellRef].v);
        if (!isNaN(dateValue.getTime())) {
          dates.push(dateValue);
        }
      }
    }

    // Sort dates in ascending order
    dates.sort((a, b) => a.getTime() - b.getTime());

    const params = new Set<string>();
    const testData: { [key: string]: { date: Date; value: number }[] } = {};
    const units: { [key: string]: string } = {};

    // First pass: collect all parameters and their values
    for (let row = 2; row <= 50; row++) {
      const paramCell = sheet[`A${row}`];
      const unitCell = sheet[`B${row}`];
      
      if (paramCell && paramCell.v && paramCell.v !== 'Unit') {
        const param = paramCell.v as string;
        params.add(param);
        units[param] = unitCell?.v || '';
        
        testData[param] = [];
        
        dates.forEach((date, index) => {
          const colLetter = String.fromCharCode('C'.charCodeAt(0) + index);
          const cellValue = sheet[`${colLetter}${row}`]?.v;
          if (typeof cellValue === 'number') {
            testData[param].push({ date, value: cellValue });
          }
        });
      }
    }

    // Create chartData using the actual data points we have
    const chartData: DataPoint[] = dates.map(date => {
      const dataPoint: DataPoint = { date };
      params.forEach(param => {
        const paramDataPoint = testData[param].find(d => d.date.getTime() === date.getTime());
        if (paramDataPoint) {
          dataPoint[param] = paramDataPoint.value;
        }
      });
      return dataPoint;
    });

    // Calculate metrics using the actual data we have
    const calculatedMetrics: Metric[] = Array.from(params).map(param => {
      const paramData = testData[param];
      const latestValue = paramData.length > 0 ? paramData[paramData.length - 1].value : undefined;
      const previousValue = paramData.length > 1 ? paramData[paramData.length - 2].value : undefined;
      
      const trend = latestValue !== undefined && previousValue !== undefined 
        ? latestValue - previousValue 
        : 0;
      
      console.log(`Parameter: ${param}, Latest: ${latestValue}, Previous: ${previousValue}, Trend: ${trend}`);
      
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
      dates,
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
