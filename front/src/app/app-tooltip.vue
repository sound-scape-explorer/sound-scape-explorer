<script lang="ts" setup="">
import {NTooltip} from 'naive-ui';

interface Props {
  tooltip: string;
  placement?: 'right' | 'left' | 'top' | 'bottom';
}

const props = withDefaults(defineProps<Props>(), {placement: 'left'});
</script>

<template>
  <NTooltip
    :placement="props.placement"
    trigger="hover"
  >
    <!--suppress VueUnrecognizedSlot -->
    <template #trigger>
      <slot />
    </template>
    {{ props.tooltip }}
  </NTooltip>
</template>
