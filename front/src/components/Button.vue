<script lang="ts" setup="">
import {defineProps} from 'vue';
import {NButton, NIcon} from 'naive-ui';

interface Props {
  text: string;
  handleClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const {
  text,
  handleClick,
  disabled,
  loading,
} = defineProps<Props>();
</script>

<template>
  <n-button :disabled="disabled" :loading="loading" @click="handleClick">
    <template #icon>
      <n-icon>
        <slot />
      </n-icon>
    </template>
    {{ text }}
  </n-button>
</template>

<style lang="scss" scoped>

</style>
