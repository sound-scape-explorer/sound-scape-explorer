<script lang="ts" setup>
import Title from '../components/Title.vue';
import SelectionImage from '../components/SelectionImage.vue';
import UMAPScatterPlotGL from '../components/UMAPScatterPlotGL.vue';
import UMAPTimeRange from '../components/UMAPTimeRange.vue';
import UMAPFilters from '../components/UMAPFilters.vue';
import UMAPQuery from '../components/UMAPQuery.vue';
import UMAPColumns from '../components/UMAPColumns.vue';
import {useConfig} from '../composables/useConfig';
import {useUMAPPage} from '../composables/useUMAPPage';
import UMAPExport from '../components/UMAPExport.vue';
import UMAPQueryComplex from '../components/UMAPQueryComplex.vue';
import SelectionDropdown from '../components/SelectionDropdown.vue';
import {modalLoadingStore} from '../store/modal-loading.store';

const {bands, intervalLabels} = await useConfig();
const {handleUpdate} = useUMAPPage();

function delayUpdate(band: string, interval: string) {
  modalLoadingStore.isLoading = true;

  setTimeout(() => {
    handleUpdate({
      band,
      interval,
      callback: () => modalLoadingStore.isLoading = false,
    });
  }, 200);
}
</script>

<template>
  <Title text="UMAP" />
  <UMAPScatterPlotGL />
  <div class="tools-container">
    <div class="selection-container">
      <SelectionDropdown :bands="bands" :handle-update="delayUpdate" :intervals="intervalLabels" />
      <SelectionImage />
    </div>
    <div class="filters">
      <UMAPFilters />
    </div>
    <div class="query-export">
      <UMAPQuery />
      <UMAPExport />
    </div>
    <UMAPQueryComplex />
    <UMAPTimeRange />
    <UMAPColumns />
  </div>
</template>

<style lang="scss" scoped>
.tools-container {
  display: grid;
  gap: 1rem;
  padding-bottom: 1rem;
}

.filters {
  display: grid;
  grid-template-columns: 1fr 12rem 11rem;
  gap: 1rem;
}

.query-export {
  display: grid;
  grid-template-columns: 1fr repeat(2, 5rem);
  gap: 1rem;
}

.selection-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr) 11rem;
  gap: 1rem;
}
</style>
