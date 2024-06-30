<script lang="ts" setup="">
import {NButton, NIcon, NTooltip} from 'naive-ui';
import {computed, defineProps} from 'vue';

interface Props {
  size?: 'tiny' | 'small';
  handleClick: () => void;
  tooltip?: string;
  tooltipPlacement?: 'right' | 'left' | 'top' | 'bottom';
}

const props = withDefaults(defineProps<Props>(), {size: 'tiny'});
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
        :size="props.size"
        @click="props.handleClick"
      >
        <NIcon>
          <slot />
        </NIcon>
      </NButton>
    </template>
    <span>{{ props.tooltip }}</span>
  </NTooltip>

  <NButton
    v-if="!hasTooltip"
    :size="props.size"
    @click="props.handleClick"
  >
    <NIcon>
      <slot />
    </NIcon>
  </NButton>
</template>

<style lang="scss" scoped></style>
