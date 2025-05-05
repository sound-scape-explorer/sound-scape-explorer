import {JSON_TYPE, XLSX_TYPE} from '@shared/constants';
import {useCallback, useState} from 'react';
import {type FileWithPath} from 'react-dropzone';
import {useFolderDrop} from 'src/hooks/use-folder-drop';
import {useJsonDrop} from 'src/hooks/use-json-drop';
import {useXlsxDrop} from 'src/hooks/use-xlsx-drop';
import {type DropzoneInfo} from 'src/primitives/dropzone.tsx';

export function useDropzone() {
  const [locked, setLocked] = useState(false);
  const {handleFolder} = useFolderDrop();
  const {handleJson} = useJsonDrop();
  const {handleXlsx} = useXlsxDrop();

  const handleDrop = useCallback(
    async (files: readonly FileWithPath[], info: DropzoneInfo) => {
      setLocked(true);

      if (info.isDirectory) {
        handleFolder(files as File[]);
        setLocked(false);
        return;
      }

      const file = files[0];
      const isXlsx = file.type === XLSX_TYPE;

      if (isXlsx) {
        handleXlsx(file as File);
        setLocked(false);
        return;
      }

      const isJson = file.type === JSON_TYPE;

      if (isJson) {
        await handleJson(file as File);
        setLocked(false);
        return;
      }

      setLocked(false);
    },
    [handleFolder, handleJson, handleXlsx],
  );

  return {
    handleDrop,
    locked,
  };
}
