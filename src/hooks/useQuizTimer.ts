import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing quiz timer logic
 * Handles countdown, auto-reset, and time-up callbacks
 *
 * @param initialTime - Starting time in seconds
 * @param onTimeUp - Callback when timer reaches 0
 * @param enabled - Whether the timer should be running
 * @returns Object with timeLeft and reset function
 */
export const useQuizTimer = (
  initialTime: number,
  onTimeUp: () => void,
  enabled: boolean = true
) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Countdown effect
  useEffect(() => {
    if (!enabled || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, enabled]);

  // Time up callback
  useEffect(() => {
    if (timeLeft === 0 && enabled) {
      onTimeUp();
    }
  }, [timeLeft, enabled, onTimeUp]);

  // Reset function with optional custom time
  const reset = useCallback((time: number = initialTime) => {
    setTimeLeft(time);
  }, [initialTime]);

  return { timeLeft, reset };
};
