import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { themes } from "@/data/quizData";
import { establishments } from "@/data/establishmentsData";
import { Play, Clock, HelpCircle, Trophy, ArrowLeft, MapPin } from "lucide-react";

const QuizPreview = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  // Find the quiz and theme
  let quiz = null;
  let theme = null;
  for (const t of themes) {
    const q = t.quizzes.find(q => q.id === quizId);
    if (q) {
      quiz = q;
      theme = t;
      break;
    }
  }

  if (!quiz || !theme) {
    return (
      <Layout showFooter contentClassName="pt-20">
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

  const totalQuestions = quiz.perguntas.length;
  const estimatedTime = Math.ceil((totalQuestions * 30) / 60); // 30s per question

  // Find the establishment linked to this quiz
  const establishment = quiz.establishmentId
    ? establishments.find(e => e.id === quiz.establishmentId)
    : null;

  return (
    <Layout showFooter contentClassName="pt-20 pb-section-md">
      <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-8">
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
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/quizzes/${theme.id}`}>{theme.nome}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{quiz.nome}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Quiz Preview Card */}
          <Card className="shadow-elevated">
            <CardHeader className="text-center pb-6">
              <div className="text-5xl mb-4">{theme.icon}</div>
              <CardTitle className="text-3xl md:text-4xl font-bold mb-3">
                {quiz.nome}
              </CardTitle>
              <CardDescription className="text-lg">
                {quiz.descricao}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center p-6 bg-gradient-card rounded-xl border">
                  <HelpCircle className="h-8 w-8 text-primary mb-3" />
                  <p className="text-3xl font-bold text-foreground">{totalQuestions}</p>
                  <p className="text-sm text-muted-foreground mt-1">Perguntas</p>
                </div>

                <div className="flex flex-col items-center p-6 bg-gradient-card rounded-xl border">
                  <Clock className="h-8 w-8 text-primary mb-3" />
                  <p className="text-3xl font-bold text-foreground">{estimatedTime}</p>
                  <p className="text-sm text-muted-foreground mt-1">Minutos</p>
                </div>

                <div className="flex flex-col items-center p-6 bg-gradient-card rounded-xl border col-span-2 md:col-span-1">
                  <Trophy className="h-8 w-8 text-primary mb-3" />
                  <p className="text-3xl font-bold text-foreground">30s</p>
                  <p className="text-sm text-muted-foreground mt-1">Por questão</p>
                </div>
              </div>

              {/* Establishment Info */}
              {establishment && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 space-y-3">
                  <h3 className="font-semibold text-lg text-orange-900 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Local do Quiz
                  </h3>
                  <div className="space-y-2">
                    <Link to={`/estabelecimentos/${establishment.id}`}>
                      <p className="text-xl font-bold text-orange-900 hover:text-orange-600 transition-colors">
                        {establishment.name}
                      </p>
                    </Link>
                    <p className="text-sm text-orange-700">
                      {establishment.address.street}, {establishment.address.neighborhood}
                    </p>
                    <p className="text-sm text-orange-700">
                      {establishment.address.city} - {establishment.address.state}
                    </p>
                    {establishment.workingHours && (
                      <p className="text-sm text-orange-600 font-medium mt-2">
                        {establishment.workingHours}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Info Section */}
              <div className="bg-muted/50 rounded-xl p-6 space-y-3">
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Como funciona
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Você terá 30 segundos para responder cada pergunta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Use as teclas A, B, C, D ou números para responder mais rápido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Ao final, veja seu desempenho e compare com outros jogadores</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate(`/quizzes/${theme.id}`)}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Voltar
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => navigate(`/quiz/${quizId}`)}
                  className="flex-1 bg-gradient-primary text-white hover:opacity-90 transition-opacity"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Iniciar Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
      </div>
    </Layout>
  );
};

export default QuizPreview;
