<script lang="ts" setup="">
import {defineProps, useSlots} from 'vue';
import {NButton, NIcon} from 'naive-ui';

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
    <n-button :disabled="disabled" :loading="loading" class="button" @click="handleClick">
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
  width: 100%;
  display: flex;
  justify-content: center;
}

.button {
  width: 100%;
}
</style>
