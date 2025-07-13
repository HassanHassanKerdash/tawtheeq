import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { customMessages, printWelcomeMessage, printStatusMessage } from './startup';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'KAWKAB_');
  
  return {
    plugins: [
      tailwindcss(), 
      reactRouter(), 
      tsconfigPaths(),
          {
      name: 'custom-messages',
      configResolved() {
        printStatusMessage('INFO', customMessages.vite.configLoaded());
      },
      configureServer(server) {
        server.httpServer?.on('listening', () => {
          setTimeout(() => {
            const address = server.httpServer?.address();
            if (address && typeof address === 'object') {
              printWelcomeMessage('Kawkab', address.port);
            }
          }, 200);
        });
      },
      buildStart() {
        printStatusMessage('BUILD', customMessages.vite.buildStart());
      },
      buildEnd() {
        printStatusMessage('SUCCESS', customMessages.vite.buildEnd());
      }
    }
    ],

    envPrefix: 'KAWKAB_',
    
    server: {
      port: parseInt(env.KAWKAB_APP_PORT || '8080'),
      host: true,
      open: false
    },
    
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'CIRCULAR_DEPENDENCY') return;
          warn(warning);
        }
      }
    },
  };
});
