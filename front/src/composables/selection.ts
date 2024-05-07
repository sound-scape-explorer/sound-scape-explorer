import {useBandSelection} from 'src/composables/band-selection';
import {useDraggables} from 'src/composables/draggables';
import {useSelectExtractor} from 'src/composables/extractor-selection';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import {useReducerSelection} from 'src/composables/reducer-selection';
import {useStorageAggregatedFeatures} from 'src/composables/storage-aggregated-features';
import {useStorageAggregatedIndicators} from 'src/composables/storage-aggregated-indicators';
import {useStorageAggregatedIntervalDetails} from 'src/composables/storage-aggregated-interval-details';
import {useStorageAggregatedLabels} from 'src/composables/storage-aggregated-labels';
import {useStorageAggregatedSites} from 'src/composables/storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from 'src/composables/storage-aggregated-timestamps';
import {useStorageLabels} from 'src/composables/storage-labels';
import {useStorageReducedFeatures} from 'src/composables/storage-reduced-features';
import {useTrajectoriesSelection} from 'src/composables/trajectories-selection';
import {useLabelSelection} from 'src/draggables/label/label-selection';
import {useScatterColorScale} from 'src/scatter/scatter-color-scale';
import {useScatterFilterMeta} from 'src/scatter/scatter-filter-meta';
import {useScatterFilterTime} from 'src/scatter/scatter-filter-time';
import {useScatterLoading} from 'src/scatter/scatter-loading';
import {useScatterTraces} from 'src/scatter/scatter-traces';
import {ref, watchEffect} from 'vue';

const hasSelection = ref<boolean>(false);

export function useSelection() {
  const {store} = useDraggables();
  const {readLabels, resetLabels} = useStorageLabels();
  const {readAggregatedFeatures, resetAggregatedFeatures} =
    useStorageAggregatedFeatures();
  const {readAggregatedIndicators, resetAggregatedIndicators} =
    useStorageAggregatedIndicators();
  const {readAggregatedTimestamps, resetAggregatedTimestamps} =
    useStorageAggregatedTimestamps();
  const {readAggregatedSites, resetAggregatedSites} =
    useStorageAggregatedSites();
  const {readAggregatedIntervalDetails, resetAggregatedIntervalDetails} =
    useStorageAggregatedIntervalDetails();
  const {readAggregatedLabels, resetAggregatedLabels} =
    useStorageAggregatedLabels();
  const {readReducedFeatures, resetReducedFeatures} =
    useStorageReducedFeatures();
  const {generateColorScale, resetColorScale} = useScatterColorScale();
  const {
    buildSelection,
    resetSelection,
    selection: labelSelection,
  } = useLabelSelection();
  const {reset: resetTrajectoriesSelection} = useTrajectoriesSelection();
  const {renderTraces, resetTraces} = useScatterTraces();
  const {filterByMeta, resetFilterByMeta} = useScatterFilterMeta();
  const {filterByTime, resetFilterByTime} = useScatterFilterTime();

  const {band, reset: resetBand} = useBandSelection();
  const {integration, reset: resetIntegration} = useIntegrationSelection();
  const {extractor, reset: resetExtractor} = useSelectExtractor();
  const {reducer, reset: resetReducer} = useReducerSelection();

  const {isLoading, loadingText} = useScatterLoading();

  const unloadSelection = () => {
    loadingText.value = 'Unloading selection...';
    isLoading.value = true;

    resetBand();
    resetIntegration();
    resetExtractor();
    resetReducer();

    resetLabels();
    resetAggregatedFeatures();
    resetAggregatedIndicators();
    resetAggregatedTimestamps();
    resetAggregatedSites();
    resetAggregatedIntervalDetails();
    resetAggregatedLabels();
    resetReducedFeatures();

    resetTrajectoriesSelection();
    resetSelection();
    resetColorScale();
    resetTraces();
    resetFilterByMeta();
    resetFilterByTime();

    isLoading.value = false;
    hasSelection.value = false;
  };

  const load = async () => {
    if (
      hasSelection.value ||
      band.value === null ||
      integration.value === null ||
      extractor.value === null ||
      reducer.value === null
    ) {
      return;
    }
    hasSelection.value = true;
    isLoading.value = true;
    console.log('selection');

    loadingText.value = 'Reading labels';
    await readLabels();

    loadingText.value = 'Reading features';
    await readAggregatedFeatures();

    loadingText.value = 'Reading indicators';
    await readAggregatedIndicators();

    loadingText.value = 'Reading timestamps';
    await readAggregatedTimestamps();

    loadingText.value = 'Reading sites';
    await readAggregatedSites();

    loadingText.value = 'Reading intervals';
    await readAggregatedIntervalDetails();

    loadingText.value = 'Reading labels';
    await readAggregatedLabels();

    loadingText.value = 'Reading reduced features';
    await readReducedFeatures();

    buildSelection();
    await generateColorScale();

    filterByMeta(labelSelection);
    filterByTime();

    renderTraces();

    isLoading.value = false;
    store.selection = false;
  };

  watchEffect(load);

  return {
    hasSelection: hasSelection,
    unloadSelection: unloadSelection,
  };
}
