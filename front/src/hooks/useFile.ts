import {computed, reactive} from 'vue';

interface FileRef {
  value: File | null;
}

export const fileRef = reactive<FileRef>({
  value: null,
});

export function useFile() {
  const isFileRef = computed<boolean>(() => {
    return fileRef.value !== null;
  });

  const setFile = (file: File) => {
    if (fileRef.value === file) {
      return;
    }

    fileRef.value = file;
  };

  // TODO: Add file close from worker
  const resetFile = () => {
    fileRef.value = null;
  };

  return {
    isFileRef: isFileRef,
    setFile: setFile,
    resetFile: resetFile,
  };
}
