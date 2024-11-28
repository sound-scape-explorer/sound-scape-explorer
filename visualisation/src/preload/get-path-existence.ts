import fs from 'node:fs';

export function getPathExistence(path: string): boolean {
  return fs.existsSync(path);
}
