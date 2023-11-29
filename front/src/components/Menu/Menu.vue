<script lang="ts" setup="">
import {
  AnalyticsOutline,
  BarChartOutline,
  CalendarOutline,
  CloudUploadOutline,
  CogOutline,
  ColorPaletteOutline,
  EyeOutline,
  GridOutline,
  HeadsetOutline,
  HelpOutline,
  LayersOutline,
  ListOutline,
  TimerOutline,
} from '@vicons/ionicons5';
import {onKeyPressed} from '@vueuse/core';
import {KeyboardShortcut} from 'src/common/KeyboardShortcut';
import {isSelectedRef} from 'src/hooks/useSelection';
import {useStorageFile} from 'src/hooks/useStorageFile';

import {appDraggableSelectedRef} from '../AppDraggable/appDraggableSelected';
import {
  type AppDraggablesStore,
  appDraggablesStore,
} from '../AppDraggable/appDraggablesStore';
import MenuItem from './MenuItem.vue';

const {isStorageFileRef} = useStorageFile();

const toggle = (key: keyof AppDraggablesStore): void => {
  appDraggableSelectedRef.value = key;
  appDraggablesStore[key] = !appDraggablesStore[key];
};

onKeyPressed(KeyboardShortcut.import, () => toggle('import'));
onKeyPressed(KeyboardShortcut.settings, () => toggle('settings'));
onKeyPressed(KeyboardShortcut.help, () => toggle('help'));
onKeyPressed(KeyboardShortcut.selection, () => toggle('selection'));
onKeyPressed(KeyboardShortcut.colors, () => toggle('colors'));
onKeyPressed(KeyboardShortcut.time, () => toggle('time'));
onKeyPressed(KeyboardShortcut.labels, () => toggle('labels'));
onKeyPressed(KeyboardShortcut.details, () => toggle('details'));
onKeyPressed(KeyboardShortcut.audio, () => toggle('audio'));
onKeyPressed(KeyboardShortcut.trajectories, () => toggle('trajectories'));
onKeyPressed(KeyboardShortcut.relativeTrajectories, () =>
  toggle('relativeTrajectories'),
);
onKeyPressed(KeyboardShortcut.indicators, () => toggle('indicators'));
onKeyPressed(KeyboardShortcut.digested, () => toggle('digested'));
</script>

<template>
  <div class="header">
    <div class="row">
      <div class="left">
        <MenuItem
          :toggle="toggle"
          draggable-key="import"
          text="Import"
        >
          <cloud-upload-outline />
        </MenuItem>

        <MenuItem
          :toggle="toggle"
          draggable-key="settings"
          text="Settings"
        >
          <cog-outline />
        </MenuItem>

        <MenuItem
          :toggle="toggle"
          draggable-key="help"
          text="Help"
        >
          <help-outline />
        </MenuItem>
      </div>

      <div
        v-if="isStorageFileRef"
        class="right"
      >
        <!-- placeholder -->
      </div>
    </div>

    <div
      v-if="isStorageFileRef"
      class="column"
    >
      <MenuItem
        :toggle="toggle"
        draggable-key="selection"
        text="Selection"
      >
        <eye-outline />
      </MenuItem>

      <MenuItem
        :disabled="!isSelectedRef.value"
        :toggle="toggle"
        draggable-key="colors"
        text="Colors"
      >
        <color-palette-outline />
      </MenuItem>

      <MenuItem
        :disabled="!isSelectedRef.value"
        :toggle="toggle"
        draggable-key="time"
        text="Time"
      >
        <calendar-outline />
      </MenuItem>

      <MenuItem
        :disabled="!isSelectedRef.value"
        :toggle="toggle"
        draggable-key="labels"
        text="Labels"
      >
        <layers-outline />
      </MenuItem>

      <MenuItem
        :disabled="!isSelectedRef.value"
        :toggle="toggle"
        draggable-key="details"
        text="Details"
      >
        <list-outline />
      </MenuItem>

      <MenuItem
        :disabled="!isSelectedRef.value"
        :toggle="toggle"
        draggable-key="audio"
        text="Audio"
      >
        <headset-outline />
      </MenuItem>

      <MenuItem
        :disabled="!isSelectedRef.value"
        :toggle="toggle"
        draggable-key="trajectories"
        text="Trajectories"
      >
        <analytics-outline />
      </MenuItem>

      <MenuItem
        :disabled="!isSelectedRef.value"
        :toggle="toggle"
        draggable-key="relativeTrajectories"
        text="Relative Trajectories"
      >
        <timer-outline />
      </MenuItem>

      <MenuItem
        :disabled="!isSelectedRef.value"
        :toggle="toggle"
        draggable-key="indicators"
        text="Indicators"
      >
        <bar-chart-outline />
      </MenuItem>

      <MenuItem
        :disabled="!isSelectedRef.value"
        :toggle="toggle"
        draggable-key="digested"
        text="Digested"
      >
        <grid-outline />
      </MenuItem>
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
