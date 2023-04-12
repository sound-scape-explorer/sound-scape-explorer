<script lang="ts" setup="">
import {NButton, NIcon, NTooltip} from 'naive-ui';

interface Props {
  callback: () => void;
  text: string;
  shortcut: string;
}

const props = defineProps<Props>();
</script>

<template>
  <n-tooltip placement="right" trigger="hover">
    <template #trigger>
      <n-button class="button" size="small" @click="props.callback">
        <n-icon>
          <slot />
        </n-icon>
      </n-button>
    </template>
    <span>{{ props.text }} [<span class="bold">{{ props.shortcut }}</span>]</span>
  </n-tooltip>
</template>

<style lang="scss" scoped>
.button {
  backdrop-filter: blur(5px);
  pointer-events: auto;
}

.bold {
  font-weight: bold;
}
</style>
