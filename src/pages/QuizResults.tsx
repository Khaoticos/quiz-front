import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import CircularProgress from "@/components/CircularProgress";
import { AchievementBadgeComponent, NewBadgeUnlock } from "@/components/AchievementBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockRanking } from "@/data/quizData";
import { achievementBadges, checkBadgeUnlock, AchievementBadge } from "@/data/achievementBadges";
import { Trophy, Clock, Target as TargetIcon, Share2, RotateCcw, Home, Award, PartyPopper, ThumbsUp, Zap, Star } from "lucide-react";

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, totalQuestions, totalTime, quizName } = location.state || {};

  // Badge system state
  const [unlockedBadges, setUnlockedBadges] = useState<AchievementBadge[]>([]);
  const [showNewBadge, setShowNewBadge] = useState<AchievementBadge | null>(null);
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);

  // Check for unlocked badges
  useEffect(() => {
    if (!score && score !== 0) return;

    const percentage = Math.round((score / totalQuestions) * 100);
    const newlyUnlocked: AchievementBadge[] = [];

    // Mock data - in production, this would come from localStorage or backend
    const mockQuizResults = {
      score: percentage,
      timeSpent: totalTime,
      totalQuizzes: 1, // Would be tracked across sessions
      categoryQuizzes: {}
    };

    // Check all badges
    achievementBadges.forEach(badge => {
      if (checkBadgeUnlock(badge, mockQuizResults)) {
        newlyUnlocked.push(badge);
      }
    });

    setUnlockedBadges(newlyUnlocked);

    // Show first badge after a delay
    if (newlyUnlocked.length > 0) {
      setTimeout(() => {
        setShowNewBadge(newlyUnlocked[0]);
      }, 1500);
    }
  }, [score, totalQuestions, totalTime]);

  if (!score && score !== 0) {
    return (
      <Layout showFooter contentClassName="pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Resultados não encontrados</h1>
          <Link to="/quizzes">
            <Button variant="outline">Voltar aos quizzes</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const percentage = Math.round((score / totalQuestions) * 100);
  const userPosition = Math.floor(Math.random() * 10) + 1; // Simulated position
  
  // Handle badge modal close
  const handleBadgeClose = () => {
    const nextIndex = currentBadgeIndex + 1;
    if (nextIndex < unlockedBadges.length) {
      setCurrentBadgeIndex(nextIndex);
      setShowNewBadge(unlockedBadges[nextIndex]);
    } else {
      setShowNewBadge(null);
    }
  };

  const getFeedback = (percentage: number) => {
    if (percentage >= 90) return { message: "Excelente! Você é um expert!", emoji: "🏆" };
    if (percentage >= 75) return { message: "Ótima performance! Parabéns!", emoji: "🎉" };
    if (percentage >= 60) return { message: "Bom trabalho! Continue assim!", emoji: "👍" };
    if (percentage >= 40) return { message: "Não foi mal! Pratique mais!", emoji: "⚡" };
    return { message: "Continue tentando! Você vai melhorar!", emoji: "⭐" };
  };

  const feedback = getFeedback(percentage);
  const formattedTime = `${Math.floor(totalTime / 60)}m ${totalTime % 60}s`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Meu resultado no quiz: ${quizName}`,
        text: `Acertei ${score} de ${totalQuestions} perguntas (${percentage}%) no Quis!`,
        url: window.location.origin + '/quizzes'
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `Acertei ${score} de ${totalQuestions} perguntas (${percentage}%) no quiz "${quizName}" do Quis! Jogue você também: ${window.location.origin}/quizzes`;
      navigator.clipboard.writeText(text);
      // You could show a toast here
    }
  };

  return (
    <Layout showFooter contentClassName="pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <span className="text-6xl">{feedback.emoji}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Quiz Finalizado!
            </h1>
            <p className="text-lg text-muted-foreground">
              {quizName}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Individual Results */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TargetIcon className="h-5 w-5 text-primary" />
                  Seu Resultado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score Display with Circular Progress */}
                <div className="flex flex-col items-center">
                  <CircularProgress
                    score={score}
                    total={totalQuestions}
                    size={220}
                    strokeWidth={14}
                    showAnimation={true}
                  />
                </div>

                {/* Feedback */}
                <div className="text-center p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="font-medium text-base text-muted-foreground">
                    {feedback.message}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg border border-border">
                    <Clock className="h-4 w-4 text-muted-foreground mx-auto mb-2" />
                    <p className="font-semibold text-foreground text-lg">{formattedTime}</p>
                    <p className="text-xs text-muted-foreground">Tempo total</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg border border-border">
                    <Trophy className="h-4 w-4 text-muted-foreground mx-auto mb-2" />
                    <p className="font-semibold text-foreground text-lg">#{userPosition}</p>
                    <p className="text-xs text-muted-foreground">Sua posição</p>
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
                      <div className={`flex items-center justify-between py-3 px-2 rounded-lg transition-colors ${
                        entry.posicao === userPosition ? 'bg-primary/5' : ''
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                            entry.posicao === 1 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            entry.posicao === 2 ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' :
                            entry.posicao === 3 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {entry.posicao}
                          </div>
                          <div>
                            <p className={`font-medium text-sm ${entry.posicao === userPosition ? 'text-foreground font-semibold' : 'text-foreground'}`}>
                              {entry.posicao === userPosition ? 'Você' : entry.nome}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm text-foreground">{entry.acertos}/20</p>
                          <p className="text-xs text-muted-foreground">{Math.floor(entry.tempo / 60)}m {entry.tempo % 60}s</p>
                        </div>
                      </div>
                      {index < 9 && <Separator className="my-1" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Badges Section */}
          {unlockedBadges.length > 0 && (
            <Card className="mt-8 shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Conquistas Desbloqueadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-6">
                  {unlockedBadges.map(badge => (
                    <div key={badge.id} className="flex flex-col items-center gap-2">
                      <AchievementBadgeComponent
                        badge={badge}
                        unlocked={true}
                        size="md"
                      />
                      <p className="text-xs text-center text-muted-foreground max-w-[100px]">
                        {badge.name}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

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

      {/* New Badge Unlock Modal */}
      {showNewBadge && (
        <NewBadgeUnlock
          badge={showNewBadge}
          onClose={handleBadgeClose}
        />
      )}
    </Layout>
  );
};

export default QuizResults;