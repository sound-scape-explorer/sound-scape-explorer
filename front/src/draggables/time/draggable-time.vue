<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import TimeOptions from 'src/draggables/time/draggable-time-options.vue';
import TimeSlider from 'src/draggables/time/draggable-time-slider.vue';
</script>

<template>
  <AppDraggable
    draggable-key="time"
    hide-separator
  >
    <TimeOptions />
    <TimeSlider />
  </AppDraggable>
</template>
