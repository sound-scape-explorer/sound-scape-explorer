<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useClientSettings} from 'src/composables/use-client-settings';
import DraggableCalendarMenu from 'src/draggables/calendar/draggable-calendar-menu.vue';
import DraggableCalendarSlider from 'src/draggables/calendar/draggable-calendar-slider.vue';
import DraggableCalendarTimeline from 'src/draggables/calendar/draggable-calendar-timeline.vue';
import {useDraggableCalendarLifecycles} from 'src/draggables/calendar/use-draggable-calendar-lifecycles';

const {isBetaPreview} = useClientSettings();

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
    <DraggableCalendarTimeline v-if="isBetaPreview" />
  </AppDraggable>
</template>

<style lang="scss" module>
.container {
  width: $s2;
}
</style>
