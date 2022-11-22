<script lang="ts" setup>
import {ref} from 'vue';
import {useConfig} from '../composables/useConfig';
import Title from '../components/Title.vue';
import SelectionTable2d from '../components/SelectionTable.vue';
import {API_ROUTES} from '../constants';
import SelectionImage from '../components/SelectionImage.vue';
import {selectionStore} from '../store/selection.store';
import UMAPScatterPlotGL from '../components/UMAPScatterPlotGL.vue';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {convertToScatterGlDataset} from '../utils/convert-to-scatter-gl-dataset';
import UMAPScatterPlotTimeRange from '../components/UMAPScatterPlotTimeRange.vue';
import UMAPFilters from '../components/UMAPFilters.vue';

const {bands, intervalLabels} = await useConfig();

/**
 * State
 */

const image = ref<string | null>();

/**
 * Handlers
 */

function resetImage() {
  image.value = null;
}

function setImage(band: string, intervalLabel: string) {
  image.value = API_ROUTES.umap({
    interval: intervalLabel,
    band,
    isImage: true,
  });
}

function resetSelection() {
  selectionStore.activeBand = null;
  selectionStore.activeIntervalLabel = null;
}

function setSelection(band: string, intervalLabel: string) {
  selectionStore.activeBand = band;
  selectionStore.activeIntervalLabel = intervalLabel;
}

async function fetchData(band: string, intervalLabel: string) {
  try {
    const endpoint = API_ROUTES.umap({
      interval: intervalLabel,
      band,
    });

    const request = await fetch(endpoint);
    const data = await request.json();

    if (data === null) {
      return;
    }

    UMAPDatasetStore.dataset = convertToScatterGlDataset(data);
  } catch {
    // options.value.series = [];
    UMAPDatasetStore.dataset = null;
  }
}

async function handleUpdate(band: string, intervalLabel: string) {
  if (!band || !intervalLabel) {
    resetSelection();
    resetImage();
    return;
  }

  setSelection(band, intervalLabel);
  setImage(band, intervalLabel);
  await fetchData(band, intervalLabel);
}
</script>

<template>
  <Title text="UMAP" />
  <UMAPScatterPlotGL />
  <UMAPFilters />
  <UMAPScatterPlotTimeRange />
  <SelectionTable2d :callback="handleUpdate" :xs="bands" :ys="intervalLabels" />
  <SelectionImage v-if="image" :source="image" />
</template>
