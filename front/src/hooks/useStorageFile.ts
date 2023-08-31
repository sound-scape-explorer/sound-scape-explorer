import {computed, reactive} from 'vue';

interface StorageFileRef {
  value: File | null;
}

export const storageFileRef = reactive<StorageFileRef>({
  value: null,
});

export function useStorageFile() {
  const isStorageFileRef = computed<boolean>(() => {
    return storageFileRef.value !== null;
  });

  const setFile = (file: File) => {
    if (storageFileRef.value === file) {
      return;
    }

    storageFileRef.value = file;
  };

  // TODO: Add file close from worker
  const resetFile = () => {
    storageFileRef.value = null;
  };

  return {
    isStorageFileRef: isStorageFileRef,
    setFile: setFile,
    resetFile: resetFile,
  };
}
