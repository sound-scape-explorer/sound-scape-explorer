import {useBodyColors} from 'src/components/timeline/body/use-body-colors';
import {useAggregations} from 'src/composables/use-aggregations';
import {useDate} from 'src/composables/use-date';
import {useIntervals} from 'src/composables/use-intervals';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
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
  const {integration} = useViewSelectionNew();
  const {aggregations} = useAggregations();
  const {convertTimestampToDate, convertTimestampToIsoDate} = useDate();
  const {scale} = useBodyColors();
  const {intervals} = useIntervals();

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
    return intervals.value
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

      const start = convertTimestampToDate(timestamp);
      const end = start.add(integration.value.duration, 'milliseconds');

      for (const fileIndex of fileIndices) {
        const s = start.unix() * 1000;
        const e = end.unix() * 1000;
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
            `start: ${convertTimestampToIsoDate(s)}`,
            `end: ${convertTimestampToIsoDate(e)}`,
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
