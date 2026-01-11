import {useEffect} from 'react';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import {useTableLoader} from 'src/panels/files/hooks/use-table-loader.ts';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';

export function useTablePathValidation() {
  const {settings} = useSettingsState();
  const {isLoaded} = useTableLoader();
  const {updatePathIntents} = useTableState();

  useEffect(() => {
    if (isLoaded && settings.audioPath) {
      updatePathIntents(settings.audioPath);
    }
    // intentionally NOT including updatePathIntents
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, settings.audioPath]);
}
