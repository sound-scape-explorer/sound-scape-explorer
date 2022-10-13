<script lang="ts" setup>
import {NCheckbox, NP, NSlider} from 'naive-ui';
import {computed, ref, watch} from 'vue';
import {convertTimestampToDate} from '../utils/convert-timestamp-to-date';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';

/**
 * State
 */

const min = ref();
const max = ref();
const range = ref<number[]>([min.value, max.value]);
const steps = ref({});

const humanReadableDate = computed<string>(() => {
  const start = range.value[0] * 1000;
  const end = range.value[1] * 1000;

  if (!start || !end) {
    return '';
  }

  if (UMAPTimeRangeStore.isAllSelected) {
    return `${convertTimestampToDate(min.value * 1000)} - ${convertTimestampToDate(max.value * 1000)}`;
  }

  return `${convertTimestampToDate(start)} - ${convertTimestampToDate(end)}`;
});

/**
 * Handlers
 */

function updateAllSelected(nextValue: boolean) {
  UMAPTimeRangeStore.isAllSelected = nextValue;
}

function initializeSteps() {
  if (!UMAPDatasetStore.dataset) {
    return;
  }

  const timestamps = UMAPDatasetStore.dataset.metadata.map((metadata) => metadata.timestamp);

  interface Steps {
    [date: string]: number;
  }

  const object: Steps = {};

  timestamps.forEach((timestamp) => {
    if (typeof timestamp !== 'number') {
      return;
    }

    // if timestamp is already in object, then skip. CBA making a Set
    if (typeof object[timestamp] !== 'undefined') {
      return;
    }

    object[timestamp] = timestamp;
  });

  steps.value = object;
  min.value = object[Object.keys(object)[0]];
  max.value = object[Object.keys(object)[Object.keys(object).length - 1]];
  range.value = [min.value, max.value];
  UMAPTimeRangeStore.range = [min.value, max.value];
}

function handleRangeUpdate(nextRange: number[]) {
  const [min, max] = nextRange;

  if (min >= max) {
    return;
  }

  range.value = [min, max];
  UMAPTimeRangeStore.range = [min, max];
}

/**
 * Lifecycles
 */

watch(UMAPDatasetStore, () => {
  initializeSteps();
});
</script>

<template>
  <n-p class="range-container">
    <div>
      <n-checkbox
          v-model:checked="UMAPTimeRangeStore.isAllSelected"
          label="All"
          @update:checked="updateAllSelected"
      />
      <span class="range-display">
        {{ humanReadableDate }}
      </span>
    </div>
    <n-slider
        v-model:value="range"
        :disabled="UMAPTimeRangeStore.isAllSelected"
        :marks="steps"
        :max="max"
        :min="min"
        :on-update:value="handleRangeUpdate"
        :tooltip="false"
        class="test"
        range
        step="mark"
    />
  </n-p>
</template>

<style lang="scss" scoped>
.range-container {
  height: 120px;
}

.range-display {
  font-size: 0.8rem;
  font-style: italic;
}
</style>

<style lang="scss">
.n-slider-mark {
  position: absolute;
  transform: translate3d(-55%, 20px, 0) rotate(-80deg) !important;
  font-size: 0.7rem;
}
</style>
