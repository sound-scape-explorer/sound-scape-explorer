<!--suppress HtmlUnknownTag -->
<script lang="ts" setup="">
import AppMenuButton from 'src/app/menu/app-menu-button.vue';
import {useAppMenu} from 'src/app/menu/use-app-menu';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useViewState} from 'src/composables/use-view-state';

const {isReady} = useStorageReady();
const {hasView} = useViewState();
const {isPreview} = useClientSettings();
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
          <menu.open />
        </AppMenuButton>

        <AppMenuButton
          draggable-key="settings"
          text="Settings"
        >
          <menu.settings />
        </AppMenuButton>

        <AppMenuButton
          draggable-key="help"
          text="Help"
        >
          <menu.help />
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
        <menu.view />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="colors"
        text="Colors"
      >
        <menu.colors />
      </AppMenuButton>

      <AppMenuButton
        v-if="isPreview"
        :disabled="!hasView"
        draggable-key="timeline"
        text="Timeline"
      >
        <menu.timeline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="calendar"
        text="Calendar"
      >
        <menu.calendar />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="labels"
        text="Labels"
      >
        <menu.labels />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="temporal"
        text="Temporal"
      >
        <menu.temporal />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="heatmaps"
        text="Heatmaps"
      >
        <menu.heatmaps />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="histograms"
        text="Histograms"
      >
        <menu.histograms />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="audio"
        text="Audio"
      >
        <menu.audio />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="details"
        text="Details"
      >
        <menu.details />
      </AppMenuButton>

      <AppMenuButton
        v-if="isPreview"
        :disabled="!hasView"
        draggable-key="selection"
        text="Selection"
      >
        <menu.selection />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="trajectories"
        text="Trajectories"
      >
        <menu.trajectories />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="relativeTrajectories"
        text="Relative Trajectories"
      >
        <menu.relativeTrajectories />
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
