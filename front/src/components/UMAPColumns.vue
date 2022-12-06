<script lang="ts" setup="">
import {onMounted, ref, watch} from 'vue';
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

onMounted(() => {
  columns?.forEach((column, i) => {
    if (typeof data.value[i] === 'undefined') {
      data.value[i] = {};
    }

    column.forEach((item) => {
      data.value[i][item] = false;
    });
  });
});

console.log(data.value);

const {columns: store} = UMAPColumnsStore;

watch(store, () => {
  console.log(store);
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
