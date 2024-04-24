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
  ReceiptOutline,
  TimerOutline,
} from '@vicons/ionicons5';
import {KeyboardShortcut} from 'src/common/KeyboardShortcut';
import {settingsStore} from 'src/components/Settings/settingsStore';
import {useStorageFile} from 'src/composables/storage-file';
import {useKeyboard} from 'src/hooks/useKeyboard';
import {isSelectedRef} from 'src/hooks/useSelection';

import {appDraggableSelectedRef} from '../AppDraggable/appDraggableSelected';
import {
  type AppDraggablesStore,
  appDraggablesStore,
} from '../AppDraggable/appDraggablesStore';
import MenuItem from './MenuItem.vue';

const {hasFile} = useStorageFile();
const {registerKey} = useKeyboard();

const toggle = (key: keyof AppDraggablesStore): void => {
  appDraggableSelectedRef.value = key;
  appDraggablesStore[key] = !appDraggablesStore[key];
};

registerKey(KeyboardShortcut.import, () => toggle('import'));
registerKey(KeyboardShortcut.settings, () => toggle('settings'));
registerKey(KeyboardShortcut.help, () => toggle('help'));
registerKey(KeyboardShortcut.selection, () => toggle('selection'));
registerKey(KeyboardShortcut.colors, () => toggle('colors'));
registerKey(KeyboardShortcut.time, () => toggle('time'));
registerKey(
  KeyboardShortcut.timeline,
  () => settingsStore.preview && toggle('timeline'),
);
registerKey(KeyboardShortcut.labels, () => toggle('labels'));
registerKey(KeyboardShortcut.details, () => toggle('details'));
registerKey(KeyboardShortcut.audio, () => toggle('audio'));
registerKey(KeyboardShortcut.trajectories, () => toggle('trajectories'));
registerKey(KeyboardShortcut.relativeTrajectories, () =>
  toggle('relativeTrajectories'),
);
registerKey(KeyboardShortcut.indicators, () => toggle('indicators'));
registerKey(KeyboardShortcut.digested, () => toggle('digested'));
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
        v-if="hasFile"
        class="right"
      >
        <!-- placeholder -->
      </div>
    </div>

    <div
      v-if="hasFile"
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
        v-if="settingsStore.preview"
        :disabled="!isSelectedRef.value"
        :toggle="toggle"
        draggable-key="timeline"
        text="Timeline"
      >
        <receipt-outline />
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
