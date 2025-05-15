<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import AppMenuButton from 'src/app/menu/app-menu-button.vue';
import {useAppMenu} from 'src/app/menu/use-app-menu';
import {useClientSettings} from 'src/composables/use-client-settings';
import {DraggableKey} from 'src/composables/use-draggables';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useViewState} from 'src/composables/use-view-state';

const {isReady} = useStorageReady();
const {hasView} = useViewState();
const {isAlphaPreview} = useClientSettings();
const {menu} = useAppMenu();
</script>

<template>
  <div :class="$style.header">
    <div :class="$style.row">
      <div :class="$style.left">
        <AppMenuButton :draggable-key="DraggableKey.enum.open">
          <IonIcon :icon="menu.open" />
        </AppMenuButton>

        <AppMenuButton :draggable-key="DraggableKey.enum.settings">
          <IonIcon :icon="menu.settings" />
        </AppMenuButton>

        <AppMenuButton :draggable-key="DraggableKey.enum.help">
          <IonIcon :icon="menu.help" />
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
        <IonIcon :icon="menu.view" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.colors"
      >
        <IonIcon :icon="menu.colors" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.calendar"
      >
        <IonIcon :icon="menu.calendar" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.tags"
      >
        <IonIcon :icon="menu.tags" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.temporal"
      >
        <IonIcon :icon="menu.temporal" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.heatmaps"
      >
        <IonIcon :icon="menu.heatmaps" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.histograms"
      >
        <IonIcon :icon="menu.histograms" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.audio"
      >
        <IonIcon :icon="menu.audio" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.details"
      >
        <IonIcon :icon="menu.details" />
      </AppMenuButton>

      <AppMenuButton
        v-if="isAlphaPreview"
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum._alphaSelection3d"
      >
        <IonIcon :icon="menu._alphaSelection3d" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.trajectories"
      >
        <IonIcon :icon="menu.trajectories" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :draggable-key="DraggableKey.enum.relativeTrajectories"
      >
        <IonIcon :icon="menu.relativeTrajectories" />
      </AppMenuButton>
    </div>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';
@use 'src/styles/layers';

$g: sizes.$p0;

.header {
  position: fixed;
  z-index: layers.$app-menu-layer;
  top: $g;
  left: $g;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  pointer-events: none;
  gap: $g;
}

.button {
  pointer-events: auto;
  backdrop-filter: blur(sizes.$p0);
}

.row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: $g;
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
