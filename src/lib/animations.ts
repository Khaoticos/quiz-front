import { Variants } from "framer-motion";

/**
 * Brand signature animations for Quis
 * All animations follow the energetic and playful brand personality
 */

// Page transition animations
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] // Custom easing matching --transition-smooth
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Slide in from different directions
export const slideIn = {
  left: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  },
  right: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
  },
  up: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 }
  },
  down: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 }
  }
};

// Scale animations
export const scaleAnimation: Variants = {
  initial: {
    scale: 0.8,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

// Bounce animation - signature playful effect
export const bounceAnimation: Variants = {
  initial: {
    scale: 0,
    rotate: -180
  },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      // Bounce effect using cubic bezier matching --transition-bounce
      ease: [0.68, -0.55, 0.265, 1.55]
    }
  }
};

// Stagger children animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Card hover effects
export const cardHover = {
  rest: {
    scale: 1,
    boxShadow: "var(--shadow-card)"
  },
  hover: {
    scale: 1.05,
    boxShadow: "var(--shadow-glow)",
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  tap: {
    scale: 0.98
  }
};

// Button animations
export const buttonAnimation = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  tap: {
    scale: 0.95
  }
};

// Quiz answer reveal animation
export const answerReveal: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Success celebration animation
export const successAnimation: Variants = {
  initial: {
    scale: 0,
    rotate: -180
  },
  animate: {
    scale: [0, 1.2, 1],
    rotate: [- 180, 10, -10, 0],
    transition: {
      duration: 0.6,
      times: [0, 0.6, 1],
      ease: "easeOut"
    }
  }
};

// Error shake animation
export const errorShake: Variants = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

// Pulse animation for attention
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Float animation for badges and decorative elements
export const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Timer warning animation (last 10 seconds)
export const timerWarning = {
  animate: {
    scale: [1, 1.1, 1],
    color: ["hsl(var(--foreground))", "hsl(var(--destructive))", "hsl(var(--foreground))"],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Gradient background animation
export const gradientAnimation = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

/**
 * Preset transition timings matching design system
 */
export const transitions = {
  smooth: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
  },
  bounce: {
    type: "spring" as const,
    stiffness: 260,
    damping: 20
  },
  quick: {
    duration: 0.2,
    ease: "easeOut"
  },
  slow: {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1]
  }
};

/**
 * Animation presets for common use cases
 */
export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  slideInLeft: slideIn.left,
  slideInRight: slideIn.right,
  slideInUp: slideIn.up,
  slideInDown: slideIn.down
};
