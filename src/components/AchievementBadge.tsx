import { cn } from "@/lib/utils";
import { AchievementBadge, getRarityColor, getRarityLabel } from "@/data/achievementBadges";
import { motion } from "framer-motion";

interface AchievementBadgeProps {
  badge: AchievementBadge;
  unlocked?: boolean;
  showAnimation?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function AchievementBadgeComponent({
  badge,
  unlocked = false,
  showAnimation = false,
  size = 'md'
}: AchievementBadgeProps) {
  const sizeClasses = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-24 h-24 text-4xl',
    lg: 'w-32 h-32 text-5xl'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const BadgeContent = (
    <div className={cn(
      "relative group cursor-pointer",
      "transition-all duration-300 ease-out",
      unlocked ? "scale-100 opacity-100" : "scale-95 opacity-50 grayscale"
    )}>
      {/* Badge Circle */}
      <div className={cn(
        sizeClasses[size],
        "rounded-full bg-gradient-to-br shadow-lg",
        "flex items-center justify-center",
        "border-4 transition-all duration-300",
        unlocked
          ? `${badge.color} border-white dark:border-gray-800 group-hover:scale-110 group-hover:shadow-xl`
          : "from-gray-400 to-gray-600 border-gray-500"
      )}>
        <span className="drop-shadow-md">{badge.icon}</span>
      </div>

      {/* Rarity Indicator */}
      {unlocked && (
        <div className={cn(
          "absolute -top-1 -right-1 w-6 h-6 rounded-full",
          "flex items-center justify-center text-xs font-bold",
          "bg-white dark:bg-gray-900 border-2",
          getRarityColor(badge.rarity),
          `border-current`
        )}>
          {badge.rarity === 'legendary' && '💎'}
          {badge.rarity === 'epic' && '⭐'}
          {badge.rarity === 'rare' && '✨'}
          {badge.rarity === 'common' && '🔵'}
        </div>
      )}

      {/* Tooltip on Hover */}
      <div className={cn(
        "absolute bottom-full left-1/2 -translate-x-1/2 mb-2",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
        "pointer-events-none z-10"
      )}>
        <div className="bg-gray-900 dark:bg-gray-800 text-white p-3 rounded-lg shadow-xl min-w-[200px]">
          <p className={cn("font-bold mb-1", getRarityColor(badge.rarity))}>
            {badge.name}
          </p>
          <p className={cn(textSizes[size], "text-gray-300 mb-2")}>
            {badge.description}
          </p>
          <p className={cn(textSizes[size], "text-gray-400 text-xs")}>
            {getRarityLabel(badge.rarity)}
          </p>
        </div>
        {/* Tooltip Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
        </div>
      </div>

      {/* Lock Icon for Locked Badges */}
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/50 rounded-full p-2 backdrop-blur-sm">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );

  if (showAnimation && unlocked) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        {BadgeContent}
      </motion.div>
    );
  }

  return BadgeContent;
}

/**
 * Display a grid of badges
 */
interface BadgeGridProps {
  badges: AchievementBadge[];
  unlockedBadgeIds: string[];
  size?: 'sm' | 'md' | 'lg';
}

export function BadgeGrid({ badges, unlockedBadgeIds, size = 'sm' }: BadgeGridProps) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {badges.map(badge => (
        <div key={badge.id} className="flex flex-col items-center gap-2">
          <AchievementBadgeComponent
            badge={badge}
            unlocked={unlockedBadgeIds.includes(badge.id)}
            size={size}
          />
          <p className="text-xs text-center text-muted-foreground max-w-[80px] truncate">
            {badge.name}
          </p>
        </div>
      ))}
    </div>
  );
}

/**
 * Display newly unlocked badge with celebration
 */
interface NewBadgeUnlockProps {
  badge: AchievementBadge;
  onClose: () => void;
}

export function NewBadgeUnlock({ badge, onClose }: NewBadgeUnlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white dark:bg-gray-900 p-12 rounded-2xl shadow-xl max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
          aria-label="Fechar"
        >
          <span className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl leading-none">×</span>
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-primary mb-8">
          Novo Emblema Desbloqueado!
        </h2>

        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <AchievementBadgeComponent
            badge={badge}
            unlocked={true}
            showAnimation={false}
            size="lg"
          />
        </div>

        {/* Badge Name */}
        <h3 className="text-xl font-bold text-foreground mb-3">
          {badge.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-2">
          {badge.description}
        </p>

        {/* Rarity */}
        <p className="text-xs text-muted-foreground mb-8">
          Raridade: <span className={cn("font-semibold", getRarityColor(badge.rarity))}>
            {getRarityLabel(badge.rarity)}
          </span>
        </p>

        {/* Continue Button */}
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Continuar
        </button>
      </motion.div>
    </motion.div>
  );
}
