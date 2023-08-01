<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import {configBandRef} from 'src/hooks/useConfigBands';
import {configIntegrationRef} from 'src/hooks/useConfigIntegrations';
import {fileRef} from 'src/hooks/useFile';
import {useIndexes} from 'src/hooks/useIndexes';
import {groupedFeaturesRef} from 'src/hooks/useStorageGroupedFeatures';
import {groupedFilenamesRef} from 'src/hooks/useStorageGroupedFilenames';
import {groupedMetasRef} from 'src/hooks/useStorageGroupedMetas';
import {groupedTimestampsRef} from 'src/hooks/useStorageGroupedTimestamps';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {workerRef} from 'src/hooks/useWorker';
import {convertArrayToCsv} from 'src/utils/convert-array-to-csv';
import {triggerCSVDownload} from 'src/utils/trigger-csv-download';
import {ref} from 'vue';
import {pointsFilteredByMetaRef} from '.././Scatter/useScatterFilterMeta';
import {pointsFilteredByTimeRef} from '.././Scatter/useScatterFilterTime';
import AppButton from '../AppButton/AppButton.vue';
import {useNotification} from '../AppNotification/useNotification';
import {scatterReadyRef} from '../Scatter/useScatterReady';
import {pointIndexesRef} from '../Scatter/usePointIndexes';
import {reducedFeaturesRef} from 'src/hooks/useStorageReducedFeatures';

const {notify} = useNotification();
const {convertPointIndex} = useIndexes();

const loadingRef = ref<boolean>(false);

interface ExportData {
  pointIndex: number;
  fileIndex: number;
  groupIndex: number;
  filename: string;
  timestamp: number;
  groupedMetas: string[];
  reducedFeatures: number[];
  groupedFeatures: number[];
}

async function handleClick() {
  if (
    workerRef.value === null ||
    fileRef.value === null ||
    configBandRef.value === null ||
    configIntegrationRef.value === null ||
    groupedFilenamesRef.value === null ||
    groupedTimestampsRef.value === null ||
    groupedFeaturesRef.value === null ||
    groupedMetasRef.value === null ||
    pointIndexesRef.value === null ||
    pointsFilteredByMetaRef.value === null ||
    pointsFilteredByTimeRef.value === null ||
    metaPropertiesRef.value === null ||
    reducedFeaturesRef.value === null
  ) {
    return;
  }

  notify('info', 'Export', 'Generating CSV from collected points.');

  loadingRef.value = true;

  const payload: ExportData[] = [];

  for (
    let pointIndex = 0;
    pointIndex < pointIndexesRef.value.length;
    ++pointIndex
  ) {
    const isFilteredByMeta = pointsFilteredByMetaRef.value[pointIndex];
    const isFilteredByTime = pointsFilteredByTimeRef.value[pointIndex];

    if (isFilteredByMeta || isFilteredByTime) {
      continue;
    }

    const [fileIndex, groupIndex] = convertPointIndex(pointIndex);
    const filename = groupedFilenamesRef.value[pointIndex];
    const features = groupedFeaturesRef.value[pointIndex];
    const timestamp = groupedTimestampsRef.value[pointIndex];
    const groupedMetas = groupedMetasRef.value[pointIndex];

    const reducedFeatures = reducedFeaturesRef.value[pointIndex];

    payload.push({
      pointIndex: pointIndex,
      fileIndex: fileIndex,
      groupIndex: groupIndex,
      filename: filename,
      timestamp: timestamp,
      groupedMetas: groupedMetas,
      reducedFeatures: reducedFeatures,
      groupedFeatures: features,
    });
  }

  let csvFirstRow = '';

  csvFirstRow += 'pointIndex,';
  csvFirstRow += 'fileIndex,';
  csvFirstRow += 'groupIndex,';
  csvFirstRow += 'filename,';
  csvFirstRow += 'timestamp,';

  metaPropertiesRef.value.forEach((metaProperty) => {
    csvFirstRow += `m_${metaProperty},`;
  });

  payload[0].reducedFeatures.forEach((_, r) => {
    csvFirstRow += `r_${r},`;
  });

  payload[0].groupedFeatures.forEach((_, f) => {
    csvFirstRow += `f_${f},`;
  });

  const csvContent = payload.map((data) => {
    let content = '';

    content += `${data.pointIndex},`;
    content += `${data.fileIndex},`;
    content += `${data.groupIndex},`;
    content += `${data.filename},`;
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
  const csvFilename = `SSE_${configBandRef.value.name}_${configIntegrationRef.value.name}.csv`;
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
