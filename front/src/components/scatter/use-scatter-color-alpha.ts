import {useStorage} from '@vueuse/core';
import {SettingDefault} from 'src/common/setting-default';
import {SettingKey} from 'src/common/setting-key';

const low = useStorage<number>(
  SettingKey.colorsAlphaLow,
  SettingDefault.colorsAlphaLow,
);

const high = useStorage<number>(
  SettingKey.colorsAlphaHigh,
  SettingDefault.colorsAlphaHigh,
);

export function useScatterColorAlpha() {
  const reset = () => {
    low.value = SettingDefault.colorsAlphaLow;
    high.value = SettingDefault.colorsAlphaHigh;
  };

  return {
    reset: reset,
    low: low,
    high: high,
  };
}
