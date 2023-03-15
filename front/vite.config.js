import vue from '@vitejs/plugin-vue';
import analyzer from 'rollup-plugin-analyzer';
import {fileURLToPath, URL} from 'url';
import {defineConfig} from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

export const base = process.env.NODE_ENV === 'production'
  ? '/sound-scape-explorer/'
  : '';

// https://vitejs.dev/config/
export default defineConfig({
  base,
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'chroma-js': ['chroma-js'],
          'dayjs': ['dayjs'],
          'h5wasm': ['h5wasm'],
          'highcharts': ['highcharts'],
          'highcharts-vue': ['highcharts-vue'],
          'html2canvas': ['html2canvas'],
          'simple-statistics': ['simple-statistics'],
          'three': ['three'],
          'vue': ['vue'],
          'vue-router': ['vue-router'],
        },
      },
    },
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
