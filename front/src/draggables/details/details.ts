import type {Dayjs} from 'dayjs';
import {useClientSettings} from 'src/composables/client-settings';
import {useDate} from 'src/composables/date';
import {
  type IntervalDetails,
  useStorageAggregatedIntervalDetails,
} from 'src/composables/storage-aggregated-interval-details';
import {useStorageAggregatedLabels} from 'src/composables/storage-aggregated-labels';
import {
  type AggregatedSite,
  useStorageAggregatedSites,
} from 'src/composables/storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from 'src/composables/storage-aggregated-timestamps';
import {useStorageFiles} from 'src/composables/storage-files';
import {useStorageSettings} from 'src/composables/storage-settings';
import {useScatterClick} from 'src/components/scatter/scatter-click';
import {ref, watch} from 'vue';

const currentIndex = ref<number | null>(null);
const date = ref<Dayjs | null>(null);
const labelValues = ref<string[] | null>(null);
const site = ref<AggregatedSite | null>(null);
const blocks = ref<IntervalDetails | null>(null);

// interval details
export function useDetails() {
  const {settings} = useStorageSettings();
  const {files} = useStorageFiles();
  const {convertTimestampToDate} = useDate();
  const {aggregatedLabels} = useStorageAggregatedLabels();
  const {aggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
  const {aggregatedSites} = useStorageAggregatedSites();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {clickedIndex} = useScatterClick();
  const {timeShift} = useClientSettings();

  const readDetails = async () => {
    if (
      clickedIndex.value === null ||
      files.value === null ||
      settings.value === null ||
      aggregatedSites.value === null ||
      aggregatedTimestamps.value === null ||
      aggregatedLabels.value === null ||
      aggregatedIntervalDetails.value === null ||
      clickedIndex.value === currentIndex.value
    ) {
      return;
    }

    const i = clickedIndex.value; // interval index
    const t = aggregatedTimestamps.value[i];

    date.value = convertTimestampToDate(t);
    labelValues.value = aggregatedLabels.value[i];
    site.value = aggregatedSites.value[i];
    blocks.value = aggregatedIntervalDetails.value[i];

    currentIndex.value = i;
  };

  watch(clickedIndex, readDetails);
  watch(timeShift, () => {
    if (clickedIndex.value === null || aggregatedTimestamps.value === null) {
      return;
    }

    const i = clickedIndex.value;
    const t = aggregatedTimestamps.value[i];

    date.value = convertTimestampToDate(t);
  });

  return {
    date: date,
    labelValues: labelValues,
    site: site,
    blocks: blocks,
  };
}
