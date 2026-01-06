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

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener('load', async (e) => {
      if (!e.target) {
        throw Error('Could not load FileReader');
      }

      const text = e.target.result as string;
      resolve(text);
    });

    reader.readAsText(file);
  });
}
