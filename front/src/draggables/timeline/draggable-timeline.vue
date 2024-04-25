<script lang="ts" setup="">
import AppDraggable from 'src/app/app-draggable.vue';
import TimelineGrid from 'src/draggables/timeline/draggable-timeline-grid.vue';
import TimelineMenu from 'src/draggables/timeline/draggable-timeline-menu.vue';
</script>

<template>
  <AppDraggable draggable-key="timeline">
    <div class="container">
      <TimelineMenu />
      <TimelineGrid />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-rows: 40px 1fr;
  //grid-template-rows: 1fr;

  height: 200px;
  width: 900px;
}
</style>
