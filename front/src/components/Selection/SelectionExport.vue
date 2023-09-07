<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import {Csv} from 'src/common/Csv';
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

  const csv = new Csv();
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

  csv.addColumn('intervalIndex');
  csv.addColumn('timestamp');
  csv.addColumn('site');

  labelsPropertiesRef.value.forEach((metaProperty) => {
    csv.addColumn(`label_${metaProperty}`);
  });

  aggregatedIndicators.forEach(({extractor}) => {
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
    csv.addToCurrentRow(data.timestamp.toString());
    csv.addToCurrentRow(data.site);

    data.aggregatedLabels.forEach((aL) => {
      csv.addToCurrentRow(aL);
    });

    aggregatedIndicators.forEach((aI) => {
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
