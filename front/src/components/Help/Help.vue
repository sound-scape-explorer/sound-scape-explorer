<script lang="ts" setup>
import {NGi, NGrid, NTag} from 'naive-ui';
import {KeyboardShortcut} from '../../common/KeyboardShortcut';
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
    target: 'https://github.com/sound-scape-explorer/sound-scape-explorer',
    name: 'Repository',
  },
  {
    target: 'https://github.com/sound-scape-explorer/sound-scape-explorer/blob/main/README.md',
    name: 'Readme',
  },
  {
    target: 'https://github.com/sound-scape-explorer/sound-scape-explorer/blob/main/CHANGELOG.md',
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
  {key: KeyboardShortcut.colors, name: 'Colors'},
  {key: KeyboardShortcut.queries, name: 'Query'},
  {key: KeyboardShortcut.time, name: 'Time'},
  {key: KeyboardShortcut.meta, name: 'Meta'},
  {key: KeyboardShortcut.audio, name: 'Audio'},
  {key: KeyboardShortcut.details, name: 'Details'},
  {key: KeyboardShortcut.volumes, name: 'Volumes'},
  {key: KeyboardShortcut.matrices, name: 'Matrices'},
  {key: KeyboardShortcut.pairings, name: 'Pairings'},
  {key: KeyboardShortcut.timePlayPause, name: 'Time: Play / Pause'},
  {key: KeyboardShortcut.timeBackward, name: 'Time: Next'},
  {key: KeyboardShortcut.timeForward, name: 'Time: Previous'},
];
</script>

<template>
  <AppDraggable draggable-key="help">
    <div class="container">
      <div class="title">Keyboard Shortcuts</div>

      <n-grid :cols="1" x-gap="12">
        <n-gi v-for="shortcut of shortcuts" class="grid">
          <n-tag size="small">
            {{ shortcut.key }}
          </n-tag>

          {{ shortcut.name }}
        </n-gi>
      </n-grid>

      <div class="title">External links</div>

      <ul class="list">
        <li v-for="link in links">
          <a
            :href="link.target"
            target="_blank"
          >
            {{ link.name }}
          </a>
        </li>
      </ul>
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem;

  width: 14rem;
}

.list {
  list-style: disc inside;
}

.grid {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 0.5rem;

  * {
    justify-content: center;
  }
}

.title {
  font-style: italic;
}
</style>
