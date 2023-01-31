<script lang="ts" setup>
import {PauseOutline, PlayOutline, PlaySkipBackOutline, PlaySkipForwardOutline} from '@vicons/ionicons5';
import dayjs, {Dayjs} from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {NButton, NButtonGroup, NDatePicker, NInputNumber, NSwitch, NTooltip} from 'naive-ui';
import {computed, ComputedRef, ref, watch} from 'vue';
import {useConfig} from '../composables/useConfig';
import {useEventListener} from '../composables/useEventListener';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {DATE_FORMAT} from '../constants';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import Button from './Button.vue';

dayjs.extend(utc);
dayjs.extend(timezone);

const {isDisabled} = useUMAPStatus();
const {config} = await useConfig();

const uiDisabled: ComputedRef<boolean> = computed(() => isDisabled.value || UMAPTimeRangeStore.isAllSelected);

const dateStart: ComputedRef<Dayjs> = computed(() => {
  let start = UMAPTimeRangeStore.value ?? 0;

  if (UMAPTimeRangeStore.isAllSelected) {
    start = UMAPTimeRangeStore.min ?? 0;
  }

  if (timezoneName.value !== '') {
    return dayjs(start * 1000).tz(timezoneName.value);
  }

  return dayjs(start * 1000);
});

const dateEnd: ComputedRef<Dayjs> = computed(() => {
  let time = UMAPTimeRangeStore.value ?? 0;
  time += UMAPTimeRangeStore.duration;

  if (UMAPTimeRangeStore.isAllSelected) {
    time = UMAPTimeRangeStore.max ?? 0;
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

const timezoneName: ComputedRef<string> = computed(() => {
  return config?.variables.display_locale ?? '';
});

const isPlaying = ref<boolean>(false);

function setWindowDuration(duration: number) {
  UMAPTimeRangeStore.duration = duration;
}

function togglePlaying() {
  isPlaying.value = !isPlaying.value;
}

let interval: null | number = null;

function skipTimeForward() {
  if (!UMAPTimeRangeStore.value) {
    return;
  }

  UMAPTimeRangeStore.value += UMAPTimeRangeStore.duration;
}

function skipTimeBackward() {
  if (!UMAPTimeRangeStore.value) {
    return;
  }

  UMAPTimeRangeStore.value -= UMAPTimeRangeStore.duration;
}

function start() {
  if (interval) {
    return;
  }

  interval = setInterval(skipTimeForward, 500);
}

function stop() {
  if (!interval) {
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

function handleKeyboard(e: KeyboardEvent) {
  if (UMAPTimeRangeStore.isAllSelected) {
    return;
  }

  switch (e.key) {
    case 'n':
      skipTimeForward();
      break;

    case 'p':
      skipTimeBackward();
      break;

    case ' ':
      togglePlaying();
      break;

    default:
  }
}

useEventListener(document, 'keypress', handleKeyboard);

function handleDateStartUpdate(t: number) {
  UMAPTimeRangeStore.value = t / 1000;
}

const timeOffset: ComputedRef<number> = computed(() => {
  if (timezoneName.value === '') {
    return 0;
  }

  const getZoneValue = (zone: string) => Number(zone.replace('GMT', ''));

  dayjs.tz.setDefault('Pacific/Tahiti');
  const guessOffset = dayjs(0).tz(dayjs.tz.guess()).offsetName('short');
  const targetOffset = dateStart.value.offsetName('short');

  if (!guessOffset || !targetOffset) {
    return 0;
  }

  const offset = getZoneValue(targetOffset) - getZoneValue(guessOffset);

  return offset * 60 * 60 * 1000;
});

function transposeDateToZone(date: Dayjs): number {
  return date.unix() * 1000 + timeOffset.value;
}

function printLocalizedDate(date: Dayjs): string {
  return dayjs(transposeDateToZone(date)).format(DATE_FORMAT);
}
</script>

<template>
  <div class="container">
    <div class="grid">
      <n-switch
          v-model:value="UMAPTimeRangeStore.isAllSelected"
          :disabled="isDisabled"
          class="toggle"
      >
        <template #checked>
          all
        </template>
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
          v-model:value="UMAPTimeRangeStore.duration"
          :disabled="UMAPTimeRangeStore.isAllSelected"
          class="input"
          size="tiny"
      />

      <div class="transport-button">
        <n-tooltip trigger="hover">
          <template #trigger>
            <Button
                :disabled="uiDisabled"
                :handle-click="skipTimeBackward"
                class="flex"
            >
              <play-skip-back-outline />
            </Button>
          </template>
          <span class="button-tooltip">
            <span class="bold">P</span> – Backward
          </span>
        </n-tooltip>
      </div>

      <div class="transport-button">
        <n-tooltip trigger="hover">
          <template #trigger>
            <div>
              <Button
                  v-show="!isPlaying"
                  :disabled="uiDisabled"
                  :handle-click="togglePlaying"
                  class="flex"
              >
                <play-outline />
              </Button>
              <Button
                  v-show="isPlaying"
                  :disabled="uiDisabled"
                  :handle-click="togglePlaying"
                  class="flex"
              >
                <pause-outline />
              </Button>
            </div>
          </template>
          <span class="button-tooltip">
            <span class="bold">Space</span> – Play / Pause
          </span>
        </n-tooltip>
      </div>

      <div class="transport-button">
        <n-tooltip trigger="hover">
          <template #trigger>
            <Button
                :disabled="uiDisabled"
                :handle-click="skipTimeForward"
                class="flex"
            >
              <play-skip-forward-outline />
            </Button>
          </template>
          <span class="button-tooltip">
            <span class="bold">N</span> – Forward
          </span>
        </n-tooltip>
      </div>

      <div class="date-picker">
        <n-tooltip placement="bottom" trigger="hover">
          <template #trigger>
            <n-date-picker
                :disabled="uiDisabled"
                :on-update:value="handleDateStartUpdate"
                :value="transposeDateToZone(dateStart)"
                size="tiny"
                type="datetime"
            />
          </template>
          <span class="button-tooltip">
            <span class="bold">Date</span> start
          </span>
        </n-tooltip>
      </div>

      <span class="date">
        to {{ printLocalizedDate(dateEnd) }}
      </span>

      <div class="timezone">
        {{ timezoneName }}
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
