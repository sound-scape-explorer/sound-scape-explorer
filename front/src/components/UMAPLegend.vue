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
  let classes = 'container ';

  if (isHover.value) {
    classes += 'container-open';
  } else {
    classes += 'container-close';
  }

  return classes;
});

const moreClasses = computed<string>(() => {
  let classes = 'more ';

  if (isHover.value) {
    classes += 'more-open';
  } else {
    classes += 'more-close';
  }

  return classes;
});
</script>

<template>
  <div
      :class="containerClasses"
      @mouseenter="enableHover"
      @mouseleave="disableHover"
  >
    <div class="title">
      Legend
    </div>

    <UMAPLegendGradient
        :array="gradientColors"
        max="max"
        med="med"
        min="min"
    />

    <div :class="moreClasses">
      <UMAPLegendSelection v-if="isHover" />
    </div>
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

.container-open {
  width: 20%;
  //height: 25%;
  max-height: 50%;

  border: 1px solid rgba(0, 0, 0, 0.8);

  transition: width 120ms ease-in,
  max-height 120ms ease-in,
    //height 120ms ease-in,
  border 120ms ease-in;

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

.container-close {
  width: 13%;
  //height: 13%;
  //max-height: 13%;

  border: 1px solid rgba(0, 0, 0, 0.1);

  transition: width 120ms ease-out,
  max-height 120ms ease-out,
    //height 120ms ease-out,
  border 120ms ease-in;

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

.more {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.more-open {
  opacity: 1;
  transition: opacity 240ms ease-in;
}

.more-close {
  opacity: 0;
  transition: opacity 240ms ease-out;
}

.title {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  font-size: x-small;
  font-weight: bold;
  font-style: italic;
}
</style>
