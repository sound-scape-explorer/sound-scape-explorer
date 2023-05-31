<script lang="ts" setup>
import {
  PauseOutline,
  PlayOutline,
  PlaySkipBackOutline,
  PlaySkipForwardOutline,
} from '@vicons/ionicons5';
import {onKeyPressed} from '@vueuse/core';
import type {Dayjs} from 'dayjs';
import {
  NButton,
  NButtonGroup,
  NDatePicker,
  NInputNumber,
  NSwitch,
  NTooltip,
  NIcon,
} from 'naive-ui';
import type {ComputedRef} from 'vue';
import {computed, ref, watch} from 'vue';
import AppButton from '../AppButton/AppButton.vue';
import {timeStore} from './timeStore';
import {settingsRef} from 'src/hooks/useStorageSettings';
import {useDate} from 'src/hooks/useDate';
import {isDatasetReadyRef} from '../Scatter/useScatterDataset';
import {useScatterFilterTime} from '../Scatter/useScatterFilterTime';

const {convertTimestampToDate} = useDate();

const uiDisabled: ComputedRef<boolean> = computed(
  () => !isDatasetReadyRef.value || timeStore.isAllSelected,
);

const dateStartRef = computed<Dayjs | null>(() => {
  if (settingsRef.value === null) {
    return null;
  }

  let start = timeStore.value;

  if (timeStore.isAllSelected) {
    start = timeStore.min;
  }

  if (settingsRef.value.timezone !== '') {
    return convertTimestampToDate(start * 1000, settingsRef.value.timezone);
  }

  return convertTimestampToDate(start * 1000);
});

interface Duration {
  name: string;
  duration: number;
}

const durations: Duration[] = [
  {name: '10min', duration: 600},
  {name: '1h', duration: 3600},
  {name: '24h', duration: 3600 * 24},
  {name: '1w', duration: 3600 * 24 * 7},
];

const isPlaying = ref<boolean>(false);

function setWindowDuration(duration: number) {
  timeStore.duration = duration;
}

function togglePlaying() {
  isPlaying.value = !isPlaying.value;
}

let interval: null | number = null;

function skipTimeForward() {
  timeStore.value += timeStore.duration;
}

function skipTimeBackward() {
  timeStore.value -= timeStore.duration;
}

function start() {
  if (interval) {
    return;
  }

  interval = setInterval(skipTimeForward, 500);
}

function stop() {
  if (interval === null) {
    return;
  }

  clearInterval(interval);
  interval = null;
}

watch(isPlaying, () => {
  if (isPlaying.value) {
    start();
    return;
  }

  stop();
});

const timeOffsetRef = computed<number | null>(() => {
  if (settingsRef.value === null || dateStartRef.value === null) {
    return null;
  }

  if (settingsRef.value.timezone === '') {
    return 0;
  }

  const getZoneValue = (zone: string) => Number(zone.replace('GMT', ''));

  // dayjs.tz.setDefault('Pacific/Tahiti');
  // const guessOffset = dayjs(0).tz(dayjs.tz.guess()).offsetName('short');
  // const targetOffset = dateStartRef.value.offsetName('short');
  const guessOffset = undefined;
  const targetOffset = undefined;

  if (
    typeof guessOffset === 'undefined' ||
    typeof targetOffset === 'undefined'
  ) {
    return 0;
  }

  const offset = getZoneValue(targetOffset) - getZoneValue(guessOffset);

  return offset * 60 * 60 * 1000;
});

function handleDateStartUpdate(t: number) {
  timeStore.value = t / 1000;
}

function transposeDateToZone(date: Dayjs | null) {
  if (date === null) {
    return;
  }

  return date.unix() * 1000 + (timeOffsetRef.value ?? 0);
}

const {filterByTime} = useScatterFilterTime();
watch(timeStore, () => {
  filterByTime();
});

onKeyPressed('n', () => skipTimeForward());
onKeyPressed('p', () => skipTimeBackward());
onKeyPressed(' ', () => togglePlaying());
</script>

<template>
  <div class="container">
    <div class="grid">
      <n-switch
        v-model:value="timeStore.isAllSelected"
        :disabled="!isDatasetReadyRef.value"
        class="toggle"
      >
        <template #checked> all</template>
      </n-switch>

      <n-button-group>
        <n-button
          v-for="button in durations"
          :disabled="uiDisabled"
          size="tiny"
          @click="setWindowDuration(button.duration)"
        >
          {{ button.name }}
        </n-button>
      </n-button-group>

      <n-input-number
        v-model:value="timeStore.duration"
        :disabled="timeStore.isAllSelected"
        class="input"
        size="tiny"
      />

      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            :disabled="uiDisabled"
            @click="skipTimeBackward"
            size="tiny"
          >
            <template #icon>
              <n-icon>
                <play-skip-back-outline />
              </n-icon>
            </template>
          </n-button>
        </template>
        <span class="button-tooltip">
          Backward [<span class="bold">p</span>]
        </span>
      </n-tooltip>

      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            :disabled="uiDisabled"
            @click="togglePlaying"
            size="tiny"
          >
            <template #icon>
              <n-icon v-show="!isPlaying">
                <play-outline />
              </n-icon>
              <n-icon v-show="isPlaying">
                <pause-outline />
              </n-icon>
            </template>
          </n-button>
        </template>
        <span class="button-tooltip">
          Play / Pause [<span class="bold">space</span>]
        </span>
      </n-tooltip>

      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            :disabled="uiDisabled"
            @click="skipTimeForward"
            size="tiny"
          >
            <template #icon>
              <n-icon>
                <play-skip-forward-outline />
              </n-icon>
            </template>
          </n-button>
        </template>
        <span class="button-tooltip">
          Forward [<span class="bold">n</span>]
        </span>
      </n-tooltip>

      <div class="date-picker">
        <n-tooltip
          placement="bottom"
          trigger="hover"
        >
          <template #trigger>
            <n-date-picker
              :disabled="uiDisabled"
              :on-update:value="handleDateStartUpdate"
              :value="transposeDateToZone(dateStartRef)"
              size="small"
              type="datetime"
            />
          </template>
          <span class="button-tooltip">
            <span class="bold">Date</span> start
          </span>
        </n-tooltip>
      </div>

      <span class="date"> to LOCALIZED_DATE_REF </span>

      <div class="timezone">
        {{ settingsRef.value?.timezone }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;

  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: auto auto auto repeat(3, 1.5rem) auto repeat(3, 1fr) auto;
  align-items: center;
  justify-items: center;

  gap: 0.8rem;

  user-select: none;
}

.toggle {
  justify-content: flex-start;
}

.button-tooltip {
  font-size: 0.8rem;
}

.bold {
  font-weight: bold;
}

.timezone {
  display: flex;
  justify-content: center;
  align-items: center;

  font-style: italic;
  font-size: 0.8rem;

  transform: translateY(1px);
}

.date {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;

  font-size: 0.8rem;

  transform: translateY(1px);

  @media screen and (min-width: 1000px) and (max-width: 1100px) {
    font-size: 0.6rem;
    white-space: nowrap;
  }

  @media screen and (min-width: 800px) and (max-width: 1000px) {
    font-size: 0.5rem;
    white-space: nowrap;
  }
  @media screen and (max-width: 800px) {
    font-size: 0.4rem;
    white-space: nowrap;
  }
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
