import {webUtils} from 'electron';

export function getFilePath(file: File) {
  return webUtils.getPathForFile(file);
}
