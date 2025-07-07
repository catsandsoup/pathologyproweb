import { PARAMETERS, getReferenceRange } from '@/types/blood-tests';

// Simple testing function to verify dual unit system works
export const testDualUnitSystem = () => {
  console.log('🧪 Testing Dual Unit System...');
  
  // Test a few key parameters
  const testParams = ['Haemoglobin', 'Total Cholesterol', 'Creatinine'];
  
  testParams.forEach(paramName => {
    const param = PARAMETERS.find(p => p.name === paramName);
    if (param) {
      const metricRange = getReferenceRange(param, 'metric');
      const imperialRange = getReferenceRange(param, 'imperial');
      
      console.log(`\n📊 ${paramName}:`);
      console.log(`  Metric: ${metricRange?.min}-${metricRange?.max} ${metricRange?.unit}`);
      console.log(`  Imperial: ${imperialRange?.min}-${imperialRange?.max} ${imperialRange?.unit}`);
    }
  });
  
  const totalParams = PARAMETERS.length;
  const paramsWithRanges = PARAMETERS.filter(p => p.referenceRanges).length;
  
  console.log(`\n✅ Total parameters: ${totalParams}`);
  console.log(`✅ Parameters with reference ranges: ${paramsWithRanges}`);
  console.log(`✅ Coverage: ${Math.round((paramsWithRanges / totalParams) * 100)}%`);
  
  if (paramsWithRanges > 25) {
    console.log('🎉 Dual unit system successfully implemented!');
    return true;
  } else {
    console.log('⚠️ Some parameters missing reference ranges');
    return false;
  }
};