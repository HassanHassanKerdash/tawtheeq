import { defineConfig, loadEnv } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { kawkabVitePlugins } from 'kawkab-frontend';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'KAWKAB_');

  return {
    plugins: [
      tailwindcss(),
      reactRouter(),
      tsconfigPaths(),
      ...kawkabVitePlugins()
    ],
    resolve: {
      alias: {
        kawkab: 'kawkab-frontend'
      }
    },
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
    }
  };
});
