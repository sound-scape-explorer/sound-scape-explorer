<script lang="ts" setup>
import {NP, NSelect} from 'naive-ui';
import {computed, ref, watch} from 'vue';
import {convertTimestampToDate} from '../utils/convert-timestamp-to-date';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';

/**
 * State
 */

const min = ref<number>();
const max = ref<number>();

const timestamps = computed(() => {
  const payload: number[] = [];

  if (!UMAPDatasetStore.dataset) {
    return payload;
  }

  UMAPDatasetStore.dataset.metadata.forEach(({timestamp}) => {
    const timestampAsNumber = Number(timestamp);
    if (payload.indexOf(timestampAsNumber) === -1) {
      payload.push(timestampAsNumber);
    }
  });

  min.value = payload[0];
  max.value = payload[payload.length - 1];

  return payload;
});

const options = computed(() => {
  return timestamps.value.map((timestamp) => ({
    label: convertTimestampToDate(Number(timestamp) * 1000),
    value: timestamp,
  }));
});

/**
 * Handlers
 */

function updateStore() {
  UMAPTimeRangeStore.range = [min.value, max.value];
}

function handleMinUpdate(nextMin: number) {
  min.value = nextMin;
  updateStore();
}

function handleMaxUpdate(nextMax: number) {
  max.value = nextMax;
  updateStore();
}

/**
 * Lifecycles
 */

watch(UMAPDatasetStore, () => {
  updateStore();
});
</script>

<template>
  <n-p class="range-container">
    <div class="container">
      <n-select
          v-model:value="min"
          :default-value="min"
          :filterable="true"
          :on-update:value="handleMinUpdate"
          :options="options"
          placeholder="Start date..."
      />
      <n-select
          v-model:value="max"
          :default-value="max"
          :filterable="true"
          :on-update:value="handleMaxUpdate"
          :options="options"
          placeholder="End date..."
      />
    </div>
  </n-p>
</template>

<style lang="scss" scoped>
.range-container {
  display: grid;
  gap: 1rem;
}

.container {
  display: flex;
  gap: 1rem;
}
</style>
