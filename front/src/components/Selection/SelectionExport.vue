<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import AppButton from '../AppButton/AppButton.vue';
import {datasetRef, isDatasetReadyRef} from '../Scatter/useScatterDataset';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {workerRef} from 'src/hooks/useWorker';
import {fileRef} from 'src/hooks/useFile';
import {bandRef} from 'src/hooks/useBand';
import {integrationRef} from 'src/hooks/useIntegration';
import {useNotification} from '../AppNotification/useNotification';
import {convertArrayToCsv} from 'src/utils/convert-array-to-csv';
import {triggerCSVDownload} from 'src/utils/trigger-csv-download';
import {ref} from 'vue';
import {groupedFilenamesRef} from 'src/hooks/useStorageGroupedFilenames';
import {groupedTimestampsRef} from 'src/hooks/useStorageGroupedTimestamps';
import {groupedFeaturesRef} from 'src/hooks/useStorageGroupedFeatures';
import {groupedMetasRef} from 'src/hooks/useStorageGroupedMetas';
import {groupedAttributesRef} from 'src/hooks/useStorageGroupedAttributes';
import {pointsFilteredByTimeRef} from '../Scatter/useScatterFilterTime';
import {pointsFilteredByMetaRef} from '../Scatter/useScatterFilterMeta';

const {notify} = useNotification();

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
    bandRef.value === null ||
    integrationRef.value === null ||
    groupedFilenamesRef.value === null ||
    groupedAttributesRef.value === null ||
    groupedTimestampsRef.value === null ||
    groupedFeaturesRef.value === null ||
    groupedMetasRef.value === null ||
    datasetRef.value === null ||
    pointsFilteredByMetaRef.value === null ||
    pointsFilteredByTimeRef.value === null ||
    metaPropertiesRef.value === null
  ) {
    return;
  }

  notify('info', 'Export', 'Generating CSV from collected points.');

  loadingRef.value = true;

  const [, slicesPerGroup] = groupedAttributesRef.value;

  const payload: ExportData[] = [];

  for (
    let pointIndex = 0;
    pointIndex < datasetRef.value.points.length;
    ++pointIndex
  ) {
    const isFilteredByMeta = pointsFilteredByMetaRef.value[pointIndex];
    const isFilteredByTime = pointsFilteredByTimeRef.value[pointIndex];

    if (isFilteredByMeta || isFilteredByTime) {
      continue;
    }

    const fileIndex = Math.floor(pointIndex / slicesPerGroup);
    const groupIndex = pointIndex % slicesPerGroup;
    const filename = groupedFilenamesRef.value[pointIndex];
    const features = groupedFeaturesRef.value[pointIndex];
    const timestamp = groupedTimestampsRef.value[pointIndex];
    const groupedMetas = groupedMetasRef.value[pointIndex];

    const points = datasetRef.value.points;
    const reducedFeatures = points[pointIndex];

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
  const csvFilename = `SSE_${bandRef.value}_${integrationRef.value}.csv`;
  triggerCSVDownload(csv, csvFilename);
  loadingRef.value = false;
}
</script>

<template>
  <AppButton
    :disabled="!isDatasetReadyRef.value"
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
