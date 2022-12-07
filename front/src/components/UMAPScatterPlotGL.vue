<script lang="ts" setup>
import {useUMAPComponent} from '../composables/useUMAPComponent';

const {containerRef} = useUMAPComponent();
</script>

<template>
  <div ref="containerRef" class="container"/>
</template>

<style lang="scss" scoped>
.container {
  height: 400px;
  position: relative;
}
</style>
