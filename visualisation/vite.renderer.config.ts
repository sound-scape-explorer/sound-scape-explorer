// @ts-expect-error: esModuleInterop is actually enabled...
import path from 'path';
import {defineConfig} from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },
});
