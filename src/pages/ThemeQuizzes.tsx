import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { themes } from "@/data/quizData";
import { ArrowLeft, Play } from "lucide-react";

const ThemeQuizzes = () => {
  const { themeId } = useParams();
  const theme = themes.find(t => t.id === themeId);

  if (!theme) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Tema não encontrado</h1>
            <Link to="/quizzes">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar aos temas
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Theme Header */}
        <section className="bg-gradient-subtle py-16">
          <div className="container mx-auto px-4">
            <Link to="/quizzes" className="inline-flex items-center text-primary hover:text-primary-glow transition-colors mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos temas
            </Link>
            
            <div className="text-center">
              <div className="text-6xl mb-4">{theme.icon}</div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {theme.nome}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {theme.descricao}
              </p>
            </div>
          </div>
        </section>

        {/* Quizzes List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {theme.quizzes.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">🚧</div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Quizzes em desenvolvimento
                </h2>
                <p className="text-muted-foreground mb-8">
                  Estamos preparando quizzes incríveis para este tema. Volte em breve!
                </p>
                <Link to="/quizzes">
                  <Button variant="outline">
                    Explorar outros temas
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {theme.quizzes.map((quiz) => (
                  <Card 
                    key={quiz.id}
                    className="group hover:shadow-glow transform hover:scale-105 transition-all duration-300"
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
                      <Link to={`/quiz/${quiz.id}`}>
                        <Button className="w-full group">
                          <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                          Jogar
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ThemeQuizzes;