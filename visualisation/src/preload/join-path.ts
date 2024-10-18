import path from 'node:path';

export function joinPath(dirPath: string, audioPath: string) {
  const sanitizedAudioPath = audioPath.trim();

  if (path.isAbsolute(sanitizedAudioPath)) {
    return sanitizedAudioPath;
  }

  return path.join(dirPath, audioPath);
}
