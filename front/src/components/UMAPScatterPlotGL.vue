<script lang="ts" setup>
import {ref, watch} from 'vue';
import {UMAPScatterStore} from '../store/UMAP-scatter.store';

const containerRef = ref<null | HTMLDivElement>(null);

watch(containerRef, () => {
  UMAPScatterStore.ref = containerRef.value;
});
//
</script>

<template>
  <div ref="containerRef" class="container" />
</template>

<style lang="scss" scoped>
.container {
  position: relative;

  width: 100%;
  height: 100%;
}
</style>
