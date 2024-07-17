import {useStorage} from '@vueuse/core';
import {SettingDefault as d} from 'src/common/setting-default';
import {SettingKey as k} from 'src/common/setting-key';

const isDevEnabled = useStorage<boolean>(k.isDevEnabled, d.isDevEnabled);
const devAutoLoadView = useStorage<boolean>(
  k.devAutoLoadView,
  d.devAutoLoadView,
);

export function useClientSettingsDev() {
  const reset = () => {
    isDevEnabled.value = d.isDevEnabled;
    devAutoLoadView.value = d.devAutoLoadView;
  };

  return {
    reset: reset,
    isDevEnabled: isDevEnabled,
    devAutoLoadView: devAutoLoadView,
  };
}
