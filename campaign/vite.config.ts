import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const isElectron = process.env.NODE_ENV === 'electron';

let base = '/';

if (isElectron) {
  base = './';
}

// https://vite.dev/config/
export default defineConfig({
  base: base,
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          '@ag-grid-community/client-side-row-model': [
            '@ag-grid-community/client-side-row-model',
          ],
          '@ag-grid-community/core': ['@ag-grid-community/core'],
          'ag-grid-community': ['ag-grid-community'],
          'ag-grid-react': ['ag-grid-react'],
          'clsx': ['clsx'],
          'countries-and-timezones': ['countries-and-timezones'],
          'dayjs': ['dayjs'],
          'jotai': ['jotai'],
          'react-dropzone': ['react-dropzone'],
          'react-tabs': ['react-tabs'],
          'react-toastify': ['react-toastify'],
          'scheduler': ['scheduler'],
        },
      },
    },
  },
});
