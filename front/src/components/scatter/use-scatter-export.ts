import {useAppNotification} from 'src/app/notification/use-app-notification';
import {Csv} from 'src/common/csv';
import {useAggregated} from 'src/composables/use-aggregated';
import {useDate} from 'src/composables/use-date';
import {useExportName} from 'src/composables/use-export-name';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {useStorageReducedEmbeddings} from 'src/composables/use-storage-reduced-embeddings';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {ref} from 'vue';

interface ExportData {
  intervalIndex: number;
  timestamp: number;
  site: string;
  aggregatedLabels: string[];
  reducedFeatures: number[];
  aggregatedFeatures: number[];
}

// todo: update me
export function useScatterExport() {
  const {band, integration} = useViewSelectionNew();
  const {allUniques} = useTagUniques();
  const {notify} = useAppNotification();
  const {convertTimestampToIsoDate} = useDate();
  const {reducedEmbeddings} = useStorageReducedEmbeddings();
  const {aggregated} = useAggregated();
  // const {aggregatedEmbeddings} = useStorageAggregatedEmbeddings();
  // const {aggregatedIndices} = useStorageAggregatedAcousticIndices();
  // const {aggregatedLabels} = useStorageAggregatedLabels();
  // const {aggregatedSites} = useStorageAggregatedSites();
  // const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {filtered} = useScatterGlobalFilter();
  const {generate} = useExportName();

  const loadingRef = ref<boolean>(false);

  const handleScatterExportClick = async () => {
    if (
      band.value === null ||
      integration.value === null ||
      aggregated.value === null ||
      reducedEmbeddings.value === null
    ) {
      return;
    }

    notify('info', 'scatter-export', 'generating csv file...');

    loadingRef.value = true;

    const csv = new Csv();
    // const aggregatedIndicesCopy = aggregatedIndices.value;
    const payload: ExportData[] = [];

    for (let i = 0; i < aggregated.value.timestamps.length; i += 1) {
      if (filtered.value[i]) {
        continue;
      }

      const aggregatedEmbeddings = aggregated.value.embeddings[i];
      const timestamp = aggregated.value.timestamps[i];
      // const site = aggregatedSites.value[i];
      // const aggregatedLabelsInterval = aggregatedLabels.value[i];

      const reducedFeaturesInterval = reducedEmbeddings.value[i];

      payload.push({
        intervalIndex: i,
        timestamp,
        site: 'relol',
        // aggregatedLabels: aggregatedLabelsInterval,
        aggregatedLabels: ['lol'],
        // reducedFeatures: reducedFeaturesInterval,
        reducedFeatures: [1],
        // aggregatedEmbeddings: aggregatedEmbeddings,
        aggregatedFeatures: [1],
      });
    }

    csv.addColumn('intervalIndex');
    csv.addColumn('timestamp');
    csv.addColumn('site');

    Object.keys(allUniques.value).forEach((property) => {
      csv.addColumn(`label_${property}`);
    });

    // aggregatedIndicesCopy.forEach(({index}) => {
    //   csv.addColumn(`i_${index.index}_${index.impl}`);
    // });

    payload[0].reducedFeatures.forEach((_, r) => {
      csv.addColumn(`r_${r}`);
    });

    payload[0].aggregatedFeatures.forEach((_, f) => {
      csv.addColumn(`f_${f}`);
    });

    payload.forEach((data) => {
      csv.createRow();
      csv.addToCurrentRow(data.intervalIndex.toString());
      csv.addToCurrentRow(convertTimestampToIsoDate(data.timestamp));
      csv.addToCurrentRow(data.site);

      data.aggregatedLabels.forEach((aL) => {
        csv.addToCurrentRow(aL);
      });

      // aggregatedIndicesCopy.forEach((aI) => {
      //   csv.addToCurrentRow(`${aI.values[data.intervalIndex]}`);
      // });

      data.reducedFeatures.forEach((rF) => {
        csv.addToCurrentRow(`${rF}`);
      });

      data.aggregatedFeatures.forEach((aF) => {
        csv.addToCurrentRow(`${aF}`);
      });
    });

    const name = generate('scatter');
    csv.download(name);
    loadingRef.value = false;
  };

  return {
    handleScatterExportClick,
  };
}
