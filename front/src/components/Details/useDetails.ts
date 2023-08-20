import type {Dayjs} from 'dayjs';
import {
  aggregatedIntervalDetailsRef,
  type IntervalDetails,
} from 'src/hooks/useAggregatedIntervalDetails';
import {aggregatedLabelsRef} from 'src/hooks/useAggregatedLabels';
import {
  type AggregatedSite,
  aggregatedSitesRef,
} from 'src/hooks/useAggregatedSites';
import {aggregatedTimestampsRef} from 'src/hooks/useAggregatedTimestamps';
import {useDate} from 'src/hooks/useDate';
import {filesRef} from 'src/hooks/useFiles';
import {settingsRef} from 'src/hooks/useStorageSettings';
import {ref, watchEffect} from 'vue';

import {clickedRef} from '.././Scatter/useScatterClick';

export function useDetails() {
  const {convertTimestampToDate} = useDate();

  const intervalDateRef = ref<Dayjs | null>(null);
  const intervalLabelsRef = ref<string[] | null>(null);
  const intervalSiteRef = ref<AggregatedSite | null>(null);
  const intervalDetailsRef = ref<IntervalDetails | null>(null);

  watchEffect(async () => {
    if (
      clickedRef.value === null ||
      filesRef.value === null ||
      settingsRef.value === null ||
      aggregatedSitesRef.value === null ||
      aggregatedTimestampsRef.value === null ||
      aggregatedLabelsRef.value === null ||
      aggregatedIntervalDetailsRef.value === null
    ) {
      return;
    }

    const intervalIndex = clickedRef.value;
    const timestamp = aggregatedTimestampsRef.value[intervalIndex];

    intervalDateRef.value = convertTimestampToDate(
      timestamp,
      settingsRef.value.timezone,
    );

    intervalLabelsRef.value = aggregatedLabelsRef.value[intervalIndex];
    intervalSiteRef.value = aggregatedSitesRef.value[intervalIndex];
    intervalDetailsRef.value =
      aggregatedIntervalDetailsRef.value[intervalIndex];
  });

  return {
    intervalDateRef: intervalDateRef,
    intervalLabelsRef: intervalLabelsRef,
    intervalSiteRef: intervalSiteRef,
    intervalDetailsRef: intervalDetailsRef,
  };
}
