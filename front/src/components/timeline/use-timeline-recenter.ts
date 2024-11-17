import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useIntervalSelector} from 'src/composables/use-interval-selector';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';

export function useTimelineRecenter() {
  const {start, end, updateLeft, updateRight} = useTimelineRange();
  const {currentIntervalIndex} = useIntervalSelector();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();

  const recenter = () => {
    if (
      currentIntervalIndex.value === null ||
      aggregatedTimestamps.value === null
    ) {
      return;
    }

    const timestamp = aggregatedTimestamps.value[currentIntervalIndex.value];
    const hour = 3600 * 1000;

    start.value = timestamp - hour / 2;
    end.value = timestamp + hour / 2;
    updateLeft(timestamp - hour / 8);
    updateRight(timestamp + hour / 8);
  };

  return {
    recenter: recenter,
  };
}
