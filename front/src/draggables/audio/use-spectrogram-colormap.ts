import {useStorage} from '@vueuse/core';
import {settingDefaults} from 'src/common/setting-defaults';
import {SettingKey} from 'src/common/setting-key';

const colormap = useStorage<string>(
  SettingKey.spectrogramColorMap,
  settingDefaults.spectrogramColorMap,
);

export function useSpectrogramColormap() {
  return {
    colormap: colormap,
  };
}
