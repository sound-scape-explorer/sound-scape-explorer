import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useTimelineRangeNames} from 'src/components/timeline/use-timeline-range-names';
import {useAggregated} from 'src/composables/use-aggregated';
import {useConfig} from 'src/composables/use-config';
import {useDate} from 'src/composables/use-date';
import {useIntervalSelector} from 'src/composables/use-interval-selector';
import {RANGE_CUSTOM} from 'src/constants';
import {generateUniqueRangeSlug} from 'src/utils/config';

export function useTimelineHandlers() {
  const {config} = useConfig();
  const {start, end, left, right, updateLeft, updateRight} = useTimelineRange();
  const {name, setCustomName} = useTimelineRangeNames();
  const {currentIntervalIndex} = useIntervalSelector();
  const {aggregated} = useAggregated();
  const {convertDateStringToDate} = useDate();

  const updateRange = () => {
    if (name.value === RANGE_CUSTOM) {
      return;
    }

    if (config.value === null) {
      return;
    }

    const range = config.value.ranges.find(
      (r) => generateUniqueRangeSlug(r) === name.value,
    );

    if (!range) {
      return;
    }

    start.value = convertDateStringToDate(range.start).unix() * 1000;
    end.value = convertDateStringToDate(range.end).unix() * 1000;

    updateLeft(start.value);
    updateRight(end.value);
  };

  const overdrive = () => {
    start.value = left.value;
    end.value = right.value;
    setCustomName();
  };

  const recenter = () => {
    if (currentIntervalIndex.value === null || aggregated.value === null) {
      return;
    }

    const timestamp = aggregated.value.timestamps[currentIntervalIndex.value];
    const hour = 3600 * 1000;

    start.value = timestamp - hour / 2;
    end.value = timestamp + hour / 2;
    updateLeft(timestamp - hour / 8);
    updateRight(timestamp + hour / 8);
    setCustomName();
  };

  return {
    updateRange,
    overdrive,
    recenter,
  };
}
