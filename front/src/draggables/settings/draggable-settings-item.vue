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
@use 'src/styles/sizes';

.item {
  display: grid;
  align-items: center;
  padding: sizes.$g0 0;
  grid-template-columns: auto 1fr auto;
  gap: sizes.$p0;
}
</style>
