# Design Document

## Overview

This design document outlines the implementation of biological sex-specific reference ranges for blood test analysis. The solution uses a phased approach to ensure backward compatibility while adding enhanced functionality. The design emphasizes data integrity, user experience continuity, and safe migration of existing parameters.

## Architecture

### Core Data Structures

#### Enhanced Reference Range Interface
```typescript
interface ReferenceRange {
  min: number;
  max: number;
  unit: string;
  sex?: 'male' | 'female' | 'both'; // default 'both'
  source?: string; // e.g., 'medscape', 'existing'
}

interface Parameter {
  name: string;
  category: string;
  unit: string;
  referenceRanges: ReferenceRange[]; // Array of ranges
  aliases?: string[]; // Alternative spellings
  description: string;
  isNew?: boolean; // Flag for newly added tests
}
```

#### User Profile Management
```typescript
interface UserProfile {
  biologicalSex?: 'male' | 'female';
  sessionId: string;
  preferences: {
    showSexPrompt: boolean;
    rememberChoice: boolean;
  };
}
```

### Component Architecture

#### New Components
1. **BiologicalSexPrompt**: Modal for initial sex selection
2. **SexToggle**: Header control for switching between male/female ranges
3. **ReferenceRangeIndicator**: Shows which ranges are being used
4. **EnhancedHealthMetricCard**: Updated to show sex-specific ranges

#### Enhanced Existing Components
1. **Index.tsx**: Add user profile state management
2. **HealthMetricCard**: Display sex-specific reference information
3. **TrendChart**: Use appropriate ranges for visualization
4. **BloodTestPDF**: Include sex-specific ranges in exports

## Components and Interfaces

### 1. Biological Sex Selection System

#### BiologicalSexPrompt Component
- **Purpose**: Non-intrusive modal for biological sex selection
- **Trigger**: Appears after successful data upload and processing
- **Behavior**: 
  - Dismissible without selection
  - Remembers user choice for session
  - Provides clear explanation of why sex is requested
- **Integration**: Hooks into existing data processing flow

#### SexToggle Component
- **Purpose**: Allow users to switch between male/female reference ranges
- **Location**: Dashboard header, next to existing controls
- **Visibility**: Only shown when biological sex is specified
- **Behavior**: Immediate recalculation of all metrics

### 2. Reference Range Resolution System

#### ReferenceRangeResolver Service
```typescript
class ReferenceRangeResolver {
  static getRangeForParameter(
    parameterName: string, 
    biologicalSex?: 'male' | 'female'
  ): ReferenceRange {
    // 1. Find parameter by name or alias
    // 2. Filter ranges by biological sex
    // 3. Fall back to 'both' if sex-specific not available
    // 4. Return broad range if no matches
  }
  
  static getAvailableSexes(parameterName: string): ('male' | 'female')[] {
    // Return which sexes have specific ranges for this parameter
  }
}
```

### 3. Parameter Migration System

#### Migration Strategy
- **Phase 1**: Add new interface alongside existing
- **Phase 2**: Migrate parameters one category at a time
- **Phase 3**: Remove deprecated single referenceRange
- **Rollback**: Each phase can be reversed if issues occur

#### Parameter Alias System
```typescript
const PARAMETER_ALIASES = {
  'Hemoglobin': ['Haemoglobin', 'Hgb', 'Hb'],
  'Total Cholesterol': ['Cholesterol', 'Chol'],
  // ... more aliases
};
```

## Data Models

### Enhanced Parameter Structure
```typescript
// Migration-safe parameter definition
interface EnhancedParameter extends Parameter {
  // Backward compatibility
  referenceRange?: ReferenceRange; // Keep existing for fallback
  
  // New structure
  referenceRanges: ReferenceRange[];
  aliases: string[];
  migrationStatus: 'pending' | 'migrated' | 'verified';
}
```

### User Session Management
```typescript
interface SessionState {
  userProfile: UserProfile;
  dataProcessingComplete: boolean;
  sexPromptShown: boolean;
  currentReferenceMode: 'broad' | 'sex-specific';
}
```

## Error Handling

### Graceful Degradation Strategy
1. **Missing Sex-Specific Ranges**: Fall back to broad ranges
2. **Parameter Matching Failures**: Use original parameter name
3. **Reference Range Calculation Errors**: Use existing broad ranges
4. **Component Rendering Errors**: Hide sex-specific UI elements

### Error Recovery Mechanisms
```typescript
class SafeReferenceRangeProvider {
  static getSafeRange(paramName: string, sex?: string): ReferenceRange {
    try {
      return this.getOptimalRange(paramName, sex);
    } catch (error) {
      console.warn(`Falling back to broad range for ${paramName}:`, error);
      return this.getBroadRange(paramName);
    }
  }
}
```

## Testing Strategy

### Unit Testing Approach
1. **Reference Range Resolution**: Test all combinations of parameters and sexes
2. **Parameter Matching**: Test alias resolution and spelling variations
3. **Backward Compatibility**: Ensure existing functionality unchanged
4. **Error Handling**: Test graceful degradation scenarios

### Integration Testing
1. **Data Upload Flow**: Test complete workflow with sex selection
2. **UI State Management**: Test sex toggle and prompt interactions
3. **PDF Generation**: Test exports with sex-specific ranges
4. **Demo Data**: Test existing demo profiles with new features

### Migration Testing
1. **Parameter Migration**: Test each category migration independently
2. **Rollback Procedures**: Test ability to revert changes
3. **Data Integrity**: Verify no data corruption during migration
4. **Performance**: Ensure no significant performance degradation

## Implementation Phases

### Phase 1: Foundation (Safe to Deploy)
- Add new interfaces alongside existing ones
- Implement BiologicalSexPrompt component
- Add user profile state management
- No changes to existing parameter processing

### Phase 2: Sex-Specific Logic (Backward Compatible)
- Implement ReferenceRangeResolver
- Add SexToggle component
- Enhance HealthMetricCard with sex-specific ranges
- Maintain full backward compatibility

### Phase 3: Parameter Migration (Gradual)
- Migrate Hematology parameters first (most common)
- Add alias system for spelling variations
- Migrate Biochemistry parameters
- Continue with remaining categories

### Phase 4: New Tests Integration (Category by Category)
- Add Cardiac enzymes category
- Add Coagulation tests category
- Add Tumor markers category
- Add remaining specialized tests

### Phase 5: Optimization and Cleanup
- Remove deprecated single referenceRange
- Optimize performance
- Add advanced features (age-specific ranges, etc.)

## Migration Safety Measures

### Rollback Strategy
Each phase includes:
- Feature flags to disable new functionality
- Database/state rollback procedures
- Automated testing to verify rollback success
- User communication plan for any issues

### Data Integrity Safeguards
- All parameter changes are additive initially
- Existing parameter names and ranges preserved
- New functionality isolated from existing code paths
- Comprehensive logging for debugging

### User Experience Protection
- No breaking changes to existing workflows
- Progressive enhancement approach
- Clear user communication about new features
- Ability to opt-out of new functionality

## Performance Considerations

### Optimization Strategies
- Lazy loading of sex-specific ranges
- Caching of resolved reference ranges
- Minimal impact on existing data processing
- Efficient parameter matching algorithms

### Memory Management
- Avoid duplicating existing parameter data
- Use references where possible
- Clean up unused ranges and aliases
- Monitor memory usage during migration

This design ensures a safe, systematic approach to adding biological sex-specific reference ranges while maintaining the reliability and user experience of the existing application.