<script lang="ts" setup="">
import {NGi, NGrid, NTag} from 'naive-ui';
import {useKeyboardShortcuts} from 'src/composables/use-shortcuts';
import {capitalizeFirstLetter} from 'src/utils/capitalize-first-letter';

const {shortcuts} = useKeyboardShortcuts();
</script>

<template>
  <h2 class="full left">⌨ Keyboard Shortcuts</h2>

  <NGrid
    :cols="3"
    x-gap="32"
    y-gap="6"
  >
    <NGi
      v-for="shortcut of shortcuts"
      class="grid"
    >
      <NTag
        :bordered="false"
        :style="{
          fontSize: shortcut.name === 'draggableCycleRev' ? '70%' : 'auto',
        }"
        class="key"
        size="small"
      >
        {{ shortcut.keycode }}
      </NTag>

      {{ capitalizeFirstLetter(shortcut.name) }}
    </NGi>
  </NGrid>
</template>

<style lang="scss" scoped>
.full {
  display: flex;
  width: 100%;
}

.left {
  justify-content: flex-start;
}

.grid {
  display: grid;
  grid-template-columns: 3em 1fr;
  align-items: center;
  gap: 8px;
}

.key {
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;
}

h2 {
  font-weight: bold;
}
</style>
