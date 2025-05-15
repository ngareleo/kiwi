import { defineConfig } from 'vite';
import getRootPath from '@kiwi/common/src/getRootPath.js';
import react from '@vitejs/plugin-react';

const buildOutputPath = getRootPath('dist');

export default defineConfig({
  build: {
    outDir: buildOutputPath
  },
  plugins: [react()],
});
