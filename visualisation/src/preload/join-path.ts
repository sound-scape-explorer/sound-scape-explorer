import path from 'node:path';

export function joinPath(dirPath: string, filePath: string) {
  return path.join(dirPath, filePath);
}
