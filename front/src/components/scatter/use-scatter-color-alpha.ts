import {useStorage} from '@vueuse/core';
import {settingDefaults} from 'src/common/setting-defaults';
import {SettingKey} from 'src/common/setting-key';

const low = useStorage<number>(
  SettingKey.colorsAlphaLow,
  settingDefaults.colorsAlphaLow,
);

const high = useStorage<number>(
  SettingKey.colorsAlphaHigh,
  settingDefaults.colorsAlphaHigh,
);

export function useScatterColorAlpha() {
  const reset = () => {
    low.value = settingDefaults.colorsAlphaLow;
    high.value = settingDefaults.colorsAlphaHigh;
  };

  return {
    reset: reset,
    low: low,
    high: high,
  };
}
