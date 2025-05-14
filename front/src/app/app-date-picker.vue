<script lang="ts" setup>
import {NDatePicker} from 'naive-ui';

interface Props {
  handleClick: (newValue: number) => void;
}

const props = defineProps<Props>();
const model = defineModel<number>();
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
