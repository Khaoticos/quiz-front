import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export type UserRole = 'admin' | 'user' | 'establishment';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  establishmentId?: string; // For establishment users
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Authentication Provider Component
 * Manages user authentication state and provides auth methods
 *
 * In the future, this will integrate with a backend API
 * Currently uses localStorage for mock authentication
 *
 * @example
 * // Wrap your app with AuthProvider
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 *
 * // Use in components
 * const { user, login, logout, isAuthenticated } = useAuth();
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<User | null>('quiz-user', null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Mock login function
   * TODO: Replace with actual API call
   *
   * Mock credentials for testing:
   * - admin@quis.com / admin123 (Admin)
   * - bar@quis.com / bar123 (Establishment)
   * - user@quis.com / user123 (User)
   */
  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication with different user roles
      let mockUser: User;

      if (email === 'admin@quis.com' && password === 'admin123') {
        mockUser = {
          id: 'admin-001',
          name: 'Administrador Quis',
          email: 'admin@quis.com',
          role: 'admin',
          createdAt: new Date().toISOString(),
        };
      } else if (email === 'bar@quis.com' && password === 'bar123') {
        mockUser = {
          id: 'estab-001',
          name: 'Bar do Zé',
          email: 'bar@quis.com',
          role: 'establishment',
          establishmentId: 'estab-001',
          createdAt: new Date().toISOString(),
        };
      } else if (email === 'user@quis.com' && password === 'user123') {
        mockUser = {
          id: 'user-001',
          name: 'Usuário Teste',
          email: 'user@quis.com',
          role: 'user',
          createdAt: new Date().toISOString(),
        };
      } else {
        throw new Error('Credenciais inválidas');
      }

      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Falha ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Mock registration function
   * TODO: Replace with actual API call
   * New users are registered as 'user' role by default
   */
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if email already exists (mock validation)
      if (email === 'admin@quis.com' || email === 'bar@quis.com' || email === 'user@quis.com') {
        throw new Error('Este email já está cadastrado');
      }

      // Mock registration - new users are 'user' role by default
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Falha ao registrar');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout function
   */
  const logout = () => {
    setUser(null);
  };

  /**
   * Update user profile
   */
  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;

    setUser({
      ...user,
      ...updates,
    });
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    updateProfile,
    isAuthenticated: !!user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use auth context
 * Must be used within AuthProvider
 *
 * @throws Error if used outside AuthProvider
 *
 * @example
 * const { user, login, logout, isAuthenticated } = useAuth();
 *
 * if (isAuthenticated) {
 *   return <div>Welcome, {user.name}!</div>;
 * }
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
