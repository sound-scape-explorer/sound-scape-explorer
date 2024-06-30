<script lang="ts" setup>
import AppSelect from 'src/app/select/app-select.vue';
import {useColorSelection} from 'src/components/scatter/use-color-selection';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useColorType} from 'src/draggables/colors/use-color-type';

const {isLoading} = useScatterLoading();
const {type} = useColorSelection();
const {options} = useColorType();

useRefProvide('colors/type', type);
</script>

<template>
  <AppSelect
    :disabled="isLoading"
    :options="options"
    class="select"
    injection-key="colors/type"
    placeholder="Color type..."
    size="small"
    tooltip="Color by"
    tooltip-placement="left"
  />
</template>

<style lang="scss" scoped>
.select {
  width: 100%;
}
</style>
