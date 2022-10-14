<script lang="ts" setup>
import {ref} from 'vue';
import {useConfig} from '../composables/useConfig';
import Title from '../components/Title.vue';
import SelectionTable2d from '../components/SelectionTable.vue';
import {SERVER_HOSTNAME} from '../constants';
import SelectionImage from '../components/SelectionImage.vue';
import {selectionStore} from '../store/selection.store';
import UMAPScatterPlotGL from '../components/UMAPScatterPlotGL.vue';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {getScatterGlDataset} from '../utils/get-scatter-gl-dataset';
import UMAPScatterPlotTimeRange from '../components/UMAPScatterPlotTimeRange.vue';

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
  image.value = `${SERVER_HOSTNAME}/generated/umap/${intervalLabel}/${band}.png`;
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
    const request = await fetch(`${SERVER_HOSTNAME}/generated/umap/${intervalLabel}/${band}.json`);
    const data = await request.json();

    if (data === null) {
      return;
    }

    UMAPDatasetStore.dataset = getScatterGlDataset(data);
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
  <UMAPScatterPlotTimeRange />
  <SelectionTable2d :callback="handleUpdate" :xs="bands" :ys="intervalLabels" />
  <SelectionImage v-if="image" :source="image" />
</template>
