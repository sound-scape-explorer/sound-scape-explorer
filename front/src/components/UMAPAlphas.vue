<script lang="ts" setup="">
import type {InputNumberProps} from 'naive-ui';
import {NInputNumber} from 'naive-ui';
import {UMAPStore} from '../store/UMAP.store';
import {useUMAPStatus} from '../composables/useUMAPStatus';

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
  <div class="input">
    <span><strong>α</strong> filtered</span>
    <n-input-number
        v-model:value="UMAPStore.alpha.low"
        :disabled="isDisabled"
        :theme-overrides="inputNumberThemeOverrides"
        max="1"
        min="0"
        size="tiny"
        step="0.001"
    />
  </div>
  <div class="input">
    <span><strong>α</strong> collected</span>
    <n-input-number
        v-model:value="UMAPStore.alpha.high"
        :disabled="isDisabled"
        :theme-overrides="inputNumberThemeOverrides"
        max="1"
        min="0"
        size="tiny"
        step="0.05"
    />
  </div>
</template>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  justify-content: center;

  > span {
    font-size: 0.6rem;
    font-style: italic;
    transform: scale3d(1.2, 1.2, 1.2) translate3d(7px, -1px, 0);
    user-select: none;

    > strong {
      font-weight: bold;
    }
  }
}
</style>
