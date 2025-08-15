import EventEmitter from 'events';
import { Stats, readFile, readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Reads the content of a file at the given path.
 */
export function readFileContent(
  pathToFile: string,
  cb: (err: Error | null, data: string | undefined) => void
) {
  readFile(pathToFile, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      cb(err, undefined);
    }
    cb(null, data);
  });
}

type DirectoryWalkEventMap = {
  found: [string, Stats];
  error: [Error | undefined];
};

export class DirectoryWalk extends EventEmitter<DirectoryWalkEventMap> {
  constructor() {
    super();
  }

  walkSync(dirPath: string) {
    let paths: string[] | undefined;
    try {
      paths = readdirSync(dirPath);
    } catch (e) {
      this.emit('error', e);
      return;
    }

    for (const item of paths) {
      const itemPath = join(dirPath, item);
      let stat: Stats | undefined;

      try {
        stat = statSync(itemPath);
      } catch (e) {
        this.emit('error', e);
        return;
      }

      this.emit('found', itemPath, stat);
      if (stat.isDirectory()) {
        this.walkSync(itemPath);
      }
    }
  }
}
