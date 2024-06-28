<script lang="ts" setup="">
import AppInput from 'src/app/app-input/app-input.vue';
import {useScatterColorAlpha} from 'src/components/scatter/scatter-color-alpha';
import {useScatterLoading} from 'src/components/scatter/scatter-loading';
import {useRefProvide} from 'src/composables/ref-provide';

const {isLoading} = useScatterLoading();
const {low, high} = useScatterColorAlpha();

useRefProvide('colors/alphaExcluded', low);
useRefProvide('colors/alphaIncluded', high);
</script>

<template>
  <AppInput
    :disabled="isLoading"
    :max="1"
    :min="0.005"
    :step="0.005"
    align="left"
    class="input"
    injection-key="colors/alphaExcluded"
    size="small"
    tooltip="Opacity for excluded points"
    tooltip-placement="left"
    type="number"
  />

  <AppInput
    :disabled="isLoading"
    :max="1"
    :min="0"
    :step="0.05"
    align="left"
    class="input"
    injection-key="colors/alphaIncluded"
    size="small"
    tooltip="Opacity for collected points"
    tooltip-placement="left"
    type="number"
  />
</template>

<style lang="scss" scoped>
.input {
  display: flex;
  width: 100%;
}
</style>
