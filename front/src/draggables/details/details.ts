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
import {useAudioOpen} from 'src/draggables/audio/audio-open';
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
  const {currentIntervalIndex} = useAudioOpen();
  const {timeShift} = useClientSettings();

  const readDetails = async () => {
    if (
      currentIntervalIndex.value === null ||
      files.value === null ||
      settings.value === null ||
      aggregatedSites.value === null ||
      aggregatedTimestamps.value === null ||
      aggregatedLabels.value === null ||
      aggregatedIntervalDetails.value === null ||
      currentIntervalIndex.value === currentIndex.value
    ) {
      return;
    }

    const i = currentIntervalIndex.value; // interval index
    const t = aggregatedTimestamps.value[i];

    date.value = convertTimestampToDate(t);
    labelValues.value = aggregatedLabels.value[i];
    site.value = aggregatedSites.value[i];
    blocks.value = aggregatedIntervalDetails.value[i];

    currentIndex.value = i;
  };

  watch(currentIntervalIndex, readDetails);
  watch(timeShift, () => {
    if (
      currentIntervalIndex.value === null ||
      aggregatedTimestamps.value === null
    ) {
      return;
    }

    const i = currentIntervalIndex.value;
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
