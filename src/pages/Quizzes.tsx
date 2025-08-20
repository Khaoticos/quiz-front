import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { themes } from "@/data/quizData";
import { Link } from "react-router-dom";

const Quizzes = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Page Header */}
        <section className="bg-gradient-subtle py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Escolha um tema de quiz!
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Desafie seus conhecimentos, acumule pontos e dispute o ranking. 
              Seja especialista em vários temas!
            </p>
          </div>
        </section>

        {/* Themes Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {themes.map((theme) => (
                <Card 
                  key={theme.id} 
                  className="group hover:shadow-glow transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {theme.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {theme.nome}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                      {theme.descricao}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link to={`/quizzes/${theme.id}`}>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                      >
                        Ver quizzes
                        <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </Button>
                    </Link>
                    {theme.quizzes.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Em breve
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Quizzes;