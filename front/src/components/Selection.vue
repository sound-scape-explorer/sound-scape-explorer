<script lang="ts" setup="">
import {defineProps} from 'vue';
import SelectionDropdown from './SelectionDropdown.vue';
import SelectionImage from './SelectionImage.vue';

interface Props {
  bands: string[];
  intervals: string[];
  // eslint-disable-next-line no-unused-vars
  callback: (band: string, interval: string) => void;
}

const {bands, intervals, callback} = defineProps<Props>();
</script>

<template>
  <div class="container">
    <SelectionDropdown :bands="bands" :handle-update="callback" :intervals="intervals" />
    <SelectionImage class="image" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr) 11rem;
  gap: 1rem;
}

.image {
  display: flex;
}
</style>
