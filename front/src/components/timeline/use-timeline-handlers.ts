import {useTimelineOptions} from 'src/components/timeline/use-timeline-options';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {RANGE_SKIP} from 'src/constants';
import {generateUniqueRangeSlug} from 'src/utils/config';

export function useTimelineHandlers() {
  const {start, end, left, right, updateLeft, updateRight} = useTimelineRange();
  const {ranges} = useStorageRanges();
  const {names, name} = useTimelineOptions();

  const updateName = () => {
    if (!names.value || name.value) {
      return;
    }

    name.value = names.value[0];
  };

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
    name.value = RANGE_SKIP;
  };

  return {
    updateName: updateName,
    updateRange: updateRange,
    overdrive: overdrive,
  };
}
