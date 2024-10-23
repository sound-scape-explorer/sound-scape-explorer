import {useDate} from 'src/composables/use-date';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useStorageAggregatedIntervalDetails} from 'src/composables/use-storage-aggregated-interval-details';
import {useStorageAggregatedSites} from 'src/composables/use-storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {useTimelineScale} from 'src/draggables/calendar/use-timeline-scale';
import {ref} from 'vue';

export interface TimelineElement {
  row: number;
  index: number; // interval index
  start: number;
  end: number;
  color: string;
  tooltip: string[];
}

const indices = ref<number[]>([]);
const elements = ref<TimelineElement[]>([]);

export function useTimelineElements() {
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {aggregatedSites} = useStorageAggregatedSites();
  const {dateStart, dateEnd} = useDraggableCalendar();
  const {integration} = useIntegrationSelection();
  const {convertTimestampToDate, convertTimestampToIsoDate} = useDate();
  const {aggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
  const {scale} = useTimelineScale();

  const createElement = (
    row: number,
    index: number,
    start: number,
    end: number,
    color: string,
    tooltip?: string[],
  ): TimelineElement => {
    return {
      row: row,
      index: index,
      start: start,
      end: end,
      color: color,
      tooltip: tooltip ? tooltip : [],
    };
  };

  const update = () => {
    if (aggregatedTimestamps.value === null) {
      return;
    }

    const timestamps = aggregatedTimestamps.value;
    const newIndices: number[] = [];

    for (let i = 0; i < timestamps.length; i += 1) {
      const t = timestamps[i];
      const date = convertTimestampToDate(t);

      if (date.isAfter(dateEnd.value) || date.isBefore(dateStart.value)) {
        continue;
      }

      newIndices.push(i);
    }

    indices.value = newIndices;
    createElements();
  };

  const createElements = () => {
    if (
      integration.value === null ||
      aggregatedSites.value === null ||
      aggregatedIntervalDetails.value === null ||
      aggregatedTimestamps.value === null
    ) {
      return;
    }

    const newElements: TimelineElement[] = [];

    for (let i = 0; i < indices.value.length; i += 1) {
      const index = indices.value[i];
      const timestamp = aggregatedTimestamps.value[index];
      const detail = aggregatedIntervalDetails.value[index];
      const {site} = aggregatedSites.value[index];

      const start = convertTimestampToDate(timestamp);
      const end = start.add(integration.value.seconds, 'seconds');

      for (const d of detail) {
        const s = start.unix() * 1000;
        const e = end.unix() * 1000;
        const element = createElement(
          i,
          index,
          s,
          e,
          scale.value[d.fileIndex],
          [
            `site: ${site}`,
            `interval index: ${index}`,
            `file index: ${d.fileIndex}`,
            `start: ${convertTimestampToIsoDate(s)}`,
            `end: ${convertTimestampToIsoDate(e)}`,
          ],
        );
        newElements.push(element);
      }
    }

    elements.value = newElements;
  };

  return {
    elements: elements,
    update: update,
  };
}
