<script lang="ts" setup>
import Selection from '../components/Selection.vue';
import Title from '../components/Title.vue';
import UMAPAlphas from '../components/UMAPAlphas.vue';
import UMAPExport from '../components/UMAPExport.vue';
import UMAPFilters from '../components/UMAPFilters.vue';
import UMAPLegend from '../components/UMAPLegend.vue';
import UMAPQuery from '../components/UMAPQuery.vue';
import UMAPQueryComplex from '../components/UMAPQueryComplex.vue';
import UMAPScatterPlotGL from '../components/UMAPScatterPlotGL.vue';
import UMAPScreenshot from '../components/UMAPScreenshot.vue';
import UMAPTimeRangeOptions from '../components/UMAPTimeRangeOptions.vue';
import UMAPTimeRangeSlider from '../components/UMAPTimeRangeSlider.vue';
import {useConfig} from '../composables/useConfig';
import {useUMAPPage} from '../composables/useUMAPPage';

const {bands, intervalLabels} = await useConfig();
const {delayUpdate} = useUMAPPage();
</script>

<template>
  <Title text="UMAP" />

  <UMAPLegend />

  <UMAPScatterPlotGL />

  <div class="row">
    <Selection :bands="bands" :callback="delayUpdate" :intervals="intervalLabels" />
    <UMAPScreenshot class="zoom" />
  </div>

  <div class="row">
    <UMAPFilters />
  </div>

  <div class="row two-columns">
    <UMAPQuery />
    <UMAPAlphas />
  </div>

  <div class="row two-columns">
    <UMAPQueryComplex />
    <UMAPExport />
  </div>

  <UMAPTimeRangeOptions />
  <UMAPTimeRangeSlider />
</template>

<style lang="scss" scoped>
.row {
  display: grid;
  grid-template-columns: repeat(2, 1fr) 11rem;
  gap: 1rem;
  padding-bottom: 1rem;
}

.zoom {
  display: flex;
}

.two-columns {
  display: grid;
  grid-template-columns: 1fr repeat(2, 5rem);
  gap: 1rem;
  align-items: center;
}
</style>
