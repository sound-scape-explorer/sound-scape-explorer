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
  const selection: string[][] = [];

  for (
    let metaPropertyIndex = 0;
    metaPropertyIndex < metaPropertiesRef.value.length;
    metaPropertyIndex += 1
  ) {
    selection[metaPropertyIndex] = [];
  }

  metaSelectionStore.selection = selection;
});

const handleMetaPropertyClick = (metaPropertyIndex: number) => {
  if (metaSetsRef.value === null) {
    return;
  }

  const oldSelection = metaSelectionStore.selection[metaPropertyIndex];
  const metaSet = metaSetsRef.value[metaPropertyIndex];

  const newSelection = [];

  for (const metaValue of metaSet) {
    if (oldSelection.includes(metaValue)) {
      continue;
    }

    newSelection.push(metaValue);
  }

  metaSelectionStore.selection[metaPropertyIndex] = newSelection;
};
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
        @click="() => handleMetaPropertyClick(m)"
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
    cursor: pointer;
  }
}
</style>
