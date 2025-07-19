# Implementation Plan

## Phase 1: Foundation (Safe to Deploy)

- [x] 1. Create enhanced data structures and interfaces




  - Create new TypeScript interfaces for enhanced reference ranges
  - Add UserProfile interface for biological sex management
  - Add SessionState interface for state management
  - Ensure backward compatibility with existing ReferenceRange interface
  - _Requirements: 3.1, 3.2, 7.1_

- [ ] 2. Implement user profile state management
  - Add biological sex state to main dashboard component
  - Create session management for user preferences
  - Add state persistence for current session
  - Implement state initialization with safe defaults
  - _Requirements: 1.1, 1.5, 8.1_

- [ ] 3. Create BiologicalSexPrompt component
  - Design non-intrusive modal component for sex selection
  - Add clear explanation of why biological sex is requested
  - Implement dismissible behavior without breaking functionality
  - Add session memory for user choice
  - Create unit tests for component behavior
  - _Requirements: 1.2, 1.4, 1.5, 8.1, 8.2_

- [ ] 4. Integrate BiologicalSexPrompt into data upload flow
  - Hook prompt into existing data processing workflow
  - Trigger prompt after successful data upload and processing
  - Ensure prompt doesn't interfere with existing functionality
  - Add error handling for prompt failures
  - _Requirements: 1.1, 1.2, 3.1, 7.4_

## Phase 2: Sex-Specific Logic (Backward Compatible)

- [ ] 5. Implement ReferenceRangeResolver service
  - Create service class for resolving sex-specific reference ranges
  - Implement parameter lookup by name and aliases
  - Add fallback logic to broad ranges when sex-specific unavailable
  - Create comprehensive unit tests for all resolution scenarios
  - _Requirements: 5.1, 5.2, 5.3, 7.3, 7.4_

- [ ] 6. Create SexToggle component
  - Design toggle control for switching between male/female ranges
  - Position component in dashboard header with existing controls
  - Implement immediate recalculation of metrics on toggle
  - Add visual feedback for range changes
  - Create unit tests for toggle behavior
  - _Requirements: 2.1, 2.2, 2.3, 8.2, 8.3_

- [x] 7. Enhance HealthMetricCard with sex-specific ranges
  - Update HealthMetricCard to use ReferenceRangeResolver
  - Add visual indicators for which reference ranges are being used
  - Maintain backward compatibility with existing metric cards
  - Update trend calculations to use appropriate ranges
  - Create tests for sex-specific metric calculations
  - _Requirements: 5.4, 5.5, 8.4_

- [x] 8. Update TrendChart with sex-specific reference ranges



  - Modify TrendChart to use resolved reference ranges
  - Update normal/abnormal value highlighting based on sex
  - Ensure chart rendering works with both broad and sex-specific ranges
  - Add visual indicators for reference range source
  - Test chart behavior with range switching
  - _Requirements: 5.5, 8.3, 8.4_

## Phase 3: Parameter Migration (Gradual)

- [x] 9. Create parameter alias system
  - Implement PARAMETER_ALIASES mapping for spelling variations
  - Create alias resolution logic in parameter matching
  - Add support for "Hemoglobin"/"Haemoglobin" and other common variations
  - Update parameter normalization to use canonical names
  - Test alias resolution with various input spellings
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 10. Migrate Hematology parameters to sex-specific ranges
  - Update Hemoglobin with male (140-180 g/L) and female (120-160 g/L) ranges
  - Update Hematocrit with male (42-50%) and female (37-47%) ranges
  - Update other hematology parameters with Medscape sex-specific ranges
  - Maintain existing broad ranges as fallback
  - Create migration tests to verify no functionality breaks
  - _Requirements: 5.1, 5.2, 5.3, 6.1, 7.1_

- [x] 11. Migrate Biochemistry parameters to sex-specific ranges
  - Update Creatinine with male (62-106 μmol/L) and female (44-80 μmol/L) ranges
  - Update Ferritin with male (12-300 μg/L) and female (10-150 μg/L) ranges
  - Update Urate with male (0.24-0.51 mmol/L) and female (0.16-0.43 mmol/L) ranges
  - Convert units to match existing SI unit patterns
  - Test parameter migration with real data uploads
  - _Requirements: 5.1, 5.2, 5.3, 6.1, 7.1_

- [x] 12. Migrate remaining parameter categories
  - Update Lipid parameters with sex-specific ranges (HDL, etc.)
  - Update Iron Studies parameters with sex-specific ranges (Ferritin, Iron Saturation)
  - Update Hormone parameters with appropriate sex-specific ranges
  - Ensure all migrations maintain backward compatibility
  - Create comprehensive tests for all migrated parameters
  - _Requirements: 5.1, 5.2, 5.3, 6.1, 7.1_

## Phase 4: New Tests Integration (Category by Category)

