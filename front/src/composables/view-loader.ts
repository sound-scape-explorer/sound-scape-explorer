import {useScatterColorScale} from 'src/components/scatter/scatter-color-scale';
import {useScatterFilterLabel} from 'src/components/scatter/scatter-filter-label';
import {useScatterFilterTime} from 'src/components/scatter/scatter-filter-time';
import {useScatterLoading} from 'src/components/scatter/scatter-loading';
import {useScatterTraces} from 'src/components/scatter/scatter-traces';
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
import {useViewState} from 'src/composables/view-state';
import {useLabelSelection} from 'src/draggables/label/label-selection';

export function useViewLoader() {
  const {store} = useDraggables();
  const {readLabels} = useStorageLabels();
  const {readAggregatedFeatures} = useStorageAggregatedFeatures();
  const {readAggregatedIndicators} = useStorageAggregatedIndicators();
  const {readAggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {readAggregatedSites} = useStorageAggregatedSites();
  const {readAggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
  const {readAggregatedLabels} = useStorageAggregatedLabels();
  const {readReducedFeatures} = useStorageReducedFeatures();
  const {generateColorScale} = useScatterColorScale();
  const {buildSelection, selection: labelSelection} = useLabelSelection();
  const {renderTraces, isEnabled} = useScatterTraces();
  const {filter: filterByLabel} = useScatterFilterLabel();
  const {filterByTime} = useScatterFilterTime();

  const {band} = useBandSelection();
  const {integration} = useIntegrationSelection();
  const {extractor} = useSelectExtractor();
  const {reducer} = useReducerSelection();
  const {isLoading, loadingText} = useScatterLoading();
  const {hasView} = useViewState();

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
    console.log('View: Load');

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

    await generateColorScale();
    buildSelection();

    filterByLabel(labelSelection);
    filterByTime();

    renderTraces();

    isLoading.value = false;
    store.view = false;
    isEnabled.value = true;
  };

  return {
    load: load,
  };
}
