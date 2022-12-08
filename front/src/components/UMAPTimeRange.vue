<script lang="ts" setup>
import {NButton, NButtonGroup, NInputNumber, NSlider, NSwitch} from 'naive-ui';
import {computed, ComputedRef, ref} from 'vue';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {UMAP_WINDOW_TIME} from '../constants';
import dayjs from 'dayjs';
import {configStore} from '../store/config.store';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useUMAPStatus} from '../composables/useUMAPStatus';

dayjs.extend(relativeTime);

/**
 * State
 */

const {isDisabled} = useUMAPStatus();

interface Timestamps {
  [date: number]: number;
}

const timestamps: ComputedRef<Timestamps> = computed(() => {
  if (!UMAPDatasetStore.dataset) {
    return [];
  }

  const allTimestamps = UMAPDatasetStore.dataset.metadata.map((metadata) => Number(metadata.timestamp));

  const payload: Timestamps = {};

  allTimestamps.forEach((timestamp) => {
    const doesExist = Object.keys(payload).includes(timestamp.toString());

    if (doesExist) {
      return;
    }

    payload[timestamp] = timestamp;
  });

  return payload;
});

const range = computed(() => {
  const min = Object.values(timestamps.value)[0];
  const max = Object.values(timestamps.value)[Object.keys(timestamps.value).length - 1];

  UMAPTimeRangeStore.start = [min];
  UMAPTimeRangeStore.range = [min, max];

  return [min, max];
});

const duration = computed(() => {
  if (!range.value[0] || !range.value[1]) {
    return;
  }

  const start = dayjs(range.value[0] * 1000);
  const end = dayjs(range.value[1] * 1000);

  return end.from(start, true);
});

const durationValue = computed(() => {
  if (!duration.value) {
    return;
  }

  return Number(duration.value.split(' ')[0]);
});

const durationUnit = computed(() => {
  if (!duration.value) {
    return;
  }

  const durationString = duration.value.toString();

  if (durationString.includes('seconds')) {
    return 's';
  }

  if (durationString.includes('minutes')) {
    return 'm';
  }

  if (durationString.includes('hours')) {
    return 'h';
  }

  if (durationString.includes('days')) {
    return 'd';
  }

  if (durationString.includes('months')) {
    return 'M';
  }

  if (durationString.includes('years')) {
    return 'y';
  }
});

const marks = computed(() => {
  if (!durationValue.value) {
    return;
  }

  const payload: {[t: number]: string;} = {};

  // populate with origin
  const origin = dayjs(Object.values(timestamps.value)[0] * 1000);
  payload[origin.unix()] = `${durationUnit.value}0`;

  // populate with limits
  for (let i = 0; i < durationValue.value; ++i) {
    const next = origin.clone().add(i + 1, durationUnit.value);
    payload[next.unix()] = `${durationUnit.value}${i + 1}`;
  }

  return payload;
});

const tooltip = computed(() => {
  if (!range.value[0] || !range.value[1]) {
    return;
  }

  if (UMAPTimeRangeStore.isAllSelected) {
    return `${dayjs(range.value[0] * 1000).toISOString()} — ${dayjs(range.value[1] * 1000).toISOString()}`;
  }

  if (typeof windowTime.value === 'undefined' || !UMAPTimeRangeStore.start[0]) {
    return;
  }

  return `${dayjs(UMAPTimeRangeStore.start[0] * 1000).toISOString()} — ${windowTime.value?.toISOString()}`;
});

const locale = computed(() => {
  const {config} = configStore;

  return config?.variables.display_locale || '';
});

const windowDuration = ref(UMAP_WINDOW_TIME);

const windowTime = computed(() => {
  if (UMAPTimeRangeStore.start[0] === null) {
    return;
  }

  const time = dayjs(UMAPTimeRangeStore.start[0] * 1000).clone().add(windowDuration.value, 's');
  UMAPTimeRangeStore.end = time.unix();
  return time;
});

/**
 * Handlers
 */

function setWindowDuration(time: number) {
  UMAPTimeRangeStore.isAllSelected = false;
  windowDuration.value = time;
}
</script>

<template>
  <div>
    <div class="container">
      <n-switch v-model:value="UMAPTimeRangeStore.isAllSelected" :disabled="isDisabled" class="button">
        <template #checked>
          all
        </template>
      </n-switch>
      <n-button-group size="small">
        <n-button :disabled="isDisabled" @click="setWindowDuration(600)">10min</n-button>
        <n-button :disabled="isDisabled" @click="setWindowDuration(3600)">1h</n-button>
      </n-button-group>
      <div class="input">
        <n-input-number
            v-model:value="windowDuration"
            :disabled="UMAPTimeRangeStore.isAllSelected"
            class="input"
        />
      </div>
      <div class="tooltips">
        <span>
          {{ tooltip }}
        </span>
        <span class="locale">
          {{ locale }}
        </span>
      </div>
    </div>

    <n-slider
        v-model:value="UMAPTimeRangeStore.start"
        :disabled="UMAPTimeRangeStore.isAllSelected"
        :marks="marks"
        :max="range[1]"
        :min="range[0]"
        :step="1"
        :tooltip="false"
        range
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.button {
  width: 5rem;
}

.tooltips {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.locale {
  font-style: italic;
}

.input {
  width: 8rem;
}
</style>
