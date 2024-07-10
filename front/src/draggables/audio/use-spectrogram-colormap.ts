import {useStorage} from '@vueuse/core';
import {SettingDefault} from 'src/common/setting-default';
import {SettingKey} from 'src/common/setting-key';

const colormap = useStorage<string>(
  SettingKey.spectrogramColorMap,
  SettingDefault.spectrogramColorMap,
);

export function useSpectrogramColormap() {
  return {
    colormap: colormap,
  };
}
