import {spawn} from 'child_process';
import {existsSync, readFile, unlinkSync} from 'fs';

const tempFile = 'scratch.wav';

export function sliceAudio(
  file: string,
  start: number,
  end: number,
): Promise<Buffer> {
  return new Promise((resolve) => {
    if (existsSync(tempFile)) {
      unlinkSync(tempFile);
    }

    const duration = end - start;

    const ffmpeg = spawn('ffmpeg', [
      '-i',
      file,
      '-acodec',
      'copy',
      '-ss',
      `00:00:${start}`,
      '-t',
      `00:00:${duration}`,
      tempFile,
    ]);

    ffmpeg.on('error', (error) => {
      console.error(`Error: ${error.message}`);
    });

    ffmpeg.on('close', () => {
      readFile(tempFile, (err, data) => {
        if (err) {
          console.error(`Error: ${err.message}`);
        }

        resolve(data);
      });
    });
  });
}
