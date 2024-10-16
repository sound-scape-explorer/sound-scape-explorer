<script lang="ts" setup>
import {NTag} from 'naive-ui';

interface Props {
  title: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="draggable-settings-item">
    <NTag
      :bordered="false"
      size="medium"
    >
      {{ props.title }}
    </NTag>
    <span />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.draggable-settings-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: $p0;
  padding: $g0 0;
}
</style>
