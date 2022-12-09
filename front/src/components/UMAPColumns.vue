<script lang="ts" setup="">
import {computed, onMounted} from 'vue';
import {NGi, NGrid, NTag} from 'naive-ui';
import {useConfig} from '../composables/useConfig';
import UMAPColumnsCheckboxes from './UMAPColumnsCheckboxes.vue';
import {UMAPColumnsStore} from '../store/UMAP-columns.store';

const {columns, columnsNames} = await useConfig();
console.log(columns);
const {columns: selection} = UMAPColumnsStore;
const columnsKeys = computed(() => columns && Object.keys(columns));

function initializeColumnsSelection() {
  if (!columns || !columnsNames || !columnsKeys.value) {
    return;
  }

  for (let i = 0; i < columnsKeys.value.length; ++i) {
    selection[columnsKeys.value[i]] = [];
  }
}

onMounted(initializeColumnsSelection);
</script>

<template>
  <n-grid :cols="2" class="grid" x-gap="12">
    <n-gi v-for="(_column, index) in columnsNames">
      <n-tag :bordered="false" class="tag" size="small">{{ columnsNames[index] }}</n-tag>
      <UMAPColumnsCheckboxes :items="columns[columnsKeys[index]]" :title="index.toString()" />
    </n-gi>
  </n-grid>
</template>

<style lang="scss" scoped>
.tag {
  margin: 0.5rem 0;
  user-select: none;

  &:hover {
    cursor: not-allowed;
  }
}
</style>
