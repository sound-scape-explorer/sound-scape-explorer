<script lang="ts" setup>
import {PauseOutline, PlayOutline, PlaySkipForwardOutline} from '@vicons/ionicons5';
import dayjs, {Dayjs} from 'dayjs';
import {NButton, NButtonGroup, NIcon, NInputNumber, NSwitch} from 'naive-ui';
import {computed, ComputedRef, ref, watch} from 'vue';
import {useConfig} from '../composables/useConfig';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';

const {isDisabled} = useUMAPStatus();
const {config} = await useConfig();

const dateStart: ComputedRef<Dayjs> = computed(() => dayjs(UMAPTimeRangeStore.value * 1000));
const dateEnd: ComputedRef<Dayjs> = computed(() => {
  return dayjs(UMAPTimeRangeStore.value * 1000 + UMAPTimeRangeStore.duration * 1000);
});

interface Button {
  name: string;
  duration: number;
}

const buttons: Button[] = [
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

function stepPlaying() {
  incrementTime();
}

let interval: null | number = null;

function incrementTime() {
  console.log('tick');
  UMAPTimeRangeStore.value += UMAPTimeRangeStore.duration;
}

function start() {
  if (interval) {
    return;
  }

  interval = setInterval(incrementTime, 500);
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
</script>

<template>
  <div>
    <div class="container">
      <n-switch
          v-model:value="UMAPTimeRangeStore.isAllSelected"
          :disabled="isDisabled"
          class="button"
      >
        <template #checked>
          all
        </template>
      </n-switch>
      <n-button-group size="small">
        <n-button
            v-for="button in buttons"
            :disabled="isDisabled || UMAPTimeRangeStore.isAllSelected"
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
      <div class="play">
        <n-icon v-if="!isDisabled && !isPlaying" class="icon" @click="togglePlaying">
          <play-outline />
        </n-icon>
        <n-icon v-if="!isDisabled && isPlaying" class="icon" @click="togglePlaying">
          <pause-outline />
        </n-icon>
      </div>
      <div class="play">
        <n-icon v-if="!isDisabled" class="icon" @click="stepPlaying">
          <play-skip-forward-outline />
        </n-icon>
      </div>
      <div class="dates">
        {{ dateStart }} — {{ dateEnd }}
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
  grid-template-columns: auto auto auto auto auto 1fr auto;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  user-select: none;
}

.button {
  justify-content: flex-start;
}

.timezone {
  font-style: italic;
}

.input {
  width: 8rem;
}

.dates {
  font-size: 0.8rem;
}

.play {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.6rem;
  height: 1.6rem;

  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 3px;

  &:hover {
    cursor: pointer;
  }

  > i {
    color: rgba(0, 0, 0, 0.6);
  }
}
</style>
