import { defineConfig } from 'vite';
import getRootPath from '@kiwi/common/src/getRootPath.js';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';

const buildOutputPath = getRootPath('dist');

export default defineConfig(() => ({
  server: {
    watch: {
      usePolling: true,
    },
  },
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: buildOutputPath,
    manifest: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
