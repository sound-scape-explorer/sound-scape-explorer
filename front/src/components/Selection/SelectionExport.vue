<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import AppButton from '../AppButton/AppButton.vue';
import {datasetRef, isDatasetReadyRef} from '../Scatter/useScatterDataset';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {useScatterFilters} from '../Scatter/useScatterFilters';
import {workerRef} from 'src/hooks/useWorker';
import {fileRef} from 'src/hooks/useFile';
import {bandRef} from 'src/hooks/useBand';
import {integrationRef} from 'src/hooks/useIntegration';
import {useNotification} from '../AppNotification/useNotification';
import {convertArrayToCsv} from 'src/utils/convert-array-to-csv';
import {triggerBrowserDownload} from 'src/utils/trigger-browser-download';

const {shouldBeFiltered} = useScatterFilters();
const {notify} = useNotification();

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
    datasetRef.value === null ||
    metaPropertiesRef.value === null
  ) {
    return;
  }

  const filenames = await workerRef.value.readGroupedFilenames(
    fileRef.value,
    bandRef.value,
    integrationRef.value,
  );

  const groupedTimestamps = await workerRef.value.readGroupedTimestamps(
    fileRef.value,
    bandRef.value,
    integrationRef.value,
  );

  const allGroupedFeatures = await workerRef.value.readGroupedFeatures(
    fileRef.value,
    bandRef.value,
    integrationRef.value,
  );

  const allGroupedMetas = await workerRef.value.readGroupedMetas(
    fileRef.value,
    bandRef.value,
    integrationRef.value,
  );

  const slicesPerGroup = await workerRef.value.getSlicesPerGroup(
    fileRef.value,
    bandRef.value,
    integrationRef.value,
  );

  const payload: ExportData[] = [];

  for (
    let pointIndex = 0;
    pointIndex < datasetRef.value.points.length;
    ++pointIndex
  ) {
    const isFiltered = shouldBeFiltered(pointIndex);

    if (isFiltered) {
      continue;
    }

    const points = datasetRef.value.points;
    const fileIndex = Math.floor(pointIndex / slicesPerGroup);
    const groupIndex = pointIndex % slicesPerGroup;
    const filename = filenames[pointIndex];
    const timestamp = groupedTimestamps[pointIndex];
    const groupedMetas = allGroupedMetas[pointIndex];
    const reducedFeatures = points[pointIndex];
    const groupedFeatures = allGroupedFeatures[pointIndex];

    payload.push({
      pointIndex: pointIndex,
      fileIndex: fileIndex,
      groupIndex: groupIndex,
      filename: filename,
      timestamp: timestamp,
      groupedMetas: groupedMetas,
      reducedFeatures: reducedFeatures,
      groupedFeatures: groupedFeatures,
    });
  }

  notify(
    'info',
    'Explore',
    'Exporting collected points. Selected points will be ignored.',
  );

  let csvFirstRow = '';

  csvFirstRow += 'pointIndex,';
  csvFirstRow += 'fileIndex,';
  csvFirstRow += 'groupIndex,';
  csvFirstRow += 'filename,';
  csvFirstRow += 'timestamp,';

  metaPropertiesRef.value.forEach((metaProperty) => {
    csvFirstRow += `${metaProperty},`;
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
  triggerBrowserDownload(csv, csvFilename);
}
</script>

<template>
  <AppButton
    :disabled="!isDatasetReadyRef.value"
    :handle-click="handleClick"
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
