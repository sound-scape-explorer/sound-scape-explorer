import {useStorageReader} from 'src/composables/use-storage-reader';
import {type FileDto} from 'src/dtos';
import {ref} from 'vue';

const files = ref<FileDto[] | null>(null);

export function useFiles() {
  const {read: readStorage} = useStorageReader();

  const read = async () => {
    await readStorage(async (worker, file) => {
      files.value = await worker.readFiles(file);
    });
  };

  return {
    files: files,
    read: read,
  };
}
