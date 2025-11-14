import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { themes } from "@/data/quizData";
import { ArrowLeft } from "lucide-react";

const QuizGame = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  // Find the quiz and theme
  let quiz = null;
  let theme = null;

  // First, try to find in custom quizzes
  const customQuizzes = JSON.parse(localStorage.getItem('customQuizzes') || '[]');
  const customQuiz = customQuizzes.find((q: any) => q.id === quizId);

  if (customQuiz) {
    quiz = {
      id: customQuiz.id,
      nome: customQuiz.nome,
      descricao: customQuiz.descricao,
      externalUrl: customQuiz.externalUrl,
      themeId: customQuiz.themeId,
      establishmentId: customQuiz.establishmentId,
    };
    theme = themes.find(t => t.id === customQuiz.themeId);
  } else {
    // If not found in custom, search in default themes
    for (const t of themes) {
      const q = t.quizzes.find(q => q.id === quizId);
      if (q) {
        quiz = q;
        theme = t;
        break;
      }
    }
  }

  // Handle quiz not found
  if (!quiz) {
    return (
      <Layout contentClassName="pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Quiz não encontrado</h1>
          <Button onClick={() => navigate("/quizzes")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos quizzes
          </Button>
        </div>
      </Layout>
    );
  }

  // All quizzes are external - render iframe
  return (
    <Layout className="min-h-screen bg-gradient-subtle" contentClassName="pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumbs */}
        {theme && (
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/quizzes">Quizzes</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {theme && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/quizzes/${theme.id}`}>{theme.nome}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{quiz.nome}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {/* Quiz Header */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {quiz.nome}
          </h1>
          {quiz.descricao && (
            <p className="text-muted-foreground mt-2">{quiz.descricao}</p>
          )}
        </div>

        {/* Quiz Iframe */}
        <Card className="shadow-2xl border-2 border-primary/10">
          <CardContent className="p-0">
            <div className="relative w-full" style={{ minHeight: '640px' }}>
              <iframe
                src={quiz.externalUrl}
                className="w-full rounded-lg"
                style={{ minHeight: '640px', border: 'none' }}
                title={quiz.nome}
                allow="fullscreen"
                loading="lazy"
              />
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="text-blue-600 dark:text-blue-400 text-xl">ℹ️</div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Quiz Interativo
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Este quiz é fornecido por uma plataforma externa. Divirta-se!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default QuizGame;