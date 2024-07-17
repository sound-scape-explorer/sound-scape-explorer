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
  <div class="header">
    <div class="row">
      <div class="left">
        <AppMenuButton
          draggable-key="open"
          text="Open"
        >
          <menu.open />
        </AppMenuButton>

        <AppMenuButton
          :disabled="!isReady"
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
        class="right"
      >
        <!-- placeholder -->
      </div>
    </div>

    <div
      v-if="isReady"
      class="column"
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

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 0.5rem;

  position: fixed;
  z-index: 1000;

  top: 0.5rem;
  left: 0.5rem;

  width: 100%;

  pointer-events: none;
}

.button {
  backdrop-filter: blur(5px);
  pointer-events: auto;
}

.row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 1rem;
}

.row .left {
  display: flex;
  gap: 0.5rem;
}

.row .right {
  display: flex;
  gap: 0.5rem;
}

.column {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}

.bold {
  font-weight: bold;
}
</style>
