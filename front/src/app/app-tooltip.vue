<script lang="ts" setup="">
import {NTooltip} from 'naive-ui';
import {defineProps, withDefaults} from 'vue';

interface Props {
  tooltip: string;
  placement?: 'right' | 'left' | 'top' | 'bottom';
}

const props = withDefaults(defineProps<Props>(), {placement: 'left'});
</script>

<template>
  <NTooltip
    placement="left"
    trigger="hover"
  >
    <!--suppress VueUnrecognizedSlot -->
    <template #trigger>
      <slot />
    </template>
    {{ props.tooltip }}
  </NTooltip>
</template>
