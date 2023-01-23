<script lang="ts" setup>
import {PauseOutline, PlayOutline, PlaySkipBackOutline, PlaySkipForwardOutline} from '@vicons/ionicons5';
import dayjs, {Dayjs} from 'dayjs';
import {NButton, NButtonGroup, NInputNumber, NSwitch, NTooltip} from 'naive-ui';
import {computed, ComputedRef, ref, watch} from 'vue';
import {useConfig} from '../composables/useConfig';
import {useEventListener} from '../composables/useEventListener';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {DATE_FORMAT} from '../constants';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import Button from './Button.vue';

const {isDisabled} = useUMAPStatus();
const {config} = await useConfig();

const uiDisabled: ComputedRef<boolean> = computed(() => isDisabled.value || UMAPTimeRangeStore.isAllSelected);

const dateStart: ComputedRef<Dayjs> = computed(() => {
  let start = UMAPTimeRangeStore.value ?? 0;

  if (UMAPTimeRangeStore.isAllSelected) {
    start = UMAPTimeRangeStore.min ?? 0;
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
</script>

<template>
  <div>
    <div class="container">
      <n-switch
          v-model:value="UMAPTimeRangeStore.isAllSelected"
          :disabled="isDisabled"
          class="toggle"
      >
        <template #checked>
          all
        </template>
      </n-switch>

      <n-button-group size="small">
        <n-button
            v-for="button in durations"
            :disabled="uiDisabled"
            @click="setWindowDuration(button.duration)"
        >
          {{ button.name }}
        </n-button>
      </n-button-group>

      <div class="input">
        <n-input-number
            v-model:value="UMAPTimeRangeStore.duration"
            :disabled="UMAPTimeRangeStore.isAllSelected"
            class="input"
            size="small"
        />
      </div>

      <div class="button">
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
            <span class="bold">P</span> – Skip backward
          </span>
        </n-tooltip>
      </div>

      <div class="button">
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

      <div class="button">
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
            <span class="bold">N</span> – Skip forward
          </span>
        </n-tooltip>
      </div>

      <div class="dates">
        <span>{{ dateStart.format(DATE_FORMAT) }}</span>
        <span>{{ dateEnd.format(DATE_FORMAT) }}</span>
      </div>
      <div class="timezone">
        {{ timezoneName }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto 1fr auto;
  justify-content: center;
  align-items: center;

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
  font-style: italic;
}

.input {
  width: 8rem;
}

.dates {
  display: flex;
  flex-direction: column;

  font-size: 0.8rem;
}

.button {
  width: 2.3rem;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
