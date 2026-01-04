import {spawn} from 'node:child_process';
import {existsSync, unlinkSync} from 'node:fs';

import {SCRATCH_PATH} from './constants';
import {readFileAsync} from './read-file-async';
import {validateFfmpeg} from './validate-ffmpeg';

export function sliceAudio(
  ffmpegPath: string,
  file: string,
  start: number,
  end: number,
): Promise<Buffer> {
  return new Promise((resolve) => {
    if (existsSync(SCRATCH_PATH)) {
      unlinkSync(SCRATCH_PATH);
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
      SCRATCH_PATH,
    ]);

    ffmpeg.on('error', (error) => {
      console.error(`Error: ${error.message}`);
    });

    ffmpeg.on('close', async () => {
      const data = await readFileAsync(SCRATCH_PATH);
      resolve(data);
    });
  });
}
