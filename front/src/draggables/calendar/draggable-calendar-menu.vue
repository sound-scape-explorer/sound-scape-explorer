<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {
  pauseOutline,
  playOutline,
  playSkipBackOutline,
  playSkipForwardOutline,
} from 'ionicons/icons';
import {NButtonGroup, NDatePicker} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppSwitch from 'src/app/app-switch.vue';
import AppTooltip from 'src/app/app-tooltip.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppInput from 'src/app/input/app-input.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useDate} from 'src/composables/use-date';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {useDraggableCalendarTransport} from 'src/draggables/calendar/use-draggable-calendar-transport';
import {printPrettySeconds} from 'src/utils/print-pretty-seconds';

const {
  isActive,
  duration,
  durations,
  uiDisabled,
  isPlaying,
  dateStart,
  dateEnd,
} = useDraggableCalendar();

const {
  setWindowDuration,
  skipTimeForward,
  skipTimeBackward,
  togglePlaying,
  handleDateStartUpdate,
} = useDraggableCalendarTransport();

const {convertTimestampToIsoDate} = useDate();

useRefProvide(InjectionKey.calendarActive, isActive);
useRefProvide(InjectionKey.timeDuration, duration);
</script>

<template>
  <AppDraggableMenu :class="$style.menu">
    <span>Filtering</span>
    <div :class="$style['first-row']">
      <AppSwitch
        :injection-key="InjectionKey.calendarActive"
        checked="Yes"
        native
        unchecked="No"
      />

      <div :class="$style.gaps">
        <AppTooltip
          placement="top"
          tooltip="Set start date"
        >
          <NDatePicker
            :class="$style.picker"
            :disabled="uiDisabled"
            :on-update:value="handleDateStartUpdate"
            :value="dateStart.unix() * 1000"
            size="tiny"
            type="datetime"
          />
        </AppTooltip>

        <div>to {{ convertTimestampToIsoDate(dateEnd) }}</div>
      </div>
    </div>
    <span>Window</span>
    <div>
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
        :class="$style.seconds"
        :disabled="!isActive"
        :injection-key="InjectionKey.timeDuration"
        align="left"
        throttle
        tooltip="Set window duration in seconds"
        type="number"
      />

      <div>{{ printPrettySeconds(duration) }}</div>
    </div>
    <span>Transport</span>
    <div>
      <div :class="$style.gaps">
        <AppButton
          :disabled="uiDisabled"
          :handle-click="skipTimeBackward"
          small-tooltip
          tooltip="Backward"
        >
          <IonIcon :icon="playSkipBackOutline" />
        </AppButton>

        <AppButton
          :disabled="uiDisabled"
          :handle-click="togglePlaying"
          small-tooltip
          tooltip="Play / Pause"
        >
          <IonIcon
            v-show="isPlaying"
            :icon="pauseOutline"
          />
          <IonIcon
            v-show="!isPlaying"
            :icon="playOutline"
          />
        </AppButton>

        <AppButton
          :disabled="uiDisabled"
          :handle-click="skipTimeForward"
          small-tooltip
          tooltip="Forward"
        >
          <IonIcon :icon="playSkipForwardOutline" />
        </AppButton>
      </div>
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" module>
.menu {
  & > div {
    display: flex;
    align-items: center;
    gap: $p0;
  }
}

.gaps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $p0;
}

.seconds {
  width: $p0 * 13;
}

.picker {
  width: $p0 * 19;
}

.first-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
