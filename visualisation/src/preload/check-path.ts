import fs from 'node:fs';

export function checkPath(path: string) {
  const stats = fs.statSync(path);

  return {
    path: path,
    isDirectory: stats.isDirectory(),
    isFile: stats.isFile(),
  };
}
