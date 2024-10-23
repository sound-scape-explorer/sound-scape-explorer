import {useBodyColors} from 'src/components/timeline/body/use-body-colors';
import {useCalendarRange} from 'src/components/timeline/use-calendar-range';
import {useDate} from 'src/composables/use-date';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useStorageAggregatedIntervalDetails} from 'src/composables/use-storage-aggregated-interval-details';
import {useStorageAggregatedSites} from 'src/composables/use-storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
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

export function useBodyElements() {
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {aggregatedSites} = useStorageAggregatedSites();
  const {left, right} = useCalendarRange();
  const {integration} = useIntegrationSelection();
  const {convertTimestampToDate, convertTimestampToIsoDate} = useDate();
  const {aggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
  const {scale} = useBodyColors();

  const createElement = (
    row: number,
    index: number,
    start: number,
    end: number,
    color: string,
    tooltip: string[],
  ): TimelineElement => {
    return {
      row: row,
      index: index,
      start: start,
      end: end,
      color: color,
      tooltip: tooltip,
    };
  };

  const update = () => {
    if (aggregatedTimestamps.value === null) {
      return;
    }

    const timestamps = aggregatedTimestamps.value;
    const collected: number[] = [];

    for (let i = 0; i < timestamps.length; i += 1) {
      const t = timestamps[i];
      const isInside = t >= left.value && t <= right.value;

      if (!isInside) {
        continue;
      }

      collected.push(i);
    }

    indices.value = collected;
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
    const knownSites: string[] = [];
    let kS = -1; // copy of row

    for (let i = 0; i < indices.value.length; i += 1) {
      const index = indices.value[i];
      const timestamp = aggregatedTimestamps.value[index];
      const detail = aggregatedIntervalDetails.value[index];
      const {site} = aggregatedSites.value[index];

      if (!knownSites.includes(site)) {
        knownSites.push(site);
        kS += 1;
      }

      const start = convertTimestampToDate(timestamp);
      const end = start.add(integration.value.seconds, 'seconds');

      for (const d of detail) {
        const s = start.unix() * 1000;
        const e = end.unix() * 1000;
        const element = createElement(
          kS,
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
