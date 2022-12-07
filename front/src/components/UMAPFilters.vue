<script lang="ts" setup>
import UMAPFiltersTags from '../components/UMAPFiltersTags.vue';
import UMAPFiltersColorTypes from './UMAPFiltersColorTypes.vue';
import UMAPFiltersColorScales from './UMAPFiltersColorScales.vue';

//
</script>

<template>
  <div class="container">
    <UMAPFiltersTags />
    <UMAPFiltersColorTypes />
    <UMAPFiltersColorScales />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 10rem 8rem;
  gap: 1rem;
}
</style>
