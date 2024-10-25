import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterFilterLabels} from 'src/components/scatter/use-scatter-filter-labels';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {useBandSelection} from 'src/composables/use-band-selection';
import {useDraggables} from 'src/composables/use-draggables';
import {useExtractorSelection} from 'src/composables/use-extractor-selection';
import {useGlobalKeyboard} from 'src/composables/use-global-keyboard';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useReducerSelection} from 'src/composables/use-reducer-selection';
import {useStorageAggregatedFeatures} from 'src/composables/use-storage-aggregated-features';
import {useStorageAggregatedIndicators} from 'src/composables/use-storage-aggregated-indicators';
import {useStorageAggregatedIntervalDetails} from 'src/composables/use-storage-aggregated-interval-details';
import {useStorageAggregatedLabels} from 'src/composables/use-storage-aggregated-labels';
import {useStorageAggregatedSites} from 'src/composables/use-storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {useStorageReducedFeatures} from 'src/composables/use-storage-reduced-features';
import {useViewState} from 'src/composables/use-view-state';
import {useLabelSelection} from 'src/draggables/labels/use-label-selection';
import {ref} from 'vue';

const step = ref<number>(0); // percents
const total = 8;

export function useViewLoader() {
  const {close} = useDraggables();
  const {readLabels} = useStorageLabels();
  const {readAggregatedFeatures} = useStorageAggregatedFeatures();
  const {readAggregatedIndicators} = useStorageAggregatedIndicators();
  const {readAggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {readAggregatedSites} = useStorageAggregatedSites();
  const {readAggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
  const {readAggregatedLabels} = useStorageAggregatedLabels();
  const {readReducedFeatures} = useStorageReducedFeatures();
  const {readRanges} = useStorageRanges();
  const {generateColorScale} = useScatterColorScale();
  const {buildSelection, selection: labelSelection} = useLabelSelection();
  const {isEnabled} = useScatterTraces();
  const {filter: filterByLabel} = useScatterFilterLabels();
  const {filter: filterByTemporal} = useScatterFilterTemporal();
  const {filterByTime} = useScatterFilterTime();

  const {band} = useBandSelection();
  const {integration} = useIntegrationSelection();
  const {extractor} = useExtractorSelection();
  const {reducer} = useReducerSelection();
  const {isLoading, loadingText} = useScatterLoading();
  const {hasView} = useViewState();
  const {lock, unlock} = useGlobalKeyboard();

  const updateStep = (current: number) => {
    step.value = parseInt(((current / total) * 100).toString());
  };

  const updateReading = (current: string) => {
    loadingText.value = `Reading ${current}...`;
  };

  const load = async () => {
    if (
      !hasView.value ||
      band.value === null ||
      integration.value === null ||
      extractor.value === null ||
      reducer.value === null
    ) {
      return;
    }
    isLoading.value = true;
    lock();
    console.log('View: Load');

    updateReading('labels');
    await readLabels();
    updateStep(0);

    updateReading('features');
    await readAggregatedFeatures();
    updateStep(1);

    updateReading('indicators');
    await readAggregatedIndicators();
    updateStep(2);

    updateReading('timestamps');
    await readAggregatedTimestamps();
    updateStep(3);

    updateReading('ranges');
    await readRanges();
    updateStep(4);

    updateReading('sites');
    await readAggregatedSites();
    updateStep(5);

    updateReading('intervals');
    await readAggregatedIntervalDetails();
    updateStep(6);

    updateReading('labels');
    await readAggregatedLabels();
    updateStep(7);

    updateReading('reduced features');
    await readReducedFeatures();
    updateStep(8);

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
    load: load,
    step: step,
  };
}
