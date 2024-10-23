<script lang="ts" setup>
import {useElementSize} from '@vueuse/core';
import {useOverviewHandlers} from 'src/components/timeline/overview/use-overview-handlers';
import {useOverviewLifecycles} from 'src/components/timeline/overview/use-overview-lifecycles';
import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';

const {container, canvas} = useTimelineDom().overview;
const {width, height} = useElementSize(container);
const {handleMouseDown, handleMouseLeave, handleMouseUp, handleMouseMove} =
  useOverviewHandlers();

useOverviewLifecycles({width: width, height: height});
</script>

<template>
  <div
    ref="container"
    :class="$style.container"
  >
    <canvas
      ref="canvas"
      :height="height"
      :style="{width: width + 'px', height: height + 'px'}"
      :width="width"
      @mousedown="handleMouseDown"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
    />
  </div>
</template>

<style lang="scss" module>
.container {
  width: 100%;
  height: $p0 * 4;
  user-select: none;
  background: white;

  @include border-0;
}
</style>
