import {fileURLToPath, URL} from 'node:url';

import vue from '@vitejs/plugin-vue';
import analyzer from 'rollup-plugin-analyzer';
import {defineConfig} from 'vite';
import {comlink} from 'vite-plugin-comlink';
import {VitePWA as vitePwa} from 'vite-plugin-pwa';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

const isProduction = process.env.NODE_ENV === 'production';
const isElectron = process.env.NODE_ENV === 'electron';

let base = '/';

if (isElectron) {
  base = './';
} else if (isProduction) {
  base = '/sound-scape-explorer/';
}

/**
 * Do not add following dependencies to code splitting as it will result in corrupted runtime code execution:
 *  `@vueuse/components`
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  base: base,
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/styles/colors.scss";
          @import "src/styles/transitions.scss";
          @import "src/styles/layers.scss";
          @import "src/styles/animations.scss";
          @import "src/styles/borders.scss";
          @import "src/styles/sizes.scss";
          @import "src/styles/scrolls.scss";
          @import "src/styles/shadows.scss";
          @import "src/styles/fx.scss";
        `,
      },
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          // '@vueuse/components': ['@vueuse/components'], // Do not uncomment this!
          '@vueuse/core': ['@vueuse/core'],
          'chroma-js': ['chroma-js'],
          'colormap': ['colormap'],
          'comlink': ['comlink'],
          'dayjs': ['dayjs'],
          'h5wasm': ['h5wasm'],
          'html2canvas': ['html2canvas'],
          'plotly.js-dist-min': ['plotly.js-dist-min'],
          'speed-to-percentage': ['speed-to-percentage'],
          'speed-to-semitones': ['speed-to-semitones'],
          'vue': ['vue'],
          'vue-router': ['vue-router'],
          'wav-file-encoder': ['wav-file-encoder'],
          'wavesurfer.js': ['wavesurfer.js'],
          'ionicons/icons': ['ionicons/icons'],
          '@ionic/vue': ['@ionic/vue'],
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
    vitePwa({
      registerType: 'autoUpdate',
      includeAssets: ['/logo.svg', '/logo.png'],
      manifest: {
        short_name: 'SSE',
        name: 'SoundScapeExplorer',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  worker: {
    plugins: [comlink()],
  },
});
