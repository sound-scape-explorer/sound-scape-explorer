<script lang="ts" setup>
import {NGi, NGrid, NTag} from 'naive-ui';
import {KeyboardShortcut} from 'src/common/KeyboardShortcut';

import AppDraggable from '../AppDraggable/AppDraggable.vue';

/**
 * State
 */

interface Link {
  target: string;
  name: string;
}

const links: Link[] = [
  {
    target: 'https://sound-scape-explorer.github.io',
    name: 'Docs',
  },
  {
    target:
      'https://github.com/sound-scape-explorer/sound-scape-explorer/issues/new/choose',
    name: 'Issues',
  },
  {
    target:
      'https://github.com/sound-scape-explorer/sound-scape-explorer/blob/main/CHANGELOG.md',
    name: 'Changelog',
  },
];

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
</script>

<template>
  <AppDraggable draggable-key="help">
    <div class="container">
      <h2>External Links</h2>

      <n-grid
        cols="1"
        x-gap="12"
      >
        <n-gi
          v-for="link of links"
          class="grid"
        >
          <a
            :href="link.target"
            target="_blank"
          >
            {{ link.name }}
          </a>
        </n-gi>
      </n-grid>

      <h2>Keyboard Shortcuts</h2>

      <n-grid
        :cols="2"
        x-gap="12"
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
