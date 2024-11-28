import fs from 'node:fs';
import path from 'node:path';

export function listFiles(folder: string): string[] {
  let list: string[] = [];

  const items = fs.readdirSync(folder);

  for (const item of items) {
    const itemPath = path.join(folder, item);
    const itemStats = fs.statSync(itemPath);

    if (itemStats.isDirectory()) {
      const subDirFiles = listFiles(itemPath);
      list = list.concat(subDirFiles);
      continue;
    }

    if (itemStats.isFile()) {
      list.push(itemPath);
    }
  }

  return list;
}
