// Simple test to verify reference range resolution
const testReferenceRanges = () => {
  console.log('Testing reference range resolution...');
  
  // Test data
  const testParameters = ['Haemoglobin', 'Hemoglobin', 'haemoglobin', 'hemoglobin'];
  const testSexes = ['male', 'female', undefined];
  
  testParameters.forEach(param => {
    testSexes.forEach(sex => {
      console.log(`Testing: ${param} with sex: ${sex || 'unspecified'}`);
      // This would call ReferenceRangeResolver.getRangeForParameter(param, sex)
      // But we can't run it here without the full environment
    });
  });
};

console.log('Test file created. This would test reference range resolution in the browser console.');