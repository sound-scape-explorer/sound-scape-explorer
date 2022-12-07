<script lang="ts" setup="">
import {onMounted} from 'vue';
import {NGi, NGrid, NTag} from 'naive-ui';
import {useConfig} from '../composables/useConfig';
import UMAPColumnsCheckboxes from './UMAPColumnsCheckboxes.vue';
import {UMAPColumnsStore} from '../store/UMAP-columns.store';

const {columns, columnsNames} = await useConfig();
const {columns: columnsSelection} = UMAPColumnsStore;

onMounted(() => {
  if (!columns || !columnsNames) {
    return;
  }

  const columnsKeys = Object.keys(columns);

  for (let i = 0; i < columnsKeys.length; ++i) {
    columnsSelection[columnsKeys[i]] = [];
  }
});
</script>

<template>
  <n-grid :cols="2" class="grid" x-gap="12">
    <n-gi v-for="(column, index) in columns">
      <n-tag :bordered="false" class="tag" size="small">{{ columnsNames[index] }}</n-tag>
      <UMAPColumnsCheckboxes :items="column" :title="index.toString()" />
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
