import {useStorage} from '@vueuse/core';
import {SettingDefault} from 'src/common/setting-default';
import {SettingKey} from 'src/common/setting-key';

const isExpanded = useStorage<boolean>(
  SettingKey.labelsExpand,
  SettingDefault.labelsExpand,
);

const columns = useStorage<number>(
  SettingKey.labelsColumns,
  SettingDefault.labelsColumns,
);

export function useDraggableLabels() {
  const expand = () => (isExpanded.value = true);
  const shrink = () => (isExpanded.value = false);
  const toggleExpand = () => (isExpanded.value = !isExpanded.value);

  const toggleColumns = () => {
    if (columns.value === 1) {
      columns.value = 2;
      return;
    }

    columns.value = 1;
  };

  const reset = () => {
    isExpanded.value = SettingDefault.labelsExpand;
    columns.value = SettingDefault.labelsColumns;
  };

  return {
    reset: reset,
    isExpanded: isExpanded,
    expand: expand,
    shrink: shrink,
    toggleExpand: toggleExpand,
    columns: columns,
    toggleColumns: toggleColumns,
  };
}
