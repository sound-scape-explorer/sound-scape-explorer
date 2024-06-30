import {
  AggregatedIndicator,
  useStorageAggregatedIndicators,
} from 'src/composables/storage-aggregated-indicators';
import {useStorageAggregatedSites} from 'src/composables/storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from 'src/composables/storage-aggregated-timestamps';
import {ref} from 'vue';

interface Data {
  index: number;
  site: string;
  timestamp: number;
  values: number[];
}

const data = ref<Data[]>([]);
const sites = ref<string[]>([]);
const indicator = ref<AggregatedIndicator | null>(null);

export function useTemporal() {
  const {aggregatedIndicators} = useStorageAggregatedIndicators();
  const {aggregatedSites} = useStorageAggregatedSites();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();

  const selectIndicator = (index: number | null) => {
    if (index === null) {
      indicator.value = null;
      return;
    }

    if (aggregatedIndicators.value === null) {
      return;
    }

    const results = aggregatedIndicators.value.filter(
      (indicator) => indicator.extractor.index === index,
    );

    indicator.value = results[0];
    render();
  };

  const selectSites = (names: string[] | null) => {
    if (names === null) {
      sites.value = [];
      return;
    }

    sites.value = names;
    render();
  };

  const render = () => {
    if (
      aggregatedSites.value === null ||
      aggregatedTimestamps.value === null ||
      indicator.value === null
    ) {
      return;
    }

    let all: Data[] = [];

    for (const [aS, aggregatedSite] of aggregatedSites.value.entries()) {
      if (!sites.value.includes(aggregatedSite.site)) {
        continue;
      }

      const d: Data = {
        index: aS,
        site: aggregatedSite.site,
        timestamp: aggregatedTimestamps.value[aS],
        values: indicator.value.values[aS],
      };

      all = [...all, d];
    }

    data.value = all;
  };

  return {
    indicator: indicator,
    data: data,
    sites: sites,
    selectIndicator: selectIndicator,
    selectSites: selectSites,
  };
}
