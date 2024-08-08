import {
  type AggregatedIndicator,
  useStorageAggregatedIndicators,
} from 'src/composables/use-storage-aggregated-indicators';
import {useStorageAggregatedSites} from 'src/composables/use-storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
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

    const l = aggregatedSites.value.length;
    const newData: Data[] = new Array(l);

    for (let i = 0; i < l; i += 1) {
      const {site} = aggregatedSites.value[i];

      if (!sites.value.includes(site)) {
        continue;
      }

      newData[i] = {
        index: i,
        site: site,
        timestamp: aggregatedTimestamps.value[i],
        values: indicator.value.values[i],
      };
    }

    data.value = newData;
  };

  return {
    indicator: indicator,
    data: data,
    sites: sites,
    selectIndicator: selectIndicator,
    selectSites: selectSites,
  };
}
