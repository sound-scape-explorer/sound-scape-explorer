<script lang="ts" setup="">
import type {InputNumberProps} from 'naive-ui';
import {NInputNumber, NTooltip} from 'naive-ui';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {UMAPStore} from '../store/UMAP.store';

const {isDisabled} = useUMAPStatus();

type InputNumberThemeOverrides = NonNullable<InputNumberProps['themeOverrides']>

const inputNumberThemeOverrides: InputNumberThemeOverrides = {
  peers: {
    Input: {
      fontSizeTiny: '0.6rem',
    },
  },
};

//
</script>

<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <n-input-number
          v-model:value="UMAPStore.alpha.low"
          :disabled="isDisabled"
          :theme-overrides="inputNumberThemeOverrides"
          class="input"
          max="1"
          min="0"
          size="tiny"
          step="0.001"
      />
    </template>
    <span>Filtered dots opacity</span>
  </n-tooltip>

  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <n-input-number
          v-model:value="UMAPStore.alpha.high"
          :disabled="isDisabled"
          :theme-overrides="inputNumberThemeOverrides"
          class="input"
          max="1"
          min="0"
          size="tiny"
          step="0.05"
      />
    </template>
    <span>Collected dots opacity</span>
  </n-tooltip>

</template>

<style lang="scss" scoped>
.input {
  display: flex;
}
</style>
