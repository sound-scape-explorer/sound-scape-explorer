<script lang="ts" setup="">
import {NCheckbox} from 'naive-ui';
import type {InjectionKey} from 'src/common/injection-key';
import {useRefInject} from 'src/composables/use-ref-inject';

interface Props {
  injectionKey: InjectionKey;
  default: boolean;
}

const props = defineProps<Props>();
const model = useRefInject(props.injectionKey);
</script>

<template>
  <NCheckbox v-model:checked="model" />
</template>
