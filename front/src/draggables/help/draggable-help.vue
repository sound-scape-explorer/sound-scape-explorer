<script lang="ts" setup>
import AppGrid from 'src/app/app-grid.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {DraggableKey} from 'src/composables/use-draggables';
import DraggableHelpLinks from 'src/draggables/help/draggable-help-links.vue';
import DraggableHelpShortcuts from 'src/draggables/help/draggable-help-shortcuts.vue';
import {VERSION} from 'src/version';
</script>

<template>
  <AppDraggable :draggable-key="DraggableKey.enum.help">
    <div :class="$style.container">
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

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  width: sizes.$s2;
  gap: sizes.$p0;
}
</style>
