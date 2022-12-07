<script lang="ts" setup>
import Title from '../components/Title.vue';
import SelectionTable2d from '../components/SelectionTable.vue';
import SelectionImage from '../components/SelectionImage.vue';
import UMAPScatterPlotGL from '../components/UMAPScatterPlotGL.vue';
import UMAPTimeRange from '../components/UMAPTimeRange.vue';
import UMAPFilters from '../components/UMAPFilters.vue';
import UMAPQuery from '../components/UMAPQuery.vue';
import UMAPColumns from '../components/UMAPColumns.vue';
import {useConfig} from '../composables/useConfig';
import {useUMAPPage} from '../composables/useUMAPPage';

const {bands, intervalLabels} = await useConfig();
const {image, handleUpdate} = useUMAPPage();
</script>

<template>
  <Title text="UMAP" />
  <UMAPScatterPlotGL />
  <div class="tools-container">
    <UMAPFilters />
    <UMAPQuery />
    <UMAPTimeRange />
    <UMAPColumns />
  </div>
  <SelectionTable2d :callback="handleUpdate" :xs="bands" :ys="intervalLabels" />
  <SelectionImage v-if="image" :source="image" />
</template>

<style lang="scss" scoped>
.tools-container {
  display: grid;
  gap: 1rem;
}
</style>
