<script lang="ts" setup>
import {NButton, NIcon} from 'naive-ui';
import {DownloadOutline} from '@vicons/ionicons5';
import {useUMAPExport} from '../composables/useUMAPExport';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {UMAPColumnsStore} from '../store/UMAP-columns.store';
import {UMAPQueryStore} from '../store/UMAP-query.store';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import {UMAPComplexQueryStore} from '../store/UMAP-complex-query.store';

const {loadingRef, parse} = useUMAPExport();
const {isDisabled} = useUMAPStatus();

function handleClick() {
  const {dataset} = UMAPDatasetStore;

  let name = 'SSE_UMAP';

  /**
   * Query
   */

  const {query} = UMAPQueryStore;

  if (query) {
    name += `_Q_${query}`;
  }

  /**
   * Complex Query
   */

  const {complexQuery} = UMAPComplexQueryStore;

  if (complexQuery) {
    name += `_CQ_${complexQuery}`;
  }

  /**
   * Time Range
   */

  const {isAllSelected, start: s, end} = UMAPTimeRangeStore;
  const start = s[0];

  if (!isAllSelected) {
    name += `_${start}-${end}`;
  }

  /**
   * Columns
   */

  const {columns} = UMAPColumnsStore;
  const columnsValues = Object.values(columns);

  columnsValues.map((value, i) => {
    const string = value.join('+');

    if (string === '') {
      return;
    }

    if (i === 0) {
      name += '_C';
    }

    name += `_${string}`;
  });

  console.log(name);
  parse(dataset, name);
}
</script>

<template>
  <n-button :disabled="isDisabled" :loading="loadingRef" @click="handleClick">
    <template #icon>
      <n-icon>
        <download-outline />
      </n-icon>
    </template>
    .JSON
  </n-button>
</template>

<style lang="scss" scoped>

</style>
