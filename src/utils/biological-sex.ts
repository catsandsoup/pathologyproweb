import { UserProfile, SessionState } from '@/types/blood-test';

/**
 * Generate a unique session ID for user profile tracking
 */
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create a default user profile with safe defaults
 */
export const createDefaultUserProfile = (): UserProfile => {
  return {
    biologicalSex: undefined, // No default sex - user must choose
    sessionId: generateSessionId(),
    preferences: {
      showSexPrompt: true, // Show prompt by default
      rememberChoice: true, // Remember user's choice
    },
  };
};

/**
 * Create initial session state with safe defaults
 */
export const createInitialSessionState = (): SessionState => {
  return {
    userProfile: createDefaultUserProfile(),
    dataProcessingComplete: false,
    sexPromptShown: false,
    currentReferenceMode: 'broad', // Start with broad ranges
  };
};

/**
 * Check if biological sex is specified in user profile
 */
export const hasBiologicalSex = (userProfile: UserProfile): boolean => {
  return userProfile.biologicalSex !== undefined;
};

/**
 * Check if sex-specific ranges should be used
 */
export const shouldUseSexSpecificRanges = (sessionState: SessionState): boolean => {
  return (
    sessionState.dataProcessingComplete &&
    hasBiologicalSex(sessionState.userProfile) &&
    sessionState.currentReferenceMode === 'sex-specific'
  );
};

/**
 * Update user profile with biological sex selection
 */
export const updateUserProfileWithSex = (
  userProfile: UserProfile,
  biologicalSex: 'male' | 'female'
): UserProfile => {
  return {
    ...userProfile,
    biologicalSex,
    preferences: {
      ...userProfile.preferences,
      showSexPrompt: false, // Don't show prompt again this session
    },
  };
};