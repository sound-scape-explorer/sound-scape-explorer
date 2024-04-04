<script lang="ts" setup>
import {NButton, NGi, NGrid, NTag} from 'naive-ui';
import {KeyboardShortcut} from 'src/common/KeyboardShortcut';
import AppGrid from 'src/components/AppGrid/AppGrid.vue';
import {VERSION} from 'src/version';

import AppDraggable from '../AppDraggable/AppDraggable.vue';

interface Shortcut {
  keycode: string;
  name: string;
}

const shortcuts: Shortcut[] = Object.entries(KeyboardShortcut).map((entry) => {
  const [name, keycode] = entry;

  return {
    keycode: keycode,
    name: name,
  };
});

const openDocumentation = () => {
  window.open('https://sound-scape-explorer.github.io');
};
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
          >Open documentation
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
            {{ shortcut.keycode }}
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
