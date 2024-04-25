<script lang="ts" setup="">
import AppDraggable from 'src/app/app-draggable.vue';
import TimeOptions from 'src/draggables/time/draggable-time-options.vue';
import TimeSlider from 'src/draggables/time/draggable-time-slider.vue';
</script>

<template>
  <AppDraggable draggable-key="time">
    <TimeOptions />
    <TimeSlider />
  </AppDraggable>
</template>
