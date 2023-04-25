<script lang="ts" setup>
import {ref, watch} from 'vue';
import {scatterStore} from './scatterStore';
import {useScatter} from './useScatter';

const containerRef = ref<HTMLDivElement>();
const {load} = await useScatter();

watch(containerRef, () => {
  const container = containerRef.value;

  if (typeof container === 'undefined') {
    return;
  }

  scatterStore.container = container;
  load(container);
});
</script>

<template>
  <div
    ref="containerRef"
    class="container"
  />
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
