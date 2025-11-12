import { ReactNode } from "react";
import { motion } from "framer-motion";
import { scaleAnimation, floatAnimation } from "@/lib/animations";
import { Target, Search, Store, Trophy, BarChart3, Heart, Bell, WifiOff, AlertCircle, LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: string | LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
  variant?: "default" | "card" | "minimal";
  showDecorations?: boolean;
}

/**
 * Componente EmptyState - Estado vazio consistente e amigável
 * Usado quando não há dados para exibir em listas, busca, etc.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
  variant = "default",
  showDecorations = true
}: EmptyStateProps) {
  const containerClasses = {
    default: "flex flex-col items-center justify-center py-16 px-4 text-center",
    card: "flex flex-col items-center justify-center py-12 px-6 text-center bg-gradient-to-br from-accent/30 to-accent/10 rounded-2xl border-2 border-dashed border-border",
    minimal: "flex flex-col items-center justify-center py-8 px-4 text-center"
  };

  const iconSizes = {
    default: "text-7xl",
    card: "text-6xl",
    minimal: "text-5xl"
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={scaleAnimation}
      className={`${containerClasses[variant]} ${className} relative overflow-hidden`}
    >
      {/* Decorative circles in background */}
      {showDecorations && variant !== "minimal" && (
        <>
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/5 blur-xl"
            variants={floatAnimation}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-accent/5 blur-xl"
            variants={floatAnimation}
            animate="animate"
            style={{ animationDelay: "0.5s" }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Ícone com background */}
        <motion.div
          className={`mb-6 relative flex items-center justify-center`}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {variant === "card" && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl scale-150" />
          )}
          {typeof icon === 'string' ? (
            <span role="img" aria-label={title} className={`${iconSizes[variant]} relative z-10`}>
              {icon}
            </span>
          ) : (
            (() => {
              const IconComponent = icon;
              const sizeMap = {
                default: 64,
                card: 48,
                minimal: 40
              };
              return <IconComponent className="text-primary relative z-10" size={sizeMap[variant]} />;
            })()
          )}
        </motion.div>

        {/* Título */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`font-bold mb-3 text-foreground ${
            variant === "minimal" ? "text-xl" : "text-2xl md:text-3xl"
          }`}
        >
          {title}
        </motion.h3>

        {/* Descrição */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-muted-foreground mb-8 max-w-md leading-relaxed ${
            variant === "minimal" ? "text-sm" : "text-base"
          }`}
        >
          {description}
        </motion.p>

        {/* Ação opcional */}
        {action && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {action}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Estados vazios pré-configurados para casos comuns
 */
export const EmptyStates = {
  NoQuizzes: (action?: ReactNode) => (
    <EmptyState
      icon={Target}
      title="Nenhum quiz encontrado"
      description="Estamos preparando novos quizzes incríveis para você. Volte em breve!"
      action={action}
    />
  ),

  NoResults: (action?: ReactNode) => (
    <EmptyState
      icon={Search}
      title="Nenhum resultado encontrado"
      description="Não encontramos nada com esses critérios. Tente ajustar sua busca."
      action={action}
    />
  ),

  NoEstablishments: (action?: ReactNode) => (
    <EmptyState
      icon={Store}
      title="Nenhum estabelecimento disponível"
      description="Ainda não temos bares parceiros nessa região. Estamos expandindo!"
      action={action}
    />
  ),

  NoBadges: (action?: ReactNode) => (
    <EmptyState
      icon={Trophy}
      title="Ainda sem emblemas"
      description="Continue jogando e desbloqueie conquistas incríveis! Cada quiz é uma nova oportunidade."
      action={action}
    />
  ),

  NoHistory: (action?: ReactNode) => (
    <EmptyState
      icon={BarChart3}
      title="Sem histórico de jogos"
      description="Seu histórico de quizzes aparecerá aqui. Que tal começar seu primeiro desafio?"
      action={action}
    />
  ),

  NoFavorites: (action?: ReactNode) => (
    <EmptyState
      icon={Heart}
      title="Nenhum favorito ainda"
      description="Favorite seus quizzes preferidos para encontrá-los rapidamente depois."
      action={action}
    />
  ),

  NoNotifications: (action?: ReactNode) => (
    <EmptyState
      icon={Bell}
      title="Tudo limpo por aqui!"
      description="Você não tem notificações no momento. Relaxe e aproveite!"
      action={action}
    />
  ),

  Offline: (action?: ReactNode) => (
    <EmptyState
      icon={WifiOff}
      title="Você está offline"
      description="Verifique sua conexão com a internet para continuar jogando."
      action={action}
    />
  ),

  Error: (action?: ReactNode) => (
    <EmptyState
      icon={AlertCircle}
      title="Ops! Algo deu errado"
      description="Encontramos um problema inesperado. Tente novamente em alguns instantes."
      action={action}
    />
  )
};
