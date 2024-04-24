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
import {ref, watchEffect} from 'vue';

import {useStorageSettings} from '../../hooks/useStorageSettings';
import {clickedRef} from '../Scatter/useScatterClick';

export function useDetails() {
  const {settings} = useStorageSettings();
  const {convertTimestampToDate} = useDate();

  const intervalDateRef = ref<Dayjs | null>(null);
  const intervalLabelsRef = ref<string[] | null>(null);
  const intervalSiteRef = ref<AggregatedSite | null>(null);
  const intervalDetailsRef = ref<IntervalDetails | null>(null);

  // TODO: Performance can be improved (react on clickedRef change only)
  watchEffect(async () => {
    if (
      clickedRef.value === null ||
      filesRef.value === null ||
      settings.value === null ||
      aggregatedSitesRef.value === null ||
      aggregatedTimestampsRef.value === null ||
      aggregatedLabelsRef.value === null ||
      aggregatedIntervalDetailsRef.value === null
    ) {
      return;
    }

    const intervalIndex = clickedRef.value;
    const timestamp = aggregatedTimestampsRef.value[intervalIndex];

    intervalDateRef.value = convertTimestampToDate(timestamp);

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
