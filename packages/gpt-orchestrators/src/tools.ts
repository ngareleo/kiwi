import { DirectoryWalk, readFileContent } from './utils.js';

/**
 * Allows llm to understand a projects file strucure
 */
export async function get_file_structure(pathToFile: string) {
  return new Promise((resolve, reject) => {
    let files: string[] = [];
    new DirectoryWalk()
      .on('error', (err) => reject(err))
      .on('found', (path) => files.push(path))
      .walkSync(pathToFile);
    resolve(files.join('\n'));
  });
}

/**
 * Allows llm to read a file from file system
 */
export async function read_file(pathToFile: string) {
  return new Promise((resolve, reject) => {
    readFileContent(pathToFile, (err, contents) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(contents);
    });
  });
}
