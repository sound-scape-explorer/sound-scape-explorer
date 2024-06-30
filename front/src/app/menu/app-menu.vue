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
import {useAppMenu} from 'src/app/menu/use-app-menu';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useViewState} from 'src/composables/use-view-state';

const {isReady, toggle} = useAppMenu();
const {hasView} = useViewState();
const {preview} = useClientSettings();
</script>

<template>
  <div class="header">
    <div class="row">
      <div class="left">
        <AppMenuButton
          :toggle="toggle"
          draggable-key="import"
          text="Import"
        >
          <CloudUploadOutline />
        </AppMenuButton>

        <AppMenuButton
          :disabled="!isReady"
          :toggle="toggle"
          draggable-key="settings"
          text="Settings"
        >
          <CogOutline />
        </AppMenuButton>

        <AppMenuButton
          :toggle="toggle"
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
        :toggle="toggle"
        draggable-key="view"
        text="View"
      >
        <EyeOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :toggle="toggle"
        draggable-key="colors"
        text="Colors"
      >
        <ColorPaletteOutline />
      </AppMenuButton>

      <AppMenuButton
        v-if="preview"
        :disabled="!hasView"
        :toggle="toggle"
        draggable-key="timeline"
        text="Timeline"
      >
        <ReceiptOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :toggle="toggle"
        draggable-key="time"
        text="Time"
      >
        <CalendarOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :toggle="toggle"
        draggable-key="labels"
        text="Labels"
      >
        <LayersOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :toggle="toggle"
        draggable-key="details"
        text="Details"
      >
        <ListOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :toggle="toggle"
        draggable-key="audio"
        text="Audio"
      >
        <HeadsetOutline />
      </AppMenuButton>

      <AppMenuButton
        v-if="preview"
        :disabled="!hasView"
        :toggle="toggle"
        draggable-key="selection"
        text="Selection"
      >
        <CropOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :toggle="toggle"
        draggable-key="trajectories"
        text="Trajectories"
      >
        <AnalyticsOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :toggle="toggle"
        draggable-key="relativeTrajectories"
        text="Relative Trajectories"
      >
        <TimerOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :toggle="toggle"
        draggable-key="temporal"
        text="Temporal"
      >
        <BarChartOutline />
      </AppMenuButton>

      <AppMenuButton
        :disabled="!hasView"
        :toggle="toggle"
        draggable-key="heatmaps"
        text="Heatmaps"
      >
        <GridOutline />
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
