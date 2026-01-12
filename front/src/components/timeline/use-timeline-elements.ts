import {addMilliseconds} from 'date-fns';
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
  index: number; // interval index
  start: number;
  end: number;
  color: string;
  tooltip: string[];
}

export function useTimelineElements() {
  const {integration} = useViewSelection();
  const {aggregations} = useAggregations();
  const {timestampToDate, timestampToString} = useDateTime();
  const {scale} = useBodyColors();
  const {intervals} = useIntervals();
  const {timeshift} = useClientSettings();

  const createElement = (
    row: number,
    index: number,
    start: number,
    end: number,
    color: string,
    tooltip: string[],
  ): TimelineElement => {
    return {
      row,
      index,
      start,
      end,
      color,
      tooltip,
    };
  };

  const getCollectedIndices = (
    leftBoundary: Ref<number>,
    rightBoundary: Ref<number>,
  ) => {
    const ms = timeshift.value * 3600 * 1000;

    return intervals.value
      .map((interval) => ({
        ...interval,
        start: interval.start + ms,
        end: interval.end + ms,
      }))
      .filter(
        (interval) =>
          interval.start >= leftBoundary.value &&
          interval.end < rightBoundary.value,
      )
      .map((interval) => interval.index);
  };

  const createElements = (indices: Ref<number[]>) => {
    if (integration.value === null || aggregations.value === null) {
      return [];
    }

    const newElements: TimelineElement[] = [];
    const knownSites: string[] = [];
    let rowNumber = -1;

    for (const index of indices.value) {
      const timestamp = aggregations.value.timestamps[index];
      const fileIndices = aggregations.value.fileIndices[index];
      const site = intervals.value[index].sites.join(STRING_DELIMITER);

      if (!knownSites.includes(site)) {
        knownSites.push(site);
        rowNumber += 1;
      }

      const start = timestampToDate(timestamp);
      const end = addMilliseconds(start, integration.value.duration);

      // messy
      for (const fileIndex of fileIndices) {
        const s = start.getTime();
        const e = end.getTime();
        const element = createElement(
          rowNumber,
          index,
          s,
          e,
          scale.value[fileIndex],
          [
            `site: ${site}`,
            `interval index: ${index}`,
            `file index: ${fileIndex}`,
            `start: ${timestampToString(timestamp)}`,
            `end: ${timestampToString(timestamp + integration.value.duration)}`,
          ],
        );

        newElements.push(element);
      }
    }

    return newElements;
  };

  return {
    getCollectedIndices,
    createElements,
  };
}
