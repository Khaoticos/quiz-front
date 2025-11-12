import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonAnimation, cardHover, bounceAnimation } from "@/lib/animations";

/**
 * Animated Button with signature Quis bounce effect
 */
interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function AnimatedButton({
  children,
  onClick,
  className = "",
  variant = 'primary'
}: AnimatedButtonProps) {
  const variantClasses = {
    primary: "bg-gradient-primary text-white shadow-glow",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };

  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonAnimation}
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-lg font-semibold transition-all duration-300",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
}

/**
 * Animated Card with signature hover effect and glow
 */
interface AnimatedCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  glowOnHover?: boolean;
}

export function AnimatedCard({
  children,
  onClick,
  className = "",
  glowOnHover = true
}: AnimatedCardProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={cardHover}
      onClick={onClick}
      className={cn(
        "bg-card rounded-xl p-6 cursor-pointer transition-all duration-300",
        glowOnHover && "hover:shadow-glow",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/**
 * Floating Badge - signature Quis animation for decorative elements
 */
interface FloatingBadgeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingBadge({ children, className = "", delay = 0 }: FloatingBadgeProps) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * Pop-in animation for important elements
 */
interface PopInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function PopIn({ children, className = "", delay = 0 }: PopInProps) {
  return (
    <motion.div
      variants={bounceAnimation}
      initial="initial"
      animate="animate"
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered List - animate children in sequence
 */
interface StaggeredListProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggeredList({
  children,
  className = "",
  staggerDelay = 0.1
}: StaggeredListProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered Item - use inside StaggeredList
 */
interface StaggeredItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggeredItem({ children, className = "" }: StaggeredItemProps) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Pulsing Indicator - for notifications or attention
 */
interface PulsingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function PulsingIndicator({
  size = 'md',
  color = 'bg-primary',
  className = ""
}: PulsingIndicatorProps) {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className={cn("relative inline-flex", className)}>
      <motion.span
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={cn("absolute rounded-full", sizes[size], color)}
      />
      <span className={cn("relative rounded-full", sizes[size], color)} />
    </div>
  );
}

/**
 * Shake animation for errors or attention
 */
interface ShakeProps {
  children: ReactNode;
  className?: string;
  trigger?: boolean;
}

export function Shake({ children, className = "", trigger = false }: ShakeProps) {
  return (
    <motion.div
      animate={trigger ? {
        x: [0, -10, 10, -10, 10, 0],
        transition: {
          duration: 0.4,
          ease: "easeInOut"
        }
      } : {}}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Success Celebration - signature success animation
 */
interface SuccessAnimationProps {
  show: boolean;
  children?: ReactNode;
}

export function SuccessAnimation({ show, children }: SuccessAnimationProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{
        scale: [0, 1.2, 1],
        rotate: [-180, 10, -10, 0]
      }}
      transition={{
        duration: 0.6,
        times: [0, 0.6, 1],
        ease: "easeOut"
      }}
      className="inline-block"
    >
      {children || <span className="text-4xl">✨</span>}
    </motion.div>
  );
}

/**
 * Gradient Text Animation - animated gradient on text
 */
interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <motion.span
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }}
      className={cn(
        "bg-gradient-to-r from-primary via-primary-glow to-primary",
        "bg-clip-text text-transparent bg-[length:200%_auto]",
        className
      )}
    >
      {children}
    </motion.span>
  );
}

/**
 * Hover Glow Effect - adds glow on hover
 */
interface HoverGlowProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function HoverGlow({
  children,
  className = "",
  glowColor = "primary"
}: HoverGlowProps) {
  return (
    <motion.div
      whileHover={{
        boxShadow: `0 10px 40px -10px hsl(var(--${glowColor}) / 0.5)`,
        scale: 1.02
      }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={cn("transition-all duration-300", className)}
    >
      {children}
    </motion.div>
  );
}
