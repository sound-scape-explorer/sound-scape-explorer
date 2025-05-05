import {type AggregatedIndex} from 'src/composables/use-storage-aggregated-acoustic-indices';
import {ref} from 'vue';

interface Data {
  index: number;
  site: string;
  timestamp: number;
  values: number[];
}

const data = ref<Data[]>([]);
const indicator = ref<AggregatedIndex | null>(null);

export function useTemporal() {
  // const {aggregatedIndices} = useStorageAggregatedAcousticIndices();
  // const {aggregatedSites} = useStorageAggregatedSites();
  // const {aggregatedTimestamps} = useStorageAggregatedTimestamps();

  const selectIndicator = (index: number | null) => {
    return; // todo: redo me
    // if (index === null) {
    //   indicator.value = null;
    //   return;
    // }
    //
    // if (aggregatedIndices.value === null) {
    //   return;
    // }
    //
    // const domainIndex = aggregatedIndices.value.find(
    //   (aI) => aI.index.index === index,
    // );
    //
    // if (!domainIndex) {
    //   return;
    // }
    //
    // indicator.value = domainIndex;
    // render();
  };

  const render = () => {
    return; // todo: redo me
    // if (
    //   aggregatedSites.value === null ||
    //   aggregatedTimestamps.value === null ||
    //   indicator.value === null
    // ) {
    //   return;
    // }
    //
    // const l = aggregatedSites.value.length;
    // const newData: Data[] = new Array(l);
    //
    // for (let i = 0; i < l; i += 1) {
    //   const site = aggregatedSites.value[i];
    //
    //   newData[i] = {
    //     index: i,
    //     site: site,
    //     timestamp: aggregatedTimestamps.value[i],
    //     values: indicator.value.values[i],
    //   };
    // }
    //
    // data.value = newData;
  };

  return {
    indicator,
    data,
    selectIndicator,
  };
}
