<script lang="ts" setup="">
import {
  AnalyticsOutline,
  BarChartOutline,
  CalendarOutline,
  CloudUploadOutline,
  CogOutline,
  ColorPaletteOutline,
  CropOutline,
  EyeOutline,
  GridOutline,
  HeadsetOutline,
  HelpOutline,
  LayersOutline,
  ListOutline,
  ReceiptOutline,
  TimerOutline,
} from '@vicons/ionicons5';
import AppMenuButton from 'src/app/menu/app-menu-button.vue';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useViewState} from 'src/composables/use-view-state';

const {isReady} = useStorageReady();
const {hasView} = useViewState();
const {isPreview} = useClientSettings();
</script>

<template>
  <div class="header">
    <div class="row">
      <div class="left">
        <AppMenuButton
          draggable-key="open"
          text="Open"
        >
          <CloudUploadOutline />
        </AppMenuButton>

        <AppMenuButton
          :disabled="!isReady"
          draggable-key="settings"
          text="Settings"
        >
          <CogOutline />
        </AppMenuButton>

        <AppMenuButton
          draggable-key="help"
          text="Help"
        >
          <HelpOutline />
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
        <EyeOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="colors"
        text="Colors"
      >
        <ColorPaletteOutline />
      </AppMenuButton>

      <AppMenuButton
        v-if="isPreview"
        :disabled="!hasView"
        draggable-key="timeline"
        text="Timeline"
      >
        <ReceiptOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="calendar"
        text="Calendar"
      >
        <CalendarOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="labels"
        text="Labels"
      >
        <LayersOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="temporal"
        text="Temporal"
      >
        <BarChartOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="heatmaps"
        text="Heatmaps"
      >
        <GridOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="details"
        text="Details"
      >
        <ListOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="audio"
        text="Audio"
      >
        <HeadsetOutline />
      </AppMenuButton>

      <AppMenuButton
        v-if="isPreview"
        :disabled="!hasView"
        draggable-key="selection"
        text="Selection"
      >
        <CropOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="trajectories"
        text="Trajectories"
      >
        <AnalyticsOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        draggable-key="relativeTrajectories"
        text="Relative Trajectories"
      >
        <TimerOutline />
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
