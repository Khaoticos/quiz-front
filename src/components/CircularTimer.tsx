import { Clock } from "lucide-react";

interface CircularTimerProps {
  timeLeft: number;
  totalTime: number;
  size?: number;
  strokeWidth?: number;
}

/**
 * Circular timer component with animated progress ring
 */
const CircularTimer = ({ timeLeft, totalTime, size = 120, strokeWidth = 8 }: CircularTimerProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = timeLeft / totalTime;
  const strokeDashoffset = circumference - progress * circumference;

  // Determine color based on time remaining
  const getColor = () => {
    if (timeLeft <= 5) return "hsl(var(--destructive))";
    if (timeLeft <= 10) return "hsl(var(--warning))";
    return "hsl(var(--primary))";
  };

  const getBackgroundColor = () => {
    if (timeLeft <= 5) return "hsl(var(--destructive) / 0.1)";
    if (timeLeft <= 10) return "hsl(var(--warning) / 0.1)";
    return "hsl(var(--primary) / 0.1)";
  };

  return (
    <div className="flex flex-col items-center gap-3">
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
            className="transition-all duration-1000 ease-linear"
            style={{
              filter: timeLeft <= 5 ? 'drop-shadow(0 0 8px hsl(var(--destructive)))' : 'none'
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Clock
            className={`h-6 w-6 mb-1 transition-colors duration-300 ${
              timeLeft <= 5 ? 'text-destructive animate-pulse' :
              timeLeft <= 10 ? 'text-warning' :
              'text-primary'
            }`}
          />
          <span
            className={`font-bold text-3xl transition-all duration-300 ${
              timeLeft <= 5 ? 'text-destructive scale-110 animate-pulse' :
              timeLeft <= 10 ? 'text-warning' :
              'text-foreground'
            }`}
          >
            {timeLeft}
          </span>
          <span className="text-xs text-muted-foreground">segundos</span>
        </div>
      </div>

      {/* Helper text */}
      {timeLeft > 5 && (
        <p className="text-xs text-muted-foreground text-center max-w-[200px]">
          Use as teclas A, B, C, D ou 1, 2, 3, 4
        </p>
      )}
      {timeLeft <= 5 && (
        <p className="text-xs text-destructive font-semibold animate-pulse">
          ⏰ Tempo acabando!
        </p>
      )}
    </div>
  );
};

export default CircularTimer;
