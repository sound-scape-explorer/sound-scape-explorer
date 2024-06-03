<script lang="ts" setup>
import {useScatter} from 'src/components/scatter/scatter';
import {useScatterConfig} from 'src/components/scatter/scatter-config';
import {useScatterTraces} from 'src/components/scatter/scatter-traces';
import {onMounted, watch} from 'vue';

const {traces} = useScatterTraces();
const {config} = useScatterConfig();
const {
  container,
  isLocked,
  isMounted,
  isAttached,
  mount,
  attachListeners,
  render,
} = useScatter();

onMounted(mount);

watch([container, isMounted, isAttached], attachListeners);
watch([container, traces, isMounted, isAttached, config], render);
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
  overflow-x: hidden;
}
</style>
