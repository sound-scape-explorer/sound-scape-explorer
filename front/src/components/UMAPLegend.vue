<script lang="ts" setup="">
import {computed, ref} from 'vue';
import UMAPLegendGradient from './UMAPLegendGradient.vue';
import {useColors} from '../composables/useColors';
import UMAPLegendSelection from './UMAPLegendSelection.vue';

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
    <div>
      Legend
    </div>

    <UMAPLegendGradient
        :array="gradientColors"
        max="max"
        med="med"
        min="min"
    />

    <UMAPLegendSelection v-if="isHover" />
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

  transition: width 120ms ease-in-out,
  border 120ms ease-in-out,
  background-color 120ms ease-in-out;

  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.close {
  width: 13%;
  height: 13%;
  //max-height: 13%;

  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: max-height 240ms ease-out,
  height 120ms ease-out,
  width 120ms ease-out;

  @media screen and (max-width: 800px) {
    & {
      width: 30%;
    }
  }

  @media screen and (max-width: 1200px) {
    & {
      width: 30%;
    }
  }
}

.open {
  width: 20%;
  height: 25%;
  //max-height: 50%;

  border: 1px solid rgba(0, 0, 0, 0.8);
  transition: max-height 240ms ease-in,
  height 120ms ease-in,
  width 120ms ease-in;

  @media screen and (max-width: 800px) {
    & {
      width: 60%;
    }
  }

  @media screen and (max-width: 1200px) {
    & {
      width: 40%;
    }
  }
}
</style>
