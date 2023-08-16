import vue from '@vitejs/plugin-vue';
import analyzer from 'rollup-plugin-analyzer';
import {fileURLToPath, URL} from 'url';
import {defineConfig} from 'vite';
import {comlink} from 'vite-plugin-comlink';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

const isProduction = process.env.NODE_ENV === 'production';
export const base = isProduction ? '/sound-scape-explorer/' : '/';

/**
 * Do not add following dependencies to code splitting as it will result in corrupted runtime code execution:
 *  `@vueuse/components`
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  base: base,
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          // '@vueuse/components': ['@vueuse/components'], // Do not uncomment this!
          '@vueuse/core': ['@vueuse/core'],
          'audiobuffer-slice': ['audiobuffer-slice'],
          'chroma-js': ['chroma-js'],
          'colormap': ['colormap'],
          'comlink': ['comlink'],
          'dayjs': ['dayjs'],
          'h5wasm': ['h5wasm'],
          'html2canvas': ['html2canvas'],
          'plotly.js-dist-min': ['plotly.js-dist-min'],
          'speed-to-percentage': ['speed-to-percentage'],
          'speed-to-semitones': ['speed-to-semitones'],
          // TODO: To remove
          'three': ['three'],
          'vue': ['vue'],
          'wav-file-encoder': ['wav-file-encoder'],
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
    comlink(),
    wasm(),
    topLevelAwait(),
    vue(),
    analyzer({summaryOnly: true}),
  ],
  worker: {
    plugins: [comlink()],
  },
});
