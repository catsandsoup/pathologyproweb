import { ReferenceRange, Parameter, PARAMETERS } from '@/types/blood-tests';

/**
 * Service for resolving sex-specific reference ranges with fallback logic
 */
export class ReferenceRangeResolver {
  /**
   * Get the appropriate reference range for a parameter based on biological sex
   */
  static getRangeForParameter(
    parameterName: string,
    biologicalSex?: 'male' | 'female'
  ): ReferenceRange | null {
    try {
      // Find the parameter definition
      const parameter = PARAMETERS.find(p => 
        p.name === parameterName || 
        (p.aliases && p.aliases.includes(parameterName))
      );

      if (!parameter) {
        console.warn(`Parameter not found: ${parameterName}`);
        return null;
      }

      // If we have the new referenceRanges array, use it
      if (parameter.referenceRanges && parameter.referenceRanges.length > 0) {
        return this.resolveFromRangesArray(parameter.referenceRanges, biologicalSex);
      }

      // Fallback to single referenceRange for backward compatibility
      if (parameter.referenceRange) {
        return parameter.referenceRange;
      }

      console.warn(`No reference range found for parameter: ${parameterName}`);
      return null;
    } catch (error) {
      console.error(`Error resolving reference range for ${parameterName}:`, error);
      return null;
    }
  }

  /**
   * Resolve reference range from the new referenceRanges array
   */
  private static resolveFromRangesArray(
    ranges: ReferenceRange[],
    biologicalSex?: 'male' | 'female'
  ): ReferenceRange {
    // If biological sex is specified, look for sex-specific range first
    if (biologicalSex) {
      const sexSpecificRange = ranges.find(range => range.sex === biologicalSex);
      if (sexSpecificRange) {
        return sexSpecificRange;
      }
    }

    // Fall back to 'both' or unspecified sex ranges
    const broadRange = ranges.find(range => !range.sex || range.sex === 'both');
    if (broadRange) {
      return broadRange;
    }

    // If no appropriate range found, return the first available range
    return ranges[0];
  }

  /**
   * Get all available biological sexes that have specific ranges for a parameter
   */
  static getAvailableSexes(parameterName: string): ('male' | 'female')[] {
    try {
      const parameter = PARAMETERS.find(p => 
        p.name === parameterName || 
        (p.aliases && p.aliases.includes(parameterName))
      );

      if (!parameter || !parameter.referenceRanges) {
        return [];
      }

      const availableSexes: ('male' | 'female')[] = [];
      
      if (parameter.referenceRanges.some(range => range.sex === 'male')) {
        availableSexes.push('male');
      }
      
      if (parameter.referenceRanges.some(range => range.sex === 'female')) {
        availableSexes.push('female');
      }

      return availableSexes;
    } catch (error) {
      console.error(`Error getting available sexes for ${parameterName}:`, error);
      return [];
    }
  }

  /**
   * Check if a parameter has sex-specific ranges
   */
  static hasSexSpecificRanges(parameterName: string): boolean {
    return this.getAvailableSexes(parameterName).length > 0;
  }

  /**
   * Get safe reference range with comprehensive fallback logic
   */
  static getSafeRange(
    parameterName: string,
    biologicalSex?: 'male' | 'female'
  ): ReferenceRange {
    try {
      const range = this.getRangeForParameter(parameterName, biologicalSex);
      if (range) {
        return range;
      }

      // Ultimate fallback - create a generic range
      console.warn(`Using fallback range for ${parameterName}`);
      return {
        min: 0,
        max: 100,
        unit: 'units',
        sex: 'both',
        source: 'fallback'
      };
    } catch (error) {
      console.error(`Error in getSafeRange for ${parameterName}:`, error);
      // Emergency fallback
      return {
        min: 0,
        max: 100,
        unit: 'units',
        sex: 'both',
        source: 'emergency-fallback'
      };
    }
  }

  /**
   * Determine if a value is within the reference range
   */
  static isValueInRange(
    value: number,
    parameterName: string,
    biologicalSex?: 'male' | 'female'
  ): 'low' | 'normal' | 'high' | 'unknown' {
    try {
      const range = this.getRangeForParameter(parameterName, biologicalSex);
      if (!range) {
        return 'unknown';
      }

      if (value < range.min) {
        return 'low';
      } else if (value > range.max) {
        return 'high';
      } else {
        return 'normal';
      }
    } catch (error) {
      console.error(`Error checking value range for ${parameterName}:`, error);
      return 'unknown';
    }
  }
}