<script lang="ts" setup>
import UMAPFiltersTags from '../components/UMAPFiltersTags.vue';
import UMAPFiltersColors from '../components/UMAPFiltersColors.vue';

//
</script>

<template>
  <div class="flex">
    <UMAPFiltersTags />
    <UMAPFiltersColors />
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  gap: 1rem;
}
</style>
