<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import {useUMAPExport} from '../composables/useUMAPExport';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {UMAPColumnsStore} from '../store/UMAP-columns.store';
import {UMAPQueryStore} from '../store/UMAP-query.store';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import {UMAPQueryComplexStore} from '../store/UMAP-query-complex.store';
import {useConfig} from '../composables/useConfig';
import Button from './Button.vue';

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

  const {queryComplex} = UMAPQueryComplexStore;

  if (queryComplex) {
    name += `_CQ_${Object.values(queryComplex).flat()}`;
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

  const configPromise = useConfig();

  configPromise.then(({columnsNames}) => {
    parse(dataset, name, columnsNames);
  });
}
</script>

<template>
  <Button :disabled="isDisabled" :handle-click="handleClick" :loading-ref="loadingRef" text=".JSON">
    <download-outline />
  </Button>
</template>

<style lang="scss" scoped>

</style>
