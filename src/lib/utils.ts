import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the theme color for a given theme ID
 * @param themeId - The ID of the theme (e.g., "cultura-pop", "historia-brasil")
 * @returns Object with theme color utilities
 */
export function getThemeColor(themeId: string) {
  const themeMap: Record<string, { color: string; glow: string; gradient: string }> = {
    "cultura-pop": {
      color: "bg-theme-cultura-pop",
      glow: "bg-theme-cultura-pop-glow",
      gradient: "bg-gradient-to-br from-theme-cultura-pop to-theme-cultura-pop-glow"
    },
    "historia-brasil": {
      color: "bg-theme-historia-brasil",
      glow: "bg-theme-historia-brasil-glow",
      gradient: "bg-gradient-to-br from-theme-historia-brasil to-theme-historia-brasil-glow"
    },
    "filmes-cinema": {
      color: "bg-theme-filmes-cinema",
      glow: "bg-theme-filmes-cinema-glow",
      gradient: "bg-gradient-to-br from-theme-filmes-cinema to-theme-filmes-cinema-glow"
    },
    "esportes": {
      color: "bg-theme-esportes",
      glow: "bg-theme-esportes-glow",
      gradient: "bg-gradient-to-br from-theme-esportes to-theme-esportes-glow"
    },
    "curiosidades": {
      color: "bg-theme-curiosidades",
      glow: "bg-theme-curiosidades-glow",
      gradient: "bg-gradient-to-br from-theme-curiosidades to-theme-curiosidades-glow"
    },
    "ciencia-tech": {
      color: "bg-theme-ciencia-tech",
      glow: "bg-theme-ciencia-tech-glow",
      gradient: "bg-gradient-to-br from-theme-ciencia-tech to-theme-ciencia-tech-glow"
    },
    "games": {
      color: "bg-theme-games",
      glow: "bg-theme-games-glow",
      gradient: "bg-gradient-to-br from-theme-games to-theme-games-glow"
    },
    "gastronomia": {
      color: "bg-theme-gastronomia",
      glow: "bg-theme-gastronomia-glow",
      gradient: "bg-gradient-to-br from-theme-gastronomia to-theme-gastronomia-glow"
    }
  };

  return themeMap[themeId] || {
    color: "bg-primary",
    glow: "bg-primary-glow",
    gradient: "bg-gradient-primary"
  };
}
