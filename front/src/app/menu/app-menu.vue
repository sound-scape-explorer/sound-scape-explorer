<script lang="ts" setup>
import AppIcon from 'src/app/app-icon.vue';
import AppMenuButton from 'src/app/menu/app-menu-button.vue';
import {DraggableKey} from 'src/composables/use-draggables';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useViewState} from 'src/composables/use-view-state';

const {isReady} = useStorageReady();
const {hasView} = useViewState();
</script>

<template>
  <div :class="$style.header">
    <div :class="$style.row">
      <div :class="$style.left">
        <AppMenuButton :draggable-key="DraggableKey.enum.open">
          <AppIcon icon="open" />
        </AppMenuButton>

        <AppMenuButton :draggable-key="DraggableKey.enum.settings">
          <AppIcon icon="settings" />
        </AppMenuButton>

        <AppMenuButton :draggable-key="DraggableKey.enum.help">
          <AppIcon icon="help" />
        </AppMenuButton>
      </div>

      <div
        v-if="isReady"
        :class="$style.right"
      >
        <!-- placeholder -->
      </div>
    </div>

    <div
      v-if="isReady"
      :class="$style.column"
    >
      <AppMenuButton :draggable-key="DraggableKey.enum.view">
        <AppIcon icon="view" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.colors"
      >
        <AppIcon icon="colors" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.calendar"
      >
        <AppIcon icon="calendar" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.tags"
      >
        <AppIcon icon="tags" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.selection"
      >
        <AppIcon icon="selection" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.temporal"
      >
        <AppIcon icon="temporal" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.heatmaps"
      >
        <AppIcon icon="heatmaps" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.audio"
      >
        <AppIcon icon="audio" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.details"
      >
        <AppIcon icon="details" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.trajectories"
      >
        <AppIcon icon="trajectories" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.relativeTrajectories"
      >
        <AppIcon icon="relativeTrajectories" />
      </AppMenuButton>
    </div>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';
@use 'src/styles/layers';

$g: sizes.$p0;

.header {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: $g;
  left: $g;
  pointer-events: none;
  position: fixed;
  top: $g;
  width: 100%;
  z-index: layers.$app-menu-layer;
}

.button {
  backdrop-filter: blur(sizes.$p0);
  pointer-events: auto;
}

.row {
  display: flex;
  justify-content: space-between;
  padding-right: $g;
  width: 100%;
}

.row .left {
  display: flex;
  gap: $g;
}

.row .right {
  display: flex;
  gap: $g;
}

.column {
  display: flex;
  flex-direction: column;
  gap: $g;
}

.bold {
  font-weight: bold;
}
</style>
