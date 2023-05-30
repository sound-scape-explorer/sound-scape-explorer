<script lang="ts" setup="">
import type {InputNumberProps} from 'naive-ui';
import {NInputNumber, NTooltip} from 'naive-ui';
import {isDatasetReadyRef} from '../Scatter/useScatterDataset';
import {alphaLowRef, alphaHighRef} from '../Scatter/useScatterColorScale';

type InputNumberThemeOverrides = NonNullable<
  InputNumberProps['themeOverrides']
>;

const inputNumberThemeOverrides: InputNumberThemeOverrides = {
  peers: {
    Input: {
      fontSizeTiny: '0.6rem',
    },
  },
};
</script>

<template>
  <n-tooltip
    placement="right"
    trigger="hover"
  >
    <template #trigger>
      <n-input-number
        v-model:value="alphaLowRef.value"
        :disabled="!isDatasetReadyRef.value"
        :theme-overrides="inputNumberThemeOverrides"
        class="input"
        max="1"
        min="0.005"
        size="small"
        step="0.005"
      />
    </template>
    <span>Opacity for excluded points</span>
  </n-tooltip>

  <n-tooltip
    placement="right"
    trigger="hover"
  >
    <template #trigger>
      <n-input-number
        v-model:value="alphaHighRef.value"
        :disabled="!isDatasetReadyRef.value"
        :theme-overrides="inputNumberThemeOverrides"
        class="input"
        max="1"
        min="0"
        size="small"
        step="0.05"
      />
    </template>
    <span>Opacity for collected points</span>
  </n-tooltip>
</template>

<style lang="scss" scoped>
.input {
  display: flex;
  width: 100%;
}
</style>
