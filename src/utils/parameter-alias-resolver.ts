import { PARAMETER_ALIASES, PARAMETERS } from '@/types/blood-tests';

/**
 * Parameter Alias Resolver
 * Handles parameter name normalization and alias resolution
 */
export class ParameterAliasResolver {
  /**
   * Resolve a parameter name to its canonical form using aliases
   * @param inputName - The parameter name from user input (could be an alias)
   * @returns The canonical parameter name, or the original if no alias found
   */
  static resolveParameterName(inputName: string): string {
    if (!inputName) return inputName;
    
    // First, try exact match (case-sensitive)
    if (PARAMETER_ALIASES[inputName]) {
      return PARAMETER_ALIASES[inputName];
    }
    
    // Try case-insensitive match
    const lowerInput = inputName.toLowerCase();
    const aliasEntry = Object.entries(PARAMETER_ALIASES).find(
      ([alias]) => alias.toLowerCase() === lowerInput
    );
    
    if (aliasEntry) {
      return aliasEntry[1];
    }
    
    // Check if the input is already a canonical parameter name
    const canonicalParam = PARAMETERS.find(p => p.name === inputName);
    if (canonicalParam) {
      return inputName;
    }
    
    // Try case-insensitive match against canonical names
    const canonicalParamCaseInsensitive = PARAMETERS.find(
      p => p.name.toLowerCase() === lowerInput
    );
    if (canonicalParamCaseInsensitive) {
      return canonicalParamCaseInsensitive.name;
    }
    
    // Return original if no match found
    return inputName;
  }
  
  /**
   * Get all possible aliases for a canonical parameter name
   * @param canonicalName - The canonical parameter name
   * @returns Array of aliases for this parameter
   */
  static getAliasesForParameter(canonicalName: string): string[] {
    const aliases: string[] = [];
    
    // Find aliases from the PARAMETER_ALIASES mapping
    Object.entries(PARAMETER_ALIASES).forEach(([alias, canonical]) => {
      if (canonical === canonicalName) {
        aliases.push(alias);
      }
    });
    
    // Also check the parameter definition for additional aliases
    const param = PARAMETERS.find(p => p.name === canonicalName);
    if (param?.aliases) {
      aliases.push(...param.aliases);
    }
    
    // Remove duplicates and return
    return [...new Set(aliases)];
  }
  
  /**
   * Check if a parameter name (or its aliases) exists in our system
   * @param inputName - The parameter name to check
   * @returns True if the parameter exists (directly or via alias)
   */
  static parameterExists(inputName: string): boolean {
    const resolvedName = this.resolveParameterName(inputName);
    return PARAMETERS.some(p => p.name === resolvedName);
  }
  
  /**
   * Get parameter information by name (resolving aliases)
   * @param inputName - The parameter name (could be an alias)
   * @returns Parameter object if found, undefined otherwise
   */
  static getParameterByName(inputName: string) {
    const resolvedName = this.resolveParameterName(inputName);
    return PARAMETERS.find(p => p.name === resolvedName);
  }
  
  /**
   * Normalize parameter names in a data object
   * @param data - Object with parameter names as keys
   * @returns New object with normalized parameter names
   */
  static normalizeParameterNames<T>(data: Record<string, T>): Record<string, T> {
    const normalized: Record<string, T> = {};
    
    Object.entries(data).forEach(([key, value]) => {
      const resolvedKey = this.resolveParameterName(key);
      normalized[resolvedKey] = value;
    });
    
    return normalized;
  }
  
  /**
   * Get all parameter variations (canonical name + aliases) for fuzzy matching
   * @returns Map of all possible parameter names to their canonical forms
   */
  static getAllParameterVariations(): Map<string, string> {
    const variations = new Map<string, string>();
    
    // Add canonical names
    PARAMETERS.forEach(param => {
      variations.set(param.name, param.name);
      variations.set(param.name.toLowerCase(), param.name);
    });
    
    // Add aliases from PARAMETER_ALIASES
    Object.entries(PARAMETER_ALIASES).forEach(([alias, canonical]) => {
      variations.set(alias, canonical);
      variations.set(alias.toLowerCase(), canonical);
    });
    
    // Add aliases from parameter definitions
    PARAMETERS.forEach(param => {
      if (param.aliases) {
        param.aliases.forEach(alias => {
          variations.set(alias, param.name);
          variations.set(alias.toLowerCase(), param.name);
        });
      }
    });
    
    return variations;
  }
  
  /**
   * Find the best matching parameter name using fuzzy matching
   * @param inputName - The input parameter name
   * @param threshold - Similarity threshold (0-1, default 0.8)
   * @returns Best matching canonical parameter name or null
   */
  static findBestMatch(inputName: string, threshold: number = 0.8): string | null {
    if (!inputName) return null;
    
    // First try exact resolution
    const exactMatch = this.resolveParameterName(inputName);
    if (this.parameterExists(exactMatch)) {
      return exactMatch;
    }
    
    // If no exact match, try fuzzy matching
    const variations = this.getAllParameterVariations();
    const inputLower = inputName.toLowerCase();
    
    let bestMatch: string | null = null;
    let bestScore = 0;
    
    variations.forEach((canonical, variation) => {
      const score = this.calculateSimilarity(inputLower, variation.toLowerCase());
      if (score > bestScore && score >= threshold) {
        bestScore = score;
        bestMatch = canonical;
      }
    });
    
    return bestMatch;
  }
  
  /**
   * Calculate string similarity using Levenshtein distance
   * @param str1 - First string
   * @param str2 - Second string
   * @returns Similarity score (0-1)
   */
  private static calculateSimilarity(str1: string, str2: string): number {
    const maxLength = Math.max(str1.length, str2.length);
    if (maxLength === 0) return 1;
    
    const distance = this.levenshteinDistance(str1, str2);
    return (maxLength - distance) / maxLength;
  }
  
  /**
   * Calculate Levenshtein distance between two strings
   * @param str1 - First string
   * @param str2 - Second string
   * @returns Edit distance
   */
  private static levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,     // deletion
          matrix[j - 1][i] + 1,     // insertion
          matrix[j - 1][i - 1] + indicator // substitution
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }
}