import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useTimelineRangeNames} from 'src/components/timeline/use-timeline-range-names';
import {useAggregations} from 'src/composables/use-aggregations';
import {useConfig} from 'src/composables/use-config';
import {useDateTime} from 'src/composables/use-date-time';
import {useInterval} from 'src/composables/use-interval';
import {RANGE_CUSTOM} from 'src/constants';

export function useTimelineHandlers() {
  const {config} = useConfig();
  const {start, end, left, right, updateLeft, updateRight} = useTimelineRange();
  const {name, setCustomName, rangeToSlug} = useTimelineRangeNames();
  const {currentIndex} = useInterval();
  const {aggregations} = useAggregations();
  const {stringToTimestamp} = useDateTime();

  const updateRange = () => {
    if (name.value === RANGE_CUSTOM) {
      return;
    }

    if (config.value === null) {
      return;
    }

    const range = config.value.ranges.find(
      (r) => rangeToSlug(r) === name.value,
    );

    if (!range) {
      return;
    }

    start.value = stringToTimestamp(range.start);
    end.value = stringToTimestamp(range.end);

    updateLeft(start.value);
    updateRight(end.value);
  };

  const overdrive = () => {
    start.value = left.value;
    end.value = right.value;
    setCustomName();
  };

  const recenter = () => {
    if (currentIndex.value === null || aggregations.value === null) {
      return;
    }

    const timestamp = aggregations.value.timestamps[currentIndex.value];
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
