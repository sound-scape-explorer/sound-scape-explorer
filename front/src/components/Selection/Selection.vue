<script lang="ts" setup="">
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import SelectionExport from './SelectionExport.vue';
import SelectionReducer from './SelectionReducer.vue';
import SelectionTrajectory from './SelectionTrajectory.vue';
import SelectionScreenshot from './SelectionScreenshot.vue';
</script>

<template>
  <AppDraggable draggable-key="selection">
    <div class="container">
      <SelectionReducer />
      <SelectionTrajectory />
      <SelectionScreenshot />
      <SelectionExport />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 24rem;
}
</style>
