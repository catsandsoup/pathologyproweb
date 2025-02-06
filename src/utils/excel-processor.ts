import * as XLSX from 'xlsx';
import { DataPoint, Metric } from '@/types/blood-test';
import { PARAMETER_CATEGORIES } from '@/types/blood-tests';

const parseDate = (dateStr: string | number): Date | null => {
  console.log('Parsing date:', dateStr, 'Type:', typeof dateStr);
  
  // Handle Excel date number format
  if (typeof dateStr === 'number') {
    try {
      return new Date(Math.round((dateStr - 25569) * 86400 * 1000));
    } catch (error) {
      console.error('Error parsing Excel date number:', error);
    }
  }

  // Handle string date formats
  if (typeof dateStr === 'string') {
    // Try parsing DD/MM/YYYY format
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      const parsedDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }

    // Try parsing YYYY-MM-DD format
    const isoDate = new Date(dateStr);
    if (!isNaN(isoDate.getTime())) {
      return isoDate;
    }
  }

  console.warn('Failed to parse date:', dateStr);
  return null;
};

export const processExcelData = (fileData: Uint8Array) => {
  try {
    console.log('Starting file processing');
    const workbook = XLSX.read(fileData, {
      type: 'array',
      cellDates: false,
      raw: true
    });
    
    console.log('Workbook loaded:', {
      sheetNames: workbook.SheetNames,
      props: workbook.Props
    });

    if (!workbook.SheetNames.length) {
      throw new Error('No sheets found in the file');
    }

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    console.log('First sheet:', {
      range: sheet['!ref'],
      firstCell: sheet['A1']
    });

    if (!sheet) {
      throw new Error('First sheet is empty');
    }

    const rawData = XLSX.utils.sheet_to_json(sheet, { 
      header: 1,
      raw: true,
      defval: null
    });
    
    console.log('Raw data first row:', rawData[0]);
    console.log('Raw data second row:', rawData[1]);

    if (!rawData.length) {
      throw new Error('No data found in the sheet');
    }
    
    // Get header row with dates
    const headerRow = rawData[0] as (string | number)[];
    const dateColumns: { index: number; date: Date }[] = [];
    
    // Process date columns (starting from index 2)
    for (let i = 2; i < headerRow.length; i++) {
      const dateStr = headerRow[i];
      console.log(`Processing header column ${i}:`, dateStr);
      if (dateStr) {
        const parsedDate = parseDate(dateStr);
        console.log('Parsed header date:', parsedDate);
        if (parsedDate) {
          dateColumns.push({ index: i, date: parsedDate });
        } else {
          console.warn(`Invalid date format in column ${i}: ${dateStr}`);
        }
      }
    }

    // Sort date columns chronologically
    dateColumns.sort((a, b) => a.date.getTime() - b.date.getTime());
    console.log('Processed date columns:', dateColumns);

    const params = new Set<string>();
    const testData: { [key: string]: { date: Date; value: number }[] } = {};
    const units: { [key: string]: string } = {};
    const categories: { [key: string]: string } = {};

    // Process each row starting from row 1 (skipping header)
    for (let rowIndex = 1; rowIndex < rawData.length; rowIndex++) {
      const row = rawData[rowIndex] as (string | number)[];
      if (!row || !row.length) continue;

      const paramName = row[0]?.toString().trim();
      const unit = row[1]?.toString().trim() || '';
      
      console.log(`Processing row ${rowIndex}:`, { paramName, unit, row });
      
      // Skip empty rows or category headers
      if (!paramName || paramName === 'Unit' || paramName.includes('(')) {
        continue;
      }

      params.add(paramName);
      units[paramName] = unit;
      testData[paramName] = [];

      // Determine category for the parameter
      const category = Object.entries(PARAMETER_CATEGORIES).find(([_, tests]) =>
        tests.includes(paramName)
      )?.[1] || 'Other';
      categories[paramName] = category;
      
      // Process values for each date column
      dateColumns.forEach(({ index, date }) => {
        const value = row[index];
        if (value !== undefined && value !== null && value !== '') {
          const numValue = typeof value === 'number' ? value : parseFloat(value);
          if (!isNaN(numValue)) {
            testData[paramName].push({ date, value: numValue });
          }
        }
      });
    }

    if (params.size === 0 || dateColumns.length === 0) {
      throw new Error('No valid data found in the file');
    }

    console.log('Processed parameters:', Array.from(params));
    console.log('Sample test data:', Object.entries(testData)[0]);

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

    // Calculate metrics with category
    const calculatedMetrics: Metric[] = Array.from(params).map(param => {
      const paramData = testData[param] || [];
      const latestValue = paramData.length > 0 ? paramData[paramData.length - 1].value : undefined;
      const previousValue = paramData.length > 1 ? paramData[paramData.length - 2].value : undefined;
      
      const trend = latestValue !== undefined && previousValue !== undefined 
        ? latestValue - previousValue 
        : 0;
      
      return {
        name: param,
        value: latestValue !== undefined ? latestValue.toString() : 'N/A',
        unit: units[param],
        trend,
        category: categories[param]
      };
    });

    console.log('Final output:', {
      chartDataLength: chartData.length,
      metricsLength: calculatedMetrics.length,
      parametersLength: params.size
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