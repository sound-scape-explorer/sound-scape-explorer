<script lang="ts" setup>
import {useScatter} from 'src/scatter/scatter';

const {container, isLocked} = useScatter();
</script>

<template>
  <div
    ref="container"
    :style="{'--pointer-events': isLocked ? 'none' : 'all'}"
    class="container"
  />
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  pointer-events: var(--pointer-events);
  overflow-y: hidden;
}
</style>
