import { useState, useEffect } from 'react';

/**
 * Hook para monitorar o status online/offline
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('[PWA] Aplicação online');
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('[PWA] Aplicação offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

/**
 * Hook para detectar se o app está instalado como PWA
 */
export function useIsInstalled() {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Verifica se está rodando em modo standalone
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    setIsInstalled(isStandalone);
  }, []);

  return isInstalled;
}

/**
 * Hook para gerenciar o prompt de instalação do PWA
 */
export function useInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Previne o mini-infobar automático
      e.preventDefault();

      // Armazena o evento para usar depois
      setInstallPrompt(e);
      setIsInstallable(true);

      console.log('[PWA] App pode ser instalado');
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setIsInstallable(false);
      console.log('[PWA] App instalado com sucesso');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!installPrompt) {
      console.log('[PWA] Prompt de instalação não disponível');
      return { outcome: 'dismissed' };
    }

    // Mostra o prompt
    installPrompt.prompt();

    // Aguarda a escolha do usuário
    const result = await installPrompt.userChoice;

    // Limpa o prompt
    setInstallPrompt(null);
    setIsInstallable(false);

    console.log('[PWA] Resposta do usuário:', result.outcome);

    return result;
  };

  return {
    isInstallable,
    promptInstall
  };
}

/**
 * Hook para detectar updates do Service Worker
 */
export function useServiceWorkerUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);

        // Verifica por updates periodicamente
        const checkForUpdates = () => {
          reg.update();
        };

        const interval = setInterval(checkForUpdates, 60000); // A cada 1 minuto

        // Listener para novos service workers
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;

          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
                console.log('[PWA] Nova versão disponível');
              }
            });
          }
        });

        return () => {
          clearInterval(interval);
        };
      });
    }
  }, []);

  const applyUpdate = () => {
    if (registration && registration.waiting) {
      // Envia mensagem para o service worker pular a espera
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });

      // Recarrega a página após o SW ativar
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  };

  return {
    updateAvailable,
    applyUpdate
  };
}
