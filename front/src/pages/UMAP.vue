<script lang="ts" setup>
import Selection from '../components/Selection.vue';
import Title from '../components/Title.vue';
import UMAPAlphas from '../components/UMAPAlphas.vue';
import UMAPExport from '../components/UMAPExport.vue';
import UMAPFiltersColorScales from '../components/UMAPFiltersColorScales.vue';
import UMAPFiltersColorTypes from '../components/UMAPFiltersColorTypes.vue';
import UMAPFiltersTags from '../components/UMAPFiltersTags.vue';
import UMAPLegend from '../components/UMAPLegend.vue';
import UMAPQuery from '../components/UMAPQuery.vue';
import UMAPQueryComplex from '../components/UMAPQueryComplex.vue';
import UMAPScatterPlotGL from '../components/UMAPScatterPlotGL.vue';
import UMAPScreenshot from '../components/UMAPScreenshot.vue';
import UMAPTimeRangeOptions from '../components/UMAPTimeRangeOptions.vue';
import UMAPTimeRangeSlider from '../components/UMAPTimeRangeSlider.vue';
import {useStorage} from '../composables/useStorage';
import {useUMAPPage} from '../composables/useUMAPPage';

const {
  getStorageBands,
  getStorageIntegrations,
} = await useStorage();

const {delayUpdate} = useUMAPPage();

const bands = await getStorageBands();
const bandsNames = Object.keys(bands);
const integrations = await getStorageIntegrations();
</script>

<template>
  <div class="container">
    <div class="options">
      <Title text="UMAP" />

      <div class="row">
        <Selection
            :bands="bandsNames"
            :callback="delayUpdate"
            :integrations="integrations"
        />
        <UMAPFiltersColorTypes />
        <UMAPFiltersColorScales />
        <UMAPScreenshot class="flex" />
      </div>

      <div class="row">
        <UMAPFiltersTags />
        <UMAPQuery />
        <UMAPQueryComplex />

        <div class="flex">
          <UMAPAlphas />
        </div>

        <div class="flex">
          <UMAPExport />
        </div>
      </div>

      <UMAPTimeRangeOptions />
      <UMAPTimeRangeSlider />
    </div>

    <div class="scatter">
      <UMAPScatterPlotGL />
    </div>
  </div>

  <UMAPLegend />
</template>

<style lang="scss" scoped>
.container {
  height: 100%;

  display: grid;
  grid-template-rows: auto 1fr;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.row {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 11rem;
  gap: 0.8rem;
  justify-items: center;
  align-items: center;
}

.query-complex {
  grid-column: 3 / span 2;
}

.flex {
  display: flex;
  width: 100%;
  gap: 0.8rem;
}

.scatter {
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
}

.float {
}
</style>
