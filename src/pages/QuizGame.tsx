import { useState, useEffect, useReducer, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Confetti from "react-confetti";
import Layout from "@/components/Layout";
import QuizAlternative from "@/components/QuizAlternative";
import CircularTimer from "@/components/CircularTimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup } from "@/components/ui/radio-group";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";
import { themes, Question } from "@/data/quizData";
import { ArrowLeft } from "lucide-react";
import { quizReducer, createInitialState } from "@/reducers/quizReducer";
import { useQuizResults } from "@/hooks/useQuizResults";

const QuizGame = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { saveResult } = useQuizResults();

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

  // Use reducer for complex quiz state management
  const [state, dispatch] = useReducer(quizReducer, createInitialState());
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const currentQuestion = quiz?.perguntas[state.currentQuestionIndex];
  const totalQuestions = quiz?.perguntas.length || 0;
  const progress = ((state.currentQuestionIndex + 1) / totalQuestions) * 100;

  // Timer effect
  useEffect(() => {
    if (state.timeLeft > 0 && !state.isAnswered && state.status === 'playing') {
      // Show warning toast at 5 seconds
      if (state.timeLeft === 5 && !state.hasShownWarning) {
        toast({
          title: "⏰ Tempo acabando!",
          description: "Apenas 5 segundos restantes para responder",
          variant: "destructive",
        });
        dispatch({ type: 'SHOW_WARNING' });
      }

      const timer = setTimeout(() => dispatch({ type: 'TIME_TICK' }), 1000);
      return () => clearTimeout(timer);
    } else if (state.timeLeft === 0 && !state.isAnswered) {
      handleTimeUp();
    }
  }, [state.timeLeft, state.isAnswered, state.status, state.hasShownWarning, toast]);

  // Reset state for new questions
  useEffect(() => {
    dispatch({ type: 'RESET_FOR_NEW_QUESTION' });
  }, [state.currentQuestionIndex]);

  // Keyboard shortcuts for quiz answers
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (state.isAnswered) return;

      const key = e.key.toLowerCase();
      const mapping: { [key: string]: string } = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };

      if (['a', 'b', 'c', 'd', '1', '2', '3', '4'].includes(key)) {
        const letter = mapping[key] || key.toUpperCase();
        const hasThisOption = currentQuestion?.alternativas.some(alt => alt.letra === letter);

        if (hasThisOption) {
          handleAnswerSelect(letter);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state.isAnswered, currentQuestion]);

  // Window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoized handlers to avoid recreating on every render
  const handleTimeUp = useCallback(() => {
    if (!currentQuestion) return;

    dispatch({
      type: 'TIME_UP',
      payload: { questionId: currentQuestion.id }
    });

    setTimeout(() => {
      if (state.currentQuestionIndex < totalQuestions - 1) {
        dispatch({ type: 'NEXT_QUESTION' });
      } else {
        finishQuiz();
      }
    }, 2000);
  }, [currentQuestion, state.currentQuestionIndex, totalQuestions]);

  const handleAnswerSelect = useCallback((value: string) => {
    if (state.isAnswered || !currentQuestion) return;

    const timeSpent = 30 - state.timeLeft;
    const correctAnswer = currentQuestion.alternativas.find(alt => alt.correta);
    const isCorrect = value === correctAnswer?.letra;

    dispatch({
      type: 'SELECT_ANSWER',
      payload: {
        answer: value,
        isCorrect,
        timeSpent,
        questionId: currentQuestion.id
      }
    });

    // Show confetti on correct answer
    if (isCorrect) {
      dispatch({ type: 'SHOW_CONFETTI' });
      setTimeout(() => dispatch({ type: 'HIDE_CONFETTI' }), 3000);
    }

    // Auto-advance to next question after 2 seconds
    setTimeout(() => {
      if (state.currentQuestionIndex < totalQuestions - 1) {
        dispatch({ type: 'NEXT_QUESTION' });
      } else {
        finishQuiz();
      }
    }, 2000);
  }, [state.isAnswered, state.timeLeft, state.currentQuestionIndex, currentQuestion, totalQuestions]);

  const handleNextQuestion = useCallback(() => {
    if (state.currentQuestionIndex < totalQuestions - 1) {
      dispatch({ type: 'NEXT_QUESTION' });
    } else {
      finishQuiz();
    }
  }, [state.currentQuestionIndex, totalQuestions]);

  const finishQuiz = useCallback(() => {
    if (!quiz || !quizId) return;

    const totalCorrect = state.answers.filter(a => a.correct).length;
    const totalTime = state.answers.reduce((sum, a) => sum + a.timeSpent, 0);

    // Save results to localStorage
    saveResult({
      quizId,
      quizName: quiz.nome,
      score: totalCorrect,
      totalQuestions,
      totalTime
    });

    dispatch({ type: 'FINISH_QUIZ' });

    navigate(`/quiz/${quizId}/results`, {
      state: {
        score: totalCorrect,
        totalQuestions,
        totalTime,
        quizName: quiz.nome
      }
    });
  }, [quiz, quizId, state.answers, totalQuestions, navigate, saveResult]);

  if (!quiz || !currentQuestion) {
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

  const correctAnswer = currentQuestion.alternativas.find(alt => alt.correta);

  return (
    <>
      {/* Confetti celebration */}
      {state.showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
        />
      )}

      <Layout className="min-h-screen bg-gradient-subtle" contentClassName="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
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
          )}

          {/* Quiz Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {quiz.nome}
            </h1>
          </div>

          {/* Progress Bar with Context */}
          <div className="mb-10">
            <div className="flex items-center justify-between text-sm font-semibold mb-3">
              <span className="text-foreground bg-muted px-4 py-2 rounded-full">
                Questão {state.currentQuestionIndex + 1} de {totalQuestions}
              </span>
              <span className="text-primary bg-primary/10 px-4 py-2 rounded-full font-bold">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-4 shadow-inner" />
          </div>

          {/* Timer - Circular Progress */}
          <div className="flex flex-col items-center mb-8">
            <CircularTimer
              timeLeft={state.timeLeft}
              totalTime={30}
              size={140}
              strokeWidth={10}
            />
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Use as teclas A, B, C, D ou 1, 2, 3, 4
            </p>
          </div>

          {/* Question Card */}
          <Card className="mb-8 shadow-2xl border-2 border-primary/10 hover:border-primary/20 transition-all duration-300">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-10 text-center leading-relaxed">
                {currentQuestion.texto}
              </h2>

              <RadioGroup
                value={state.selectedAnswer}
                onValueChange={handleAnswerSelect}
                disabled={state.isAnswered}
                className="space-y-4"
              >
                {currentQuestion.alternativas.map((alternativa) => (
                  <QuizAlternative
                    key={alternativa.letra}
                    alternativa={alternativa}
                    selectedAnswer={state.selectedAnswer}
                    isAnswered={state.isAnswered}
                    onSelect={handleAnswerSelect}
                  />
                ))}
              </RadioGroup>

              {/* Feedback */}
              {state.isAnswered && (
                <div className={`mt-10 p-6 rounded-2xl text-center border-2 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-500 ${
                  state.timeLeft === 0
                    ? 'bg-orange-500/10 border-orange-500/30'
                    : state.selectedAnswer === correctAnswer?.letra
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  {state.timeLeft === 0 ? (
                    <div className="space-y-2">
                      <p className="text-2xl mb-2">⏰</p>
                      <p className="text-orange-700 dark:text-orange-300 font-bold text-lg">
                        Tempo esgotado!
                      </p>
                      <p className="text-muted-foreground">
                        A resposta correta era: <strong className="text-green-600 dark:text-green-400">{correctAnswer?.letra}) {correctAnswer?.texto}</strong>
                      </p>
                    </div>
                  ) : state.selectedAnswer === correctAnswer?.letra ? (
                    <div className="space-y-2">
                      <p className="text-4xl mb-2">🎉</p>
                      <p className="text-green-600 dark:text-green-400 font-bold text-xl">
                        Correto! Parabéns!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-3xl mb-2">❌</p>
                      <p className="text-red-600 dark:text-red-400 font-bold text-lg">
                        Incorreto
                      </p>
                      <p className="text-muted-foreground">
                        A resposta correta era: <strong className="text-green-600 dark:text-green-400">{correctAnswer?.letra}) {correctAnswer?.texto}</strong>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Next Button */}
              {state.isAnswered && (
                <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-3 duration-700">
                  <Button
                    onClick={handleNextQuestion}
                    size="lg"
                    className="min-w-[250px] h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {state.currentQuestionIndex < totalQuestions - 1 ? "Próxima pergunta →" : "Ver resultados 🏆"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default QuizGame;