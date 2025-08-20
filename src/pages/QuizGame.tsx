import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { themes, Question } from "@/data/quizData";
import { Clock, ArrowLeft } from "lucide-react";

const QuizGame = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  
  // Find the quiz
  const quiz = themes
    .flatMap(theme => theme.quizzes)
    .find(q => q.id === quizId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState<{ questionId: string; selectedAnswer: string; correct: boolean; timeSpent: number; }[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  const currentQuestion = quiz?.perguntas[currentQuestionIndex];
  const totalQuestions = quiz?.perguntas.length || 0;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }
  }, [timeLeft, isAnswered]);

  // Reset timer for new questions
  useEffect(() => {
    setTimeLeft(30);
    setSelectedAnswer("");
    setIsAnswered(false);
    setStartTime(Date.now());
  }, [currentQuestionIndex]);

  if (!quiz || !currentQuestion) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Quiz não encontrado</h1>
            <Button onClick={() => navigate("/quizzes")} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos quizzes
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleTimeUp = () => {
    const timeSpent = 30 - timeLeft;
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedAnswer: "",
      correct: false,
      timeSpent
    }]);
    setIsAnswered(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        finishQuiz();
      }
    }, 2000);
  };

  const handleAnswerSelect = (value: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(value);
    const timeSpent = 30 - timeLeft;
    const correctAnswer = currentQuestion.alternativas.find(alt => alt.correta);
    const isCorrect = value === correctAnswer?.letra;
    
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedAnswer: value,
      correct: isCorrect,
      timeSpent
    }]);
    
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const totalCorrect = answers.filter(a => a.correct).length + (isAnswered && currentQuestion.alternativas.find(alt => alt.correta)?.letra === selectedAnswer ? 1 : 0);
    const totalTime = answers.reduce((sum, a) => sum + a.timeSpent, 0) + (30 - timeLeft);
    
    navigate(`/quiz/${quizId}/results`, { 
      state: { 
        score: totalCorrect, 
        totalQuestions,
        totalTime,
        quizName: quiz.nome
      } 
    });
  };

  const correctAnswer = currentQuestion.alternativas.find(alt => alt.correta);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Quiz Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {quiz.nome}
            </h1>
            <p className="text-muted-foreground">
              Pergunta {currentQuestionIndex + 1} de {totalQuestions}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
          </div>

          {/* Timer */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-card">
              <Clock className="h-5 w-5 text-primary" />
              <span className={`font-bold text-lg ${timeLeft <= 10 ? 'text-destructive' : 'text-foreground'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Question Card */}
          <Card className="mb-8 shadow-elevated">
            <CardContent className="p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center">
                {currentQuestion.texto}
              </h2>

              <RadioGroup 
                value={selectedAnswer} 
                onValueChange={handleAnswerSelect}
                disabled={isAnswered}
                className="space-y-4"
              >
                {currentQuestion.alternativas.map((alternativa) => (
                  <div 
                    key={alternativa.letra}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                      isAnswered && alternativa.correta 
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                        : isAnswered && selectedAnswer === alternativa.letra && !alternativa.correta
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : selectedAnswer === alternativa.letra
                        ? 'border-primary bg-accent'
                        : 'border-border hover:border-primary/50 hover:bg-accent/50'
                    }`}
                  >
                    <RadioGroupItem 
                      value={alternativa.letra} 
                      id={alternativa.letra}
                      className={
                        isAnswered && alternativa.correta 
                          ? 'border-green-500 text-green-500'
                          : isAnswered && selectedAnswer === alternativa.letra && !alternativa.correta
                          ? 'border-red-500 text-red-500'
                          : ''
                      }
                    />
                    <Label 
                      htmlFor={alternativa.letra} 
                      className="flex-1 cursor-pointer font-medium text-base"
                    >
                      <span className="font-bold mr-3">{alternativa.letra})</span>
                      {alternativa.texto}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Feedback */}
              {isAnswered && (
                <div className="mt-8 p-4 rounded-lg bg-muted text-center">
                  {timeLeft === 0 ? (
                    <p className="text-destructive font-semibold">
                      ⏰ Tempo esgotado! A resposta correta era: <strong>{correctAnswer?.letra}) {correctAnswer?.texto}</strong>
                    </p>
                  ) : selectedAnswer === correctAnswer?.letra ? (
                    <p className="text-green-600 dark:text-green-400 font-semibold">
                      🎉 Correto! Parabéns!
                    </p>
                  ) : (
                    <p className="text-red-600 dark:text-red-400 font-semibold">
                      ❌ Incorreto. A resposta correta era: <strong>{correctAnswer?.letra}) {correctAnswer?.texto}</strong>
                    </p>
                  )}
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div className="mt-8 text-center">
                  <Button 
                    onClick={handleNextQuestion}
                    size="lg"
                    className="min-w-[200px]"
                  >
                    {currentQuestionIndex < totalQuestions - 1 ? "Próxima pergunta" : "Ver resultados"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default QuizGame;