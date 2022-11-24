<script lang="ts" setup>
import {onMounted, onUnmounted, ref, watch} from 'vue';
import {ScatterGL} from 'scatter-gl';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {replaceSaturationInHslaString} from '../utils/replace-saturation-in-hsla-string';
import {PREGENERATED_HUES_LENGTH, SCATTER_PLOT_DEFAULT_COLOR} from '../constants';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {mapColorRange} from '../utils/map-color-range';

/**
 * State
 */

const containerRef = ref<HTMLDivElement | null>(null);
let scatterGL: ScatterGL | null = null;
let isFirstRender = true;

const hues = [...new Array(PREGENERATED_HUES_LENGTH)].map((_, i) => Math.floor((255 / 10) * i));
const lightTransparentColorsByLabel = hues.map((hue) => `hsla(${hue}, 100%, 50%, 0.2)`);
const heavyTransparentColorsByLabel = hues.map((hue) => `hsla(${hue}, 100%, 50%, 0.75)`);

/**
 * Handlers
 */

function initializeScatterGL() {
  if (containerRef.value === null) {
    throw new Error('containerRef is null');
  }

  scatterGL = new ScatterGL(containerRef.value, {
    orbitControls: {
      zoomSpeed: 1.33,
    },
  });
}

function render() {
  if (
    scatterGL === null
      || UMAPDatasetStore.dataset === null
  ) {
    return;
  }

  scatterGL.updateDataset(UMAPDatasetStore.dataset);
  scatterGL.resize();

  if (isFirstRender) {
    scatterGL.render(UMAPDatasetStore.dataset);
    scatterGL.setPointColorer(getColor);
    isFirstRender = false;
  }
}

function handleResize() {
  if (scatterGL === null) {
    return;
  }

  scatterGL.resize();
}

function addListeners() {
  window.addEventListener('resize', handleResize);
}

function removeListeners() {
  window.removeEventListener('resize', handleResize);
}

function getInactiveColorFromIndex(index: number) {
  const color = lightTransparentColorsByLabel[index];
  return replaceSaturationInHslaString(color, 0);
}

function getActiveColorFromIndex(index: number) {
  return heavyTransparentColorsByLabel[index];
}

function getColor(index: number): string {
  if (UMAPDatasetStore.dataset === null) {
    return SCATTER_PLOT_DEFAULT_COLOR;
  }

  const labelIndex = Number(UMAPDatasetStore.dataset.metadata[index]['labelIndex']);
  const label = UMAPDatasetStore.dataset.metadata[index]['label'] as string;
  const tags = UMAPDatasetStore.dataset.metadata[index]['tags'] as string;
  const timestamp = Number(UMAPDatasetStore.dataset.metadata[index]['timestamp']);

  let colorIndex;

  if (UMAPFiltersStore.colorType === 'labelIndex') {
    colorIndex = labelIndex;
  } else if (UMAPFiltersStore.colorType === 'pointIndex') {
    colorIndex = mapColorRange(index, UMAPDatasetStore.dataset.metadata.length);
  } else if (UMAPFiltersStore.colorType === 'hour') {
    colorIndex = 0;
  } else if (UMAPFiltersStore.colorType === 'isDay') {
    colorIndex = 5;
  }

  if (typeof colorIndex === 'undefined') {
    colorIndex = 0;
  }

  if (UMAPTimeRangeStore.isAllSelected === false) {
    const start = UMAPTimeRangeStore.start[0];
    const end = UMAPTimeRangeStore.end;

    if (start !== null && end !== null) {
      if (!(timestamp >= start && timestamp <= end)) {
        return getInactiveColorFromIndex(colorIndex);
      }
    }
  }

  if (UMAPFiltersStore.tags !== null) {
    // filter by tags
    if (
      UMAPFiltersStore.tags.startsWith('@')
        && tags.indexOf(UMAPFiltersStore.tags) === -1
    ) {
      return getInactiveColorFromIndex(colorIndex);
    }

    // filter by sites
    if (
      !UMAPFiltersStore.tags.startsWith('@')
        && UMAPFiltersStore.tags !== label
    ) {
      return getInactiveColorFromIndex(colorIndex);
    }
  }

  return getActiveColorFromIndex(colorIndex);
}

/**
 * Lifecycles
 */

onMounted(() => {
  addListeners();
  initializeScatterGL();
});

onUnmounted(() => {
  removeListeners();
});

watch([UMAPTimeRangeStore, UMAPFiltersStore], () => {
  render();
});
</script>

<template>
  <div ref="containerRef" class="container" />
</template>

<style lang="scss" scoped>
.container {
  height: 400px;
  position: relative;
}
</style>
