<script lang="ts" setup>
import {useScatterContainer} from './useScatterContainer';

const {containerRef} = useScatterContainer();
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
