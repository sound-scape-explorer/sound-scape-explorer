<script lang="ts" setup>
import {NCheckbox} from 'naive-ui';

const model = defineModel<boolean>();

const props = withDefaults(
  defineProps<{handleClick?: () => void; disabled?: boolean}>(),
  {
    handleClick: undefined,
    disabled: false,
  },
);
</script>

<template>
  <NCheckbox
    :default-checked="model"
    :disabled="props?.disabled"
    :on-update:checked="
      () => {
        model = !model;
        props.handleClick?.();
      }
    "
  />
</template>
