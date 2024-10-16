<script lang="ts" setup>
import AppGrid from 'src/app/app-grid.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import DraggableHelpLinks from 'src/draggables/help/draggable-help-links.vue';
import DraggableHelpShortcuts from 'src/draggables/help/draggable-help-shortcuts.vue';
// noinspection ES6UnusedImports
import {VERSION} from 'src/version';
</script>

<template>
  <AppDraggable draggable-key="help">
    <div class="draggableHelpContainer">
      <AppGrid
        :columns="1"
        :grow="false"
        :items="[{tag: 'Version', value: VERSION}]"
      />
      <DraggableHelpLinks />
      <DraggableHelpShortcuts />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.draggableHelpContainer {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: $p0;
}
</style>
