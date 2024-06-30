const allowedEndings = ['ffmpeg', 'ffmpeg.exe'];

export function validateFfmpeg(path: string) {
  const isPathValid = allowedEndings.some((ending) => path.endsWith(ending));

  if (isPathValid) {
    return;
  }

  throw new Error(`Path for ffmpeg is not valid ${path}`);
}
