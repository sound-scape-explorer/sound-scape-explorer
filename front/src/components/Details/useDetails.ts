import type {Dayjs} from 'dayjs';
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
import {ref, watchEffect} from 'vue';

import {clickedRef} from '../Scatter/useScatterClick';

export function useDetails() {
  const {settings} = useStorageSettings();
  const {files} = useStorageFiles();
  const {convertTimestampToDate} = useDate();
  const {aggregatedLabels} = useStorageAggregatedLabels();
  const {aggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
  const {aggregatedSites} = useStorageAggregatedSites();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();

  const intervalDateRef = ref<Dayjs | null>(null);
  const intervalLabelsRef = ref<string[] | null>(null);
  const intervalSiteRef = ref<AggregatedSite | null>(null);
  const intervalDetailsRef = ref<IntervalDetails | null>(null);

  // TODO: Performance can be improved (react on clickedRef change only)
  watchEffect(async () => {
    if (
      clickedRef.value === null ||
      files.value === null ||
      settings.value === null ||
      aggregatedSites.value === null ||
      aggregatedTimestamps.value === null ||
      aggregatedLabels.value === null ||
      aggregatedIntervalDetails.value === null
    ) {
      return;
    }

    const intervalIndex = clickedRef.value;
    const timestamp = aggregatedTimestamps.value[intervalIndex];

    intervalDateRef.value = convertTimestampToDate(timestamp);

    intervalLabelsRef.value = aggregatedLabels.value[intervalIndex];
    intervalSiteRef.value = aggregatedSites.value[intervalIndex];
    intervalDetailsRef.value = aggregatedIntervalDetails.value[intervalIndex];
  });

  return {
    intervalDateRef: intervalDateRef,
    intervalLabelsRef: intervalLabelsRef,
    intervalSiteRef: intervalSiteRef,
    intervalDetailsRef: intervalDetailsRef,
  };
}
