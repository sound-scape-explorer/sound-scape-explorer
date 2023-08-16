<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import AppButton from 'src/components/AppButton/AppButton.vue';
import {useNotification} from 'src/components/AppNotification/useNotification';
import {pointsFilteredByMetaRef} from 'src/components/Scatter/useScatterFilterMeta';
import {pointsFilteredByTimeRef} from 'src/components/Scatter/useScatterFilterTime';
import {scatterReadyRef} from 'src/components/Scatter/useScatterStatus';
import {aggregatedLabelsRef} from 'src/hooks/useAggregatedLabels';
import {aggregatedSitesRef} from 'src/hooks/useAggregatedSites';
import {aggregatedTimestampsRef} from 'src/hooks/useAggregatedTimestamps';
import {bandRef} from 'src/hooks/useBands';
import {integrationRef} from 'src/hooks/useIntegrations';
import {reducedFeaturesRef} from 'src/hooks/useReducedFeatures';
import {storageFileRef} from 'src/hooks/useStorageFile';
import {groupedFeaturesRef} from 'src/hooks/useStorageGroupedFeatures';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {workerRef} from 'src/hooks/useWorker';
import {convertArrayToCsv} from 'src/utils/convert-array-to-csv';
import {triggerCSVDownload} from 'src/utils/trigger-csv-download';
import {ref} from 'vue';

const {notify} = useNotification();

const loadingRef = ref<boolean>(false);

interface ExportData {
  intervalIndex: number;
  timestamp: number;
  groupedMetas: string[];
  reducedFeatures: number[];
  groupedFeatures: number[];
}

async function handleClick() {
  if (
    workerRef.value === null ||
    storageFileRef.value === null ||
    bandRef.value === null ||
    integrationRef.value === null ||
    aggregatedTimestampsRef.value === null ||
    groupedFeaturesRef.value === null ||
    aggregatedLabelsRef.value === null ||
    pointsFilteredByMetaRef.value === null ||
    pointsFilteredByTimeRef.value === null ||
    metaPropertiesRef.value === null ||
    reducedFeaturesRef.value === null ||
    aggregatedSitesRef.value === null
  ) {
    return;
  }

  notify('info', 'Export', 'Generating CSV from collected points.');
  console.log(aggregatedLabelsRef.value);

  loadingRef.value = true;

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

    const features = groupedFeaturesRef.value[intervalIndex];
    const timestamp = aggregatedTimestampsRef.value[intervalIndex];
    const groupedMetas = aggregatedLabelsRef.value[intervalIndex];

    const reducedFeatures = reducedFeaturesRef.value[intervalIndex];
    console.log(intervalIndex, aggregatedSitesRef.value[intervalIndex]);

    payload.push({
      intervalIndex: intervalIndex,
      timestamp: timestamp,
      groupedMetas: groupedMetas,
      reducedFeatures: reducedFeatures,
      groupedFeatures: features,
    });
  }

  let csvFirstRow = '';

  csvFirstRow += 'intervalIndex,';
  csvFirstRow += 'timestamp,';

  metaPropertiesRef.value.forEach((metaProperty) => {
    csvFirstRow += `label_${metaProperty},`;
  });

  payload[0].reducedFeatures.forEach((_, r) => {
    csvFirstRow += `r_${r},`;
  });

  payload[0].groupedFeatures.forEach((_, f) => {
    csvFirstRow += `f_${f},`;
  });

  const csvContent = payload.map((data) => {
    let content = '';

    content += `${data.intervalIndex},`;
    content += `${data.timestamp},`;

    data.groupedMetas.forEach((groupedMeta) => {
      content += `${groupedMeta},`;
    });

    data.reducedFeatures.forEach((reducedFeature) => {
      content += `${reducedFeature},`;
    });

    data.groupedFeatures.forEach((groupedFeature) => {
      content += `${groupedFeature},`;
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
    :disabled="!scatterReadyRef.value"
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
