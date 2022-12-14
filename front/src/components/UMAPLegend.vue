<script lang="ts" setup="">
import {computed, ref} from 'vue';
import UMAPLegendGradient from './UMAPLegendGradient.vue';
import {useColors} from '../composables/useColors';

const isHover = ref<boolean>(false);
const {colors} = useColors();

const gradientColors = computed<string[]>(() => colors.value.colors(100));

function enableHover() {
  isHover.value = true;
}

function disableHover() {
  isHover.value = false;
}

const containerClasses = computed<string>(() => {
  let classes = 'container';

  isHover.value ? classes += ' open' : classes += ' close';

  return classes;
});
</script>

<template>
  <div
      :class="containerClasses"
      @mouseenter="enableHover"
      @mouseleave="disableHover"
  >
    <div class="title">Legend</div>
    <UMAPLegendGradient
        :array="gradientColors"
        max="max"
        med="med"
        min="min"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 1rem;
  right: 2rem;

  z-index: 90;

  padding: 0.6rem 0.9rem;

  background-color: ghostwhite;

  transition: width 120ms ease-in-out, height 120ms ease-in-out, border 120ms ease-in-out, background-color 120ms ease-in-out;
}

.close {
  height: 15%;
  width: 15%;

  border: 1px solid rgba(0, 0, 0, 0.1);
}

.open {
  height: 25%;
  width: 25%;

  border: 1px solid rgba(0, 0, 0, 0.8);
  cursor: crosshair;
}

.title {
  margin-bottom: 0.6rem;
}
</style>
