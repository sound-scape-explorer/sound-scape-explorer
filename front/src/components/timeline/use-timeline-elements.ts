import {useBodyColors} from 'src/components/timeline/body/use-body-colors';
import {useAggregations} from 'src/composables/use-aggregations';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useDateTime} from 'src/composables/use-date-time';
import {useIntervals} from 'src/composables/use-intervals';
import {useViewSelection} from 'src/composables/use-view-selection';
import {STRING_DELIMITER} from 'src/constants';
import {type Ref} from 'vue';

export interface TimelineElement {
  row: number;
  index: number;
  start: number;
  end: number;
  color: string;
  tooltip: string[];
}

export function useTimelineElements() {
  const {integration} = useViewSelection();
  const {aggregations} = useAggregations();
  const {timestampToString} = useDateTime();
  const {scale} = useBodyColors();
  const {intervals} = useIntervals();
  const {timeshift} = useClientSettings();

  const getCollectedIndices = (
    leftBoundary: Ref<number>,
    rightBoundary: Ref<number>,
  ) => {
    const ms = timeshift.value * 3600 * 1000;
    const l = leftBoundary.value;
    const r = rightBoundary.value;
    const result: number[] = [];

    for (const interval of intervals.value) {
      const s = interval.start + ms;
      const e = interval.end + ms;

      if (s >= l && e < r) {
        result.push(interval.index);
      }
    }

    return result;
  };

  const createElements = (indices: Ref<number[]>) => {
    if (integration.value === null || aggregations.value === null) {
      return [];
    }

    const ms = timeshift.value * 3600_000;
    const newElements: TimelineElement[] = [];
    const knownSites = new Map<string, number>();
    let rowNumber = -1;

    for (const index of indices.value) {
      const timestamp = aggregations.value.timestamps[index];
      const fileIndices = aggregations.value.fileIndices[index];
      const site = intervals.value[index].sites.join(STRING_DELIMITER);

      let row = knownSites.get(site);
      if (row === undefined) {
        rowNumber += 1;
        row = rowNumber;
        knownSites.set(site, row);
      }

      const s = timestamp + ms;
      const e = s + integration.value.duration;

      const startLabel = timestampToString(timestamp);
      const endLabel = timestampToString(
        timestamp + integration.value.duration,
      );
      const baseTip = `site: ${site}\ninterval index: ${index}`;

      for (const fileIndex of fileIndices) {
        newElements.push({
          row,
          index,
          start: s,
          end: e,
          color: scale.value[fileIndex],
          tooltip: [
            `site: ${site}`,
            `interval index: ${index}`,
            `file index: ${fileIndex}`,
            `start: ${startLabel}`,
            `end: ${endLabel}`,
          ],
        });
      }
    }

    return newElements;
  };

  return {
    getCollectedIndices,
    createElements,
  };
}
