<script lang="ts" setup>
import {NSelect, NSpace} from 'naive-ui';
import {type InjectionKey, useRefInject} from 'src/composables/ref-inject';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

interface Props {
  injectionKey: InjectionKey;
  options: string[];
  defaultOptionIndex?: number;
}

const props = defineProps<Props>();
const model = useRefInject(props.injectionKey);
const options = computed(() => convertToNaiveSelectOptions(props.options));
</script>

<template>
  <NSpace
    class="container"
    vertical
  >
    <NSelect
      v-model:value="model"
      :default-value="props.options[defaultOptionIndex ?? 0]"
      :options="options"
      class="select"
      size="tiny"
    />
  </NSpace>
</template>

<style lang="scss" scoped>
.container {
}

.select {
}
</style>
