<script lang="ts" setup>
import UMAPFiltersTags from '../components/UMAPFiltersTags.vue';
import UMAPFiltersColors from '../components/UMAPFiltersColors.vue';

//
</script>

<template>
  <div class="container">
    <UMAPFiltersTags />
    <UMAPFiltersColors />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 1rem;
}
</style>
