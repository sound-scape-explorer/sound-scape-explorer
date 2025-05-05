import {useStorage} from '@vueuse/core';
import {settingDefaults as d} from 'src/common/setting-defaults';
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
    reset,
    isDevEnabled,
    devAutoLoadView,
  };
}
