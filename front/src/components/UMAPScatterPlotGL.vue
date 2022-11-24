<script lang="ts" setup>
import {onMounted, onUnmounted, ref, watch} from 'vue';
import {ScatterGL} from 'scatter-gl';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import chroma from 'chroma-js';
import {mapRange} from '../utils/map-range';

/**
 * State
 */

const containerRef = ref<HTMLDivElement | null>(null);
let scatterGL: ScatterGL | null = null;
let isFirstRender = true;

const colors = chroma.scale('Spectral').mode('hsl');

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

function getHSLString(values: number[], isLightOpacity = false) {
  let opacityValue = 1; // previously 0.75

  if (isLightOpacity) {
    opacityValue = 0.25;
  }

  const hue = Math.floor(values[0]);
  const saturation = Math.round(values[1] * 100);
  const lightness = Math.round(values[2] * 100);

  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacityValue})`;
}

function getColor(index: number, selectedIndices: Set<number>, hoverIndex: number | null): string {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dataset = UMAPDatasetStore.dataset!;
  const {tags: storeTags, colorType} = UMAPFiltersStore;
  const {start: rangeStartEncapsulated, end: rangeEnd, isAllSelected: rangeAll} = UMAPTimeRangeStore;
  const rangeStart = rangeStartEncapsulated[0];

  const tags = dataset.metadata[index]['tags'] as string;
  const label = dataset.metadata[index]['label'] as string;
  const timestamp = Number(dataset.metadata[index]['timestamp']);

  const rangedIndex = mapRange(index, 0, dataset.metadata.length, 0, 1);

  const labelIndex = dataset.metadata[index]['labelIndex'] as number;
  const rangedLabelIndex = mapRange(labelIndex, 0, dataset.metadata.length, 0, 1);

  const hoverColor = 'red';
  const filteredColor = 'hsla(0, 0%, 0%, 0.25)';
  const indexColor = colors(rangedIndex).hsl(); // pointIndex
  const labelIndexColor = colors(rangedLabelIndex).hsl(); // labelIndex

  let shouldBeFilteredOut = false;

  // Filter
  if (storeTags !== null) {
    // filter by storeTags
    if (storeTags.startsWith('@') && tags.includes(storeTags)) {
      // filter by storeTags
      shouldBeFilteredOut = true;
    } else if (!storeTags.startsWith('@') && label.includes(tags)) {
      // filter by sites
      shouldBeFilteredOut = true;
    }
  }

  // Time Range
  if (!rangeAll && rangeStart !== null && rangeEnd !== null) {
    if (!(timestamp >= rangeStart && timestamp <= rangeEnd)) {
      shouldBeFilteredOut = true;
    }
  }

  if (shouldBeFilteredOut) {
    return filteredColor;
  }

  let color;

  if (colorType === 'labelIndex') {
    color = labelIndexColor;
  } else if (colorType === 'pointIndex') {
    color = indexColor;
  } else if (colorType === 'hour') {
    color = indexColor; // todo
  } else if (colorType === 'isDay') {
    color = indexColor; // todo
  } else {
    color = indexColor;
  }

  if (hoverIndex === index) {
    return hoverColor;
  }

  if (selectedIndices.size === 0) {
    return getHSLString(color);
  }

  const isSelected = selectedIndices.has(index);

  if (isSelected) {
    return getHSLString(color);
  }

  return getHSLString(color, true);
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
