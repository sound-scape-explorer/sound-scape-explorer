<script lang="ts" setup>
import {NButtonGroup} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppSwitch from 'src/app/app-switch.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {useDraggableCalendarTransport} from 'src/draggables/calendar/use-draggable-calendar-transport';
import {printPrettySeconds} from 'src/utils/time';
import {computed} from 'vue';

const {isActive, durations, isPlaying} = useDraggableCalendar();

const {duration} = useTimelineRange();

const {setWindowDuration, skipTimeForward, skipTimeBackward, handleToggle} =
  useDraggableCalendarTransport();

const seconds = computed(() => Number((duration.value / 1000).toFixed()));
</script>

<template>
  <AppDraggableMenu :class="$style.menu">
    <span>Filtering</span>
    <div :class="$style['first-row']">
      <AppSwitch
        v-model="isActive"
        checked="Yes"
        native
        unchecked="No"
      />
    </div>
    <span>Window</span>
    <div>
      <NButtonGroup>
        <AppButton
          v-for="d in durations"
          :handle-click="() => setWindowDuration(d)"
          size="tiny"
        >
          {{ d.name }}
        </AppButton>
      </NButtonGroup>

      <div :class="$style.duration">{{ printPrettySeconds(seconds) }}</div>
    </div>

    <span>Transport</span>
    <div>
      <div :class="$style.gaps">
        <AppButton
          :handle-click="skipTimeBackward"
          small-tooltip
        >
          <AppIcon
            icon="back"
            size="small"
          />
        </AppButton>

        <AppButton
          :handle-click="handleToggle"
          small-tooltip
        >
          <AppIcon
            v-show="isPlaying"
            icon="pause"
            size="small"
          />
          <AppIcon
            v-show="!isPlaying"
            icon="play"
            size="small"
          />
        </AppButton>

        <AppButton
          :handle-click="skipTimeForward"
          small-tooltip
        >
          <AppIcon
            icon="forward"
            size="small"
          />
        </AppButton>
      </div>
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.menu {
  & > div {
    align-items: center;
    display: flex;
    gap: sizes.$p0;
  }
}

.gaps {
  align-items: center;
  display: flex;
  gap: sizes.$p0;
  justify-content: center;
}

.seconds {
  width: sizes.$p0 * 13;
}

.picker {
  width: sizes.$p0 * 19;
}

.first-row {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.duration {
  font-size: 0.9em;
  text-wrap: nowrap;
}
</style>
