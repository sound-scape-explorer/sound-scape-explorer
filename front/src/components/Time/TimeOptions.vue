<script lang="ts" setup>
import {
  PauseOutline,
  PlayOutline,
  PlaySkipBackOutline,
  PlaySkipForwardOutline,
} from '@vicons/ionicons5';
import {onKeyPressed} from '@vueuse/core';
import dayjs, {Dayjs} from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
  NButton,
  NButtonGroup,
  NDatePicker,
  NInputNumber,
  NSwitch,
  NTooltip,
} from 'naive-ui';
import type {ComputedRef} from 'vue';
import {computed, ref, watch} from 'vue';
import {DATE_FORMAT} from '../../constants';
import {storage} from '../../storage/storage';
import AppButton from '../AppButton/AppButton.vue';
import {useScatterStatus} from '../Scatter/useScatterStatus';
import {timeStore} from './timeStore';

dayjs.extend(utc);
dayjs.extend(timezone);

const {isDisabled} = useScatterStatus();

const uiDisabled: ComputedRef<boolean> = computed(
  () => isDisabled.value || timeStore.isAllSelected,
);

const dateStartRef: ComputedRef<Dayjs> = computed(() => {
  if (storage.settings === null) {
    return;
  }

  let start = timeStore.value;

  if (timeStore.isAllSelected) {
    start = timeStore.min;
  }

  if (storage.settings.timezone !== '') {
    return dayjs(start * 1000).tz(storage.settings.timezone);
  }

  return dayjs(start * 1000);
});

const dateEndRef: ComputedRef<Dayjs> = computed(() => {
  let time = timeStore.value;
  time += timeStore.duration;

  if (timeStore.isAllSelected) {
    time = timeStore.max;
  }

  return dayjs(time * 1000);
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

const timeOffsetRef = computed(() => {
  if (storage.settings === null) {
    return;
  }

  if (storage.settings.timezone === '') {
    return 0;
  }

  const getZoneValue = (zone: string) => Number(zone.replace('GMT', ''));

  dayjs.tz.setDefault('Pacific/Tahiti');
  const guessOffset = dayjs(0).tz(dayjs.tz.guess()).offsetName('short');
  const targetOffset = dateStartRef.value.offsetName('short');

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

function transposeDateToZone(date: Dayjs) {
  if (typeof date === 'undefined') {
    // TODO: Find why...
    return;
  }

  return date.unix() * 1000 + (timeOffsetRef.value ?? 0);
}

const localizedDateRef = computed(() => {
  return dayjs(transposeDateToZone(dateEndRef.value)).format(DATE_FORMAT);
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
        :disabled="isDisabled"
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

      <div class="transport-button">
        <n-tooltip trigger="hover">
          <template #trigger>
            <AppButton
              :disabled="uiDisabled"
              :handle-click="skipTimeBackward"
              class="flex"
            >
              <play-skip-back-outline />
            </AppButton>
          </template>
          <span class="button-tooltip">
            Backward [<span class="bold">p</span>]
          </span>
        </n-tooltip>
      </div>

      <div class="transport-button">
        <n-tooltip trigger="hover">
          <template #trigger>
            <div>
              <AppButton
                v-show="!isPlaying"
                :disabled="uiDisabled"
                :handle-click="togglePlaying"
                class="flex"
              >
                <play-outline />
              </AppButton>
              <AppButton
                v-show="isPlaying"
                :disabled="uiDisabled"
                :handle-click="togglePlaying"
                class="flex"
              >
                <pause-outline />
              </AppButton>
            </div>
          </template>
          <span class="button-tooltip">
            Play / Pause [<span class="bold">space</span>]
          </span>
        </n-tooltip>
      </div>

      <div class="transport-button">
        <n-tooltip trigger="hover">
          <template #trigger>
            <AppButton
              :disabled="uiDisabled"
              :handle-click="skipTimeForward"
              class="flex"
            >
              <play-skip-forward-outline />
            </AppButton>
          </template>
          <span class="button-tooltip">
            Forward [<span class="bold">n</span>]
          </span>
        </n-tooltip>
      </div>

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

      <span class="date"> to {{ localizedDateRef }} </span>

      <div class="timezone">
        {{ storage.settings?.timezone }}
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
  grid-template-columns: auto auto auto repeat(3, 1rem) auto repeat(3, 1fr) auto;
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

.transport-button {
  width: 1.5rem;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
