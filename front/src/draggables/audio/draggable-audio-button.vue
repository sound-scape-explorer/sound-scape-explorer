<script lang="ts" setup>
import {NButton, NIcon, NTooltip} from 'naive-ui';

interface Props {
  callback: () => void;
  alt: string;
}

const props = defineProps<Props>();
</script>

<template>
  <n-tooltip
    placement="left"
    trigger="hover"
  >
    <template #trigger>
      <n-button
        size="tiny"
        @click="props.callback"
      >
        <n-icon>
          <slot />
        </n-icon>
      </n-button>
    </template>
    <span>{{ props.alt }}</span>
  </n-tooltip>
</template>
