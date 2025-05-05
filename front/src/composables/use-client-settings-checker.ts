import {useClientSettings} from 'src/composables/use-client-settings';
import {VERSION} from 'src/version';

export function useClientSettingsChecker() {
  const {version, resetAll} = useClientSettings();

  const checkVersions = () => {
    if (version.value === VERSION) {
      return;
    }

    console.warn('App version differs from saved settings, resetting');
    resetAll();
  };

  return {
    checkVersions,
  };
}
