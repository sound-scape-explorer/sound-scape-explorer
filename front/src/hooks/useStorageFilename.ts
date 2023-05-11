import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export function useStorageFilename() {
  const readFilename = async (fileIndex: number) => {
    if (workerRef.value === null || fileRef.value === null) {
      return null;
    }

    const values = await workerRef.value.readFilename(fileRef.value, fileIndex);
    return values;
  };

  return {
    readFilename: readFilename,
  };
}
