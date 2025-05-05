<script lang="ts" setup>
import {NCheckbox} from 'naive-ui';
import {InjectionKey} from 'src/common/injection-key';
import {useRefInject} from 'src/composables/use-ref-inject';

interface Props {
  injectionKey: InjectionKey;
  default: boolean;
  handleClick?: () => void;
}

const props = defineProps<Props>();
const model = useRefInject<boolean>(props.injectionKey);
</script>

<template>
  <NCheckbox
    :default-checked="model"
    :on-update:checked="
      () => {
        model = !model;
        props.handleClick?.();
      }
    "
  />
</template>
