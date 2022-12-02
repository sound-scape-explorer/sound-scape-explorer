<script lang="ts" setup>
import {onMounted, onUnmounted, ref, watch} from 'vue';
import {ScatterGL} from 'scatter-gl';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {mapRange} from '../utils/map-range';
import {UMAPQueryStore} from '../store/UMAP-query.store';
import {getArraysIntersection} from '../utils/get-arrays-intersection';
import {useColors} from '../composables/useColors';
import {fastTimeInDay} from '../utils/fast-time-in-day';
import {useConfig} from '../composables/useConfig';

/**
 * State
 */

const containerRef = ref<HTMLDivElement | null>(null);
let scatterGL: ScatterGL | null = null;
let isFirstRender = true;

const {colors} = useColors();

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

function isVisibleByTags(index: number): boolean {
  const {tags} = UMAPFiltersStore;

  if (tags.length === 0) {
    return true;
  }

  const {dataset} = UMAPDatasetStore;
  const elementTags = dataset?.metadata[index]['tags'] as string;
  const elementLabel = dataset?.metadata[index]['label'] as string;

  const tagsIntersection = getArraysIntersection([tags, elementTags.split(' ')]);

  if (tagsIntersection.length !== 0) {
    return true;
  }

  // noinspection RedundantIfStatementJS
  if (tags.includes(elementLabel)) {
    return true;
  }

  return false;
}

function isVisibleByTimeRange(index: number): boolean {
  const {end, isAllSelected} = UMAPTimeRangeStore;
  const start = UMAPTimeRangeStore.start[0];

  if (isAllSelected) {
    return true;
  }

  if (start === null || end === null) {
    return true;
  }

  const {dataset} = UMAPDatasetStore;
  const timestamp = Number(dataset?.metadata[index]['timestamp']);

  // noinspection RedundantIfStatementJS
  if (timestamp >= start && timestamp <= end) {
    return true;
  }

  return false;
}

function isVisibleByQuery(index: number): boolean {
  const {matches, query} = UMAPQueryStore;

  if (query === '') {
    return true;
  }

  const {dataset} = UMAPDatasetStore;
  const elementLabel = dataset?.metadata[index]['label'] as string;

  // noinspection RedundantIfStatementJS
  if (matches.includes(elementLabel)) {
    return true;
  }

  return false;
}

function getColor(index: number, selectedIndices: Set<number>, hoverIndex: number | null): string {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dataset = UMAPDatasetStore.dataset!;
  const {colorType} = UMAPFiltersStore;

  const rangedIndex = mapRange(index, 0, dataset.metadata.length, 0, 1);

  const labelIndex = dataset.metadata[index]['labelIndex'] as number;
  const rangedLabelIndex = mapRange(labelIndex, 0, dataset.metadata.length, 0, 1);

  const hoverColor = 'red';
  const filteredColor = 'hsla(0, 0%, 0%, 0.25)';
  const indexColor = colors.value(rangedIndex); // pointIndex
  const labelIndexColor = colors.value(rangedLabelIndex); // labelIndex
  const hourColor = colors.value(timestampsInDay.value[index]); // hour

  const shouldBeFilteredOut = !isVisibleByTags(index) || !isVisibleByTimeRange(index) || !isVisibleByQuery(index);

  if (shouldBeFilteredOut) {
    return filteredColor;
  }

  let color = indexColor;

  if (colorType === 'labelIndex') {
    color = labelIndexColor;
  } else if (colorType === 'pointIndex') {
    color = indexColor;
  } else if (colorType === 'hour') {
    color = hourColor;
  } else if (colorType === 'isDay') {
    color = indexColor; // todo
  }

  if (hoverIndex === index) {
    return hoverColor;
  }

  if (selectedIndices.size === 0) {
    return color.css();
  }

  const isSelected = selectedIndices.has(index);

  if (isSelected) {
    return color.css();
  }

  return filteredColor;
}

async function render() {
  if (
    scatterGL === null
      || UMAPDatasetStore.dataset === null
  ) {
    return;
  }

  await setTimestampsInDay();

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

function getTimestamps() {
  const {dataset} = UMAPDatasetStore;

  if (!dataset) {
    throw new Error('Dataset is not defined');
  }

  const allTimestamps = dataset.metadata.map((entry) => {
    return entry.timestamp;
  });

  return allTimestamps;

  // return unique timestamps
  // return [...new Set(allTimestamps)];
}

const timestampsInDay = ref<number[]>([]);

async function setTimestampsInDay() {
  const config = await useConfig();
  const locale = config.config?.variables.display_locale;

  if (!locale) {
    throw new Error('`display_locale` in configuration file is not defined');
  }

  const timestamps = getTimestamps();
  const humanTimestampsInDay = timestamps.map(fastTimeInDay(locale)); // from 0 to 24

  timestampsInDay.value = humanTimestampsInDay.map((humanTimestampInDay) => mapRange(humanTimestampInDay, 0, 24, 0, 1));
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

watch([UMAPTimeRangeStore, UMAPFiltersStore, UMAPQueryStore], async () => {
  await render();
});
</script>

<template>
  <div ref="containerRef" class="container"/>
</template>

<style lang="scss" scoped>
.container {
  height: 400px;
  position: relative;
}
</style>
