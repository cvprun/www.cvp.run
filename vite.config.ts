import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import svgr from 'vite-plugin-svgr';

import {routeHtml} from './scripts/vite-route-html';

export default defineConfig({
  plugins: [react(), svgr(), tailwindcss(), routeHtml()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Libraries change far less often than site code; keep them in their
        // own long-cached chunk so a copy edit does not invalidate them.
        manualChunks(id) {
          if (
            /node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(
              id,
            )
          ) {
            return 'react';
          }
          if (id.includes('node_modules/@radix-ui/')) {
            return 'radix';
          }
          return undefined;
        },
      },
    },
  },
});
