import path from 'node:path';

export function getFileDirectory(file: File) {
  return path.dirname(file.path);
}
