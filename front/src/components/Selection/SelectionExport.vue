<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import AppButton from 'src/components/AppButton/AppButton.vue';
import {useNotification} from 'src/components/AppNotification/useNotification';
import {pointsFilteredByMetaRef} from 'src/components/Scatter/useScatterFilterMeta';
import {pointsFilteredByTimeRef} from 'src/components/Scatter/useScatterFilterTime';
import {aggregatedFeaturesRef} from 'src/hooks/useAggregatedFeatures';
import {aggregatedIndicatorsRef} from 'src/hooks/useAggregatedIndicators';
import {aggregatedLabelsRef} from 'src/hooks/useAggregatedLabels';
import {aggregatedSitesRef} from 'src/hooks/useAggregatedSites';
import {aggregatedTimestampsRef} from 'src/hooks/useAggregatedTimestamps';
import {bandRef} from 'src/hooks/useBands';
import {integrationRef} from 'src/hooks/useIntegrations';
import {labelsPropertiesRef} from 'src/hooks/useLabels';
import {reducedFeaturesRef} from 'src/hooks/useReducedFeatures';
import {storageFileRef} from 'src/hooks/useStorageFile';
import {workerRef} from 'src/hooks/useWorker';
import {convertArrayToCsv} from 'src/utils/convert-array-to-csv';
import {triggerCSVDownload} from 'src/utils/trigger-csv-download';
import {ref} from 'vue';

import {scatterLoadingRef} from '../Scatter/useScatterLoading';

const {notify} = useNotification();

const loadingRef = ref<boolean>(false);

interface ExportData {
  intervalIndex: number;
  timestamp: number;
  site: string;
  aggregatedLabels: string[];
  reducedFeatures: number[];
  aggregatedFeatures: number[];
}

async function handleClick() {
  if (
    workerRef.value === null ||
    storageFileRef.value === null ||
    bandRef.value === null ||
    integrationRef.value === null ||
    aggregatedTimestampsRef.value === null ||
    aggregatedFeaturesRef.value === null ||
    aggregatedLabelsRef.value === null ||
    pointsFilteredByMetaRef.value === null ||
    pointsFilteredByTimeRef.value === null ||
    labelsPropertiesRef.value === null ||
    reducedFeaturesRef.value === null ||
    aggregatedSitesRef.value === null ||
    aggregatedIndicatorsRef.value === null
  ) {
    return;
  }

  notify('info', 'Export', 'Generating CSV from collected points.');

  loadingRef.value = true;

  const aggregatedIndicators = aggregatedIndicatorsRef.value;
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

    const aggregatedFeatures = aggregatedFeaturesRef.value[intervalIndex];
    const timestamp = aggregatedTimestampsRef.value[intervalIndex];
    const site = aggregatedSitesRef.value[intervalIndex];
    const aggregatedLabels = aggregatedLabelsRef.value[intervalIndex];

    const reducedFeatures = reducedFeaturesRef.value[intervalIndex];

    payload.push({
      intervalIndex: intervalIndex,
      timestamp: timestamp,
      site: site.site,
      aggregatedLabels: aggregatedLabels,
      reducedFeatures: reducedFeatures,
      aggregatedFeatures: aggregatedFeatures,
    });
  }

  let csvFirstRow = '';

  csvFirstRow += 'intervalIndex,';
  csvFirstRow += 'timestamp,';
  csvFirstRow += 'site,';

  labelsPropertiesRef.value.forEach((metaProperty) => {
    csvFirstRow += `label_${metaProperty},`;
  });

  aggregatedIndicators.forEach(({extractor}) => {
    csvFirstRow += `i_${extractor.index}_${extractor.name},`;
  });

  payload[0].reducedFeatures.forEach((_, r) => {
    csvFirstRow += `r_${r},`;
  });

  payload[0].aggregatedFeatures.forEach((_, f) => {
    csvFirstRow += `f_${f},`;
  });

  const csvContent = payload.map((data) => {
    let content = '';

    content += `${data.intervalIndex},`;
    content += `${data.timestamp},`;
    content += `${data.site},`;

    data.aggregatedLabels.forEach((aL) => {
      content += `${aL},`;
    });

    aggregatedIndicators.forEach((aI) => {
      content += `${aI.values[data.intervalIndex]},`;
    });

    data.reducedFeatures.forEach((rF) => {
      content += `${rF},`;
    });

    data.aggregatedFeatures.forEach((aF) => {
      content += `${aF},`;
    });

    content = content.slice(0, -1);

    return content;
  });

  const csv = convertArrayToCsv(csvContent, csvFirstRow);
  const csvFilename = `SSE_${bandRef.value.name}_${integrationRef.value.name}.csv`;
  triggerCSVDownload(csv, csvFilename);
  loadingRef.value = false;
}
</script>

<template>
  <AppButton
    :disabled="scatterLoadingRef.value"
    :handle-click="handleClick"
    :loading="loadingRef"
    text="csv"
  >
    <download-outline />
  </AppButton>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
