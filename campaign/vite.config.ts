import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const isElectron = process.env.NODE_ENV === 'electron';
console.log('isElectron:', isElectron);

let base = '/';

if (isElectron) {
  base = './';
}

// https://vite.dev/config/
export default defineConfig({
  base,
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },
  plugins: [react()],
});
