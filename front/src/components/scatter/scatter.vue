<script lang="ts" setup>
import {useScatterContainer} from 'src/components/scatter/use-scatter-container';
import {useScatterLifecycles} from 'src/components/scatter/use-scatter-lifecycles';
import {computed} from 'vue';

const {container, isLocked} = useScatterContainer();
const pointerEvents = computed(() => (isLocked.value ? 'none' : 'all'));
useScatterLifecycles();
</script>

<template>
  <div
    ref="container"
    :class="$style.container"
  />
</template>

<style lang="scss" module>
.container {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  pointer-events: v-bind(pointerEvents);
}
</style>
