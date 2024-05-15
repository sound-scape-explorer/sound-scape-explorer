<script lang="ts" setup="">
import type {InputNumberProps} from 'naive-ui';
import {NInputNumber, NTooltip} from 'naive-ui';
import {useScatterColorAlpha} from 'src/components/scatter/scatter-color-alpha';
import {useScatterLoading} from 'src/components/scatter/scatter-loading';

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

const {isLoading} = useScatterLoading();
const {low, high} = useScatterColorAlpha();
</script>

<template>
  <NTooltip
    placement="right"
    trigger="hover"
  >
    <!--suppress VueUnrecognizedSlot -->
    <template #trigger>
      <NInputNumber
        v-model:value="low"
        :disabled="isLoading"
        :theme-overrides="inputNumberThemeOverrides"
        class="input"
        max="1"
        min="0.005"
        size="small"
        step="0.005"
      />
    </template>
    <span>Opacity for excluded points</span>
  </NTooltip>

  <NTooltip
    placement="right"
    trigger="hover"
  >
    <!--suppress VueUnrecognizedSlot -->
    <template #trigger>
      <NInputNumber
        v-model:value="high"
        :disabled="isLoading"
        :theme-overrides="inputNumberThemeOverrides"
        class="input"
        max="1"
        min="0"
        size="small"
        step="0.05"
      />
    </template>
    <span>Opacity for collected points</span>
  </NTooltip>
</template>

<style lang="scss" scoped>
.input {
  display: flex;
  width: 100%;
}
</style>
