import {existsSync} from 'node:fs';

export function validatePath(path: string): void {
  const pathExists = existsSync(path);

  if (!pathExists) {
    throw new Error(`File does not exist at path ${path}`);
  }
}
