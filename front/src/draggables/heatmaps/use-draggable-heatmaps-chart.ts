import {useStorageDigested} from 'src/composables/use-storage-digested';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useDraggableHeatmapDigester} from 'src/draggables/heatmaps/use-draggable-heatmap-digester';
import {useDraggableHeatmapsLabels} from 'src/draggables/heatmaps/use-draggable-heatmaps-labels';
import {useDraggableHeatmapsRange} from 'src/draggables/heatmaps/use-draggable-heatmaps-range';
import {computed, ref} from 'vue';

const title = ref<string>('');
const x = ref<string[]>([]);
const y = ref<string[]>([]);
const values = ref<number[][]>([]);

export function useDraggableHeatmapsChart() {
  const {a: labelA, b: labelB} = useDraggableHeatmapsLabels();
  const {labelProperties, labelSets} = useStorageLabels();
  const {digested} = useStorageDigested();
  const {digester} = useDraggableHeatmapDigester();
  const {update: updateRange} = useDraggableHeatmapsRange();

  const is1d = computed(
    () => !digested.value?.isPairing && digester.value && (labelA || labelB),
  );

  const is2d = computed(
    () => digested.value?.isPairing && digester.value && labelA && labelB,
  );

  const update = () => {
    if (
      labelProperties.value === null ||
      labelSets.value === null ||
      digested.value === null ||
      labelA.value === null
    ) {
      return;
    }

    updateRange(digested.value);

    title.value = `${digested.value.digester.name} - ${labelA.value}`;
    const aIndex = labelProperties.value.indexOf(labelA.value);
    x.value = labelSets.value[aIndex];

    // with 2 labels
    if (digested.value.isPairing && labelB.value !== null) {
      title.value = `${title.value} - ${labelB.value}`;
      const bIndex = labelProperties.value.indexOf(labelB.value);
      y.value = labelSets.value[bIndex];

      // @ts-expect-error: 7053
      values.value = digested.value.values[aIndex][bIndex] as number[][];
      return;
    }

    // with 1 label
    const data = digested.value.values[aIndex] as number[][];
    const is1d = Array.isArray(data[0]) === false;

    if (is1d) {
      values.value = [data as unknown as number[]];
    } else {
      values.value = data;
    }
  };

  return {
    title: title,
    x: x,
    y: y,
    values: values,
    update: update,
    is1d: is1d,
    is2d: is2d,
  };
}
