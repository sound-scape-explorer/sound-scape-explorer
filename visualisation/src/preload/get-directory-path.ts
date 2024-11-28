import path from 'node:path';

export function getDirectoryPath(file: File) {
  return path.dirname(file.path);
}
