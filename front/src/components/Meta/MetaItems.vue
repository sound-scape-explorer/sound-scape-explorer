<script lang="ts" setup="">
import {NGi, NGrid, NTag} from 'naive-ui';
import {ref, watch} from 'vue';
import MetaSelection from './MetaSelection.vue';
import {metaSelectionStore} from './metaSelectionStore';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {metaSetsRef} from 'src/hooks/useStorageMetaSets';

const metaSetsIndexesRef = ref();

watch([metaPropertiesRef, metaSetsRef], () => {
  if (metaPropertiesRef.value === null || metaSetsRef.value === null) {
    return;
  }

  metaSetsIndexesRef.value = Object.keys(metaSetsRef.value);

  for (let i = 0; i < metaPropertiesRef.value.length; i += 1) {
    metaSelectionStore.selection[i] = Object.assign({});
  }
});
</script>

<template>
  <n-grid
    :cols="2"
    class="grid"
    x-gap="12"
  >
    <n-gi v-for="(_, m) in metaPropertiesRef.value">
      <n-tag
        :bordered="false"
        class="tag"
        size="small"
      >
        {{ metaPropertiesRef.value?.[m] }}
      </n-tag>

      <MetaSelection
        :index="m"
        :items="metaSetsRef.value?.[metaSetsIndexesRef[m]] ?? []"
        :title="metaPropertiesRef.value?.[m] ?? ''"
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
