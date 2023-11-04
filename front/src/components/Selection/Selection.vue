<script lang="ts" setup="">
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import SelectionExport from './SelectionExport.vue';
import SelectionMenu from './SelectionMenu.vue';
import SelectionScreenshot from './SelectionScreenshot.vue';
import SelectionUnload from './SelectionUnload.vue';
</script>

<template>
  <AppDraggable draggable-key="selection">
    <div class="container">
      <SelectionMenu />
      <SelectionUnload />
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
