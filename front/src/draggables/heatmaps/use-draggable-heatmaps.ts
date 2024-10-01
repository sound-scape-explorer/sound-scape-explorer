import {type Digester, useDigesters} from 'src/composables/use-digesters';
import {useStorageDigested} from 'src/composables/use-storage-digested';
import {useDraggableHeatmapsLabels} from 'src/draggables/heatmaps/use-draggable-heatmaps-labels';
import {computed, ref} from 'vue';

const digesterName = ref<Digester['name'] | null>(null);

export function useDraggableHeatmaps() {
  const {digesters} = useDigesters();
  const {digested, readDigested} = useStorageDigested();
  const {a, b} = useDraggableHeatmapsLabels();

  const isPairing = computed<boolean>(() => digested.value?.isPairing ?? false);

  const isReadyForSelection = computed<boolean>(
    () => digesterName.value !== null,
  );

  const isReadyAndSelected = computed<boolean>(() => {
    if (isPairing.value) {
      if (a.value === null || b.value === null) {
        return false;
      }
    } else {
      if (a.value === null) {
        return false;
      }
    }

    return true;
  });

  const options = computed(() => {
    if (digesters.value === null) {
      return [];
    }

    return digesters.value.map((d) => d.name);
  });

  const handleChange = async () => {
    if (digesters.value === null) {
      return;
    }

    const digesterObject = digesters.value.find(
      (d) => d.name === digesterName.value,
    );

    if (digesterObject === undefined) {
      return;
    }

    await readDigested(digesterObject);
  };

  return {
    digesterName: digesterName,
    options: options,
    handleChange: handleChange,
    isReadyForSelection: isReadyForSelection,
    isReadyAndSelected: isReadyAndSelected,
    isPairing: isPairing,
  };
}
