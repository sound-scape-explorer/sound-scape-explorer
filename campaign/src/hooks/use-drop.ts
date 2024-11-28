import {useSetAtom} from 'jotai';
import {useCallback} from 'react';
import {inputFilesAtom, tabIndexAtom} from 'src/atoms.ts';
import {FILE_TYPES} from 'src/constants.ts';
import {type InputFile} from 'src/types';

export function useDrop() {
  const setFiles = useSetAtom(inputFilesAtom);
  const setTabIndex = useSetAtom(tabIndexAtom);

  const handleDrop = useCallback(
    (
      newFiles: File[],
      // rejectedFiles: File[],
      // e: DropEvent,
    ) => {
      const sanitized: InputFile[] = [];

      for (const file of newFiles) {
        if (!FILE_TYPES.includes(file.type)) {
          continue;
        }

        sanitized.push(file as unknown as InputFile);
      }

      setFiles(sanitized);
      setTabIndex(1);
    },
    [setFiles, setTabIndex],
  );

  return {
    handleDrop,
  };
}
