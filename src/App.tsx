import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quizzes from "./pages/Quizzes";
import ThemeQuizzes from "./pages/ThemeQuizzes";
import QuizGame from "./pages/QuizGame";
import QuizResults from "./pages/QuizResults";
import Establishments from "./pages/Establishments";
import EstablishmentDetails from "./pages/EstablishmentDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quizzes/:themeId" element={<ThemeQuizzes />} />
          <Route path="/quiz/:quizId" element={<QuizGame />} />
          <Route path="/quiz/:quizId/results" element={<QuizResults />} />
          <Route path="/estabelecimentos" element={<Establishments />} />
          <Route path="/estabelecimentos/:id" element={<EstablishmentDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
