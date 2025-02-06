import * as XLSX from 'xlsx';
import { DataPoint, Metric } from '@/types/blood-test';
import { PARAMETER_CATEGORIES } from '@/types/blood-tests';

const parseDate = (dateStr: string | number): Date | null => {
  console.log('Attempting to parse date:', dateStr, 'Type:', typeof dateStr);
  
  // Handle Excel date number format (1900-based system)
  if (typeof dateStr === 'number') {
    try {
      // Excel dates are counted from 1900-01-01, with 25569 being 1970-01-01
      const date = new Date(Math.round((dateStr - 25569) * 86400 * 1000));
      console.log('Parsed Excel number date:', date);
      return !isNaN(date.getTime()) ? date : null;
    } catch (error) {
      console.error('Error parsing Excel date number:', error);
      return null;
    }
  }

  // Handle string date formats
  if (typeof dateStr === 'string') {
    const cleanDateStr = dateStr.trim();
    
    // Handle DD/MM/YYYY format
    if (cleanDateStr.includes('/')) {
      try {
        const [day, month, year] = cleanDateStr.split('/').map(part => part.trim());
        // Handle invalid dates like 36/5/2019
        if (parseInt(day) > 31) {
          console.warn('Invalid day in date:', cleanDateStr);
          return null;
        }
        const date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
        console.log('Parsed DD/MM/YYYY date:', date);
        return !isNaN(date.getTime()) ? date : null;
      } catch (error) {
        console.error('Error parsing DD/MM/YYYY date:', error);
        return null;
      }
    }

    // Handle YYYY-MM-DD format
    try {
      const date = new Date(cleanDateStr);
      console.log('Parsed ISO date:', date);
      return !isNaN(date.getTime()) ? date : null;
    } catch (error) {
      console.error('Error parsing ISO date:', error);
      return null;
    }
  }

  console.warn('Unsupported date format:', dateStr);
  return null;
};

export const processExcelData = (fileData: Uint8Array) => {
  try {
    console.log('Starting file processing');
    
    // First attempt to read as CSV
    let workbook: XLSX.WorkBook;
    try {
      workbook = XLSX.read(fileData, {
        type: 'array',
        cellDates: false,
        raw: true
      });
    } catch (error) {
      console.error('Error reading file:', error);
      throw new Error('Unable to read file. Please ensure it is a valid CSV or Excel file.');
    }
    
    console.log('Workbook loaded:', {
      sheetNames: workbook.SheetNames,
      props: workbook.Props
    });

    if (!workbook.SheetNames.length) {
      throw new Error('No sheets found in the file');
    }

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    if (!sheet) {
      throw new Error('First sheet is empty');
    }

    const rawData = XLSX.utils.sheet_to_json(sheet, { 
      header: 1,
      raw: true,
      defval: null
    });
    
    console.log('Raw data sample:', {
      firstRow: rawData[0],
      secondRow: rawData[1],
      rowCount: rawData.length
    });

    if (!Array.isArray(rawData) || rawData.length < 2) {
      throw new Error('File contains insufficient data');
    }
    
    // Get header row with dates
    const headerRow = rawData[0] as (string | number)[];
    const dateColumns: { index: number; date: Date }[] = [];
    
    // Process date columns (starting from index 2)
    for (let i = 2; i < headerRow.length; i++) {
      const dateStr = headerRow[i];
      if (dateStr) {
        const parsedDate = parseDate(dateStr);
        if (parsedDate) {
          dateColumns.push({ index: i, date: parsedDate });
        } else {
          console.warn(`Invalid date format in column ${i}:`, dateStr);
        }
      }
    }

    if (dateColumns.length === 0) {
      throw new Error('No valid dates found in the header row');
    }

    // Sort date columns chronologically
    dateColumns.sort((a, b) => a.date.getTime() - b.date.getTime());

    const params = new Set<string>();
    const testData: { [key: string]: { date: Date; value: number }[] } = {};
    const units: { [key: string]: string } = {};
    const categories: { [key: string]: string } = {};

    // Process each row starting from row 1 (skipping header)
    for (let rowIndex = 1; rowIndex < rawData.length; rowIndex++) {
      const row = rawData[rowIndex] as (string | number)[];
      if (!row || !row.length) continue;

      const paramName = row[0]?.toString()?.trim();
      if (!paramName) {
        console.warn(`Skipping row ${rowIndex}: No parameter name`);
        continue;
      }

      const unit = row[1]?.toString()?.trim() || '';
      
      console.log(`Processing row ${rowIndex}:`, { paramName, unit, rowData: row });
      
      // Skip empty rows or category headers
      if (paramName === 'Unit' || paramName.includes('(')) {
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
          } else {
            console.warn(`Invalid numeric value in row ${rowIndex}, column ${index}:`, value);
          }
        }
      });
    }

    if (params.size === 0) {
      throw new Error('No valid parameters found in the file');
    }

    console.log('Processing summary:', {
      parameterCount: params.size,
      dateColumnCount: dateColumns.length,
      sampleData: Object.entries(testData)[0]
    });

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
    throw new Error(error instanceof Error ? error.message : 'Error processing file. Please check the format and try again.');
  }
};