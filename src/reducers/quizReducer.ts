// Quiz Reducer - Manages complex quiz state in a predictable way
// This reducer centralizes all quiz game state logic, making it easier
// to maintain, test, and extend with new features (pause, resume, etc.)

export interface Answer {
  questionId: string;
  selectedAnswer: string;
  correct: boolean;
  timeSpent: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  selectedAnswer: string;
  timeLeft: number;
  answers: Answer[];
  isAnswered: boolean;
  startTime: number;
  status: 'playing' | 'paused' | 'finished';
  showConfetti: boolean;
  hasShownWarning: boolean;
}

export type QuizAction =
  | { type: 'SELECT_ANSWER'; payload: { answer: string; isCorrect: boolean; timeSpent: number; questionId: string } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'TIME_TICK' }
  | { type: 'TIME_UP'; payload: { questionId: string } }
  | { type: 'FINISH_QUIZ' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'SHOW_CONFETTI' }
  | { type: 'HIDE_CONFETTI' }
  | { type: 'SHOW_WARNING' }
  | { type: 'RESET_FOR_NEW_QUESTION' };

export const createInitialState = (): QuizState => ({
  currentQuestionIndex: 0,
  selectedAnswer: "",
  timeLeft: 30,
  answers: [],
  isAnswered: false,
  startTime: Date.now(),
  status: 'playing',
  showConfetti: false,
  hasShownWarning: false,
});

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SELECT_ANSWER':
      return {
        ...state,
        selectedAnswer: action.payload.answer,
        isAnswered: true,
        answers: [
          ...state.answers,
          {
            questionId: action.payload.questionId,
            selectedAnswer: action.payload.answer,
            correct: action.payload.isCorrect,
            timeSpent: action.payload.timeSpent,
          },
        ],
      };

    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedAnswer: "",
        isAnswered: false,
        timeLeft: 30,
        startTime: Date.now(),
        hasShownWarning: false,
      };

    case 'TIME_TICK':
      return {
        ...state,
        timeLeft: Math.max(0, state.timeLeft - 1),
      };

    case 'TIME_UP':
      return {
        ...state,
        isAnswered: true,
        answers: [
          ...state.answers,
          {
            questionId: action.payload.questionId,
            selectedAnswer: "",
            correct: false,
            timeSpent: 30 - state.timeLeft,
          },
        ],
      };

    case 'FINISH_QUIZ':
      return {
        ...state,
        status: 'finished',
      };

    case 'PAUSE':
      return {
        ...state,
        status: 'paused',
      };

    case 'RESUME':
      return {
        ...state,
        status: 'playing',
      };

    case 'SHOW_CONFETTI':
      return {
        ...state,
        showConfetti: true,
      };

    case 'HIDE_CONFETTI':
      return {
        ...state,
        showConfetti: false,
      };

    case 'SHOW_WARNING':
      return {
        ...state,
        hasShownWarning: true,
      };

    case 'RESET_FOR_NEW_QUESTION':
      return {
        ...state,
        timeLeft: 30,
        selectedAnswer: "",
        isAnswered: false,
        startTime: Date.now(),
        hasShownWarning: false,
      };

    default:
      return state;
  }
}
