import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInstallPrompt, useIsInstalled } from "@/hooks/usePWA";
import { slideIn } from "@/lib/animations";

/**
 * Componente de prompt para instalação do PWA
 * Aparece automaticamente quando o app pode ser instalado
 */
export function InstallPWA() {
  const { isInstallable, promptInstall } = useInstallPrompt();
  const isInstalled = useIsInstalled();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já descartou o banner nesta sessão
    const dismissed = sessionStorage.getItem('pwa-install-dismissed');

    if (!dismissed && isInstallable && !isInstalled) {
      // Mostra o banner após 3 segundos
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled]);

  const handleInstall = async () => {
    const result = await promptInstall();

    if (result.outcome === 'accepted') {
      console.log('[PWA] Usuário aceitou instalar');
    } else {
      console.log('[PWA] Usuário recusou instalar');
    }

    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Não mostra se já foi descartado ou se está instalado
  if (isDismissed || isInstalled || !isInstallable) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={slideIn.down}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
          <div className="bg-card border-2 border-primary rounded-xl shadow-glow p-4">
            <div className="flex items-start gap-4">
              {/* Ícone */}
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Download className="h-6 w-6 text-white" />
              </div>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground mb-1">
                  Instale o Quis
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Acesse rapidamente e jogue offline. Instale nosso app!
                </p>

                {/* Ações */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleInstall}
                    size="sm"
                    className="bg-gradient-primary"
                  >
                    Instalar
                  </Button>
                  <Button
                    onClick={handleDismiss}
                    size="sm"
                    variant="ghost"
                  >
                    Agora não
                  </Button>
                </div>
              </div>

              {/* Botão de fechar */}
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Banner sutil no rodapé (alternativa ao popup)
 */
export function InstallPWABanner() {
  const { isInstallable, promptInstall } = useInstallPrompt();
  const isInstalled = useIsInstalled();
  const [isVisible, setIsVisible] = useState(true);

  if (!isInstallable || isInstalled || !isVisible) {
    return null;
  }

  const handleInstall = async () => {
    await promptInstall();
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={slideIn.up}
        className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-primary to-primary-glow p-4 shadow-elevated"
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Download className="h-5 w-5 text-white flex-shrink-0" />
            <p className="text-white text-sm md:text-base font-medium">
              Instale o Quis para uma experiência melhor!
            </p>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <Button
              onClick={handleInstall}
              size="sm"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              Instalar
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
