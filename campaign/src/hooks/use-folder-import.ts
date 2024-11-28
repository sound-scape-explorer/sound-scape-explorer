import {useAtom} from 'jotai';
import {useCallback} from 'react';
import {folderExistsAtom, settingsAtom} from 'src/atoms.ts';
import {type ImportFile} from 'src/types.ts';
import {getFolderPath, getPathExistence} from 'src/utils/electron.ts';

// TODO: Make this used from all loaders
export function useFolderImport() {
  const [settings, setSettings] = useAtom(settingsAtom);
  const [folderExists, setFolderExists] = useAtom(folderExistsAtom);

  const updateFolder = useCallback(
    (firstFile: ImportFile) => {
      const folder = getFolderPath(firstFile);
      const newSettings = {...settings, audioPath: folder};
      setSettings(newSettings);
      const exists = getPathExistence(folder);
      setFolderExists(exists);
    },
    [settings, setSettings, setFolderExists],
  );

  return {
    folderExists,
    updateFolder,
  };
}
