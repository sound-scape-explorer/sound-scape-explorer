import {useDigesters} from 'src/composables/use-digesters';
import {useStorageDigested} from 'src/composables/use-storage-digested';
import {computed, ref} from 'vue';

const digester = ref();

export function useDraggableHeatmapDigester() {
  const {digesters} = useDigesters();
  const {readDigested} = useStorageDigested();

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
      (d) => d.name === digester.value,
    );

    if (digesterObject === undefined) {
      return;
    }

    await readDigested(digesterObject);
  };

  return {
    digester: digester,
    options: options,
    handleChange: handleChange,
  };
}
