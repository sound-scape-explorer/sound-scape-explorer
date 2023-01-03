<script lang="ts" setup>
import Title from '../components/Title.vue';
import UMAPScatterPlotGL from '../components/UMAPScatterPlotGL.vue';
import UMAPTimeRange from '../components/UMAPTimeRange.vue';
import UMAPFilters from '../components/UMAPFilters.vue';
import UMAPQuery from '../components/UMAPQuery.vue';
import UMAPMeta from '../components/UMAPMeta.vue';
import {useConfig} from '../composables/useConfig';
import {useUMAPPage} from '../composables/useUMAPPage';
import UMAPExport from '../components/UMAPExport.vue';
import UMAPQueryComplex from '../components/UMAPQueryComplex.vue';
import Selection from '../components/Selection.vue';
import UMAPAlphas from '../components/UMAPAlphas.vue';
import UMAPLegend from '../components/UMAPLegend.vue';

const {bands, intervalLabels} = await useConfig();
const {delayUpdate} = useUMAPPage();
</script>

<template>
  <Title text="UMAP" />
  <UMAPScatterPlotGL />
  <UMAPLegend />
  <div class="tools-container">
    <Selection :bands="bands" :callback="delayUpdate" :intervals="intervalLabels" />
    <div class="filters">
      <UMAPFilters />
    </div>
    <div class="two-columns">
      <UMAPQuery />
      <UMAPAlphas />
    </div>
    <div class="two-columns">
      <UMAPQueryComplex />
      <UMAPExport />
    </div>
    <UMAPTimeRange />
    <UMAPMeta />
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

.two-columns {
  display: grid;
  grid-template-columns: 1fr repeat(2, 5rem);
  gap: 1rem;
  align-items: center;
}
</style>
