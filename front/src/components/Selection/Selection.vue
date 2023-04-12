<script lang="ts" setup="">
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import {useScatterPage} from '../Scatter/useScatterPage';
import SelectionExport from './SelectionExport.vue';
import SelectionReducer from './SelectionReducer.vue';
import SelectionScreenshot from './SelectionScreenshot.vue';

const {delayUpdate} = useScatterPage();
</script>

<template>
  <AppDraggable draggable-key="selection">
    <div class="container">
      <SelectionReducer :handle-update="delayUpdate" />
      <SelectionScreenshot class="flex" />
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
