<script lang="ts" setup>
import {NDatePicker} from 'naive-ui';
import {type InjectionKey} from 'src/common/injection-key';
import {useRefInject} from 'src/composables/use-ref-inject';

interface Props {
  injectionKey: InjectionKey;
  handleClick: (newValue: number) => void;
}

const props = defineProps<Props>();

const model = useRefInject<number>(props.injectionKey);
</script>

<template>
  <NDatePicker
    :class="$style.date"
    :on-update:value="props.handleClick"
    :value="model"
    size="tiny"
    type="datetime"
  />
</template>

<style lang="scss" module>
.date {
  width: 100%;
}
</style>
