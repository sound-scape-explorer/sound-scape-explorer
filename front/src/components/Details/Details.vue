<script lang="ts" setup="">
import {asyncComputed} from '@vueuse/core';
import dayjs from 'dayjs';
import {NGi, NGrid, NTag} from 'naive-ui';
import {computed, unref, watch} from 'vue';
import type {Volume} from '../../hooks/useStorage';
import {useStorage} from '../../hooks/useStorage';
import type {ScatterMetadata} from '../../utils/generate-scatter-dataset';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import {scatterDatasetStore} from '../Scatter/scatterDatasetStore';
import {scatterHoverStore, scatterSelectedStore} from '../Scatter/scatterStore';
import {selectionStore} from '../Selection/selectionStore';
import {fileIndexStore, fileNameStore, fileTimestampStore, groupIndexStore} from './detailsStore';

const {
  getFile,
  getStorageMetas,
  getIndicators,
  getBands,
  timezoneRef,
} = await useStorage();

/**
 * State
 */

const bands = await getBands();
const timezone = timezoneRef.value;

const frequencies = computed(() => {
  if (!selectionStore.band) {
    return;
  }

  const min = bands[selectionStore.band][0];
  const max = bands[selectionStore.band][1];

  return {
    min: min,
    max: max,
  };
});

const metaProperties = asyncComputed<string[]>(async () => {
  if (!selectionStore.band || !selectionStore.integration) {
    return;
  }

  const m = await getStorageMetas(selectionStore.band, selectionStore.integration);
  return Object.keys(m);
});

const selectedPoint = asyncComputed(async () => {
  if (scatterSelectedStore.index === null) {
    return;
  }

  return getPointFromIndex(scatterSelectedStore.index);
});

const indicators = asyncComputed<Volume[]>(async () => {
  if (!selectionStore.band || !selectionStore.integration) {
    return;
  }

  return await getIndicators(selectionStore.band, selectionStore.integration);
});

/**
 * Handlers
 */

function getPointFromIndex(point: number): ScatterMetadata {
  const metadata = unref(scatterDatasetStore.dataset?.metadata);
  return metadata?.[point] as ScatterMetadata;
}

/**
 * Lifecycles
 */

watch(scatterSelectedStore, async () => {
  if (scatterSelectedStore.index === null) {
    fileNameStore.path = null;
    return;
  }

  const metadata = scatterDatasetStore?.dataset?.metadata as ScatterMetadata[];
  const fileIndex = metadata[scatterSelectedStore.index].fileIndex;
  const groupIndex = metadata[scatterSelectedStore.index].groupIndex;
  const timestamp = metadata[scatterSelectedStore.index].timestamp;

  fileIndexStore.value = fileIndex;
  groupIndexStore.value = groupIndex;
  fileNameStore.path = await getFile(fileIndex);
  fileTimestampStore.value = timestamp;
});
</script>

<template>
  <AppDraggable draggable-key="details">
    <div class="hover container">
      <div class="title">Hover point index</div>
      <span class="hover index">{{ scatterHoverStore.index ?? 'none' }}</span>
    </div>

    <hr />

    <div class="file container">
      <div class="title">Selected point index</div>
      <span class="file index">{{ scatterSelectedStore.index ?? 'none' }}</span>
    </div>

    <div class="file container">
      <div class="title">Selected file index</div>
      <span class="file index">{{ fileIndexStore.value ?? 'none' }}</span>
    </div>

    <div class="file container">
      <div class="title">Selected group index</div>
      <span class="file index">{{ groupIndexStore.value ?? 'none' }}</span>
    </div>

    <div class="file-details">
      <span class="src">{{ fileNameStore.path }}</span>
      <span v-if="selectionStore.band">
        {{ frequencies?.min }} - {{ frequencies?.max }} Hz
      </span>
      <span>{{ dayjs(fileTimestampStore.value).tz(timezone) }}</span>
      <span>{{ selectionStore.integration }}</span>
    </div>

    <div v-if="scatterSelectedStore.index" class="file container details">
      <span />
      <n-grid :cols="2" class="grid" x-gap="12">
        <!--suppress JSUnusedLocalSymbols -->
        <n-gi v-for="(_, index) in metaProperties">
          <n-tag
            :bordered="false"
            class="tag"
            size="small"
          >
            {{ metaProperties[index] }}
          </n-tag>

          {{ selectedPoint?.metaValues[index] }}
        </n-gi>
      </n-grid>

      <div class="title">Indicators</div>

      <n-grid :cols="2" class="grid">
        <n-gi v-for="indicator in indicators">
          <n-tag
            :bordered="false"
            class="tag"
            size="small"
          >
            {{ indicator.name }}
          </n-tag>

          {{ indicator.values[0] }}
        </n-gi>
      </n-grid>
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.index {
  font-style: italic;
}

.container {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.title {
  font-weight: bold;
}

.file.container.details {
  flex-direction: column;
  gap: 2px;

  div {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }
}

.meta.container {
  display: grid;
  flex-direction: column;
}

.file-details {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr 1fr;
  gap: 0 0.5rem;
}

.src {
  overflow: hidden;
}
</style>
