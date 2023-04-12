<script lang="ts" setup="">
import {asyncComputed} from '@vueuse/core';
import {NGi, NGrid, NTag} from 'naive-ui';
import {computed, watch} from 'vue';
import {useStorage} from '../../hooks/useStorage';
import {selectionStore} from '../Selection/selectionStore';
import MetaSelection from './MetaSelection.vue';
import {metaSelectionStore} from './metaSelectionStore';

const {
  getStorageMetas,
} = await useStorage();

const metas = asyncComputed(async () => {
  if (!selectionStore.band || !selectionStore.integration) {
    return;
  }

  return await getStorageMetas(selectionStore.band, selectionStore.integration);
});

const metaPropertiesRef = computed(() => Object.keys(metas.value ?? {}));
const metaSets = computed(() => Object.values(metas.value ?? {}));
const metaSetsIndexes = computed(() => Object.keys(metaSets.value ?? {}));

watch(metaPropertiesRef, () => {
  for (let i = 0; i < metaPropertiesRef.value.length; i += 1) {
    metaSelectionStore.selection[i] = Object.assign({});
  }
});
</script>

<template>
  <n-grid :cols="2" class="grid" x-gap="12">
    <!--suppress JSUnusedLocalSymbols -->
    <n-gi v-for="(_meta, index) in metaPropertiesRef">
      <n-tag
        :bordered="false"
        class="tag"
        size="small"
      >
        {{ metaPropertiesRef[index] }}
      </n-tag>

      <MetaSelection
        :index="index"
        :items="metaSets[metaSetsIndexes[index]]"
        :title="metaPropertiesRef[index]"
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
