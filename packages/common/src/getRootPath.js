import { fileURLToPath } from 'url';
import path, { resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 *
 * Get the path starting from the root of the kiwi project.
 *
 * @param  {...string} args - Arguments of `path.resolve(...args)`
 * @returns string
 */
export default function getRootPath(...args) {
  return resolve(__dirname, '../../../', ...args);
}
