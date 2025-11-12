import { useQuery } from '@tanstack/react-query';
import { establishments, establishmentTypes, neighborhoods } from '@/data/establishmentsData';
import type { Establishment } from '@/data/establishmentsData';

/**
 * Hook to fetch all establishments
 * Uses TanStack Query for caching and state management
 *
 * In the future, this will be replaced with actual API calls
 * Currently returns mock data from establishmentsData.ts
 *
 * @returns Query result with establishments data, loading state, and error
 *
 * @example
 * const { data: establishments, isLoading, error } = useEstablishments();
 *
 * if (isLoading) return <Skeleton />;
 * if (error) return <ErrorState />;
 *
 * return establishments.map(est => <EstablishmentCard key={est.id} establishment={est} />);
 */
export const useEstablishments = () => {
  return useQuery<Establishment[]>({
    queryKey: ['establishments'],
    queryFn: async () => {
      // Simulate network delay for realistic behavior
      await new Promise(resolve => setTimeout(resolve, 600));

      // In the future, replace with:
      // const response = await fetch('/api/establishments');
      // if (!response.ok) throw new Error('Failed to fetch establishments');
      // return response.json();

      return establishments;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes - data is considered fresh
    gcTime: 1000 * 60 * 10, // 10 minutes - cache time
  });
};

/**
 * Hook to fetch a single establishment by ID
 *
 * @param id - The ID of the establishment to fetch
 * @returns Query result with establishment data, loading state, and error
 *
 * @example
 * const { data: establishment, isLoading, error } = useEstablishmentById(id);
 *
 * if (isLoading) return <Skeleton />;
 * if (error) return <ErrorState />;
 * if (!establishment) return <NotFound />;
 *
 * return <EstablishmentDetails establishment={establishment} />;
 */
export const useEstablishmentById = (id: string | undefined) => {
  return useQuery<Establishment | null>({
    queryKey: ['establishment', id],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 400));

      if (!id) return null;

      const establishment = establishments.find(e => e.id === id);

      if (!establishment) {
        throw new Error('Estabelecimento não encontrado');
      }

      // In the future, replace with:
      // const response = await fetch(`/api/establishments/${id}`);
      // if (!response.ok) throw new Error('Failed to fetch establishment');
      // return response.json();

      return establishment;
    },
    enabled: !!id, // Only run query if id is defined
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch establishments with filters
 * Supports filtering by type, neighborhood, and search term
 *
 * @param filters - Object with optional type, neighborhood, and search filters
 * @returns Query result with filtered establishments
 *
 * @example
 * const { data: filtered } = useFilteredEstablishments({
 *   type: 'Bar',
 *   neighborhood: 'Vila Madalena',
 *   search: 'quiz'
 * });
 */
export const useFilteredEstablishments = (filters: {
  type?: string;
  neighborhood?: string;
  search?: string;
  onlyOpen?: boolean;
}) => {
  return useQuery<Establishment[]>({
    queryKey: ['establishments', 'filtered', filters],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      let filtered = [...establishments];

      // Filter by type
      if (filters.type && filters.type !== 'Todos') {
        filtered = filtered.filter(e => e.type === filters.type);
      }

      // Filter by neighborhood
      if (filters.neighborhood && filters.neighborhood !== 'Todos') {
        filtered = filtered.filter(e => e.address.neighborhood === filters.neighborhood);
      }

      // Filter by search term
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(e =>
          e.name.toLowerCase().includes(searchLower) ||
          e.shortDescription.toLowerCase().includes(searchLower) ||
          e.address.neighborhood.toLowerCase().includes(searchLower)
        );
      }

      // Filter by open status
      if (filters.onlyOpen) {
        filtered = filtered.filter(e => e.isOpenNow);
      }

      // Sort by popularity
      filtered.sort((a, b) => b.popularityRanking - a.popularityRanking);

      // In the future, replace with:
      // const params = new URLSearchParams();
      // if (filters.type) params.set('type', filters.type);
      // if (filters.neighborhood) params.set('neighborhood', filters.neighborhood);
      // if (filters.search) params.set('search', filters.search);
      // const response = await fetch(`/api/establishments?${params}`);
      // if (!response.ok) throw new Error('Failed to fetch establishments');
      // return response.json();

      return filtered;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes for filtered results
    gcTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

/**
 * Hook to get establishment types for filters
 * Returns static list of available types
 *
 * @returns Establishment types array
 */
export const useEstablishmentTypes = () => {
  return establishmentTypes;
};

/**
 * Hook to get neighborhoods for filters
 * Returns static list of available neighborhoods
 *
 * @returns Neighborhoods array
 */
export const useNeighborhoods = () => {
  return neighborhoods;
};

/**
 * Hook to get establishments with active quizzes
 * Filters establishments that have at least one active quiz
 *
 * @returns Query result with establishments that have active quizzes
 *
 * @example
 * const { data: withQuizzes } = useEstablishmentsWithQuizzes();
 */
export const useEstablishmentsWithQuizzes = () => {
  return useQuery<Establishment[]>({
    queryKey: ['establishments', 'with-quizzes'],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 400));

      const withQuizzes = establishments.filter(e =>
        e.quizzes.some(q => q.active)
      );

      // Sort by popularity
      withQuizzes.sort((a, b) => b.popularityRanking - a.popularityRanking);

      return withQuizzes;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
