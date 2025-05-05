<script lang="ts" setup>
import {useElementSize} from '@vueuse/core';
import {useBodyHandlers} from 'src/components/timeline/body/use-body-handlers';
import {useBodyLifecycles} from 'src/components/timeline/body/use-body-lifecycles';
import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {useThemeColors} from 'src/composables/use-theme-colors';

const {container, canvas, height} = useTimelineDom().body;
const {width} = useElementSize(container);
const {handleMouseLeave, handleMouseMove, isHovering, handleClick} =
  useBodyHandlers();

const {colors} = useThemeColors();

useBodyLifecycles({width});
</script>

<template>
  <div
    ref="container"
    :class="$style.container"
  >
    <canvas
      ref="canvas"
      :class="{[$style.hovering]: isHovering}"
      :height="height"
      :width="width"
      @click="handleClick"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
    />
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/borders';
@use 'src/styles/scrolls';
@use 'src/styles/sizes';

.container {
  display: flex;
  overflow: auto;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-height: sizes.$h0;

  @include borders.border-0(v-bind('colors.borderColor'));
  @include scrolls.tiny-scrollbar;
}

.hovering {
  cursor: pointer;
}
</style>
