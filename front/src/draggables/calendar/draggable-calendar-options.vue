<script lang="ts" setup>
import {
  PauseOutline,
  PlayOutline,
  PlaySkipBackOutline,
  PlaySkipForwardOutline,
} from '@vicons/ionicons5';
import {
  NButton,
  NButtonGroup,
  NDatePicker,
  NIcon,
  NSwitch,
  NTooltip,
} from 'naive-ui';
import AppInput from 'src/app/input/app-input.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useSettings} from 'src/composables/use-settings';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {useDraggableCalendarLifecycles} from 'src/draggables/calendar/use-draggable-calendar-lifecycles';
import {useDraggableCalendarShortcuts} from 'src/draggables/calendar/use-draggable-calendar-shortcuts';
import {useDraggableCalendarTransport} from 'src/draggables/calendar/use-draggable-calendar-transport';

const {settings} = useSettings();
const {isLoading} = useScatterLoading();
const {
  dateStartRef,
  dateEndRef,
  duration,
  isAllSelected,
  uiDisabled,
  durations,
  isPlaying,
} = useDraggableCalendar();

const {
  skipTimeForward,
  skipTimeBackward,
  togglePlaying,
  setWindowDuration,
  handleDateStartUpdate,
} = useDraggableCalendarTransport();

useRefProvide('time/duration', duration);

useDraggableCalendarLifecycles();
useDraggableCalendarShortcuts();
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
