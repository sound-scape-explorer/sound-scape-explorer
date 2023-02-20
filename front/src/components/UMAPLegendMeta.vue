<script lang="ts" setup="">
import {NGi, NGrid, NTag} from 'naive-ui';
import {computed, onMounted} from 'vue';
import {useStorage} from '../composables/useStorage';
import {UMAPMetaStore} from '../store/UMAP-meta.store';
import UMAPMetaSelection from './UMAPLegendMetaSelection.vue';

const {
  getStorageMetas,
} = await useStorage();

const metas = await getStorageMetas();

const metaProperties = Object.keys(metas);
const metaSets = Object.values(metas);
const metaSetsIndexes = computed(() => Object.keys(metaSets));

function initializeMetaSelection() {
  if (!metaSetsIndexes.value) {
    return;
  }

  for (const index of metaSetsIndexes.value) {
    UMAPMetaStore.metaSelection[index] = [];
  }
}

onMounted(initializeMetaSelection);
</script>

<template>
  <n-grid :cols="2" class="grid" x-gap="12">
    <!--suppress JSUnusedLocalSymbols -->
    <n-gi v-for="(_meta, index) in metaProperties">
      <n-tag
          :bordered="false"
          class="tag"
          size="small"
      >
        {{ metaProperties[index] }}
      </n-tag>

      <UMAPMetaSelection
          :index="index"
          :items="metaSets[metaSetsIndexes[index]]"
          :title="metaProperties[index]"
      />
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
