import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { ScrollReveal, ScrollRevealContainer, ScrollRevealItem } from "@/components/ScrollReveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { themes } from "@/data/quizData";
import { Link } from "react-router-dom";

// Helper function to get theme colors
const getThemeColors = (themeId: string) => {
  const colorMap: Record<string, { border: string; gradient: string; badge: string; glow: string }> = {
    "cultura-pop": {
      border: "border-[hsl(280,80%,55%)]",
      gradient: "from-[hsl(280,80%,55%)]/10 to-[hsl(320,85%,60%)]/5",
      badge: "bg-[hsl(280,80%,55%)] text-white",
      glow: "group-hover:shadow-[0_10px_40px_-10px_hsl(280,80%,55%,0.4)]"
    },
    "historia-brasil": {
      border: "border-[hsl(142,70%,45%)]",
      gradient: "from-[hsl(142,70%,45%)]/10 to-[hsl(48,95%,50%)]/5",
      badge: "bg-[hsl(142,70%,45%)] text-white",
      glow: "group-hover:shadow-[0_10px_40px_-10px_hsl(142,70%,45%,0.4)]"
    },
    "filmes-cinema": {
      border: "border-[hsl(0,75%,50%)]",
      gradient: "from-[hsl(0,75%,50%)]/10 to-[hsl(45,100%,50%)]/5",
      badge: "bg-[hsl(0,75%,50%)] text-white",
      glow: "group-hover:shadow-[0_10px_40px_-10px_hsl(0,75%,50%,0.4)]"
    },
    "esportes": {
      border: "border-[hsl(120,65%,45%)]",
      gradient: "from-[hsl(120,65%,45%)]/10 to-[hsl(90,70%,50%)]/5",
      badge: "bg-[hsl(120,65%,45%)] text-white",
      glow: "group-hover:shadow-[0_10px_40px_-10px_hsl(120,65%,45%,0.4)]"
    },
    "curiosidades": {
      border: "border-[hsl(180,70%,45%)]",
      gradient: "from-[hsl(180,70%,45%)]/10 to-[hsl(200,75%,55%)]/5",
      badge: "bg-[hsl(180,70%,45%)] text-white",
      glow: "group-hover:shadow-[0_10px_40px_-10px_hsl(180,70%,45%,0.4)]"
    },
    "ciencia-tech": {
      border: "border-[hsl(210,85%,50%)]",
      gradient: "from-[hsl(210,85%,50%)]/10 to-[hsl(195,90%,55%)]/5",
      badge: "bg-[hsl(210,85%,50%)] text-white",
      glow: "group-hover:shadow-[0_10px_40px_-10px_hsl(210,85%,50%,0.4)]"
    },
    "games": {
      border: "border-[hsl(270,75%,55%)]",
      gradient: "from-[hsl(270,75%,55%)]/10 to-[hsl(310,80%,60%)]/5",
      badge: "bg-[hsl(270,75%,55%)] text-white",
      glow: "group-hover:shadow-[0_10px_40px_-10px_hsl(270,75%,55%,0.4)]"
    },
    "gastronomia": {
      border: "border-[hsl(15,90%,55%)]",
      gradient: "from-[hsl(15,90%,55%)]/10 to-[hsl(30,95%,60%)]/5",
      badge: "bg-[hsl(15,90%,55%)] text-white",
      glow: "group-hover:shadow-[0_10px_40px_-10px_hsl(15,90%,55%,0.4)]"
    }
  };

  return colorMap[themeId] || {
    border: "border-border",
    gradient: "from-accent/10 to-accent/5",
    badge: "bg-primary text-white",
    glow: "group-hover:shadow-glow"
  };
};

const Quizzes = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout showFooter contentClassName="pt-20">
        {/* Page Header */}
        <section className="pt-section-sm md:pt-section-md pb-8">
          <ScrollReveal direction="down" className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Escolha um tema de quiz!
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Desafie seus conhecimentos, acumule pontos e dispute o ranking.
              Seja especialista em vários temas!
            </p>
          </ScrollReveal>
        </section>

        {/* Themes Grid */}
        <section className="pb-section-sm md:pb-section-md">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Skeleton loaders */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="text-center pb-4">
                      <Skeleton className="h-16 w-16 rounded-full mx-auto mb-3" />
                      <Skeleton className="h-6 w-32 mx-auto mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-3/4 mx-auto" />
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <ScrollRevealContainer
                staggerDelay={0.08}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {themes.map((theme) => {
                  const colors = getThemeColors(theme.id);
                  return (
                    <ScrollRevealItem key={theme.id} direction="up">
                      <Card
                        className="group relative overflow-hidden bg-white hover:shadow-lg transition-all duration-300 cursor-pointer h-full border border-gray-200"
                      >
                      {/* Badge with quiz count */}
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className={`${colors.badge} font-medium text-xs px-2 py-1`}>
                          {theme.quizzes.length} {theme.quizzes.length === 1 ? 'quiz' : 'quizzes'}
                        </Badge>
                      </div>

                      <CardHeader className="text-center pb-4 pt-8">
                        {/* Clean icon without background */}
                        <div className="mx-auto mb-4">
                          <span className="text-5xl">{theme.icon}</span>
                        </div>

                        <CardTitle className="text-lg font-semibold text-foreground mb-2">
                          {theme.nome}
                        </CardTitle>
                        <CardDescription className="text-xs text-muted-foreground line-clamp-2 min-h-[32px] px-2">
                          {theme.descricao}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-0 pb-6 px-6">
                        <Link to={`/quizzes/${theme.id}`}>
                          <Button
                            variant="outline"
                            className="w-full text-sm font-medium border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-500 hover:text-white hover:border-orange-500 rounded-full transition-all duration-200"
                            disabled={theme.quizzes.length === 0}
                          >
                            {theme.quizzes.length === 0 ? (
                              <>
                                🚧 Em breve
                              </>
                            ) : (
                              <>
                                Ver quizzes
                                <span className="ml-2">
                                  ▶
                                </span>
                              </>
                            )}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                    </ScrollRevealItem>
                  );
                })}
              </ScrollRevealContainer>
            )}
          </div>
        </section>
    </Layout>
  );
};

export default Quizzes;