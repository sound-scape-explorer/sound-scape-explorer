<script lang="ts" setup>
import {
  PauseOutline,
  PlayOutline,
  PlaySkipBackOutline,
  PlaySkipForwardOutline,
} from '@vicons/ionicons5';
import type {Dayjs} from 'dayjs';
import {
  NButton,
  NButtonGroup,
  NDatePicker,
  NIcon,
  NSwitch,
  NTooltip,
} from 'naive-ui';
import AppInput from 'src/app/input/app-input.vue';
import {KeyboardShortcut} from 'src/common/keyboard-shortcuts';
import {useScatterFilterTime} from 'src/components/scatter/scatter-filter-time';
import {useScatterLoading} from 'src/components/scatter/scatter-loading';
import {useDate} from 'src/composables/date';
import {useKeyboard} from 'src/composables/keyboard';
import {useRefProvide} from 'src/composables/ref-provide';
import {useStorageSettings} from 'src/composables/storage-settings';
import {useDraggableTime} from 'src/draggables/time/draggable-time';
import {computed, type ComputedRef, ref, watch} from 'vue';

const {settings} = useStorageSettings();
const {convertTimestampToDate, convertTimestampToIsoDate} = useDate();
const {filterByTime} = useScatterFilterTime();
const {isLoading} = useScatterLoading();
const {duration, current, isAllSelected, min} = useDraggableTime();
useRefProvide('time/duration', duration);

// todo: refactor this gigantic file

const uiDisabled: ComputedRef<boolean> = computed(
  () => isLoading.value || isAllSelected.value,
);

const dateStartRef = computed<Dayjs>(() => {
  let t = current.value;

  if (isAllSelected.value) {
    t = min.value;
  }

  return convertTimestampToDate(t * 1000);
});

const dateEndRef = computed<string>(() => {
  const endDate = dateStartRef.value.unix() * 1000 + duration.value * 1000;
  return convertTimestampToIsoDate(endDate);
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
let interval: null | number = null;

const setWindowDuration = (newDuration: number) => {
  duration.value = newDuration;
  filterByTime();
};

const blurButton = (event?: MouseEvent) => {
  if (typeof event === 'undefined') {
    return;
  }

  const button = event.target as HTMLButtonElement;
  button.blur();
};

const togglePlaying = (event?: MouseEvent) => {
  if (isAllSelected.value) {
    return;
  }

  isPlaying.value = !isPlaying.value;
  filterByTime();
  blurButton(event);
};

const skipTimeForward = (event?: MouseEvent) => {
  current.value += duration.value;
  filterByTime();
  blurButton(event);
};

const skipTimeBackward = (event?: MouseEvent) => {
  current.value -= duration.value;
  filterByTime();
  blurButton(event);
};

const start = () => {
  if (interval) {
    return;
  }

  interval = setInterval(skipTimeForward, 500);
};

const stop = () => {
  if (interval === null) {
    return;
  }

  clearInterval(interval);
  interval = null;
};

watch(isPlaying, () => {
  if (isPlaying.value) {
    start();
    return;
  }

  stop();
});

const handleDateStartUpdate = (t: number) => {
  current.value = t / 1000;
};

const {registerKey} = useKeyboard();
registerKey(KeyboardShortcut.timeForward, () => skipTimeForward());
registerKey(KeyboardShortcut.timeBackward, () => skipTimeBackward());
registerKey(KeyboardShortcut.timePlayPause, () => togglePlaying());
</script>

<template>
  <div class="container">
    <div class="grid">
      <NSwitch
        v-model:value="isAllSelected"
        :disabled="isLoading"
        class="toggle"
      >
        <template #checked> all</template>
      </NSwitch>

      <NButtonGroup>
        <NButton
          v-for="button in durations"
          :disabled="uiDisabled"
          size="tiny"
          @click="setWindowDuration(button.duration)"
        >
          {{ button.name }}
        </NButton>
      </NButtonGroup>

      <AppInput
        :disabled="isAllSelected"
        align="left"
        injection-key="time/duration"
        type="number"
      />

      <NTooltip trigger="hover">
        <!--suppress VueUnrecognizedSlot -->
        <template #trigger>
          <NButton
            :disabled="uiDisabled"
            size="tiny"
            @click="skipTimeBackward"
          >
            <template #icon>
              <NIcon>
                <PlaySkipBackOutline />
              </NIcon>
            </template>
          </NButton>
        </template>
        <span class="button-tooltip">
          Backward [<span class="bold">p</span>]
        </span>
      </NTooltip>

      <NTooltip trigger="hover">
        <!--suppress VueUnrecognizedSlot -->
        <template #trigger>
          <NButton
            :disabled="uiDisabled"
            size="tiny"
            @click="togglePlaying"
          >
            <template #icon>
              <NIcon v-show="!isPlaying">
                <PlayOutline />
              </NIcon>
              <NIcon v-show="isPlaying">
                <PauseOutline />
              </NIcon>
            </template>
          </NButton>
        </template>
        <span class="button-tooltip">
          Play / Pause [<span class="bold">space</span>]
        </span>
      </NTooltip>

      <NTooltip trigger="hover">
        <!--suppress VueUnrecognizedSlot -->
        <template #trigger>
          <NButton
            :disabled="uiDisabled"
            size="tiny"
            @click="skipTimeForward"
          >
            <template #icon>
              <NIcon>
                <PlaySkipForwardOutline />
              </NIcon>
            </template>
          </NButton>
        </template>
        <span class="button-tooltip">
          Forward [<span class="bold">n</span>]
        </span>
      </NTooltip>

      <div class="date-picker">
        <NTooltip
          placement="bottom"
          trigger="hover"
        >
          <!--suppress VueUnrecognizedSlot -->
          <template #trigger>
            <!-- TODO: Replace naive ui date picker with custom to support timezones -->
            <NDatePicker
              :disabled="uiDisabled"
              :on-update:value="handleDateStartUpdate"
              :value="dateStartRef.unix() * 1000"
              size="small"
              type="datetime"
            />
          </template>
          <span class="button-tooltip">
            <span class="bold">Date</span> start
          </span>
        </NTooltip>
      </div>

      <span class="date"> to {{ dateEndRef }} </span>

      <div class="timezone">
        {{ settings?.timezone }}
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
