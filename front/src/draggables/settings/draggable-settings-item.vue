<script lang="ts" setup>
import {NTag} from 'naive-ui';

interface Props {
  title: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="$style.item">
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

<style lang="scss" module>
.item {
  display: grid;
  align-items: center;
  padding: $g0 0;
  grid-template-columns: auto 1fr auto;
  gap: $p0;
}
</style>
