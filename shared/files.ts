import {type ConfigDto} from '@shared/dtos';

export function getStorageFilename(config: ConfigDto) {
  return config.settings.storagePath.replace('.h5', '');
}

export function readJson(
  file: File,
  callback: (e: ProgressEvent<FileReader>) => void,
) {
  const reader = new FileReader();
  reader.onload = (e) => callback(e);
  reader.readAsText(file);
}
