<script lang="ts" setup="">
import {NButton, NIcon, NTooltip} from 'naive-ui';
import {computed} from 'vue';

interface Props {
  size?: 'tiny' | 'small';
  handleClick: () => void;
  tooltip?: string;
  tooltipPlacement?: 'right' | 'left' | 'top' | 'bottom';
  disabled?: boolean;
  icon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'tiny',
  disable: false,
  icon: false,
});

const hasTooltip = computed(() => typeof props.tooltip === 'string');
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
