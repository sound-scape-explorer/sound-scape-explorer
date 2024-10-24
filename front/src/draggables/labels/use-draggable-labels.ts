import {useStorage} from '@vueuse/core';
import {settingDefaults} from 'src/common/setting-defaults';
import {SettingKey} from 'src/common/setting-key';

export type DraggableLabelSize = 'default' | 'big' | 'max';

const sizeHorizontal = useStorage<DraggableLabelSize>(
  SettingKey.labelsSizeHorizontal,
  settingDefaults.labelsSizeHorizontal,
);

const sizeVertical = useStorage<DraggableLabelSize>(
  SettingKey.labelsSizeVertical,
  settingDefaults.labelsSizeVertical,
);

export function useDraggableLabels() {
  const cyclePrimitive = (p: typeof sizeHorizontal | typeof sizeVertical) => {
    switch (p.value) {
      case 'default': {
        p.value = 'big';
        break;
      }

      case 'big': {
        p.value = 'max';
        break;
      }

      case 'max': {
        p.value = 'default';
        break;
      }

      default: {
        p.value = 'default';
      }
    }
  };

  const cycleHorizontal = () => cyclePrimitive(sizeHorizontal);
  const cycleVertical = () => cyclePrimitive(sizeVertical);

  const reset = () => {
    sizeHorizontal.value = settingDefaults.labelsSizeHorizontal;
    sizeVertical.value = settingDefaults.labelsSizeVertical;
  };

  return {
    reset: reset,
    sizeHorizontal: sizeHorizontal,
    sizeVertical: sizeVertical,
    cycleHorizontal: cycleHorizontal,
    cycleVertical: cycleVertical,
  };
}
