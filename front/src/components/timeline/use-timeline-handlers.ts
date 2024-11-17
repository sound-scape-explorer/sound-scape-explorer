import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useTimelineRangeNames} from 'src/components/timeline/use-timeline-range-names';
import {useIntervalSelector} from 'src/composables/use-interval-selector';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {RANGE_SKIP} from 'src/constants';
import {generateUniqueRangeSlug} from 'src/utils/config';

export function useTimelineHandlers() {
  const {start, end, left, right, updateLeft, updateRight} = useTimelineRange();
  const {ranges} = useStorageRanges();
  const {name, setCustomName} = useTimelineRangeNames();
  const {currentIntervalIndex} = useIntervalSelector();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();

  const updateRange = () => {
    if (name.value === RANGE_SKIP) {
      return;
    }

    if (ranges.value === null) {
      return;
    }

    const results = ranges.value.filter(
      (r) => generateUniqueRangeSlug(r) === name.value,
    );

    if (results.length !== 1) {
      return;
    }

    const result = results[0];

    start.value = result.start;
    end.value = result.end;
    updateLeft(start.value);
    updateRight(end.value);
  };

  const overdrive = () => {
    start.value = left.value;
    end.value = right.value;
    setCustomName();
  };

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
    setCustomName();
  };

  return {
    updateRange: updateRange,
    overdrive: overdrive,
    recenter: recenter,
  };
}
