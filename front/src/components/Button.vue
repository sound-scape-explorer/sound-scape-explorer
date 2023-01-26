<script lang="ts" setup="">
import {NButton, NIcon} from 'naive-ui';
import {defineProps, useSlots} from 'vue';

interface Props {
  handleClick: () => void;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
}

const {
  text,
  handleClick,
  disabled,
  loading,
} = defineProps<Props>();

const slots = useSlots();
const hasChildren = typeof slots.default !== 'undefined';
const hasText = typeof text !== 'undefined';
</script>

<template>
  <div class="container">
    <n-button :disabled="disabled" :loading="loading" class="zoom" @click="handleClick">
      <template v-if="hasChildren" #icon>
        <n-icon>
          <slot />
        </n-icon>
      </template>
      <template v-if="hasText">
        {{ text }}
      </template>
    </n-button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;

  width: 100%;
}

.zoom {
  width: 100%;
}
</style>
