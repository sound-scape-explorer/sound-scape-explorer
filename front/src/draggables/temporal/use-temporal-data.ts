import {useAcoustics} from 'src/composables/use-acoustics';
import {useAggregations} from 'src/composables/use-aggregations';
import {useConfig} from 'src/composables/use-config';
import {useViewSelection} from 'src/composables/use-view-selection';
import {ref} from 'vue';

export interface TemporalData {
  index: number; // temporal index (chart)
  siteName: string;
  timestamp: number;
  values: number[];
}

const data = ref<TemporalData[]>([]);

export function useTemporalData() {
  const {config} = useConfig();
  const {integration} = useViewSelection();
  const {aggregations} = useAggregations();
  const {acoustics, filter} = useAcoustics();

  const update = async () => {
    if (
      aggregations.value === null ||
      integration.value === null ||
      config.value === null
    ) {
      return;
    }

    const l = aggregations.value.timestamps.length;
    const newData: TemporalData[] = new Array(l);

    for (let i = 0; i < l; i += 1) {
      const start = aggregations.value.timestamps[i];
      const end = start + integration.value.duration;

      const fileIndicesUnique = [...new Set(aggregations.value.fileIndices[i])];
      const files = config.value.files.filter((f) =>
        fileIndicesUnique.map((i) => String(i)).includes(f.Index),
      );

      const siteNames = files.map((f) => f.Site);

      for (const siteName of siteNames) {
        const data = acoustics.value.find((ac) => ac.site.name === siteName);

        if (!data) {
          continue;
        }

        const filtered = filter(data, start, end);

        newData[i] = {
          index: i,
          siteName,
          timestamp: start,
          values: filtered.scalars,
        };
      }
    }

    data.value = newData;
  };

  const reset = () => {
    data.value = [];
  };

  return {
    data,
    update,
    reset,
  };
}
