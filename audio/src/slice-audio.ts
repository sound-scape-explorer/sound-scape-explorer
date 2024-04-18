import {spawn} from 'node:child_process';
import {existsSync, unlinkSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {readFileAsync} from './read-file-async';

const tempPath = path.join(os.tmpdir(), 'scratch.wav');
console.log(`temp path: ${tempPath}`);

export function sliceAudio(
  ffmpegPath: string,
  file: string,
  start: number,
  end: number,
): Promise<Buffer> {
  return new Promise((resolve) => {
    if (existsSync(tempPath)) {
      unlinkSync(tempPath);
    }

    const duration = end - start;

    const ffmpeg = spawn(ffmpegPath, [
      '-i',
      file,
      '-acodec',
      'copy',
      '-ss',
      `00:00:${start}`,
      '-t',
      `00:00:${duration}`,
      tempPath,
    ]);

    ffmpeg.on('error', (error) => {
      console.error(`Error: ${error.message}`);
    });

    ffmpeg.on('close', async () => {
      const data = await readFileAsync(tempPath);
      resolve(data);
    });
  });
}
