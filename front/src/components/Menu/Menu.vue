<script lang="ts" setup="">
import {
  AnalyticsOutline,
  CalendarOutline,
  CloudUploadOutline,
  CogOutline,
  ColorPaletteOutline,
  EyeOutline,
  FlaskOutline,
  GitCompareOutline,
  GridOutline,
  HeadsetOutline,
  HelpOutline,
  LayersOutline,
  ListOutline,
} from '@vicons/ionicons5';
import {onKeyPressed} from '@vueuse/core';
import {KeyboardShortcut} from '../../common/KeyboardShortcut';
import {appDraggablesStore} from '../AppDraggable/appDraggablesStore';
import MenuItem from './MenuItem.vue';
import {useFile} from 'src/hooks/useFile';

const {isFileRef} = useFile();

/**
 * Handlers
 */

const toggleImport = () =>
  (appDraggablesStore.import = !appDraggablesStore.import);
const toggleSettings = () =>
  (appDraggablesStore.settings = !appDraggablesStore.settings);
const toggleHelp = () => (appDraggablesStore.help = !appDraggablesStore.help);
const toggleSelection = () =>
  (appDraggablesStore.selection = !appDraggablesStore.selection);
const toggleColors = () =>
  (appDraggablesStore.colors = !appDraggablesStore.colors);
const toggleQueries = () =>
  (appDraggablesStore.queries = !appDraggablesStore.queries);
const toggleTime = () => (appDraggablesStore.time = !appDraggablesStore.time);
const toggleMeta = () => (appDraggablesStore.meta = !appDraggablesStore.meta);
const togglePlayer = () =>
  (appDraggablesStore.audio = !appDraggablesStore.audio);
const toggleDetails = () =>
  (appDraggablesStore.details = !appDraggablesStore.details);
const toggleVolumes = () =>
  (appDraggablesStore.volumes = !appDraggablesStore.volumes);
const toggleMatrices = () =>
  (appDraggablesStore.matrices = !appDraggablesStore.matrices);
const togglePairings = () =>
  (appDraggablesStore.pairings = !appDraggablesStore.pairings);

onKeyPressed(KeyboardShortcut.import, toggleImport);
onKeyPressed(KeyboardShortcut.settings, toggleSettings);
onKeyPressed(KeyboardShortcut.help, toggleHelp);
onKeyPressed(KeyboardShortcut.selection, toggleSelection);
onKeyPressed(KeyboardShortcut.colors, toggleColors);
onKeyPressed(KeyboardShortcut.queries, toggleQueries);
onKeyPressed(KeyboardShortcut.time, toggleTime);
onKeyPressed(KeyboardShortcut.meta, toggleMeta);
onKeyPressed(KeyboardShortcut.audio, togglePlayer);
onKeyPressed(KeyboardShortcut.details, toggleDetails);
onKeyPressed(KeyboardShortcut.volumes, toggleVolumes);
onKeyPressed(KeyboardShortcut.matrices, toggleMatrices);
onKeyPressed(KeyboardShortcut.pairings, togglePairings);
</script>

<template>
  <div class="header">
    <div class="row">
      <MenuItem
        :callback="toggleImport"
        :shortcut="KeyboardShortcut.import"
        text="Import"
      >
        <cloud-upload-outline />
      </MenuItem>

      <MenuItem
        :callback="toggleSettings"
        :shortcut="KeyboardShortcut.settings"
        text="Settings"
      >
        <cog-outline />
      </MenuItem>

      <MenuItem
        :callback="toggleHelp"
        :shortcut="KeyboardShortcut.help"
        text="Help"
      >
        <help-outline />
      </MenuItem>
    </div>

    <div
      v-if="isFileRef"
      class="column"
    >
      <MenuItem
        :callback="toggleSelection"
        :shortcut="KeyboardShortcut.selection"
        text="Selection"
      >
        <eye-outline />
      </MenuItem>

      <MenuItem
        :callback="toggleColors"
        :shortcut="KeyboardShortcut.colors"
        text="Colors"
      >
        <color-palette-outline />
      </MenuItem>

      <MenuItem
        :callback="toggleQueries"
        :shortcut="KeyboardShortcut.queries"
        text="Query"
      >
        <flask-outline />
      </MenuItem>

      <MenuItem
        :callback="toggleTime"
        :shortcut="KeyboardShortcut.time"
        text="Time"
      >
        <calendar-outline />
      </MenuItem>

      <MenuItem
        :callback="toggleMeta"
        :shortcut="KeyboardShortcut.meta"
        text="Meta"
      >
        <layers-outline />
      </MenuItem>

      <MenuItem
        :callback="togglePlayer"
        :shortcut="KeyboardShortcut.audio"
        text="Audio"
      >
        <headset-outline />
      </MenuItem>

      <MenuItem
        :callback="toggleDetails"
        :shortcut="KeyboardShortcut.details"
        text="Details"
      >
        <list-outline />
      </MenuItem>

      <MenuItem
        :callback="toggleVolumes"
        :shortcut="KeyboardShortcut.volumes"
        text="Volumes"
      >
        <analytics-outline />
      </MenuItem>

      <MenuItem
        :callback="toggleMatrices"
        :shortcut="KeyboardShortcut.matrices"
        text="Matrices"
      >
        <grid-outline />
      </MenuItem>

      <MenuItem
        :callback="togglePairings"
        :shortcut="KeyboardShortcut.pairings"
        text="Pairings"
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

  pointer-events: none;
}

.button {
  backdrop-filter: blur(5px);
  pointer-events: auto;
}

.row {
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
