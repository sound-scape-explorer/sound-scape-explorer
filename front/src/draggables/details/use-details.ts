import {type Dayjs} from 'dayjs';
import {useAggregated} from 'src/composables/use-aggregated';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useConfig} from 'src/composables/use-config';
import {useDate} from 'src/composables/use-date';
import {useIntervalSelector} from 'src/composables/use-interval-selector';
import {
  type AggregatedWindow,
  useIntervals,
} from 'src/composables/use-intervals';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {STRING_DELIMITER} from 'src/constants';
import {computed, ref} from 'vue';

const currentIndex = ref<number | null>(null);
const date = ref<Dayjs | null>(null);
const labelValues = ref<string[] | null>(null);
const site = ref<string | null>(null);
const windows = ref<AggregatedWindow[] | null>(null);

// interval details
// todo: can you be more uselessly redundant please?
export function useDetails() {
  const {config} = useConfig();
  const {integration} = useViewSelectionNew();
  const {convertTimestampToDate} = useDate();
  const {aggregated} = useAggregated();
  const {currentIntervalIndex} = useIntervalSelector();
  const {timeshift} = useClientSettings();
  const {intervals} = useIntervals();

  const readDetails = async () => {
    if (
      currentIntervalIndex.value === null ||
      config.value === null ||
      aggregated.value === null ||
      currentIntervalIndex.value === currentIndex.value
    ) {
      return;
    }

    const i = currentIntervalIndex.value; // interval index
    const t = aggregated.value.timestamps[i];
    const interval = intervals.value[i];

    date.value = convertTimestampToDate(t);
    labelValues.value = Object.values(interval.labels).flat(); // todo: ???
    site.value = interval.sites.join(STRING_DELIMITER);
    windows.value = interval.windows;

    currentIndex.value = i;
  };

  const dateEnd = computed<Dayjs | null>(() => {
    if (date.value === null || integration.value === null) {
      return null;
    }

    return date.value.add(integration.value.duration, 'milliseconds');
  });

  const updateDates = () => {
    if (currentIntervalIndex.value === null || aggregated.value === null) {
      return;
    }

    const i = currentIntervalIndex.value;
    const t = aggregated.value.timestamps[i];

    date.value = convertTimestampToDate(t);
  };

  return {
    date,
    labelValues,
    site,
    windows,
    dateEnd,
    readDetails,
    timeshift,
    updateDates,
  };
}
