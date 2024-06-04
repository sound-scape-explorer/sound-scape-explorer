import {
  type AggregatedIndicator,
  useStorageAggregatedIndicators,
} from 'src/composables/storage-aggregated-indicators';
import {useStorageAggregatedSites} from 'src/composables/storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from 'src/composables/storage-aggregated-timestamps';
import {reactive, watchEffect} from 'vue';

interface IndicatorRef {
  value: AggregatedIndicator | null;
}

export const indicatorRef = reactive<IndicatorRef>({
  value: null,
});

interface IndicatorSitesRef {
  value: string[];
}

export const indicatorSitesRef = reactive<IndicatorSitesRef>({
  value: [],
});

interface IndicatorData {
  index: number;
  site: string;
  timestamp: number;
  values: number[];
}

interface IndicatorDataRef {
  value: IndicatorData[];
}

export const indicatorDataRef = reactive<IndicatorDataRef>({
  value: [],
});

export function useIndicators() {
  const {aggregatedIndicators} = useStorageAggregatedIndicators();
  const {aggregatedSites} = useStorageAggregatedSites();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();

  const selectIndicator = (index: number | null) => {
    if (index === null) {
      indicatorRef.value = null;
      return;
    }

    if (aggregatedIndicators.value === null) {
      return;
    }

    indicatorRef.value = aggregatedIndicators.value.filter(
      (indicator) => indicator.extractor.index === index,
    )[0];
  };

  const selectSites = (names: string[] | null) => {
    if (names === null) {
      indicatorSitesRef.value = [];
      return;
    }

    indicatorSitesRef.value = names;
  };

  const buildIndicatorData = () => {
    if (
      aggregatedSites.value === null ||
      aggregatedTimestamps.value === null ||
      indicatorRef.value === null
    ) {
      return;
    }

    const datas: IndicatorData[] = [];

    for (const [index, aSite] of aggregatedSites.value.entries()) {
      if (!indicatorSitesRef.value.includes(aSite.site)) {
        continue;
      }

      const data: IndicatorData = {
        index: index,
        site: aSite.site,
        timestamp: aggregatedTimestamps.value[index],
        values: indicatorRef.value.values[index],
      };

      datas.push(data);
    }

    indicatorDataRef.value = datas;
  };

  watchEffect(buildIndicatorData);

  return {
    selectIndicator: selectIndicator,
    selectSites: selectSites,
  };
}
