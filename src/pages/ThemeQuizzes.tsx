import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { EmptyState } from "@/components/EmptyState";
import { ScrollReveal, ScrollRevealContainer, ScrollRevealItem } from "@/components/ScrollReveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { themes } from "@/data/quizData";
import { ArrowLeft, Play } from "lucide-react";

const ThemeQuizzes = () => {
  const { themeId } = useParams();
  const theme = themes.find(t => t.id === themeId);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [themeId]);

  if (!theme) {
    return (
      <Layout showFooter contentClassName="pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Tema não encontrado</h1>
          <Link to="/quizzes">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos temas
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showFooter contentClassName="pt-20">
        {/* Theme Header */}
        <section className="bg-gradient-subtle py-section-sm md:py-section-md">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <ScrollReveal direction="fade" delay={0}>
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
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{theme.nome}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </ScrollReveal>

            <ScrollReveal direction="scale" delay={0.1} className="text-center">
              <div className="text-6xl mb-4">{theme.icon}</div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {theme.nome}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {theme.descricao}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Quizzes List */}
        <section className="py-section-sm md:py-section-md">
          <div className="container mx-auto px-4">
            {isLoading ? (
              // Skeleton loaders
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : theme.quizzes.length === 0 ? (
              <EmptyState
                icon="🚧"
                title="Quizzes em desenvolvimento"
                description="Estamos preparando quizzes incríveis para este tema. Volte em breve!"
                variant="card"
                showDecorations={true}
                action={
                  <Button variant="outline" asChild>
                    <Link to="/quizzes">Explorar outros temas</Link>
                  </Button>
                }
              />
            ) : (
              <ScrollRevealContainer
                staggerDelay={0.1}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {theme.quizzes.map((quiz) => (
                  <ScrollRevealItem key={quiz.id} direction="up">
                    <Card
                      className="group hover:shadow-glow transform hover:scale-105 transition-all duration-300 h-full"
                    >
                      <CardHeader>
                        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {quiz.nome}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {quiz.descricao}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-muted-foreground">
                            {quiz.perguntas.length} perguntas
                          </span>
                          <span className="text-sm text-muted-foreground">
                            30s por questão
                          </span>
                        </div>
                        <Link to={`/quiz/${quiz.id}/preview`}>
                          <Button className="w-full group">
                            <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                            Jogar
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </ScrollRevealItem>
                ))}
              </ScrollRevealContainer>
            )}
          </div>
        </section>
    </Layout>
  );
};

export default ThemeQuizzes;