<script lang="ts" setup="">
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import TimeOptions from './TimeOptions.vue';
import TimeSlider from './TimeSlider.vue';
</script>

<template>
  <AppDraggable draggable-key="time">
    <TimeOptions />
    <TimeSlider />
  </AppDraggable>
</template>