- [x] 13. Add Cardiac enzymes category and tests
  - Create CARDIAC category in PARAMETER_CATEGORIES
  - Add Creatine kinase (CK) with sex-specific reference ranges
  - Add Creatine kinase MB (CKMB) with reference range < 5% of total CK
  - Add Cardiac Troponin T and I with appropriate ranges
  - Add High-sensitivity Troponin T with sex-specific ranges
  - Test new cardiac parameters with file uploads
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 14. Add Coagulation tests category and tests
  - Create COAGULATION category or add to HAEMATOLOGY
  - Add Prothrombin time (PT) with reference range 11-12.5 s
  - Add International normalized ratio (INR) with range 0.8-1.1
  - Add Activated partial thromboplastin time (aPTT) with range 30-40 s
  - Add Fibrinogen with reference range 2.0-4.0 g/L (converted to SI units)
  - Add D-dimer with reference range < 500 μg/L
  - Test coagulation parameters with various input formats
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 15. Add Tumor markers category and tests
  - Create TUMOR_MARKERS category in PARAMETER_CATEGORIES
  - Add α fetoprotein (AFP) with reference range < 40 ng/mL
  - Add β human chorionic gonadotropin (β-hCG) with sex-specific ranges
  - Add CA19-9 with reference range 0-37 U/mL
  - Add Carcinoembryonic antigen (CEA) with range < 2.5 ng/mL
  - Add Prostate-specific antigen (PSA) with male-specific range 0-2.5 ng/mL
  - Test tumor marker detection and categorization
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 16. Add specialized biochemistry tests
  - Add Ammonia with reference range 6-47 μmol/L
  - Add Ceruloplasmin with range 230-500 mg/L
  - Add Copper with range 100-200 μg/dL
  - Add Pyruvate with range 0.08-0.16 mmol/L
  - Add Zinc with range 75-140 μg/dL
  - Add Uric acid with sex-specific ranges (male: 0.24-0.51 mmol/L, female: 0.16-0.43 mmol/L)
  - Test specialized parameter recognition and processing
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 17. Add additional hormone tests
  - Add 17-hydroxyprogesterone with female-specific range < 80 ng/dL
  - Add ACTH with sex-specific ranges (male: 7-69 pg/mL, female: 6-58 pg/mL)
  - Add Estradiol with comprehensive female cycle ranges
  - Add Growth hormone with sex-specific ranges
  - Add Total T4 and Total T3 alongside existing Free T4/T3
  - Test hormone parameter detection and sex-specific range application
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 18. Add vitamin and mineral tests
  - Add Folate/Folic acid with range 11-57 nmol/L
  - Add Vitamin A with range 32.5-78.0 μg/dL
  - Add Vitamin B12 with range 200-800 pg/mL
  - Add Vitamin C with range 0.4-1.5 mg/dL
  - Add 1,25-Dihydroxyvitamin D alongside existing 25-OH Vitamin D
  - Convert units to match existing SI patterns where appropriate
  - Test vitamin parameter recognition and categorization
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

## Phase 5: Integration and Testing

- [ ] 19. Update PDF export with sex-specific ranges
  - Modify BloodTestPDF component to include biological sex information
  - Update PDF to show which reference ranges are being used
  - Add sex-specific range indicators in PDF output
  - Test PDF generation with both broad and sex-specific ranges
  - Ensure PDF exports work when biological sex is not specified
  - _Requirements: 2.3, 5.4, 8.4_

- [ ] 20. Enhance demo data with biological sex features
  - Update existing demo profiles to work with sex-specific ranges
  - Add biological sex information to demo profiles
  - Test demo data generation with new reference range system
  - Ensure demo profiles showcase sex-specific range differences
  - Verify demo data works with sex toggle functionality
  - _Requirements: 3.3, 8.5_

- [ ] 21. Create comprehensive integration tests
  - Test complete workflow from file upload to sex-specific analysis
  - Test sex toggle functionality across all components
  - Test parameter alias resolution with various file formats
  - Test graceful degradation when sex-specific ranges unavailable
  - Test backward compatibility with existing functionality
  - Create performance tests for new reference range resolution
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 22. Add error handling and logging
  - Implement comprehensive error handling for sex-specific range resolution
  - Add logging for parameter matching and alias resolution
  - Create fallback mechanisms for all new functionality
  - Add user-friendly error messages for range resolution failures
  - Test error scenarios and recovery mechanisms
  - _Requirements: 7.2, 7.3, 7.4_

## Phase 6: Optimization and Polish

- [ ] 23. Optimize performance and memory usage
  - Profile reference range resolution performance
  - Implement caching for frequently accessed ranges
  - Optimize parameter matching algorithms
  - Monitor memory usage with large parameter sets
  - Implement lazy loading for sex-specific ranges where beneficial
  - _Requirements: 7.5_

- [ ] 24. Add user experience enhancements
  - Add tooltips explaining sex-specific vs broad ranges
  - Implement smooth transitions when switching between ranges
  - Add visual indicators for newly added test categories
  - Create help documentation for new features
  - Add accessibility features for new UI components
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 25. Final testing and validation
  - Conduct end-to-end testing of complete feature set
  - Validate all new medical test parameters with sample data
  - Test with various file formats and parameter spellings
  - Verify no regressions in existing functionality
  - Conduct user acceptance testing for new features
  - Create final documentation and deployment guide
  - _Requirements: All requirements validation_