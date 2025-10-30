import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterFilterSpatial} from 'src/components/scatter/use-scatter-filter-spatial';
import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useScatterRender} from 'src/components/scatter/use-scatter-render';
import {useAggregations} from 'src/composables/use-aggregations';
import {useAutoclusters} from 'src/composables/use-autoclusters';
import {DraggableKey, useDraggables} from 'src/composables/use-draggables';
import {useReductions} from 'src/composables/use-reductions';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import {useViewSelection} from 'src/composables/use-view-selection';
import {useAudioFilters} from 'src/draggables/audio/use-audio-filters';
import {useAudioPlaybackRate} from 'src/draggables/audio/use-audio-playback-rate';
import {useDraggableSelection} from 'src/draggables/selection/use-draggable-selection';
import {useTagSelection} from 'src/draggables/tags/use-tag-selection';
import {useTemporalSeries} from 'src/draggables/temporal/use-temporal-series';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';

export function useViewUnloader() {
  const {open, closeAll} = useDraggables();
  const {reset: resetAggregations} = useAggregations();
  const {reset: resetAutoclusters} = useAutoclusters();
  const {reset: resetReductionEmbeddings} = useReductions();
  const {reset: resetColorScale} = useScatterColorScale();
  const {reset: resetTagSelection} = useTagSelection();
  const {reset: resetScatterSelection} = useDraggableSelection();
  const {reset: resetTrajectoriesSelection} = useTrajectoriesSelection();
  const {reset: resetScatter, isEnabled} = useScatterRender();
  const {reset: resetFilterByLabel} = useScatterFilterTag();
  const {reset: resetFilterTemporal} = useScatterFilterTemporal();
  const {reset: resetFilterByTime} = useScatterFilterTime();
  const {reset: resetFilterSpatial} = useScatterFilterSpatial();
  const {reset: resetViewSelection} = useViewSelection();
  const {isLoading, loadingText} = useScatterLoading();
  const {reset: resetTemporalSeries} = useTemporalSeries();
  const {reset: resetTemporalThresholds} = useTemporalThresholds();
  const {reset: resetAudioPlaybackRate} = useAudioPlaybackRate();
  const {resetAll: resetAudioFilters} = useAudioFilters();

  const unload = () => {
    loadingText.value = 'Unloading selection...';
    isLoading.value = true;
    isEnabled.value = false;

    closeAll();
    resetTrajectoriesSelection();
    resetTagSelection();
    resetScatterSelection();
    resetColorScale();
    resetScatter();
    resetFilterByLabel();
    resetFilterByTime();
    resetFilterTemporal();
    resetFilterSpatial();
    resetAudioPlaybackRate();
    resetAudioFilters();

    resetAggregations();
    resetReductionEmbeddings();
    resetAutoclusters();

    resetViewSelection();

    resetTemporalSeries();
    resetTemporalThresholds();

    isLoading.value = false;
    open(DraggableKey.enum.view);
  };

  return {
    unload,
  };
}
