import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alternative } from "@/data/quizData";

interface QuizAlternativeProps {
  alternativa: Alternative;
  selectedAnswer: string;
  isAnswered: boolean;
  onSelect: (letra: string) => void;
}

/**
 * Quiz alternative component
 * Displays a single quiz answer option with visual feedback
 */
const QuizAlternative = ({
  alternativa,
  selectedAnswer,
  isAnswered,
  onSelect,
}: QuizAlternativeProps) => {
  const isSelected = selectedAnswer === alternativa.letra;
  const isCorrect = alternativa.correta;
  const isWrong = isAnswered && isSelected && !isCorrect;
  const showAsCorrect = isAnswered && isCorrect;

  const containerClasses = `group relative flex items-start gap-4 p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
    showAsCorrect
      ? 'border-green-500 bg-green-500/20 shadow-lg shadow-green-500/20 scale-[1.02]'
      : isWrong
      ? 'border-red-500 bg-red-500/20 shadow-lg shadow-red-500/20 scale-[1.02]'
      : isSelected
      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-[1.02]'
      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-primary hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.03] hover:-translate-y-0.5'
  }`;

  const badgeClasses = `flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${
    showAsCorrect
      ? 'bg-green-500 text-white shadow-md'
      : isWrong
      ? 'bg-red-500 text-white shadow-md'
      : isSelected
      ? 'bg-primary text-white shadow-md'
      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 group-hover:bg-white group-hover:text-primary group-hover:shadow-lg'
  }`;

  const textClasses = `flex-1 cursor-pointer font-semibold text-base leading-relaxed pt-2.5 transition-colors duration-300 ${
    showAsCorrect
      ? 'text-green-700 dark:text-green-300'
      : isWrong
      ? 'text-red-700 dark:text-red-300'
      : isSelected
      ? 'text-primary dark:text-primary'
      : 'text-gray-800 dark:text-gray-200 group-hover:text-white'
  }`;

  return (
    <div
      className={containerClasses}
      onClick={() => !isAnswered && onSelect(alternativa.letra)}
    >
      {/* Letter Badge */}
      <div className={badgeClasses}>
        {alternativa.letra}
      </div>

      {/* Hidden Radio for accessibility */}
      <RadioGroupItem
        value={alternativa.letra}
        id={alternativa.letra}
        className="sr-only"
      />

      {/* Answer Text */}
      <Label
        htmlFor={alternativa.letra}
        className={textClasses}
      >
        {alternativa.texto}
      </Label>
    </div>
  );
};

export default QuizAlternative;
