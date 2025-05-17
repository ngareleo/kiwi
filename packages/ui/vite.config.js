import { defineConfig } from 'vite';
import getRootPath from '@kiwi/common/src/getRootPath.js';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

const buildOutputPath = getRootPath('dist');

export default defineConfig({
  build: {
    outDir: buildOutputPath,
    manifest: true,
  },
  plugins: [react(), viteSingleFile()],
});
