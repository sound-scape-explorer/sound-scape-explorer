<script lang="ts" setup="">
import {NGi, NGrid, NTag} from 'naive-ui';
import AppTitle from 'src/app/app-title.vue';
import {useKeyboardShortcuts} from 'src/composables/use-shortcuts';
import {capitalizeFirstLetter} from 'src/utils/capitalize-first-letter';

const {shortcuts} = useKeyboardShortcuts();
</script>

<template>
  <AppTitle>⌨ Keyboard Shortcuts</AppTitle>

  <NGrid
    :cols="3"
    x-gap="12"
    y-gap="4"
  >
    <NGi
      v-for="shortcut of shortcuts"
      class="grid"
    >
      <NTag
        :bordered="false"
        :style="{
          fontSize: shortcut.name === 'draggableCycleRev' ? '0.66em' : 'auto',
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
  grid-template-columns: $p0 * 5 + $g0 1fr;
  gap: $p0;
}

.key {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>
