import {defineConfig} from 'vite';
import {resolve} from 'path';

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
    },
  },
});
