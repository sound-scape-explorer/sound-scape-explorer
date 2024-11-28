import {defineConfig} from 'vite';
// @ts-expect-error: esModuleInterop is actually enabled...
import path from 'path';

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
});
