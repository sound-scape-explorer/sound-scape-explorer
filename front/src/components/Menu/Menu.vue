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
} from '@vicons/ionicons5';
import {onKeyPressed} from '@vueuse/core';
import {isSelectedRef} from 'src/hooks/useSelection';
import {useStorageFile} from 'src/hooks/useStorageFile';

import {KeyboardShortcut} from '../../common/KeyboardShortcut';
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
onKeyPressed(KeyboardShortcut.indicators, () => toggle('indicators'));
onKeyPressed(KeyboardShortcut.digested, () => toggle('digested'));
</script>

<template>
  <div class="header">
    <div class="row">
      <div class="left">
        <MenuItem
          draggable-key="import"
          text="Import"
          :toggle="toggle"
        >
          <cloud-upload-outline />
        </MenuItem>

        <MenuItem
          draggable-key="settings"
          text="Settings"
          :toggle="toggle"
        >
          <cog-outline />
        </MenuItem>

        <MenuItem
          draggable-key="help"
          text="Help"
          :toggle="toggle"
        >
          <help-outline />
        </MenuItem>
      </div>

      <div
        class="right"
        v-if="isStorageFileRef"
      >
        <!-- placeholder -->
      </div>
    </div>

    <div
      v-if="isStorageFileRef"
      class="column"
    >
      <MenuItem
        draggable-key="selection"
        text="Selection"
        :toggle="toggle"
      >
        <eye-outline />
      </MenuItem>

      <MenuItem
        draggable-key="colors"
        text="Colors"
        :toggle="toggle"
        :disabled="!isSelectedRef.value"
      >
        <color-palette-outline />
      </MenuItem>

      <MenuItem
        draggable-key="time"
        text="Time"
        :toggle="toggle"
        :disabled="!isSelectedRef.value"
      >
        <calendar-outline />
      </MenuItem>

      <MenuItem
        draggable-key="labels"
        text="Labels"
        :toggle="toggle"
        :disabled="!isSelectedRef.value"
      >
        <layers-outline />
      </MenuItem>

      <MenuItem
        draggable-key="details"
        text="Details"
        :toggle="toggle"
        :disabled="!isSelectedRef.value"
      >
        <list-outline />
      </MenuItem>

      <MenuItem
        draggable-key="audio"
        text="Audio"
        :toggle="toggle"
        :disabled="!isSelectedRef.value"
      >
        <headset-outline />
      </MenuItem>

      <MenuItem
        draggable-key="trajectories"
        text="Trajectories"
        :toggle="toggle"
        :disabled="!isSelectedRef.value"
      >
        <analytics-outline />
      </MenuItem>

      <MenuItem
        draggable-key="indicators"
        text="Indicators"
        :toggle="toggle"
        :disabled="!isSelectedRef.value"
      >
        <bar-chart-outline />
      </MenuItem>

      <MenuItem
        draggable-key="digested"
        text="Digested"
        :toggle="toggle"
        :disabled="!isSelectedRef.value"
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
