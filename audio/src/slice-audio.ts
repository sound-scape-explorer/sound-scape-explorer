import {spawn} from 'node:child_process';
import {existsSync, unlinkSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {SCRATCH_FILENAME} from './constants';
import {readFileAsync} from './read-file-async';
import {validateFfmpeg} from './validate-ffmpeg';

const tempPath = path.join(os.tmpdir(), `${SCRATCH_FILENAME}.wav`);
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
    validateFfmpeg(ffmpegPath);

    const ffmpeg = spawn(ffmpegPath, [
      '-i',
      file,
      '-acodec',
      'copy',
      '-ss',
      start.toString(),
      '-t',
      duration.toString(),
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
