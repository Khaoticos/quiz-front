import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Preferences {
  soundEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
  difficulty: 'easy' | 'medium' | 'hard';
  animations: boolean;
  autoAdvance: boolean;
  showTimer: boolean;
  timerDuration: 15 | 30 | 60; // seconds per question
}

interface PreferencesContextType {
  preferences: Preferences;
  updatePreferences: (prefs: Partial<Preferences>) => void;
  resetPreferences: () => void;
  toggleSound: () => void;
  toggleAnimations: () => void;
  toggleAutoAdvance: () => void;
  toggleTimer: () => void;
}

export const defaultPreferences: Preferences = {
  soundEnabled: true,
  theme: 'system',
  difficulty: 'medium',
  animations: true,
  autoAdvance: true,
  showTimer: true,
  timerDuration: 30,
};

const PreferencesContext = createContext<PreferencesContextType | null>(null);

/**
 * Preferences Provider Component
 * Manages user preferences and settings with localStorage persistence
 *
 * @example
 * // Wrap your app with PreferencesProvider
 * <PreferencesProvider>
 *   <App />
 * </PreferencesProvider>
 *
 * // Use in components
 * const { preferences, updatePreferences, toggleSound } = usePreferences();
 */
export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    if (typeof window === 'undefined') {
      return defaultPreferences;
    }

    try {
      const stored = localStorage.getItem('quiz-preferences');
      return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
    } catch (error) {
      console.error('Error loading preferences:', error);
      return defaultPreferences;
    }
  });

  // Persist preferences to localStorage whenever they change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('quiz-preferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  }, [preferences]);

  /**
   * Update one or more preference values
   */
  const updatePreferences = (prefs: Partial<Preferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  };

  /**
   * Reset all preferences to defaults
   */
  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  /**
   * Toggle sound on/off
   */
  const toggleSound = () => {
    setPreferences(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  /**
   * Toggle animations on/off
   */
  const toggleAnimations = () => {
    setPreferences(prev => ({ ...prev, animations: !prev.animations }));
  };

  /**
   * Toggle auto-advance after answering
   */
  const toggleAutoAdvance = () => {
    setPreferences(prev => ({ ...prev, autoAdvance: !prev.autoAdvance }));
  };

  /**
   * Toggle timer visibility
   */
  const toggleTimer = () => {
    setPreferences(prev => ({ ...prev, showTimer: !prev.showTimer }));
  };

  const value: PreferencesContextType = {
    preferences,
    updatePreferences,
    resetPreferences,
    toggleSound,
    toggleAnimations,
    toggleAutoAdvance,
    toggleTimer,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

/**
 * Hook to use preferences context
 * Must be used within PreferencesProvider
 *
 * @throws Error if used outside PreferencesProvider
 *
 * @example
 * const { preferences, updatePreferences, toggleSound } = usePreferences();
 *
 * if (preferences.soundEnabled) {
 *   playSound();
 * }
 */
export const usePreferences = () => {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }

  return context;
};
