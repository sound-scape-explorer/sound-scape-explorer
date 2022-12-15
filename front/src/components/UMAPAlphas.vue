<script lang="ts" setup="">
import {NInputNumber} from 'naive-ui';
import {UMAPStore} from '../store/UMAP.store';
import {useUMAPStatus} from '../composables/useUMAPStatus';

const {isDisabled} = useUMAPStatus();

//
</script>

<template>
  <div class="input">
    <span><strong>α</strong> filtered</span>
    <n-input-number
        v-model:value="UMAPStore.alpha.low"
        :disabled="isDisabled"
        max="1"
        min="0"
        size="tiny"
        step="0.01"
    />
  </div>
  <div class="input">
    <span><strong>α</strong> collected</span>
    <n-input-number
        v-model:value="UMAPStore.alpha.high"
        :disabled="isDisabled"
        max="1"
        min="0"
        size="tiny"
        step="0.01"
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
