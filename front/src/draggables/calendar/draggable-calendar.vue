<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import DraggableCalendarOptions from 'src/draggables/calendar/draggable-calendar-options.vue';
import DraggableCalendarSlider from 'src/draggables/calendar/draggable-calendar-slider.vue';
</script>

<template>
  <AppDraggable
    draggable-key="calendar"
    hide-separator
  >
    <DraggableCalendarOptions />
    <DraggableCalendarSlider />
  </AppDraggable>
</template>
