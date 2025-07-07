import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { DataPoint, Metric } from '@/types/blood-test';
import { PARAMETERS } from '@/types/blood-tests';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

interface BloodTestPDFProps {
  data: DataPoint[];
  metrics: Metric[];
}

export const BloodTestPDF: React.FC<BloodTestPDFProps> = ({ data, metrics }) => {
  const getLatestReading = (parameter: string): number | null => {
    for (let i = data.length - 1; i >= 0; i--) {
      const value = data[i][parameter];
      if (value !== undefined && value !== null && !isNaN(value)) {
        return value;
      }
    }
    return null;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Blood Test Results</Text>
          <Text>Generated on: {format(new Date(), 'dd MMM yyyy')}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.header}>Test Results</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Parameter</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Value</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Reference Range</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Status</Text>
              </View>
            </View>
            {metrics.map((metric) => {
              const paramInfo = PARAMETERS.find(p => p.name === metric.name);
              const latestValue = getLatestReading(metric.name);
              const status = latestValue !== null && paramInfo?.referenceRange
                ? latestValue < paramInfo.referenceRange.min
                  ? 'Low'
                  : latestValue > paramInfo.referenceRange.max
                    ? 'High'
                    : 'Normal'
                : 'N/A';

              return (
                <View style={styles.tableRow} key={metric.name}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{metric.name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {latestValue !== null ? `${latestValue} ${metric.unit}` : 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {paramInfo?.referenceRange 
                        ? `${paramInfo.referenceRange.min}-${paramInfo.referenceRange.max} ${paramInfo.referenceRange.unit}`
                        : 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{status}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
};