import {DraggableHeatmapsError} from 'src/common/Errors';
import {
  type Digested,
  useStorageDigested,
} from 'src/composables/use-storage-digested';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useDraggableHeatmaps} from 'src/draggables/heatmaps/use-draggable-heatmaps';
import {useDraggableHeatmapsLabels} from 'src/draggables/heatmaps/use-draggable-heatmaps-labels';
import {useDraggableHeatmapsRange} from 'src/draggables/heatmaps/use-draggable-heatmaps-range';
import {ref} from 'vue';

const title = ref<string>('');
const x = ref<string[]>([]);
const y = ref<string[]>([]);
const series = ref<number[][]>([]);

export function useDraggableHeatmapsChart() {
  const {a, b} = useDraggableHeatmapsLabels();
  const {labelPropertiesActual, labelSetsActual} = useStorageLabels();
  const {digested} = useStorageDigested();
  const {update: updateRange} = useDraggableHeatmapsRange();
  const {isPairing} = useDraggableHeatmaps();

  const updateTitle = (
    digested: Digested,
    a: string,
    b: string | null = null,
  ) => {
    if (isPairing.value) {
      title.value = `${digested.digester.name} - ${a} - ${b}`;
      return;
    }

    title.value = `${digested.digester.name} - ${a}`;
  };

  const getLabelData = (label: string) => {
    if (
      labelPropertiesActual.value === null ||
      labelSetsActual.value === null
    ) {
      throw new DraggableHeatmapsError('labels not available');
    }

    const index = labelPropertiesActual.value.indexOf(label);

    if (index === -1) {
      const msg = `could not find label property ${label}`;
      throw new DraggableHeatmapsError(msg);
    }

    const possibleValues = labelSetsActual.value[index];

    return {
      index: index,
      possibleValues: possibleValues,
    };
  };

  const updateHeatmapData = () => {
    if (digested.value === null || a.value === null) {
      return;
    }

    updateTitle(digested.value, a.value);
    updateRange(digested.value);

    const {index, possibleValues} = getLabelData(a.value);

    x.value = possibleValues;
    y.value = [];

    // @ts-expect-error: clumsy typing
    series.value = digested.value.values[index];
  };

  const updateHeatmapDataPairing = () => {
    if (digested.value === null || a.value === null || b.value === null) {
      return;
    }

    updateTitle(digested.value, a.value, b.value);
    updateRange(digested.value);

    const {index: aIndex, possibleValues: aPossibleValues} = getLabelData(
      a.value,
    );
    const {index: bIndex, possibleValues: bPossibleValues} = getLabelData(
      b.value,
    );

    x.value = aPossibleValues;
    y.value = bPossibleValues;

    // @ts-expect-error: clumsy typing
    series.value = digested.value.values[aIndex][bIndex];
  };

  return {
    title: title,
    x: x,
    y: y,
    series: series,
    updateHeatmapData: updateHeatmapData,
    updateHeatmapDataPairing: updateHeatmapDataPairing,
  };
}
