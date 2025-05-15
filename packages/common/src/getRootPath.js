import { resolve } from 'path';
import __dirname from './__dirname.js';

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
