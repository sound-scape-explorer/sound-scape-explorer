import {DEFAULT_AUDIO_PATH} from 'src/constants.ts';
import {type ImportFile} from 'src/types.ts';

declare global {
  interface Window {
    electronAPI?: {
      getFileDirectory?: (file: File) => string;
      getPathExistence?: (path: string) => boolean;
      joinPath?: (dirPath: string, audioPath: string) => string;
    };
  }
}

// TODO: Test this on Windows environments
export function getFolderPath(file: ImportFile): string {
  if (typeof window?.electronAPI?.getFileDirectory === 'undefined') {
    return DEFAULT_AUDIO_PATH;
  }

  const fileName = `/${file.name}`;
  const fullPath = window.electronAPI.getFileDirectory(file as unknown as File);

  const basePath = `/${file.relativePath
    .replace(fileName, '')
    .split('/')
    .splice(2)
    .join('/')}`;

  const rootPath = fullPath.replace(basePath, '');
  return rootPath;
}

export function getPathExistence(path: string): boolean {
  if (typeof window?.electronAPI?.getPathExistence === 'undefined') {
    return false;
  }

  const exists = window.electronAPI.getPathExistence(path);
  return exists;
}

export function joinPath(dirPath: string, audioPath: string) {
  if (typeof window?.electronAPI?.joinPath === 'undefined') {
    return `${dirPath}/${audioPath}`;
  }

  return window.electronAPI.joinPath(dirPath, audioPath);
}
