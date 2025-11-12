import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, Wifi } from "lucide-react";
import { useOnlineStatus } from "@/hooks/usePWA";
import { slideIn } from "@/lib/animations";

/**
 * Indicador visual do status de conexão
 * Mostra um toast quando fica offline/online
 */
export function OnlineStatusIndicator() {
  const isOnline = useOnlineStatus();
  const [showNotification, setShowNotification] = useState(false);
  const [hasShownInitial, setHasShownInitial] = useState(false);

  useEffect(() => {
    // Não mostra notificação na primeira montagem
    if (!hasShownInitial) {
      setHasShownInitial(true);
      return;
    }

    // Mostra notificação quando o status muda
    setShowNotification(true);

    // Esconde após 3 segundos
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOnline, hasShownInitial]);

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={slideIn.down}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-50"
        >
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-elevated ${
              isOnline
                ? 'bg-success text-success-foreground'
                : 'bg-destructive text-destructive-foreground'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="h-5 w-5" />
                <span className="font-medium">De volta online!</span>
              </>
            ) : (
              <>
                <WifiOff className="h-5 w-5" />
                <span className="font-medium">Você está offline</span>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Badge discreto no canto da tela
 */
export function OnlineStatusBadge() {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="fixed bottom-4 right-4 z-40"
    >
      <div className="flex items-center gap-2 bg-destructive text-destructive-foreground px-3 py-2 rounded-full shadow-lg">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">Offline</span>
      </div>
    </motion.div>
  );
}
