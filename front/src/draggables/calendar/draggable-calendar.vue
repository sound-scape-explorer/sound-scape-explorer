<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useClientSettings} from 'src/composables/use-client-settings';
import DraggableCalendarMenu from 'src/draggables/calendar/draggable-calendar-menu.vue';
import DraggableCalendarSlider from 'src/draggables/calendar/draggable-calendar-slider.vue';
import DraggableCalendarTimeline from 'src/draggables/calendar/draggable-calendar-timeline.vue';
import DraggableCalendarTimelineOptions from 'src/draggables/calendar/draggable-calendar-timeline-options.vue';
import {useDraggableCalendarLifecycles} from 'src/draggables/calendar/use-draggable-calendar-lifecycles';

const {isPreview} = useClientSettings();

useDraggableCalendarLifecycles();
</script>

<template>
  <AppDraggable
    :class="$style.container"
    draggable-key="calendar"
    suspense="view"
  >
    <DraggableCalendarMenu />
    <DraggableCalendarSlider />
    <DraggableCalendarTimelineOptions v-if="isPreview" />
    <DraggableCalendarTimeline v-if="isPreview" />
  </AppDraggable>
</template>

<style lang="scss" module>
.container {
  width: $s2;
}
</style>
