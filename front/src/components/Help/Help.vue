<script lang="ts" setup>
import {NButton, NGi, NGrid, NTag} from 'naive-ui';
import {KeyboardShortcut} from 'src/common/KeyboardShortcut';
import AppGrid from 'src/components/AppGrid/AppGrid.vue';
import {VERSION} from 'src/version';

import {LINK_BUG_REPORT, LINK_CHANGELOG, LINK_DOCS} from '../../constants';
import AppDraggable from '../AppDraggable/AppDraggable.vue';

interface Shortcut {
  key: string;
  name: string;
}

const shortcuts: Shortcut[] = [
  {key: KeyboardShortcut.import, name: 'Import'},
  {key: KeyboardShortcut.settings, name: 'Settings'},
  {key: KeyboardShortcut.help, name: 'Help'},
  {key: KeyboardShortcut.selection, name: 'Selection'},
  {key: KeyboardShortcut.trajectories, name: 'Trajectories'},
  {key: KeyboardShortcut.colors, name: 'Colors'},
  {key: KeyboardShortcut.time, name: 'Time'},
  {key: KeyboardShortcut.audio, name: 'Audio'},
  {key: KeyboardShortcut.labels, name: 'Labels'},
  {key: KeyboardShortcut.labelsZoom, name: 'Labels: Zoom'},
  {key: KeyboardShortcut.details, name: 'Details'},
  {key: KeyboardShortcut.timePlayPause, name: 'Time: Play / Pause'},
  {key: KeyboardShortcut.timeBackward, name: 'Time: Next'},
  {key: KeyboardShortcut.timeForward, name: 'Time: Previous'},
];

const openDocumentation = () => window.open(LINK_DOCS);
const openBugReport = () => window.open(LINK_BUG_REPORT);
const openChangelog = () => window.open(LINK_CHANGELOG);
</script>

<template>
  <AppDraggable draggable-key="help">
    <div class="container">
      <AppGrid
        :columns="1"
        :items="[{tag: 'Version', value: VERSION}]"
      />

      <div class="full">
        <n-button
          :on-click="openDocumentation"
          class="full"
          size="small"
        >
          Open documentation
        </n-button>
      </div>

      <div class="full">
        <n-button
          :on-click="openChangelog"
          class="full"
          size="small"
        >
          Open changelog
        </n-button>
      </div>

      <div class="full">
        <n-button
          :on-click="openBugReport"
          class="full"
          size="small"
        >
          Open bug report
        </n-button>
      </div>

      <h2 class="full">⌨ Keyboard Shortcuts</h2>

      <n-grid
        :cols="2"
        x-gap="12"
        y-gap="4"
      >
        <n-gi
          v-for="shortcut of shortcuts"
          class="grid"
        >
          <n-tag
            class="key"
            size="small"
          >
            {{ shortcut.key }}
          </n-tag>

          {{ shortcut.name }}
        </n-gi>
      </n-grid>
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5em;

  width: 30em;
}

.full {
  display: flex;
  justify-content: center;
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: 3em 1fr;
  gap: 0.5em;
}

.key {
  font-weight: bold;
  justify-content: center;
}

h2 {
  font-weight: bold;
}
</style>
