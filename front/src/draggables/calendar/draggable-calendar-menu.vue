<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {
  pauseOutline,
  playOutline,
  playSkipBackOutline,
  playSkipForwardOutline,
} from 'ionicons/icons';
import {NButtonGroup} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppSwitch from 'src/app/app-switch.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {useDraggableCalendarTransport} from 'src/draggables/calendar/use-draggable-calendar-transport';
import {printPrettySeconds} from 'src/utils/time';
import {computed} from 'vue';

const {isActive, durations, isPlaying} = useDraggableCalendar();

const {duration} = useTimelineRange();

const {setWindowDuration, skipTimeForward, skipTimeBackward, handleToggle} =
  useDraggableCalendarTransport();

useRefProvide(InjectionKey.enum.CALENDAR_ACTIVE, isActive);

const seconds = computed(() => Number((duration.value / 1000).toFixed()));
</script>

<template>
  <AppDraggableMenu :class="$style.menu">
    <span>Filtering</span>
    <div :class="$style['first-row']">
      <AppSwitch
        :injection-key="InjectionKey.enum.CALENDAR_ACTIVE"
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
          <IonIcon :icon="playSkipBackOutline" />
        </AppButton>

        <AppButton
          :handle-click="handleToggle"
          small-tooltip
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
          :handle-click="skipTimeForward"
          small-tooltip
        >
          <IonIcon :icon="playSkipForwardOutline" />
        </AppButton>
      </div>
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.menu {
  & > div {
    display: flex;
    align-items: center;
    gap: sizes.$p0;
  }
}

.gaps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: sizes.$p0;
}

.seconds {
  width: sizes.$p0 * 13;
}

.picker {
  width: sizes.$p0 * 19;
}

.first-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.duration {
  font-size: 0.9em;
  text-wrap: nowrap;
}
</style>
