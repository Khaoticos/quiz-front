import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target browsers modernos
    target: 'es2020',

    // Source maps apenas em dev
    sourcemap: false,

    // Chunk size warning
    chunkSizeWarningLimit: 600,

    // Minify com terser para melhor compressão
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true,
      },
    },

    rollupOptions: {
      output: {
        // Code splitting manual
        manualChunks: {
          // React core
          'vendor-react': [
            'react',
            'react-dom',
            'react-router-dom',
          ],

          // UI Library
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
          ],

          // Query & Forms
          'vendor-data': [
            '@tanstack/react-query',
            'react-hook-form',
          ],

          // Icons & Animations
          'vendor-icons': [
            'lucide-react',
            'framer-motion',
          ],
        },

        // Nomes de arquivo para cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // CSS code splitting
    cssCodeSplit: true,
  },

  // Otimizações de dependências
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
    ],
  },
});
