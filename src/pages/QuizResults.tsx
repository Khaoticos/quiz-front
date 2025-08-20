import { useLocation, useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockRanking } from "@/data/quizData";
import { Trophy, Clock, Target, Share2, RotateCcw, Home } from "lucide-react";

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { score, totalQuestions, totalTime, quizName } = location.state || {};

  if (!score && score !== 0) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Resultados não encontrados</h1>
            <Link to="/quizzes">
              <Button variant="outline">Voltar aos quizzes</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const percentage = Math.round((score / totalQuestions) * 100);
  const userPosition = Math.floor(Math.random() * 10) + 1; // Simulated position
  
  const getFeedback = (percentage: number) => {
    if (percentage >= 90) return { message: "Excelente! Você é um expert!", emoji: "🏆", color: "text-yellow-600" };
    if (percentage >= 75) return { message: "Ótima performance! Parabéns!", emoji: "🎉", color: "text-green-600" };
    if (percentage >= 60) return { message: "Bom trabalho! Continue assim!", emoji: "👏", color: "text-blue-600" };
    if (percentage >= 40) return { message: "Não foi mal! Pratique mais!", emoji: "💪", color: "text-orange-600" };
    return { message: "Continue tentando! Você vai melhorar!", emoji: "🌟", color: "text-purple-600" };
  };

  const feedback = getFeedback(percentage);
  const formattedTime = `${Math.floor(totalTime / 60)}m ${totalTime % 60}s`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Meu resultado no quiz: ${quizName}`,
        text: `Acertei ${score} de ${totalQuestions} perguntas (${percentage}%) no Quis! 🎯`,
        url: window.location.origin + '/quizzes'
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `Acertei ${score} de ${totalQuestions} perguntas (${percentage}%) no quiz "${quizName}" do Quis! 🎯 Jogue você também: ${window.location.origin}/quizzes`;
      navigator.clipboard.writeText(text);
      // You could show a toast here
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className={`text-6xl mb-4 ${feedback.color}`}>
              {feedback.emoji}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Quiz Finalizado!
            </h1>
            <p className="text-xl text-muted-foreground">
              {quizName}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Individual Results */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Seu Resultado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score Display */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {score}/{totalQuestions}
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {percentage}% de acerto
                  </Badge>
                </div>

                {/* Feedback */}
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className={`font-semibold text-lg ${feedback.color}`}>
                    {feedback.message}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-accent rounded-lg">
                    <Clock className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="font-semibold text-foreground">{formattedTime}</p>
                    <p className="text-sm text-muted-foreground">Tempo total</p>
                  </div>
                  <div className="text-center p-3 bg-accent rounded-lg">
                    <Trophy className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="font-semibold text-foreground">#{userPosition}</p>
                    <p className="text-sm text-muted-foreground">Sua posição</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ranking */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Ranking Geral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRanking.slice(0, 10).map((entry, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            entry.posicao === 1 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            entry.posicao === 2 ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' :
                            entry.posicao === 3 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {entry.posicao === userPosition ? '🎯' : entry.posicao}
                          </div>
                          <div>
                            <p className={`font-medium ${entry.posicao === userPosition ? 'text-primary font-bold' : 'text-foreground'}`}>
                              {entry.posicao === userPosition ? 'Você' : entry.nome}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{entry.acertos}/20</p>
                          <p className="text-xs text-muted-foreground">{Math.floor(entry.tempo / 60)}m {entry.tempo % 60}s</p>
                        </div>
                      </div>
                      {index < 9 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button 
              onClick={handleShare}
              variant="outline" 
              size="lg"
              className="min-w-[160px]"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar
            </Button>
            
            <Button 
              onClick={() => navigate(0)}
              variant="outline" 
              size="lg"
              className="min-w-[160px]"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Jogar novamente
            </Button>
            
            <Link to="/quizzes">
              <Button 
                variant="default" 
                size="lg"
                className="min-w-[160px]"
              >
                <Home className="mr-2 h-4 w-4" />
                Explorar temas
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizResults;