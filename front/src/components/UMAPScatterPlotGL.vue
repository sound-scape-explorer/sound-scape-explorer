<script lang="ts" setup>
import {useUMAPComponent} from '../composables/useUMAPComponent';

const {containerRef} = useUMAPComponent();
</script>

<template>
  <div ref="containerRef" class="container" />
</template>

<style lang="scss" scoped>
.container {
  height: 500px;
  position: relative;
}

@media screen and (max-width: 1200px) {
  .container {
    height: 400px;
  }
}

@media screen and (max-width: 800px) {
  .container {
    height: 300px;
  }
}
</style>
