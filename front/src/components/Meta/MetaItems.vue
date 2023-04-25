<script lang="ts" setup="">
import {NGi, NGrid, NTag} from 'naive-ui';
import {ref, watch} from 'vue';
import {storage} from '../../storage/storage';
import {useStorage} from '../../storage/useStorage';
import MetaSelection from './MetaSelection.vue';
import {metaSelectionStore} from './metaSelectionStore';

const {metaPropertiesRef, metaSetsRef} = await useStorage();

/**
 * State
 */

const metaSetsIndexesRef = ref();

/**
 * Handlers
 */

function handleStorageUpdate() {
  const metaProperties = metaPropertiesRef.value;
  const metaSets = metaSetsRef.value;

  if (metaProperties === null || metaSets === null) {
    return;
  }

  metaSetsIndexesRef.value = Object.keys(metaSets);

  for (let i = 0; i < metaProperties.length; i += 1) {
    metaSelectionStore.selection[i] = Object.assign({});
  }
}

/**
 * Lifecycles
 */

watch(storage, handleStorageUpdate);
</script>

<template>
  <n-grid
    :cols="2"
    class="grid"
    x-gap="12"
  >
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
        :items="metaSetsRef[metaSetsIndexesRef[index]]"
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
