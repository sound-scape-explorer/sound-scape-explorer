<script lang="ts" setup="">
import {computed, onMounted} from 'vue';
import {NGi, NGrid, NTag} from 'naive-ui';
import {useConfig} from '../composables/useConfig';
import UMAPMetaSelection from './UMAPLegendMetaSelection.vue';
import {UMAPMetaStore} from '../store/UMAP-meta.store';

const {metaContents, metaProperties} = await useConfig();
const metaContentsIndexes = computed(() => Object.keys(metaContents));

function initializeMetaSelection() {
  if (!metaContentsIndexes.value) {
    return;
  }

  for (const index of metaContentsIndexes.value) {
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
          :items="metaContents[metaContentsIndexes[index]]"
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
