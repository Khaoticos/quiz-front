import { useQuery } from '@tanstack/react-query';
import { themes } from '@/data/quizData';
import type { Theme, Quiz } from '@/data/quizData';

/**
 * Hook to fetch all quiz themes
 * Uses TanStack Query for caching and state management
 *
 * In the future, this will be replaced with actual API calls
 * Currently returns mock data from quizData.ts
 *
 * @returns Query result with themes data, loading state, and error
 *
 * @example
 * const { data: themes, isLoading, error } = useQuizzes();
 *
 * if (isLoading) return <Skeleton />;
 * if (error) return <ErrorState />;
 *
 * return themes.map(theme => <ThemeCard key={theme.id} theme={theme} />);
 */
export const useQuizzes = () => {
  return useQuery<Theme[]>({
    queryKey: ['quizzes'],
    queryFn: async () => {
      // Simulate network delay for realistic behavior
      await new Promise(resolve => setTimeout(resolve, 500));

      // In the future, replace with:
      // const response = await fetch('/api/quizzes');
      // if (!response.ok) throw new Error('Failed to fetch quizzes');
      // return response.json();

      return themes;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes - data is considered fresh
    gcTime: 1000 * 60 * 10, // 10 minutes - cache time (formerly cacheTime)
  });
};

/**
 * Hook to fetch a single quiz by ID
 * Searches through all themes to find the quiz
 *
 * @param quizId - The ID of the quiz to fetch
 * @returns Query result with quiz data, loading state, and error
 *
 * @example
 * const { data: quiz, isLoading, error } = useQuizById(quizId);
 *
 * if (isLoading) return <Skeleton />;
 * if (error) return <ErrorState />;
 * if (!quiz) return <NotFound />;
 *
 * return <QuizGame quiz={quiz} />;
 */
export const useQuizById = (quizId: string | undefined) => {
  return useQuery<Quiz | null>({
    queryKey: ['quiz', quizId],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!quizId) return null;

      // Search through all themes to find the quiz
      const allQuizzes = themes.flatMap(t => t.quizzes);
      const quiz = allQuizzes.find(q => q.id === quizId);

      if (!quiz) {
        throw new Error('Quiz não encontrado');
      }

      // In the future, replace with:
      // const response = await fetch(`/api/quizzes/${quizId}`);
      // if (!response.ok) throw new Error('Failed to fetch quiz');
      // return response.json();

      return quiz;
    },
    enabled: !!quizId, // Only run query if quizId is defined
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch quizzes by theme ID
 * Returns all quizzes that belong to a specific theme
 *
 * @param themeId - The ID of the theme
 * @returns Query result with quizzes array, loading state, and error
 *
 * @example
 * const { data: quizzes, isLoading } = useQuizzesByTheme(themeId);
 *
 * return quizzes?.map(quiz => <QuizCard key={quiz.id} quiz={quiz} />);
 */
export const useQuizzesByTheme = (themeId: string | undefined) => {
  return useQuery<Quiz[]>({
    queryKey: ['quizzes', 'theme', themeId],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!themeId) return [];

      const theme = themes.find(t => t.id === themeId);

      if (!theme) {
        throw new Error('Tema não encontrado');
      }

      // In the future, replace with:
      // const response = await fetch(`/api/themes/${themeId}/quizzes`);
      // if (!response.ok) throw new Error('Failed to fetch quizzes');
      // return response.json();

      return theme.quizzes;
    },
    enabled: !!themeId, // Only run query if themeId is defined
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch a theme by ID
 * Returns theme with all its quizzes
 *
 * @param themeId - The ID of the theme
 * @returns Query result with theme data, loading state, and error
 *
 * @example
 * const { data: theme, isLoading } = useThemeById(themeId);
 *
 * return <ThemeHeader theme={theme} />;
 */
export const useThemeById = (themeId: string | undefined) => {
  return useQuery<Theme | null>({
    queryKey: ['theme', themeId],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!themeId) return null;

      const theme = themes.find(t => t.id === themeId);

      if (!theme) {
        throw new Error('Tema não encontrado');
      }

      // In the future, replace with:
      // const response = await fetch(`/api/themes/${themeId}`);
      // if (!response.ok) throw new Error('Failed to fetch theme');
      // return response.json();

      return theme;
    },
    enabled: !!themeId, // Only run query if themeId is defined
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
