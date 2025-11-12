export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockCriteria: {
    type: 'score' | 'speed' | 'streak' | 'category' | 'total_quizzes';
    value: number;
    category?: string;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const achievementBadges: AchievementBadge[] = [
  // Score-based badges
  {
    id: 'perfect-score',
    name: 'Perfeccionista',
    description: 'Acerte todas as questões de um quiz',
    icon: '🏆',
    color: 'from-yellow-400 to-yellow-600',
    unlockCriteria: { type: 'score', value: 100 },
    rarity: 'epic'
  },
  {
    id: 'almost-there',
    name: 'Quase Perfeito',
    description: 'Acerte 90% ou mais das questões',
    icon: '⭐',
    color: 'from-blue-400 to-blue-600',
    unlockCriteria: { type: 'score', value: 90 },
    rarity: 'rare'
  },
  {
    id: 'good-start',
    name: 'Bom Começo',
    description: 'Acerte 70% ou mais das questões',
    icon: '✨',
    color: 'from-green-400 to-green-600',
    unlockCriteria: { type: 'score', value: 70 },
    rarity: 'common'
  },

  // Speed-based badges
  {
    id: 'lightning-fast',
    name: 'Relâmpago',
    description: 'Complete um quiz em menos de 2 minutos',
    icon: '⚡',
    color: 'from-purple-400 to-purple-600',
    unlockCriteria: { type: 'speed', value: 120 },
    rarity: 'epic'
  },
  {
    id: 'speed-demon',
    name: 'Velocista',
    description: 'Complete um quiz em menos de 3 minutos',
    icon: '🚀',
    color: 'from-indigo-400 to-indigo-600',
    unlockCriteria: { type: 'speed', value: 180 },
    rarity: 'rare'
  },

  // Category mastery badges
  {
    id: 'pop-culture-master',
    name: 'Mestre da Cultura Pop',
    description: 'Complete 5 quizzes de Cultura Pop com 80%+',
    icon: '🎭',
    color: 'from-pink-400 to-pink-600',
    unlockCriteria: { type: 'category', value: 5, category: 'cultura-pop' },
    rarity: 'legendary'
  },
  {
    id: 'history-buff',
    name: 'Historiador',
    description: 'Complete 5 quizzes de História com 80%+',
    icon: '📚',
    color: 'from-green-400 to-green-700',
    unlockCriteria: { type: 'category', value: 5, category: 'historia-brasil' },
    rarity: 'legendary'
  },
  {
    id: 'cinema-expert',
    name: 'Cinéfilo Expert',
    description: 'Complete 5 quizzes de Cinema com 80%+',
    icon: '🎬',
    color: 'from-red-400 to-red-700',
    unlockCriteria: { type: 'category', value: 5, category: 'filmes-cinema' },
    rarity: 'legendary'
  },
  {
    id: 'tech-wizard',
    name: 'Mago da Tecnologia',
    description: 'Complete 5 quizzes de Tecnologia com 80%+',
    icon: '🔬',
    color: 'from-cyan-400 to-cyan-600',
    unlockCriteria: { type: 'category', value: 5, category: 'ciencia-tech' },
    rarity: 'legendary'
  },
  {
    id: 'gaming-legend',
    name: 'Lenda dos Games',
    description: 'Complete 5 quizzes de Games com 80%+',
    icon: '🎮',
    color: 'from-violet-400 to-violet-600',
    unlockCriteria: { type: 'category', value: 5, category: 'games' },
    rarity: 'legendary'
  },
  {
    id: 'food-connoisseur',
    name: 'Gourmet',
    description: 'Complete 5 quizzes de Gastronomia com 80%+',
    icon: '🍽️',
    color: 'from-orange-400 to-orange-600',
    unlockCriteria: { type: 'category', value: 5, category: 'gastronomia' },
    rarity: 'legendary'
  },

  // Total achievement badges
  {
    id: 'quiz-novice',
    name: 'Iniciante',
    description: 'Complete seu primeiro quiz',
    icon: '🌱',
    color: 'from-lime-400 to-lime-600',
    unlockCriteria: { type: 'total_quizzes', value: 1 },
    rarity: 'common'
  },
  {
    id: 'quiz-enthusiast',
    name: 'Entusiasta',
    description: 'Complete 10 quizzes',
    icon: '🔥',
    color: 'from-orange-400 to-red-500',
    unlockCriteria: { type: 'total_quizzes', value: 10 },
    rarity: 'rare'
  },
  {
    id: 'quiz-master',
    name: 'Mestre dos Quizzes',
    description: 'Complete 25 quizzes',
    icon: '👑',
    color: 'from-yellow-300 to-yellow-600',
    unlockCriteria: { type: 'total_quizzes', value: 25 },
    rarity: 'epic'
  },
  {
    id: 'quiz-legend',
    name: 'Lenda Viva',
    description: 'Complete 50 quizzes',
    icon: '💎',
    color: 'from-cyan-400 via-blue-500 to-purple-600',
    unlockCriteria: { type: 'total_quizzes', value: 50 },
    rarity: 'legendary'
  }
];

/**
 * Check if a badge should be unlocked based on quiz results
 */
export function checkBadgeUnlock(
  badge: AchievementBadge,
  quizResults: {
    score: number;
    timeSpent: number;
    category?: string;
    totalQuizzes: number;
    categoryQuizzes?: { [key: string]: number };
  }
): boolean {
  const { unlockCriteria } = badge;

  switch (unlockCriteria.type) {
    case 'score':
      return quizResults.score >= unlockCriteria.value;

    case 'speed':
      return quizResults.timeSpent <= unlockCriteria.value;

    case 'category':
      if (!unlockCriteria.category || !quizResults.categoryQuizzes) return false;
      return (quizResults.categoryQuizzes[unlockCriteria.category] || 0) >= unlockCriteria.value;

    case 'total_quizzes':
      return quizResults.totalQuizzes >= unlockCriteria.value;

    default:
      return false;
  }
}

/**
 * Get rarity color for badge display
 */
export function getRarityColor(rarity: AchievementBadge['rarity']): string {
  const rarityColors = {
    common: 'text-gray-400',
    rare: 'text-blue-400',
    epic: 'text-purple-500',
    legendary: 'text-yellow-400'
  };
  return rarityColors[rarity];
}

/**
 * Get rarity label
 */
export function getRarityLabel(rarity: AchievementBadge['rarity']): string {
  const rarityLabels = {
    common: 'Comum',
    rare: 'Raro',
    epic: 'Épico',
    legendary: 'Lendário'
  };
  return rarityLabels[rarity];
}
