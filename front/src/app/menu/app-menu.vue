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
import MenuItem from 'src/app/menu/app-menu-item.vue';
import {KeyboardShortcut} from 'src/common/keyboard-shortcuts';
import {useDraggables} from 'src/composables/draggables';
import {useKeyboard} from 'src/composables/keyboard';
import {useSelection} from 'src/composables/selection';
import {useStorageReady} from 'src/composables/storage-ready';
import {settingsStore} from 'src/draggables/settings/settings-store';

const {isReady} = useStorageReady();
const {registerKey} = useKeyboard();
const {toggle} = useDraggables();
const {hasSelection} = useSelection();

registerKey(KeyboardShortcut.import, () => toggle('import'));
registerKey(
  KeyboardShortcut.settings,
  () => isReady.value && toggle('settings'),
);
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
          <CloudUploadOutline />
        </MenuItem>

        <MenuItem
          :disabled="!isReady"
          :toggle="toggle"
          draggable-key="settings"
          text="Settings"
        >
          <CogOutline />
        </MenuItem>

        <MenuItem
          :toggle="toggle"
          draggable-key="help"
          text="Help"
        >
          <HelpOutline />
        </MenuItem>
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
      <MenuItem
        :toggle="toggle"
        draggable-key="selection"
        text="Selection"
      >
        <EyeOutline />
      </MenuItem>

      <MenuItem
        :disabled="!hasSelection"
        :toggle="toggle"
        draggable-key="colors"
        text="Colors"
      >
        <ColorPaletteOutline />
      </MenuItem>

      <MenuItem
        v-if="settingsStore.preview"
        :disabled="!hasSelection"
        :toggle="toggle"
        draggable-key="timeline"
        text="Timeline"
      >
        <ReceiptOutline />
      </MenuItem>

      <MenuItem
        :disabled="!hasSelection"
        :toggle="toggle"
        draggable-key="time"
        text="Time"
      >
        <CalendarOutline />
      </MenuItem>

      <MenuItem
        :disabled="!hasSelection"
        :toggle="toggle"
        draggable-key="labels"
        text="Labels"
      >
        <LayersOutline />
      </MenuItem>

      <MenuItem
        :disabled="!hasSelection"
        :toggle="toggle"
        draggable-key="details"
        text="Details"
      >
        <ListOutline />
      </MenuItem>

      <MenuItem
        :disabled="!hasSelection"
        :toggle="toggle"
        draggable-key="audio"
        text="Audio"
      >
        <HeadsetOutline />
      </MenuItem>

      <MenuItem
        :disabled="!hasSelection"
        :toggle="toggle"
        draggable-key="trajectories"
        text="Trajectories"
      >
        <AnalyticsOutline />
      </MenuItem>

      <MenuItem
        :disabled="!hasSelection"
        :toggle="toggle"
        draggable-key="relativeTrajectories"
        text="Relative Trajectories"
      >
        <TimerOutline />
      </MenuItem>

      <MenuItem
        :disabled="!hasSelection"
        :toggle="toggle"
        draggable-key="indicators"
        text="Indicators"
      >
        <BarChartOutline />
      </MenuItem>

      <MenuItem
        :disabled="!hasSelection"
        :toggle="toggle"
        draggable-key="digested"
        text="Digested"
      >
        <GridOutline />
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
