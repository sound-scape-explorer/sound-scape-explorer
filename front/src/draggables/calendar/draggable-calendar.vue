<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import DraggableCalendarOptions from 'src/draggables/calendar/draggable-calendar-options.vue';
import DraggableCalendarSlider from 'src/draggables/calendar/draggable-calendar-slider.vue';
</script>

<template>
  <AppDraggable
    class="draggableCalendarContainer"
    draggable-key="calendar"
    suspense="view"
  >
    <DraggableCalendarOptions />
    <DraggableCalendarSlider />
  </AppDraggable>
</template>

<style lang="scss" scoped>
.draggableCalendarContainer {
  width: $s2;
}
</style>
