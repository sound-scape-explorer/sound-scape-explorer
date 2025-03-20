import {useAppNotification} from 'src/app/notification/use-app-notification';
import {Csv} from 'src/common/csv';
import {useBandSelection} from 'src/composables/use-band-selection';
import {useDate} from 'src/composables/use-date';
import {useExportName} from 'src/composables/use-export-name';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {useStorageAggregatedFeatures} from 'src/composables/use-storage-aggregated-features';
import {useStorageAggregatedIndices} from 'src/composables/use-storage-aggregated-indices';
import {useStorageAggregatedLabels} from 'src/composables/use-storage-aggregated-labels';
import {useStorageAggregatedSites} from 'src/composables/use-storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useStorageReducedFeatures} from 'src/composables/use-storage-reduced-features';
import {ref} from 'vue';

interface ExportData {
  intervalIndex: number;
  timestamp: number;
  site: string;
  aggregatedLabels: string[];
  reducedFeatures: number[];
  aggregatedFeatures: number[];
}

export function useScatterExport() {
  const {band} = useBandSelection();
  const {integration} = useIntegrationSelection();
  const {labelProperties} = useStorageLabels();
  const {notify} = useAppNotification();
  const {convertTimestampToIsoDate} = useDate();
  const {reducedFeatures} = useStorageReducedFeatures();
  const {aggregatedFeatures} = useStorageAggregatedFeatures();
  const {aggregatedIndices} = useStorageAggregatedIndices();
  const {aggregatedLabels} = useStorageAggregatedLabels();
  const {aggregatedSites} = useStorageAggregatedSites();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {filtered} = useScatterGlobalFilter();
  const {generate} = useExportName();

  const loadingRef = ref<boolean>(false);

  const handleScatterExportClick = async () => {
    if (
      band.value === null ||
      integration.value === null ||
      aggregatedTimestamps.value === null ||
      aggregatedFeatures.value === null ||
      aggregatedLabels.value === null ||
      labelProperties.value === null ||
      reducedFeatures.value === null ||
      aggregatedSites.value === null ||
      aggregatedIndices.value === null
    ) {
      return;
    }

    notify('info', 'scatter-export', 'generating csv file...');

    loadingRef.value = true;

    const csv = new Csv();
    const aggregatedIndicesCopy = aggregatedIndices.value;
    const payload: ExportData[] = [];

    for (let i = 0; i < aggregatedTimestamps.value.length; i += 1) {
      if (filtered.value[i]) {
        continue;
      }

      const aggregatedFeaturesInterval = aggregatedFeatures.value[i];
      const timestamp = aggregatedTimestamps.value[i];
      const site = aggregatedSites.value[i];
      const aggregatedLabelsInterval = aggregatedLabels.value[i];

      const reducedFeaturesInterval = reducedFeatures.value[i];

      payload.push({
        intervalIndex: i,
        timestamp: timestamp,
        site: site,
        aggregatedLabels: aggregatedLabelsInterval,
        reducedFeatures: reducedFeaturesInterval,
        aggregatedFeatures: aggregatedFeaturesInterval,
      });
    }

    csv.addColumn('intervalIndex');
    csv.addColumn('timestamp');
    csv.addColumn('site');

    labelProperties.value.forEach((property) => {
      csv.addColumn(`label_${property}`);
    });

    aggregatedIndicesCopy.forEach(({index}) => {
      csv.addColumn(`i_${index.index}_${index.impl}`);
    });

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

      aggregatedIndicesCopy.forEach((aI) => {
        csv.addToCurrentRow(`${aI.values[data.intervalIndex]}`);
      });

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
    handleScatterExportClick: handleScatterExportClick,
  };
}
