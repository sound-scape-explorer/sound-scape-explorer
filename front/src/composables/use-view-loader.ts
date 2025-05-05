import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterFilterLabels} from 'src/components/scatter/use-scatter-filter-labels';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {useAggregated} from 'src/composables/use-aggregated';
import {useAutoclustered} from 'src/composables/use-autoclustered';
import {useDraggables} from 'src/composables/use-draggables';
import {useGlobalKeyboard} from 'src/composables/use-global-keyboard';
import {useIntervals} from 'src/composables/use-intervals';
import {useLabelSets} from 'src/composables/use-label-sets';
import {useStorageReducedEmbeddings} from 'src/composables/use-storage-reduced-embeddings';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {useViewState} from 'src/composables/use-view-state';
import {useLabelSelection} from 'src/draggables/labels/use-label-selection';
import {ref} from 'vue';

const step = ref<number>(0); // percents

type Step = [string, () => Promise<void>]; // [text, reader]

// todo: update me
export function useViewLoader() {
  const {close} = useDraggables();
  const {read: readAggregated} = useAggregated();
  const {readReducedEmbeddings: readReduced} = useStorageReducedEmbeddings();
  const {read: readAutoclustered} = useAutoclustered();
  const {generate: generateIntervals} = useIntervals();
  const {generate: generateLabelSets} = useLabelSets();

  const {generateColorScale} = useScatterColorScale();
  const {buildSelection, selection: labelSelection} = useLabelSelection();
  const {isEnabled} = useScatterTraces();
  const {filter: filterByLabel} = useScatterFilterLabels();
  const {filter: filterByTemporal} = useScatterFilterTemporal();
  const {filterByTime} = useScatterFilterTime();

  const {extraction, band, integration, reducer} = useViewSelectionNew();
  const {isLoading, loadingText} = useScatterLoading();
  const {hasView} = useViewState();
  const {lock, unlock} = useGlobalKeyboard();

  const steps: Step[] = [
    ['aggregated', readAggregated],
    ['reduced', readReduced],
    ['autoclustered', readAutoclustered],
    ['intervals', async () => generateIntervals()],
    ['label sets', async () => generateLabelSets()],
  ];

  const updateStep = (current: number) => {
    const l = steps.length - 1;
    step.value = parseInt(((current / l) * 100).toString());
  };

  const updateReading = (current: string) => {
    loadingText.value = `Reading ${current}...`;
  };

  const load = async () => {
    if (
      !hasView.value ||
      extraction.value === null ||
      band.value === null ||
      integration.value === null ||
      reducer.value === null
    ) {
      return;
    }
    isLoading.value = true;
    lock();
    console.log('View: Load');

    for (let s = 0; s < steps.length; s += 1) {
      const [text, reader] = steps[s];

      updateStep(s);
      updateReading(text);
      await reader();
    }

    await generateColorScale();
    buildSelection();

    filterByLabel(labelSelection);
    filterByTime();
    filterByTemporal();

    isLoading.value = false;
    close('view');
    isEnabled.value = true;
    unlock();
  };

  return {
    load,
    step,
  };
}
