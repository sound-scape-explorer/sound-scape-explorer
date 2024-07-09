<script lang="ts" setup="">
import {NButton, NIcon, NTooltip} from 'naive-ui';
import {computed} from 'vue';

interface Props {
  size?: 'tiny' | 'small' | 'medium' | 'large';
  handleClick: () => void;
  tooltip?: string;
  tooltipPlacement?: 'right' | 'left' | 'top' | 'bottom';
  disabled?: boolean;
  icon?: boolean;
  error?: boolean;
  grow?: boolean;
  growCol?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'tiny',
  disable: false,
  icon: false,
  error: false,
  grow: false,
  growCol: false,
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
  background: rgba(255, 0, 0, 0.2);
}
</style>
