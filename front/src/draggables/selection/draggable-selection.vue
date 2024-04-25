<script lang="ts" setup="">
import AppDraggable from 'src/app/app-draggable.vue';
import SelectionMenu from 'src/draggables/selection/draggable-selection-menu.vue';
import SelectionUnload from 'src/draggables/selection/draggable-selection-unloader.vue';
</script>

<template>
  <AppDraggable draggable-key="selection">
    <div class="container">
      <SelectionMenu />
      <SelectionUnload />
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
