<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import TimelineGrid from 'src/draggables/timeline/draggable-timeline-grid.vue';
import TimelineMenu from 'src/draggables/timeline/draggable-timeline-menu.vue';
</script>

<template>
  <AppDraggable
    draggable-key="timeline"
    suspense="view"
  >
    <div :class="$style.container">
      <TimelineMenu />
      <TimelineGrid />
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
.container {
  display: grid;
  width: 900px;
  height: 200px;
  grid-template-rows: 40px 1fr;
}
</style>
