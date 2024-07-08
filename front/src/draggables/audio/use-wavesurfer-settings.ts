import {useStorage} from '@vueuse/core';
import {SettingDefault} from 'src/common/setting-default';
import {SettingKey} from 'src/common/setting-key';

const isDecibelsDisplay = useStorage<boolean>(
  SettingKey.decibelsDisplay,
  SettingDefault.decibelsDisplay,
);

const isLegendOverflow = useStorage<boolean>(
  SettingKey.legendOverflow,
  SettingDefault.legendOverflow,
);

export function useWavesurferSettings() {
  return {
    isDecibelsDisplay: isDecibelsDisplay,
    isLegendOverflow: isLegendOverflow,
  };
}
