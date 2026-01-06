<script lang="ts" setup>
import {NTag} from 'naive-ui';

interface Props {
  title: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="$style.container">
    <NTag
      :bordered="false"
      size="medium"
    >
      {{ props.title }}
    </NTag>

    <span :class="$style.divider" />

    <slot />
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: sizes.$p0;
}
</style>
