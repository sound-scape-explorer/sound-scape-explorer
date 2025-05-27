import {useAppNotification} from 'src/app/notification/use-app-notification';
import {Csv} from 'src/common/csv';
import {useAggregations} from 'src/composables/use-aggregations';
import {useDate} from 'src/composables/use-date';
import {useExportName} from 'src/composables/use-export-name';
import {useReductions} from 'src/composables/use-reductions';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useViewSelection} from 'src/composables/use-view-selection';
import {ref} from 'vue';

interface ExportData {
  intervalIndex: number;
  timestamp: number;
  site: string;
  tags: string[];
  reductions: number[];
  aggregations: number[];
}

// todo: update me!!!
export function useScatterExport() {
  const {band, integration} = useViewSelection();
  const {allUniques} = useTagUniques();
  const {notify} = useAppNotification();
  const {convertTimestampToIsoDate} = useDate();
  const {reductions} = useReductions();
  const {aggregations} = useAggregations();
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
      aggregations.value === null ||
      reductions.value === null
    ) {
      return;
    }

    notify('info', 'scatter-export', 'generating csv file...');

    loadingRef.value = true;

    const csv = new Csv();
    // const aggregatedIndicesCopy = aggregatedIndices.value;
    const payload: ExportData[] = [];

    for (let i = 0; i < aggregations.value.timestamps.length; i += 1) {
      if (filtered.value[i]) {
        continue;
      }

      // const site = aggregatedSites.value[i];
      // const aggregatedLabelsInterval = aggregatedLabels.value[i];

      const timestamp = aggregations.value.timestamps[i];
      const aggregation = aggregations.value.embeddings[i];
      const reduction = reductions.value[i];

      payload.push({
        intervalIndex: i,
        timestamp,
        site: 'relol',
        // aggregatedLabels: aggregatedLabelsInterval,
        tags: ['lol'],
        // reducedFeatures: reducedFeaturesInterval,
        reductions: [1],
        // aggregatedEmbeddings: aggregatedEmbeddings,
        aggregations: [1],
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

    payload[0].reductions.forEach((_, r) => {
      csv.addColumn(`r_${r}`);
    });

    payload[0].aggregations.forEach((_, f) => {
      csv.addColumn(`f_${f}`);
    });

    payload.forEach((data) => {
      csv.createRow();
      csv.addToCurrentRow(data.intervalIndex.toString());
      csv.addToCurrentRow(convertTimestampToIsoDate(data.timestamp));
      csv.addToCurrentRow(data.site);

      data.tags.forEach((aL) => {
        csv.addToCurrentRow(aL);
      });

      // aggregatedIndicesCopy.forEach((aI) => {
      //   csv.addToCurrentRow(`${aI.values[data.intervalIndex]}`);
      // });

      data.reductions.forEach((rF) => {
        csv.addToCurrentRow(`${rF}`);
      });

      data.aggregations.forEach((aF) => {
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
