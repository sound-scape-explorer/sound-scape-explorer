<script lang="ts" setup="">
import AppInput from 'src/app/input/app-input.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useClientSettings} from 'src/composables/use-client-settings';

const {isLoading} = useScatterLoading();
const {colorsAlphaLow: low, colorsAlphaHigh: high} = useClientSettings();
</script>

<template>
  <h2>Opacity</h2>

  <div :class="$style.flex">
    <AppInput
      v-model="low"
      :disabled="isLoading"
      :max="1"
      :min="0.001"
      :step="0.001"
      align="left"
      size="small"
      tooltip="Opacity for excluded points"
      tooltip-placement="bottom"
      type="number"
    />

    <AppInput
      v-model="high"
      :disabled="isLoading"
      :max="1"
      :min="0"
      :step="0.05"
      align="left"
      size="small"
      tooltip="Opacity for collected points"
      tooltip-placement="bottom"
      type="number"
    />
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.flex {
  align-items: center;
  display: flex;
  gap: sizes.$g0;
  justify-content: center;
}
</style>
