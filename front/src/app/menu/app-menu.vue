<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import AppMenuButton from 'src/app/menu/app-menu-button.vue';
import {useAppMenu} from 'src/app/menu/use-app-menu';
import {useClientSettings} from 'src/composables/use-client-settings';
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
        <AppMenuButton
          draggable-key="open"
          text="Open"
        >
          <IonIcon :icon="menu.open" />
        </AppMenuButton>

        <AppMenuButton
          draggable-key="settings"
          text="Settings"
        >
          <IonIcon :icon="menu.settings" />
        </AppMenuButton>

        <AppMenuButton
          draggable-key="help"
          text="Help"
        >
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
      <AppMenuButton
        draggable-key="view"
        text="View"
      >
        <IonIcon :icon="menu.view" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="colors"
        text="Colors"
      >
        <IonIcon :icon="menu.colors" />
      </AppMenuButton>

      <AppMenuButton
        v-if="isAlphaPreview"
        :disabled="!hasView"
        draggable-key="timeline"
        text="Timeline"
      >
        <IonIcon :icon="menu.timeline" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="calendar"
        text="Calendar"
      >
        <IonIcon :icon="menu.calendar" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="labels"
        text="Labels"
      >
        <IonIcon :icon="menu.labels" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="temporal"
        text="Temporal"
      >
        <IonIcon :icon="menu.temporal" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="heatmaps"
        text="Heatmaps"
      >
        <IonIcon :icon="menu.heatmaps" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="histograms"
        text="Histograms"
      >
        <IonIcon :icon="menu.histograms" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="audio"
        text="Audio"
      >
        <IonIcon :icon="menu.audio" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="details"
        text="Details"
      >
        <IonIcon :icon="menu.details" />
      </AppMenuButton>

      <AppMenuButton
        v-if="isAlphaPreview"
        :disabled="!hasView"
        draggable-key="selection"
        text="Selection"
      >
        <IonIcon :icon="menu.selection" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="trajectories"
        text="Trajectories"
      >
        <IonIcon :icon="menu.trajectories" />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="relativeTrajectories"
        text="Relative Trajectories"
      >
        <IonIcon :icon="menu.relativeTrajectories" />
      </AppMenuButton>
    </div>
  </div>
</template>

<style lang="scss" module>
$g: $p0;

.header {
  position: fixed;
  z-index: $app-menu-layer;
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
  backdrop-filter: blur($p0);
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
