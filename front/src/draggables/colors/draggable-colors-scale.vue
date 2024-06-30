<script lang="ts" setup>
import AppSelect from 'src/app/select/app-select.vue';
import {useColorSelection} from 'src/components/scatter/use-color-selection';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {COLOR_FLAVORS} from 'src/constants';

const {flavor} = useColorSelection();
const {isLoading} = useScatterLoading();
useRefProvide('colors/flavor', flavor);
</script>

<template>
  <AppSelect
    :disabled="isLoading"
    :options="COLOR_FLAVORS"
    class="select"
    injection-key="colors/flavor"
    size="small"
    tooltip="Color scale"
    tooltip-placement="left"
  />
</template>

<style lang="scss" scoped>
.select {
  width: 100%;
}
</style>
