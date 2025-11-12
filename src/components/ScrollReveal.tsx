import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * Component that reveals content when it enters the viewport
 * Perfect for scroll-triggered animations
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  direction = "up",
  threshold = 0.1,
  triggerOnce = true
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce });

  // Define animation variants based on direction
  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...(direction === "up" && { y: 40 }),
      ...(direction === "down" && { y: -40 }),
      ...(direction === "left" && { x: 40 }),
      ...(direction === "right" && { x: -40 }),
      ...(direction === "scale" && { scale: 0.8 }),
      ...(direction === "fade" && {})
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Container for staggered children animations
 */
interface ScrollRevealContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}

export function ScrollRevealContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  threshold = 0.1
}: ScrollRevealContainerProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Item to be used within ScrollRevealContainer
 */
interface ScrollRevealItemProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale";
}

export function ScrollRevealItem({
  children,
  className = "",
  direction = "up"
}: ScrollRevealItemProps) {
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      ...(direction === "up" && { y: 30 }),
      ...(direction === "down" && { y: -30 }),
      ...(direction === "left" && { x: 30 }),
      ...(direction === "right" && { x: -30 }),
      ...(direction === "scale" && { scale: 0.8 })
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
