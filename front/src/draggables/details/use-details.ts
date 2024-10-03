import {type Dayjs} from 'dayjs';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useDate} from 'src/composables/use-date';
import {useFiles} from 'src/composables/use-files';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useSettings} from 'src/composables/use-settings';
import {
  type IntervalDetails,
  useStorageAggregatedIntervalDetails,
} from 'src/composables/use-storage-aggregated-interval-details';
import {useStorageAggregatedLabels} from 'src/composables/use-storage-aggregated-labels';
import {
  type AggregatedSite,
  useStorageAggregatedSites,
} from 'src/composables/use-storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useIntervalSelector} from 'src/draggables/audio/use-interval-selector';
import {computed, ref} from 'vue';

const currentIndex = ref<number | null>(null);
const date = ref<Dayjs | null>(null);
const labelValues = ref<string[] | null>(null);
const site = ref<AggregatedSite | null>(null);
const blocks = ref<IntervalDetails | null>(null);

// interval details
export function useDetails() {
  const {settings} = useSettings();
  const {files} = useFiles();
  const {convertTimestampToDate} = useDate();
  const {aggregatedLabels} = useStorageAggregatedLabels();
  const {aggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
  const {aggregatedSites} = useStorageAggregatedSites();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {currentIntervalIndex} = useIntervalSelector();
  const {timeshift} = useClientSettings();
  const {integration} = useIntegrationSelection();

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

  const dateEnd = computed<Dayjs | null>(() => {
    if (date.value === null || integration.value === null) {
      return null;
    }

    return date.value.add(integration.value.seconds, 'seconds');
  });

  const updateDates = () => {
    if (
      currentIntervalIndex.value === null ||
      aggregatedTimestamps.value === null
    ) {
      return;
    }

    const i = currentIntervalIndex.value;
    const t = aggregatedTimestamps.value[i];

    date.value = convertTimestampToDate(t);
  };

  return {
    date: date,
    labelValues: labelValues,
    site: site,
    blocks: blocks,
    dateEnd: dateEnd,
    readDetails: readDetails,
    timeshift: timeshift,
    updateDates: updateDates,
  };
}
