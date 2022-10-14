<script lang="ts" setup>
import {computed} from 'vue';
import {NSelect} from 'naive-ui';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';
import {VariableType} from '../types/variable.type';
import {selectionStore} from '../store/selection.store';

const variables: VariableType[] = ['sumvar', 'sumstd', 'logprodspan'];

/**
 * State
 */

const options = computed(() => convertToNaiveSelectOptions(variables));
selectionStore.activeVariable = variables[0];

/**
 * Handlers
 */

function selectVariable(nextVariable: VariableType) {
  selectionStore.activeVariable = nextVariable;
}
</script>

<template>
  <n-select
      v-model:value="selectionStore.activeVariable"
      :options="options"
      filterable
      @update:value="selectVariable"
  />
</template>
