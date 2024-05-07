import {useAppNotification} from 'src/app/notification/app-notification';
import {Csv} from 'src/common/csv';
import {useBandSelection} from 'src/composables/band-selection';
import {useDate} from 'src/composables/date';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import {useStorageAggregatedFeatures} from 'src/composables/storage-aggregated-features';
import {useStorageAggregatedIndicators} from 'src/composables/storage-aggregated-indicators';
import {useStorageAggregatedLabels} from 'src/composables/storage-aggregated-labels';
import {useStorageAggregatedSites} from 'src/composables/storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from 'src/composables/storage-aggregated-timestamps';
import {useStorageLabels} from 'src/composables/storage-labels';
import {useStorageReducedFeatures} from 'src/composables/storage-reduced-features';
import {useScatterFilterLabel} from 'src/scatter/scatter-filter-label';
import {useScatterFilterTime} from 'src/scatter/scatter-filter-time';
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
  const {aggregatedIndicators} = useStorageAggregatedIndicators();
  const {aggregatedLabels} = useStorageAggregatedLabels();
  const {aggregatedSites} = useStorageAggregatedSites();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {filtered: labelFiltered} = useScatterFilterLabel();
  const {filtered: timeFiltered} = useScatterFilterTime();

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
      aggregatedIndicators.value === null
    ) {
      return;
    }

    notify('info', 'scatter-export', 'generating csv file...');

    loadingRef.value = true;

    const csv = new Csv();
    const aggregatedIndicatorsCopy = aggregatedIndicators.value;
    const payload: ExportData[] = [];

    for (
      let intervalIndex = 0;
      intervalIndex < aggregatedTimestamps.value.length;
      intervalIndex += 1
    ) {
      const isFilteredByMeta = labelFiltered.value[intervalIndex];
      const isFilteredByTime = timeFiltered.value[intervalIndex];

      if (isFilteredByMeta || isFilteredByTime) {
        continue;
      }

      const aggregatedFeaturesInterval =
        aggregatedFeatures.value[intervalIndex];
      const timestamp = aggregatedTimestamps.value[intervalIndex];
      const site = aggregatedSites.value[intervalIndex];
      const aggregatedLabelsInterval = aggregatedLabels.value[intervalIndex];

      const reducedFeaturesInterval = reducedFeatures.value[intervalIndex];

      payload.push({
        intervalIndex: intervalIndex,
        timestamp: timestamp,
        site: site.site,
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

    aggregatedIndicatorsCopy.forEach(({extractor}) => {
      csv.addColumn(`i_${extractor.index}_${extractor.name}`);
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

      aggregatedIndicatorsCopy.forEach((aI) => {
        csv.addToCurrentRow(`${aI.values[data.intervalIndex]}`);
      });

      data.reducedFeatures.forEach((rF) => {
        csv.addToCurrentRow(`${rF}`);
      });

      data.aggregatedFeatures.forEach((aF) => {
        csv.addToCurrentRow(`${aF}`);
      });
    });

    const csvFilename = `SSE_${band.value.name}_${integration.value.name}.csv`;
    csv.download(csvFilename);
    loadingRef.value = false;
  };

  return {
    handleScatterExportClick: handleScatterExportClick,
  };
}
