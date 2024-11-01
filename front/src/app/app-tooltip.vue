<script lang="ts" setup="">
import {NTooltip} from 'naive-ui';
// @ts-expect-error underlying dependency of naive-ui
// noinspection TypeScriptCheckImport
import {type Placement} from 'vueuc/lib/binder/src/interface';

interface Props {
  placement?: Placement;
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
      <slot name="body" />
    </template>

    <slot name="tooltip" />
  </NTooltip>
</template>
