import {watchDebounced} from '@vueuse/core';
import {useConfig} from 'src/composables/use-config';
import {useViewKey} from 'src/composables/use-view-key';
import {useSelectionBoxPersistence} from 'src/draggables/selection/use-selection-box-persistence';
import {useSelectionBoxes} from 'src/draggables/selection/use-selection-boxes';
import {watch} from 'vue';

export function useSelectionBoxWatcher() {
  const {checksum} = useConfig();
  const {key: viewKey} = useViewKey();
  const {boxes} = useSelectionBoxes();
  const {loadBoxes, saveBoxes} = useSelectionBoxPersistence();

  // Track previous context for saving before switch
  let previousChecksum: string | null = null;
  let previousViewKey: string | null = null;

  // Watch context changes - load appropriate boxes
  watch(
    [checksum, viewKey],
    ([newChecksum, newViewKey]) => {
      // Save old context boxes before switching
      if (previousChecksum && previousViewKey && boxes.value.length > 0) {
        saveBoxes(previousChecksum, previousViewKey, boxes.value);
      }

      // Load new context boxes
      if (newChecksum && newViewKey) {
        const loaded = loadBoxes(newChecksum, newViewKey);
        boxes.value = loaded ?? [];
        previousChecksum = newChecksum;
        previousViewKey = newViewKey;
      } else {
        boxes.value = [];
        previousChecksum = null;
        previousViewKey = null;
      }
    },
    {immediate: true},
  );

  // Autosave when boxes change
  watchDebounced(
    boxes,
    () => {
      if (checksum.value && viewKey.value) {
        saveBoxes(checksum.value, viewKey.value, boxes.value);
      }
    },
    {debounce: 500, deep: true},
  );
}
