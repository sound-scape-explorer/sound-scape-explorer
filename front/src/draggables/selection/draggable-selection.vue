<script lang="ts" setup>
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import {useScatterFilterSpatial} from 'src/components/scatter/use-scatter-filter-spatial';
import {DraggableKey} from 'src/composables/use-draggables';
import {useScatterFilterGlobal} from 'src/composables/use-scatter-filter-global';
import DraggableSelectionBoxes from 'src/draggables/selection/draggable-selection-boxes.vue';
import DraggableSelectionControls from 'src/draggables/selection/draggable-selection-controls.vue';
import DraggableSelectionSettings from 'src/draggables/selection/draggable-selection-settings.vue';
import DraggableSelectionSidebar from 'src/draggables/selection/draggable-selection-sidebar.vue';
import {useSelectionBoxes} from 'src/draggables/selection/use-selection-boxes';
import {watch} from 'vue';

const {boxes} = useSelectionBoxes();
const {filter} = useScatterFilterSpatial();
const {update} = useScatterFilterGlobal();

watch(
  boxes,
  () => {
    filter();
    update();
  },
  {deep: true},
);
</script>

<template>
  <AppDraggable
    :class="$style.container"
    :draggable-key="DraggableKey.enum.selection"
  >
    <DraggableSelectionSidebar />

    <AppDraggableMenu :class="$style.menu">
      <DraggableSelectionBoxes />
      <DraggableSelectionControls />
      <DraggableSelectionSettings />
    </AppDraggableMenu>
  </AppDraggable>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  min-height: 12em;
}

.menu {
  width: sizes.$w0;
}
</style>
