import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterFilterLabel} from 'src/components/scatter/use-scatter-filter-label';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {useBandSelection} from 'src/composables/use-band-selection';
import {useDraggables} from 'src/composables/use-draggables';
import {useSelectExtractor} from 'src/composables/use-extractor-selection';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useReducerSelection} from 'src/composables/use-reducer-selection';
import {useStorageAggregatedFeatures} from 'src/composables/use-storage-aggregated-features';
import {useStorageAggregatedIndicators} from 'src/composables/use-storage-aggregated-indicators';
import {useStorageAggregatedIntervalDetails} from 'src/composables/use-storage-aggregated-interval-details';
import {useStorageAggregatedLabels} from 'src/composables/use-storage-aggregated-labels';
import {useStorageAggregatedSites} from 'src/composables/use-storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useStorageReducedFeatures} from 'src/composables/use-storage-reduced-features';
import {useViewState} from 'src/composables/view-state';
import {useLabelSelection} from 'src/draggables/label/use-label-selection';

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
