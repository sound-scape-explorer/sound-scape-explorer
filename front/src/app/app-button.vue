<script lang="ts" setup="">
import {NButton, NIcon, NTooltip} from 'naive-ui';
import type {NaiveSize} from 'src/types';
import {computed} from 'vue';

interface Props {
  size?: NaiveSize;
  handleClick: () => void;
  tooltip?: string;
  tooltipPlacement?: 'right' | 'left' | 'top' | 'bottom';
  disabled?: boolean;
  icon?: boolean;
  grow?: boolean;
  growCol?: boolean;
  active?: boolean;
  error?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'tiny',
  disable: false,
  icon: false,
  grow: false,
  growCol: false,
  active: false,
  error: false,
});

const hasTooltip = computed(() => typeof props.tooltip === 'string');
const classNames = computed<string>(() => {
  let string = '';

  if (props.grow) {
    string += ' grow';
  }

  if (props.growCol) {
    string += ' growCol';
  }

  if (props.active) {
    string += ' active';
  }

  if (props.error) {
    string += ' error';
  }

  return string;
});
</script>

<template>
  <NTooltip
    v-if="hasTooltip"
    :placement="props.tooltipPlacement"
    trigger="hover"
  >
    <!--suppress VueUnrecognizedSlot -->
    <template #trigger>
      <NButton
        :class="classNames"
        :disabled="props.disabled"
        :size="props.size"
        @click="props.handleClick"
      >
        <NIcon v-if="props.icon">
          <slot />
        </NIcon>
        <slot v-if="!props.icon" />
      </NButton>
    </template>
    <span>{{ props.tooltip }}</span>
  </NTooltip>

  <NButton
    v-if="!hasTooltip"
    :class="classNames"
    :disabled="props.disabled"
    :size="props.size"
    @click="props.handleClick"
  >
    <NIcon v-if="props.icon">
      <slot />
    </NIcon>
    <slot v-if="!props.icon" />
  </NButton>
</template>

<style lang="scss" scoped>
.grow {
  flex: 1;
}

.growCol {
  width: 100%;
}

.error {
  background: $red;
}

.active {
  background: $olive;
}
</style>
