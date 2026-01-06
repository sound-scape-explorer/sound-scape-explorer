import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterFilterAcoustic} from 'src/components/scatter/use-scatter-filter-acoustic';
import {useScatterFilterCalendar} from 'src/components/scatter/use-scatter-filter-calendar';
import {useScatterFilterSpatial} from 'src/components/scatter/use-scatter-filter-spatial';
import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useScatterRender} from 'src/components/scatter/use-scatter-render';
import {useAcousticExtractors} from 'src/composables/use-acoustic-extractors';
import {useAggregations} from 'src/composables/use-aggregations';
import {useAutoclusters} from 'src/composables/use-autoclusters';
import {useDraggables} from 'src/composables/use-draggables';
import {useGlobalKeyboard} from 'src/composables/use-global-keyboard';
import {useIntervals} from 'src/composables/use-intervals';
import {useReductions} from 'src/composables/use-reductions';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useViewSelection} from 'src/composables/use-view-selection';
import {useViewState} from 'src/composables/use-view-state';
import {
  FilterType,
  useAudioFilters,
} from 'src/draggables/audio/use-audio-filters';
import {useTagSelection} from 'src/draggables/tags/use-tag-selection';
import {nextTick, ref} from 'vue';
import {useSelectionBoundaries} from 'src/draggables/selection/use-selection-boundaries';

const RENDER_TIMEOUT = 100;

const step = ref<number>(0); // percents

type Step = [string, () => void | Promise<void>]; // [text, reader]

export function useViewLoader() {
  const {close} = useDraggables();
  const {read: readAggregations} = useAggregations();
  const {read: readReductions} = useReductions();
  const {read: readAutoclusters} = useAutoclusters();
  const {generate: generateIntervals} = useIntervals();
  const {generate: generateTagUniques} = useTagUniques();
  const {load: loadAcousticExtractors} = useAcousticExtractors();

  const {generate: generateColorScale} = useScatterColorScale();
  const {build: buildSelection, selection: tagSelection} = useTagSelection();
  const {isEnabled} = useScatterRender();
  const {filter: filterByLabel} = useScatterFilterTag();
  const {filter: filterByCalendar} = useScatterFilterCalendar();
  const {filter: filterByAcoustic} = useScatterFilterAcoustic();
  const {filter: filterBySpatial} = useScatterFilterSpatial();

  const {extraction, band, integration, reducer} = useViewSelection();
  const {isLoading, loadingText} = useScatterLoading();
  const {hasView} = useViewState();
  const {lock, unlock} = useGlobalKeyboard();
  const {detectBoundaries} = useSelectionBoundaries();
  const {update: updateAudioFilter} = useAudioFilters();

  const steps: Step[] = [
    ['Reading aggregations', readAggregations],
    ['Reading reductions', readReductions],
    ['Reading autoclusters', readAutoclusters],
    ['Building intervals', generateIntervals],
    ['Building tags', generateTagUniques],
  ];

  const updateStep = (current: number) => {
    const l = steps.length - 1;
    step.value = parseInt(((current / l) * 100).toString());
  };

  const updateReading = (current: string) => {
    loadingText.value = `${current}...`;
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

      // Force a UI update before starting the heavy work
      await nextTick();

      // Allow the browser to update the UI
      await new Promise((resolve) => setTimeout(resolve, RENDER_TIMEOUT));

      await reader();
    }

    await generateColorScale();
    buildSelection();
    loadAcousticExtractors();

    filterByLabel(tagSelection);
    filterByCalendar();
    filterByAcoustic();
    filterBySpatial();

    detectBoundaries();

    updateAudioFilter(FilterType.enum.hpf, band.value.low);
    updateAudioFilter(FilterType.enum.lpf, band.value.high);

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
