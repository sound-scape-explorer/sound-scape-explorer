<script lang="ts" setup>
import {PauseOutline, PlayOutline, PlaySkipBackOutline, PlaySkipForwardOutline} from '@vicons/ionicons5';
import dayjs, {Dayjs} from 'dayjs';
import {NButton, NButtonGroup, NInputNumber, NSwitch} from 'naive-ui';
import {computed, ComputedRef, onMounted, onUnmounted, ref, watch} from 'vue';
import {useConfig} from '../composables/useConfig';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {UMAP_TIME_RANGE_INCREMENT_SHORTCUT} from '../constants';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import Button from './Button.vue';

const {isDisabled} = useUMAPStatus();
const {config} = await useConfig();

const uiDisabled: ComputedRef<boolean> = computed(() => isDisabled.value || UMAPTimeRangeStore.isAllSelected);

const dateStart: ComputedRef<Dayjs> = computed(() => {
  if (UMAPTimeRangeStore.isAllSelected) {
    return dayjs((UMAPTimeRangeStore.min ?? 1) * 1000);
  }

  const start = (UMAPTimeRangeStore.value ?? 1) * 1000;

  return dayjs(start);
});

const dateEnd: ComputedRef<Dayjs> = computed(() => {
  if (UMAPTimeRangeStore.isAllSelected) {
    return dayjs((UMAPTimeRangeStore.max ?? 1) * 1000);
  }

  const start = (UMAPTimeRangeStore.value ?? 1) * 1000;
  const duration = UMAPTimeRangeStore.duration * 1000;

  return dayjs(start + duration);
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

const timezone: ComputedRef<string> = computed(() => {
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

  if (e.key !== UMAP_TIME_RANGE_INCREMENT_SHORTCUT) {
    return;
  }

  skipTimeForward();
}

onMounted(() => {
  document.addEventListener('keypress', handleKeyboard);
});

onUnmounted(() => {
  document.removeEventListener('keypress', handleKeyboard);
});
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
        <Button
            :disabled="uiDisabled"
            :handle-click="skipTimeBackward"
            class="flex"
        >
          <play-skip-back-outline />
        </Button>
      </div>

      <div class="button">
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

      <div class="button">
        <Button
            :disabled="uiDisabled"
            :handle-click="skipTimeForward"
            class="flex"
        >
          <play-skip-forward-outline />
        </Button>
      </div>

      <div class="dates">
        <span>{{ dateStart }}</span>
        <span>{{ dateEnd }}</span>
      </div>
      <div class="timezone">
        {{ timezone }}
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
