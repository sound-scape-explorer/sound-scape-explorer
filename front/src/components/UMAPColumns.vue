<script lang="ts" setup="">
import {onMounted, ref} from 'vue';
import {useConfig} from '../composables/useConfig';
import UMAPColumnsCheckboxes from './UMAPColumnsCheckboxes.vue';
import {UMAPColumnsStore} from '../store/UMAP-columns.store';

interface Data {
  [column: string]: {
    [item: string]: boolean;
  };
}

const {columns} = await useConfig();
const data = ref<Data>({});
const {columns: columnsSelection} = UMAPColumnsStore;

onMounted(() => {
  if (!columns) {
    return;
  }

  columns.forEach((column, i) => {
    if (typeof data.value[i] === 'undefined') {
      data.value[i] = {};
    }

    column.forEach((item) => {
      data.value[i][item] = false;
    });
  });

  const columnsKeys = Object.keys(columns);

  for (let i = 0; i < columnsKeys.length; ++i) {
    columnsSelection[columnsKeys[i]] = [];
  }
});
</script>

<template>
  <div class="container">
    <div v-for="(column, index) in columns">
      <h2>{{ index }}</h2>
      <UMAPColumnsCheckboxes :items="column" :title="index.toString()" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
</style>
