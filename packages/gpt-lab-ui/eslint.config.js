import { defineConfig } from 'eslint/config';
import defaultConfig from '@kiwi/eslint/eslint.config.js';

export default defineConfig([
  {
    extends: [defaultConfig],
  },
]);
