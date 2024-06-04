<script lang="ts" setup>
import {NButton, NGi, NGrid, NTag} from 'naive-ui';
import AppGrid from 'src/app/app-grid.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {KeyboardShortcut} from 'src/common/keyboard-shortcuts';
import {LINK_BUG_REPORT, LINK_CHANGELOG, LINK_DOCS} from 'src/constants';
import {VERSION} from 'src/version';

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
        <NButton
          :on-click="openDocumentation"
          class="full"
          size="small"
        >
          Open documentation
        </NButton>
      </div>

      <div class="full">
        <NButton
          :on-click="openChangelog"
          class="full"
          size="small"
        >
          Open changelog
        </NButton>
      </div>

      <div class="full">
        <NButton
          :on-click="openBugReport"
          class="full"
          size="small"
        >
          Open bug report
        </NButton>
      </div>

      <h2 class="full">⌨ Keyboard Shortcuts</h2>

      <NGrid
        :cols="2"
        x-gap="12"
        y-gap="4"
      >
        <NGi
          v-for="shortcut of shortcuts"
          class="grid"
        >
          <NTag
            class="key"
            size="small"
          >
            {{ shortcut.keycode }}
          </NTag>

          {{ shortcut.name }}
        </NGi>
      </NGrid>
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
