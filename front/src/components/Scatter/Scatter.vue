<script lang="ts" setup>
import {ref, unref, watch} from 'vue';
import {scatterStore} from './scatterStore';
import {useScatter} from './useScatter';

const containerRef = ref<HTMLDivElement>();
const {load} = useScatter();

watch(containerRef, () => {
  const container = unref(containerRef);

  if (!container) {
    return;
  }

  scatterStore.container = container;
  load(container);
});
</script>

<template>
  <div ref="containerRef" class="container" />
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
