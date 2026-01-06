import {useStorage} from '@vueuse/core';
import {getLocalStorageKey, LocalStorageKey} from 'src/common/browser';
import {type SelectionBox} from 'src/draggables/selection/use-selection-boxes';

const allBoxesStorage = useStorage<Record<string, SelectionBox[]>>(
  `${getLocalStorageKey(LocalStorageKey.enum.SELECTION_BOXES)}`,
  {},
);

function makeCompositeKey(checksum: string, viewKey: string): string {
  return `${checksum}:${viewKey}`;
}

export function useSelectionBoxPersistence() {
  const loadBoxes = (checksum: string, viewKey: string) => {
    const key = makeCompositeKey(checksum, viewKey);
    return allBoxesStorage.value[key] ?? null;
  };

  const saveBoxes = (
    checksum: string,
    viewKey: string,
    boxes: SelectionBox[],
  ) => {
    const key = makeCompositeKey(checksum, viewKey);
    allBoxesStorage.value[key] = boxes;
  };

  const resetAllBoxes = () => {
    allBoxesStorage.value = {};
  };

  return {
    loadBoxes,
    saveBoxes,
    resetAllBoxes,
  };
}
