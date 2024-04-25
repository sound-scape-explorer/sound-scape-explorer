<script lang="ts" setup="">
import AppDraggable from 'src/components/app/app-draggable.vue';

import TimeOptions from './TimeOptions.vue';
import TimeSlider from './TimeSlider.vue';
</script>

<template>
  <AppDraggable draggable-key="time">
    <TimeOptions />
    <TimeSlider />
  </AppDraggable>
</template>
