<script lang="ts" setup>
import {NButton, NIcon, NTooltip} from 'naive-ui';

interface Props {
  callback: () => void;
  alt: string;
}

const props = defineProps<Props>();
</script>

<template>
  <NTooltip
    placement="left"
    trigger="hover"
  >
    <template #trigger>
      <NButton
        size="tiny"
        @click="props.callback"
      >
        <NIcon>
          <slot />
        </NIcon>
      </NButton>
    </template>
    <span>{{ props.alt }}</span>
  </NTooltip>
</template>
