<script lang="ts" setup="">
import {NButton, NIcon} from 'naive-ui';
import {useSlots} from 'vue';

interface Props {
  handleClick: () => void;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  disabled: false,
  loading: false,
});

const slots = useSlots();
const hasChildren = typeof slots.default !== 'undefined';
const hasText = typeof props.text !== 'undefined';
</script>

<template>
  <div class="container">
    <n-button
      :disabled="props.disabled"
      :loading="props.loading"
      class="zoom"
      size="small"
      @click="props.handleClick"
    >
      <template v-if="hasChildren" #icon>
        <n-icon>
          <slot />
        </n-icon>
      </template>
      <template v-if="hasText">
        {{ props.text }}
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
