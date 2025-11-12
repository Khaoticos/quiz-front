import { useEffect, useState } from "react";
import { Trophy, PartyPopper, HandMetal, Zap, Star } from "lucide-react";

interface CircularProgressProps {
  score: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  showAnimation?: boolean;
}

/**
 * Circular progress component with animated score display
 */
const CircularProgress = ({
  score,
  total,
  size = 200,
  strokeWidth = 12,
  showAnimation = true
}: CircularProgressProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = Math.round((score / total) * 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = animatedScore / total;
  const strokeDashoffset = circumference - progress * circumference;

  // Animate score count-up
  useEffect(() => {
    if (!showAnimation) {
      setAnimatedScore(score);
      return;
    }

    let currentScore = 0;
    const increment = score / 30; // Animate over 30 frames
    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(currentScore));
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [score, showAnimation]);

  // Determine color based on percentage
  const getColor = () => {
    if (percentage >= 90) return "hsl(48, 95%, 50%)"; // Gold
    if (percentage >= 75) return "hsl(142, 76%, 45%)"; // Green
    if (percentage >= 60) return "hsl(199, 89%, 48%)"; // Blue
    if (percentage >= 40) return "hsl(38, 92%, 50%)"; // Orange
    return "hsl(var(--destructive))"; // Red
  };

  const getBackgroundColor = () => {
    if (percentage >= 90) return "hsl(48, 95%, 50%, 0.1)";
    if (percentage >= 75) return "hsl(142, 76%, 45%, 0.1)";
    if (percentage >= 60) return "hsl(199, 89%, 48%, 0.1)";
    if (percentage >= 40) return "hsl(38, 92%, 50%, 0.1)";
    return "hsl(var(--destructive) / 0.1)";
  };

  const getIcon = () => {
    if (percentage >= 90) return Trophy;
    if (percentage >= 75) return PartyPopper;
    if (percentage >= 60) return HandMetal;
    if (percentage >= 40) return Zap;
    return Star;
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getBackgroundColor()}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: percentage >= 90 ? 'drop-shadow(0 0 12px hsl(48, 95%, 50%))' : 'none'
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {(() => {
          const IconComponent = getIcon();
          return <IconComponent className="mb-2" size={48} style={{ color: getColor() }} />;
        })()}
        <div className="flex items-baseline gap-1">
          <span
            className="font-bold text-5xl transition-all duration-300"
            style={{ color: getColor() }}
          >
            {animatedScore}
          </span>
          <span className="text-2xl text-muted-foreground">/{total}</span>
        </div>
        <div
          className="mt-2 px-4 py-1 rounded-full font-bold text-sm"
          style={{
            backgroundColor: getBackgroundColor(),
            color: getColor()
          }}
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
