<script lang="ts" setup="">
import {computed} from 'vue';
import {NButton} from 'naive-ui';
import {UMAPSelectionStore} from '../store/UMAP-selection.store';
import {triggerBrowserDownload} from '../utils/trigger-browser-download';
import {convertArrayToText} from '../utils/convert-array-to-text';

const uniqueSelection = computed<string[]>(() => {
  if (UMAPSelectionStore.selection.length === 0) {
    return [];
  }

  const payload = new Set<string>();

  for (const item of UMAPSelectionStore.selection) {
    item?.label && payload.add(item?.label);
  }

  return [...payload];
});

const isActive = computed<boolean>(() => uniqueSelection.value.length > 0);

function handleExport() {
  if (uniqueSelection.value.length === 0) {
    return;
  }

  triggerBrowserDownload({
    data: convertArrayToText(uniqueSelection.value),
    filename: 'UMAP_Selection.txt',
  });
}

</script>

<template>
  <div v-if="isActive">
    <div class="title">
      <span>Selection</span>
      <n-button size="tiny" @click="handleExport">Export</n-button>
    </div>
    <div class="content">
      <span v-for="item in uniqueSelection">
        {{ item }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  font-size: x-small;
  overflow: hidden auto;
  height: 6rem;

  display: flex;
  flex-direction: column;
}
</style>
