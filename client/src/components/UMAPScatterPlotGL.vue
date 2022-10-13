<script lang="ts" setup>
import {onMounted, onUnmounted, ref, watch} from 'vue';
import {ScatterGL} from 'scatter-gl';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {replaceSaturationInHslaString} from '../utils/replace-saturation-in-hsla-string';
import {SCATTER_PLOT_DEFAULT_COLOR} from '../constants';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';

/**
 * State
 */

const containerRef = ref<HTMLDivElement | null>(null);
let scatterGL: ScatterGL | null = null;
let isFirstRender = true;

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

const hues = [...new Array(1000)].map((_, i) => Math.floor((255 / 10) * i));

const lightTransparentColorsByLabel = hues.map(
  (hue) => `hsla(${hue}, 100%, 50%, 0.2)`,
);

const heavyTransparentColorsByLabel = hues.map(
  (hue) => `hsla(${hue}, 100%, 50%, 0.75)`,
);

function getColor(index: number): string {
  if (UMAPDatasetStore.dataset === null) {
    return SCATTER_PLOT_DEFAULT_COLOR;
  }

  const labelIndex = UMAPDatasetStore.dataset.metadata[index]['labelIndex'] as number;
  const timestamp = UMAPDatasetStore.dataset.metadata[index]['timestamp'] as number;

  const isWithinRange = timestamp >= UMAPTimeRangeStore.range[0] && timestamp <= UMAPTimeRangeStore.range[1];

  if (!isWithinRange && UMAPTimeRangeStore.isAllSelected === false) {
    return replaceSaturationInHslaString(lightTransparentColorsByLabel[labelIndex], 0);
  }

  return heavyTransparentColorsByLabel[labelIndex];
}

/**
 * Lifecycles
 */

onMounted(() => {
  addListeners();
  initializeScatterGL();

  setInterval(() => {
    render();
  }, 2000);
});

onUnmounted(() => {
  removeListeners();
});

watch(UMAPTimeRangeStore, () => {
  render();
});
</script>

<template>
  <div ref="containerRef" class="container" />
</template>

<style lang="scss" scoped>
.container {
  height: 400px;
}
</style>
