import { fileURLToPath } from 'url';
import path, { resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function getRootPath(...args) {
  return resolve(__dirname, '../../../', ...args);
}
