<script lang="ts" setup="">
import {
  AnalyticsOutline,
  BarChartOutline,
  CalendarOutline,
  CloudUploadOutline,
  CogOutline,
  ColorPaletteOutline,
  EyeOutline,
  GitCompareOutline,
  GridOutline,
  HeadsetOutline,
  HelpOutline,
  LayersOutline,
  ListOutline,
} from '@vicons/ionicons5';
import {onKeyPressed} from '@vueuse/core';
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
onKeyPressed(KeyboardShortcut.trajectories, () => toggle('trajectories'));
onKeyPressed(KeyboardShortcut.indicators, () => toggle('indicators'));
onKeyPressed(KeyboardShortcut.colors, () => toggle('colors'));
onKeyPressed(KeyboardShortcut.queries, () => toggle('queries'));
onKeyPressed(KeyboardShortcut.time, () => toggle('time'));
onKeyPressed(KeyboardShortcut.meta, () => toggle('meta'));
onKeyPressed(KeyboardShortcut.audio, () => toggle('audio'));
onKeyPressed(KeyboardShortcut.details, () => toggle('details'));
onKeyPressed(KeyboardShortcut.volumes, () => toggle('volumes'));
onKeyPressed(KeyboardShortcut.matrices, () => toggle('matrices'));
onKeyPressed(KeyboardShortcut.pairings, () => toggle('pairings'));
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
        draggable-key="trajectories"
        text="Trajectories"
        :toggle="toggle"
      >
        <analytics-outline />
      </MenuItem>

      <MenuItem
        draggable-key="colors"
        text="Colors"
        :toggle="toggle"
      >
        <color-palette-outline />
      </MenuItem>

      <!-- <MenuItem -->
      <!--   draggable-key="queries" -->
      <!--   text="Query" -->
      <!--   :toggle="toggle" -->
      <!-- > -->
      <!--   <flask-outline /> -->
      <!-- </MenuItem> -->

      <MenuItem
        draggable-key="indicators"
        text="Indicators"
        :toggle="toggle"
      >
        <bar-chart-outline />
      </MenuItem>

      <MenuItem
        draggable-key="time"
        text="Time"
        :toggle="toggle"
      >
        <calendar-outline />
      </MenuItem>

      <MenuItem
        draggable-key="meta"
        text="Meta"
        :toggle="toggle"
      >
        <layers-outline />
      </MenuItem>

      <MenuItem
        draggable-key="audio"
        text="Audio"
        :toggle="toggle"
      >
        <headset-outline />
      </MenuItem>

      <MenuItem
        draggable-key="details"
        text="Details"
        :toggle="toggle"
      >
        <list-outline />
      </MenuItem>

      <MenuItem
        draggable-key="volumes"
        text="Volumes"
        :toggle="toggle"
      >
        <analytics-outline />
      </MenuItem>

      <MenuItem
        draggable-key="matrices"
        text="Matrices"
        :toggle="toggle"
      >
        <grid-outline />
      </MenuItem>

      <MenuItem
        draggable-key="pairings"
        text="Pairings"
        :toggle="toggle"
      >
        <git-compare-outline />
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
