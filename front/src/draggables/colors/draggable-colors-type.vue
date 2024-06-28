<script lang="ts" setup>
import AppSelect from 'src/app/select/app-select.vue';
import {useColorSelection} from 'src/components/scatter/color-selection';
import {useScatterLoading} from 'src/components/scatter/scatter-loading';
import {useRefProvide} from 'src/composables/ref-provide';
import {useColorType} from 'src/draggables/colors/color-type';

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
