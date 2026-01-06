<script lang="ts" setup>
import {NGi, NGrid, NTag} from 'naive-ui';
import {type ShortcutSerialized} from 'src/composables/use-shortcuts';
import {capitalizeFirstLetter} from 'src/utils/strings';

interface Props {
  shortcuts: ShortcutSerialized[];
}

const props = defineProps<Props>();
</script>

<template>
  <NGrid
    :cols="3"
    x-gap="12"
    y-gap="4"
  >
    <NGi
      v-for="shortcut of props.shortcuts"
      :class="$style.grid"
    >
      <NTag
        :bordered="false"
        :class="$style.key"
        :style="{
          fontSize: shortcut.name === 'CycleBack' ? '0.66em' : 'auto',
        }"
        size="small"
      >
        {{ shortcut.keycode }}
      </NTag>

      {{ capitalizeFirstLetter(shortcut.name) }}
    </NGi>
  </NGrid>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.grid {
  display: grid;
  grid-template-columns: sizes.$p0 * 5 + sizes.$g0 1fr;
  gap: sizes.$p0;
}

.key {
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
