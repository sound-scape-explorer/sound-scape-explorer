<script lang="ts" setup>
import {computed, ref} from 'vue';
import {NSelect} from 'naive-ui';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';

/**
 * State
 */

const {isDisabled} = useUMAPStatus();

const options = ref<string[]>([
  'labelIndex',
  'pointIndex',
  'hour',
  'isDay',
]);

const naiveOptions = computed(() => convertToNaiveSelectOptions(options.value));
</script>

<template>
  <n-select
      v-model:value="UMAPFiltersStore.colorType"
      :disabled="isDisabled"
      :options="naiveOptions"
      default-value="labelIndex"
      placeholder="Color type..."
  />
</template>
