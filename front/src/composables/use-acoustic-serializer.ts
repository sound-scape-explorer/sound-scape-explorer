import {
  type AcousticData,
  useAcousticDataReader,
} from 'src/composables/use-acoustic-data-reader';
import {useAggregations} from 'src/composables/use-aggregations';
import {useConfig} from 'src/composables/use-config';
import {useViewSelection} from 'src/composables/use-view-selection';

export interface AcousticSeries {
  index: number;
  siteName: string;
  timestamp: number;
  values: number[];
}

export function useAcousticSerializer() {
  const {config} = useConfig();
  const {integration} = useViewSelection();
  const {aggregations} = useAggregations();
  const {filter} = useAcousticDataReader();

  const serialize = async (
    acoustics: AcousticData[],
  ): Promise<AcousticSeries[]> => {
    if (
      aggregations.value === null ||
      integration.value === null ||
      config.value === null
    ) {
      throw new Error('Could not serialize acoustic data');
    }

    const l = aggregations.value.timestamps.length;
    const newData: AcousticSeries[] = new Array(l);

    for (let i = 0; i < l; i += 1) {
      const start = aggregations.value.timestamps[i];
      const end = start + integration.value.duration;

      const fileIndicesUnique = [...new Set(aggregations.value.fileIndices[i])];
      const files = config.value.files.filter((f) =>
        fileIndicesUnique.map((i) => String(i)).includes(f.Index),
      );

      const siteNames = files.map((f) => f.Site);

      for (const siteName of siteNames) {
        const data = acoustics.find((ac) => ac.site.name === siteName);

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

    newData.sort((a, b) => a.timestamp - b.timestamp);
    return newData;
  };

  return {
    serialize,
  };
}
