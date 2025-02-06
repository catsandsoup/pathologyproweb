import * as XLSX from 'xlsx';
import { DataPoint, Metric } from '@/types/blood-test';
import { PARAMETER_CATEGORIES } from '@/types/blood-tests';

const parseDate = (dateStr: string | number | { _type: string; value: { iso: string } }): Date | null => {
  console.log('Parsing date:', dateStr, 'Type:', typeof dateStr);
  
  // Handle Excel date object format
  if (typeof dateStr === 'object' && dateStr !== null) {
    if ('_type' in dateStr && dateStr._type === 'Date' && 'value' in dateStr) {
      const dateValue = dateStr.value;
      if ('iso' in dateValue) {
        return new Date(dateValue.iso);
      }
    }
  }

  // Handle Excel date number format
  if (typeof dateStr === 'number') {
    try {
      const date = XLSX.SSF.parse_date_code(dateStr);
      console.log('Parsed Excel date:', date);
      if (date) {
        return new Date(date.y, date.m - 1, date.d);
      }
    } catch (error) {
      console.error('Error parsing Excel date:', error);
    }
  }

  // Handle string date formats
  if (typeof dateStr === 'string') {
    // Fix incorrect date format (36/5/2019)
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      console.log('Parsing string date:', { day, month, year });
      if (parseInt(day) > 31) {
        return new Date(`${year}-${month}-01`); // Default to first of the month for invalid dates
      }
      return new Date(`${year}-${month}-${day}`);
    }

    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  }

  return null;
};

export const processExcelData = (fileData: Uint8Array) => {
  try {
    console.log('Starting Excel processing');
    const workbook = XLSX.read(fileData, {
      type: 'array',
      cellDates: true,
      dateNF: 'yyyy-mm-dd',
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

    const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    console.log('Raw data first row:', rawData[0]);
    console.log('Raw data second row:', rawData[1]);

    if (!rawData.length) {
      throw new Error('No data found in the sheet');
    }
    
    // Get header row with dates
    const headerRow = rawData[0] as (string | number | { _type: string; value: { iso: string } })[];
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
          console.warn(`Invalid date format in column ${i}:`, dateStr);
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
      const paramName = row[0]?.toString();
      const unit = row[1]?.toString() || '';
      
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
        if (value !== undefined && value !== '') {
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