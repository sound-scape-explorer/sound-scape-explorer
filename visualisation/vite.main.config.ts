import {defineConfig} from 'vite';
// @ts-expect-error: esModuleInterop is actually enabled...
import path from 'path';

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    mainFields: ['module', 'jsnext:main', 'jsnext'],
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
});
