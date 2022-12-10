<script lang="ts" setup>
import {computed} from 'vue';
import {NSelect} from 'naive-ui';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';
import {VariableType} from '../types/variable.type';
import {volumesOptionsStore} from '../store/volumes-options.store';

const variables: VariableType[] = ['sumvar', 'sumstd', 'logprodspan'];

/**
 * State
 */

const options = computed(() => convertToNaiveSelectOptions(variables));
volumesOptionsStore.activeVariable = variables[0];

/**
 * Handlers
 */

function selectVariable(nextVariable: VariableType) {
  volumesOptionsStore.activeVariable = nextVariable;
}
</script>

<template>
  <n-select
      v-model:value="volumesOptionsStore.activeVariable"
      :options="options"
      filterable
      @update:value="selectVariable"
  />
</template>
