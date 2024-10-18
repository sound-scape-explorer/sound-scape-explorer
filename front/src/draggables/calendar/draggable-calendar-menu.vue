<script lang="ts" setup="">
import {
  PauseOutline,
  PlayOutline,
  PlaySkipBackOutline,
  PlaySkipForwardOutline,
} from '@vicons/ionicons5';
import {NButtonGroup, NDatePicker} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppSwitch from 'src/app/app-switch.vue';
import AppTooltip from 'src/app/app-tooltip.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppInput from 'src/app/input/app-input.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {useDraggableCalendarTransport} from 'src/draggables/calendar/use-draggable-calendar-transport';

const {
  isActive,
  duration,
  durations,
  uiDisabled,
  isPlaying,
  dateStartRef,
  dateEndRef,
} = useDraggableCalendar();

const {
  setWindowDuration,
  skipTimeForward,
  skipTimeBackward,
  togglePlaying,
  handleDateStartUpdate,
} = useDraggableCalendarTransport();

useRefProvide(InjectionKey.calendarActive, isActive);
useRefProvide(InjectionKey.timeDuration, duration);
</script>

<template>
  <AppDraggableMenu class="draggableCalendarMenu">
    <span>Filtering</span>
    <div>
      <AppSwitch
        :injection-key="InjectionKey.calendarActive"
        checked="Yes"
        unchecked="No"
      />

      <NButtonGroup>
        <AppButton
          v-for="d in durations"
          :disabled="uiDisabled"
          :handle-click="() => setWindowDuration(d.duration)"
          size="tiny"
        >
          {{ d.name }}
        </AppButton>
      </NButtonGroup>

      <AppInput
        :disabled="!isActive"
        :injection-key="InjectionKey.timeDuration"
        align="left"
        class="seconds"
        tooltip="Set window duration in seconds"
        type="number"
      />
    </div>
    <span>Transport</span>
    <div>
      <div class="gaps">
        <AppButton
          :disabled="uiDisabled"
          :handle-click="skipTimeBackward"
          icon
          tooltip="Backward"
        >
          <PlaySkipBackOutline />
        </AppButton>

        <AppButton
          :disabled="uiDisabled"
          :handle-click="togglePlaying"
          icon
          tooltip="Play / Pause"
        >
          <PlayOutline v-show="!isPlaying" />
          <PauseOutline v-show="isPlaying" />
        </AppButton>

        <AppButton
          :disabled="uiDisabled"
          :handle-click="skipTimeForward"
          icon
          tooltip="Forward"
        >
          <PlaySkipForwardOutline />
        </AppButton>
      </div>

      <div class="gaps">
        <AppTooltip
          placement="top"
          tooltip="Set start date"
        >
          <NDatePicker
            :disabled="uiDisabled"
            :on-update:value="handleDateStartUpdate"
            :value="dateStartRef.unix() * 1000"
            class="picker"
            size="tiny"
            type="datetime"
          />
        </AppTooltip>

        <div>to {{ dateEndRef }}</div>
      </div>
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" scoped>
.draggableCalendarMenu {
  & > div {
    display: flex;
    align-items: center;
    gap: $p0;
  }
}

.gaps {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $p0;
}

.seconds {
  width: $p0 * 13;
}

.picker {
  width: $p0 * 19;
}
</style>
