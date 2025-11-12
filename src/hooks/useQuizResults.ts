import { useLocalStorage } from './useLocalStorage';

export interface QuizResult {
  quizId: string;
  quizName: string;
  score: number;
  totalQuestions: number;
  totalTime: number;
  percentage: number;
  completedAt: string; // ISO date string
}

/**
 * Custom hook for managing quiz results in localStorage
 * Provides methods to save, retrieve, and analyze quiz performance
 *
 * @returns Object with quiz results and utility methods
 *
 * @example
 * const { results, saveResult, getResultsByQuiz, getBestScore } = useQuizResults();
 *
 * // Save a new result
 * saveResult({
 *   quizId: 'quiz-1',
 *   quizName: 'História do Brasil',
 *   score: 8,
 *   totalQuestions: 10,
 *   totalTime: 120
 * });
 *
 * // Get all attempts for a quiz
 * const attempts = getResultsByQuiz('quiz-1');
 *
 * // Get best score for a quiz
 * const best = getBestScore('quiz-1');
 */
export const useQuizResults = () => {
  const [results, setResults] = useLocalStorage<QuizResult[]>('quiz-results', []);

  /**
   * Save a new quiz result
   */
  const saveResult = (result: Omit<QuizResult, 'percentage' | 'completedAt'>) => {
    const newResult: QuizResult = {
      ...result,
      percentage: (result.score / result.totalQuestions) * 100,
      completedAt: new Date().toISOString(),
    };

    setResults(prev => [...prev, newResult]);
    return newResult;
  };

  /**
   * Get all results for a specific quiz
   */
  const getResultsByQuiz = (quizId: string): QuizResult[] => {
    return results.filter(r => r.quizId === quizId);
  };

  /**
   * Get best score for a specific quiz
   */
  const getBestScore = (quizId: string): QuizResult | null => {
    const quizResults = getResultsByQuiz(quizId);
    if (quizResults.length === 0) return null;

    return quizResults.reduce((best, current) =>
      current.score > best.score ? current : best
    );
  };

  /**
   * Get average score for a specific quiz
   */
  const getAverageScore = (quizId: string): number | null => {
    const quizResults = getResultsByQuiz(quizId);
    if (quizResults.length === 0) return null;

    const total = quizResults.reduce((sum, r) => sum + r.score, 0);
    return total / quizResults.length;
  };

  /**
   * Get total number of quizzes completed
   */
  const getTotalCompleted = (): number => {
    return results.length;
  };

  /**
   * Get overall statistics
   */
  const getOverallStats = () => {
    if (results.length === 0) {
      return {
        totalQuizzes: 0,
        averagePercentage: 0,
        totalTime: 0,
        perfectScores: 0,
      };
    }

    const totalPercentage = results.reduce((sum, r) => sum + r.percentage, 0);
    const totalTime = results.reduce((sum, r) => sum + r.totalTime, 0);
    const perfectScores = results.filter(r => r.percentage === 100).length;

    return {
      totalQuizzes: results.length,
      averagePercentage: totalPercentage / results.length,
      totalTime,
      perfectScores,
    };
  };

  /**
   * Clear all results
   */
  const clearResults = () => {
    setResults([]);
  };

  /**
   * Clear results for a specific quiz
   */
  const clearQuizResults = (quizId: string) => {
    setResults(prev => prev.filter(r => r.quizId !== quizId));
  };

  return {
    results,
    saveResult,
    getResultsByQuiz,
    getBestScore,
    getAverageScore,
    getTotalCompleted,
    getOverallStats,
    clearResults,
    clearQuizResults,
  };
};
