import { protocol } from '../constants';

export const Get_Fs_Extension = () => `
# Protocol File Extension
- The ${protocol} has enabled the file system extension. This extension allows you to interact with a virtual file system on the ${system}.
- The name of this extension is "fs".

# Extension Instructions
- You can read a file from the file system by invoking the "get_file(pathToFile)" where pathToFile is a path to a file.
- You can read the file structure by invoking the "get_file_structure(pathToProject, depth=infinity)" where is the base path to start the tree from and the depth is the number of nested directories to return.

# Additional Utilities
- get_file_structure(pathToProject) - Should give you a string representation of the project at \`pathToProject\`.
- read_file(pathToFile)             - Should give you the contents of a file at 'pathToFile'. If the file doesn't exist the ${protocol} will send error details through the  <message/> directive.
`;
