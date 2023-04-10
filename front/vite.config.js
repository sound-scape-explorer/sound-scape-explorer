import vue from '@vitejs/plugin-vue';
import analyzer from 'rollup-plugin-analyzer';
import {fileURLToPath, URL} from 'url';
import {defineConfig} from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

export const base = process.env.NODE_ENV === 'production'
  ? '/sound-scape-explorer/'
  : '/';

// https://vitejs.dev/config/
export default defineConfig({
  base: base,
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          '@vueuse/components': ['@vueuse/components'],
          '@vueuse/core': ['@vueuse/core'],
          'audiobuffer-slice': ['audiobuffer-slice'],
          'chroma-js': ['chroma-js'],
          'colormap': ['colormap'],
          'dayjs': ['dayjs'],
          'h5wasm': ['h5wasm'],
          'html2canvas': ['html2canvas'],
          'plotly.js-dist-min': ['plotly.js-dist-min'],
          'three': ['three'],
          'vue': ['vue'],
          'wav-encoder': ['wav-encoder'],
          'wavesurfer.js': ['wavesurfer.js'],
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
