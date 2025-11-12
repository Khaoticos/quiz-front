import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

/**
 * ProtectedRoute component to guard routes based on authentication and user roles
 *
 * @param children - The component to render if user has access
 * @param allowedRoles - Array of roles that can access this route. If not provided, any authenticated user can access.
 * @param redirectTo - Where to redirect if user doesn't have access (default: '/login')
 *
 * @example
 * // Only authenticated users
 * <ProtectedRoute>
 *   <ProfilePage />
 * </ProtectedRoute>
 *
 * @example
 * // Only admin users
 * <ProtectedRoute allowedRoles={['admin']}>
 *   <AdminPanel />
 * </ProtectedRoute>
 *
 * @example
 * // Admin or establishment users
 * <ProtectedRoute allowedRoles={['admin', 'establishment']}>
 *   <DashboardPage />
 * </ProtectedRoute>
 */
export const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = '/login',
}: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Not authenticated - redirect to login with return URL
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If allowedRoles is specified, check if user's role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is authenticated but doesn't have the right role
    // Redirect to appropriate dashboard based on their role
    const dashboardMap: Record<UserRole, string> = {
      admin: '/admin',
      establishment: '/painel',
      user: '/',
    };

    return <Navigate to={dashboardMap[user.role]} replace />;
  }

  // User is authenticated and has the right role
  return <>{children}</>;
};
