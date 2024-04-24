import {Csv} from 'src/common/Csv';
import {useDate} from 'src/composables/date';
import {useStorageAggregatedFeatures} from 'src/composables/storage-aggregated-features';
import {aggregatedLabelsRef} from 'src/hooks/useAggregatedLabels';
import {aggregatedSitesRef} from 'src/hooks/useAggregatedSites';
import {aggregatedTimestampsRef} from 'src/hooks/useAggregatedTimestamps';
import {bandRef} from 'src/hooks/useBands';
import {integrationRef} from 'src/hooks/useIntegrations';
import {labelsPropertiesRef} from 'src/hooks/useLabels';
import {ref} from 'vue';

import {useStorageAggregatedIndicators} from '../../composables/storage-aggregated-indicators';
import {useStorageReducedFeatures} from '../../composables/storage-reduced-features';
import {useAppNotification} from '../AppNotification/useAppNotification';
import {pointsFilteredByMetaRef} from './useScatterFilterMeta';
import {pointsFilteredByTimeRef} from './useScatterFilterTime';

interface ExportData {
  intervalIndex: number;
  timestamp: number;
  site: string;
  aggregatedLabels: string[];
  reducedFeatures: number[];
  aggregatedFeatures: number[];
}

export function useScatterExport() {
  const {notify} = useAppNotification();
  const {convertTimestampToIsoDate} = useDate();
  const {reducedFeatures} = useStorageReducedFeatures();
  const {aggregatedFeatures} = useStorageAggregatedFeatures();
  const {aggregatedIndicators} = useStorageAggregatedIndicators();

  const loadingRef = ref<boolean>(false);

  const handleScatterExportClick = async () => {
    if (
      bandRef.value === null ||
      integrationRef.value === null ||
      aggregatedTimestampsRef.value === null ||
      aggregatedFeatures.value === null ||
      aggregatedLabelsRef.value === null ||
      pointsFilteredByMetaRef.value === null ||
      pointsFilteredByTimeRef.value === null ||
      labelsPropertiesRef.value === null ||
      reducedFeatures.value === null ||
      aggregatedSitesRef.value === null ||
      aggregatedIndicators.value === null
    ) {
      return;
    }

    notify('info', 'Export', 'Generating CSV from collected points.');

    loadingRef.value = true;

    const csv = new Csv();
    const aggregatedIndicatorsCopy = aggregatedIndicators.value;
    const payload: ExportData[] = [];

    for (
      let intervalIndex = 0;
      intervalIndex < aggregatedTimestampsRef.value.length;
      intervalIndex += 1
    ) {
      const isFilteredByMeta = pointsFilteredByMetaRef.value[intervalIndex];
      const isFilteredByTime = pointsFilteredByTimeRef.value[intervalIndex];

      if (isFilteredByMeta || isFilteredByTime) {
        continue;
      }

      const aggregatedFeaturesInterval =
        aggregatedFeatures.value[intervalIndex];
      const timestamp = aggregatedTimestampsRef.value[intervalIndex];
      const site = aggregatedSitesRef.value[intervalIndex];
      const aggregatedLabels = aggregatedLabelsRef.value[intervalIndex];

      const reducedFeaturesInterval = reducedFeatures.value[intervalIndex];

      payload.push({
        intervalIndex: intervalIndex,
        timestamp: timestamp,
        site: site.site,
        aggregatedLabels: aggregatedLabels,
        reducedFeatures: reducedFeaturesInterval,
        aggregatedFeatures: aggregatedFeaturesInterval,
      });
    }

    csv.addColumn('intervalIndex');
    csv.addColumn('timestamp');
    csv.addColumn('site');

    labelsPropertiesRef.value.forEach((property) => {
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

    const csvFilename = `SSE_${bandRef.value.name}_${integrationRef.value.name}.csv`;
    csv.download(csvFilename);
    loadingRef.value = false;
  };

  return {
    handleScatterExportClick: handleScatterExportClick,
  };
}
