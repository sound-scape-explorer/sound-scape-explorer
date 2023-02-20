import vue from '@vitejs/plugin-vue';
import analyzer from 'rollup-plugin-analyzer';
import {fileURLToPath, URL} from 'url';
import {defineConfig} from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2020',
  },
  resolve: {
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    wasm(),
    topLevelAwait(),
    vue(),
    analyzer({summaryOnly: true}),
  ],
});
