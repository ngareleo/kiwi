import { get_file_structure, read_file } from '../tools';
import { ExtensionHandler } from './extension-based-executor-types';
import { Get_Fs_Extension } from './file-system-extension-prompt';

export const fsExtension: ExtensionHandler<
  {},
  'get_file_structure' | 'read_file'
> = {
  name: 'fs',
  prompt: Get_Fs_Extension(),
  handler: async ({ commands, replyToCommand }) => {
    for (const command of commands) {
      switch (command['utility']) {
        case 'get_file_structure': {
          const [path] = command['args'];
          const value = await get_file_structure(path);
          replyToCommand(command, JSON.stringify(value, null, 2));
          break;
        }

        case 'read_file': {
          const [fileName] = command['args'];
          const value = await read_file(fileName);
          replyToCommand(command, JSON.stringify(value, null, 2));
          break;
        }
      }
    }
  },
};
