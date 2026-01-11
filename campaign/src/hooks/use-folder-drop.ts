import {FILE_TYPES} from '@shared/constants';
import {useCallback} from 'react';
import {useSettingsState} from 'src/hooks/use-settings-state';
import {useTabNavigation} from 'src/hooks/use-tab-navigation';
import {
  type FileAlias,
  useTableLoader,
} from 'src/panels/files/hooks/use-table-loader';

export function useFolderDrop() {
  const {loadFromFolder} = useTableLoader();
  const {navigate} = useTabNavigation();
  const {update} = useSettingsState();

  const handleFolder = useCallback(
    (files: File[]) => {
      const audios = files.filter((f) => FILE_TYPES.includes(f.type));

      if (audios.length === 0) {
        return;
      }

      const paths = audios.map(window.electronAPI.getFilePath);
      const common = window.electronAPI.findCommonFolder(paths);
      update('audioPath', common);

      const aliases = audios.map((audio, a) => {
        const alias: FileAlias = {
          path: paths[a].replace(common, ''),
          timestamp: audio.lastModified,
        };

        return alias;
      });

      loadFromFolder(aliases);
      navigate('settings');
    },
    [loadFromFolder, navigate, update],
  );

  return {
    handleFolder,
  };
}
