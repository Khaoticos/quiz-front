import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { InstallPWA } from "@/components/InstallPWA";
import { OnlineStatusIndicator } from "@/components/OnlineStatusIndicator";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Lazy load all page components for better code splitting
const Index = lazy(() => import("./pages/Index"));
const Quizzes = lazy(() => import("./pages/Quizzes"));
const ThemeQuizzes = lazy(() => import("./pages/ThemeQuizzes"));
const QuizPreview = lazy(() => import("./pages/QuizPreview"));
const QuizGame = lazy(() => import("./pages/QuizGame"));
const QuizResults = lazy(() => import("./pages/QuizResults"));
const Establishments = lazy(() => import("./pages/Establishments"));
const EstablishmentDetails = lazy(() => import("./pages/EstablishmentDetails"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const EstablishmentPanel = lazy(() => import("./pages/EstablishmentPanel"));
const CreateEstablishment = lazy(() => import("./pages/CreateEstablishment"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache por 5 minutos antes de considerar stale
      staleTime: 1000 * 60 * 5,
      // Não refetch automaticamente ao focar janela
      refetchOnWindowFocus: false,
      // Retry apenas 1 vez
      retry: 1,
      // Não refetch ao remontar (dados já estão em cache)
      refetchOnMount: false,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="space-y-4 w-full max-w-md px-4">
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-8 w-1/2 mx-auto" />
    </div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quizzes/:themeId" element={<ThemeQuizzes />} />
          <Route path="/quiz/:quizId/preview" element={<QuizPreview />} />
          <Route path="/quiz/:quizId" element={<QuizGame />} />
          <Route path="/quiz/:quizId/results" element={<QuizResults />} />
          <Route path="/estabelecimentos" element={<Establishments />} />
          <Route path="/estabelecimentos/:id" element={<EstablishmentDetails />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          {/* Protected Routes - Admin Only */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/estabelecimentos/novo"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CreateEstablishment />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Establishment Only */}
          <Route
            path="/painel"
            element={
              <ProtectedRoute allowedRoles={['establishment']}>
                <EstablishmentPanel />
              </ProtectedRoute>
            }
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
            {/* PWA Components */}
            <InstallPWA />
            <OnlineStatusIndicator />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
