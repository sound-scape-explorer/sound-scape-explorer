import {useStorage} from '@vueuse/core';
import {SettingDefault} from 'src/common/setting-default';
import {SettingKey} from 'src/common/setting-key';

const isExpanded = useStorage<boolean>(
  SettingKey.labelsExpand,
  SettingDefault.labelsExpand,
);

export function useDraggableLabels() {
  const expand = () => (isExpanded.value = true);
  const shrink = () => (isExpanded.value = false);
  const toggleExpand = () => (isExpanded.value = !isExpanded.value);

  const reset = () => {
    isExpanded.value = SettingDefault.labelsExpand;
  };

  return {
    reset: reset,
    isExpanded: isExpanded,
    expand: expand,
    shrink: shrink,
    toggleExpand: toggleExpand,
  };
}
