<script lang="ts" setup>
import {computed} from 'vue';
import {NSelect} from 'naive-ui';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';
import {VariableType} from '../types/variable.type';
import {volumesStore} from '../store/volumes.store';

const variables: VariableType[] = ['sumvar', 'sumstd', 'logprodspan'];

/**
 * State
 */

const options = computed(() => convertToNaiveSelectOptions(variables));
volumesStore.activeVariable = variables[0];

/**
 * Handlers
 */

function selectVariable(nextVariable: VariableType) {
  volumesStore.activeVariable = nextVariable;
}
</script>

<template>
  <n-select
      v-model:value="volumesStore.activeVariable"
      :options="options"
      filterable
      @update:value="selectVariable"
  />
</template>
