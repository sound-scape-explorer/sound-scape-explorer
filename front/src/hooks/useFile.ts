import {computed, reactive} from 'vue';

interface FileReactive {
  value: File | null;
}

export const fileRef = reactive<FileReactive>({
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

  const resetFile = () => {
    fileRef.value = null;
  };

  return {
    isFileRef: isFileRef,
    setFile: setFile,
    resetFile: resetFile,
  };
}
