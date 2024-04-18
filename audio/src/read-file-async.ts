import {readFile} from 'node:fs';

import {validatePath} from './validate-path';

export async function readFileAsync(path: string): Promise<Buffer> {
  return new Promise((resolve) => {
    validatePath(path);

    readFile(path, (err, data) => {
      if (err) {
        console.error(`${err.message}`);
      }

      resolve(data);
    });
  });
}
