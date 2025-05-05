import {useStorage} from '@vueuse/core';
import {settingDefaults} from 'src/common/setting-defaults';
import {SettingKey} from 'src/common/setting-key';

const isDecibelsDisplay = useStorage<boolean>(
  SettingKey.decibelsDisplay,
  settingDefaults.decibelsDisplay,
);

const isLegendOverflow = useStorage<boolean>(
  SettingKey.legendOverflow,
  settingDefaults.legendOverflow,
);

export function useWavesurferSettings() {
  return {
    isDecibelsDisplay,
    isLegendOverflow,
  };
}
