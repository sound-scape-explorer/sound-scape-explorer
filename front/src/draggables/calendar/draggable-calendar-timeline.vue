<script lang="ts" setup="">
import {useTimelineConfig} from 'src/draggables/calendar/use-timeline-config';
import {useTimelineContext} from 'src/draggables/calendar/use-timeline-context';
import {useTimelineDrawBackground} from 'src/draggables/calendar/use-timeline-draw-background';
import {useTimelineDrawElements} from 'src/draggables/calendar/use-timeline-draw-elements';
import {useTimelineDrawRows} from 'src/draggables/calendar/use-timeline-draw-rows';
import {useTimelineDrawTicks} from 'src/draggables/calendar/use-timeline-draw-ticks';
import {useTimelineDrawTooltip} from 'src/draggables/calendar/use-timeline-draw-tooltip';
import {useTimelineHandlers} from 'src/draggables/calendar/use-timeline-handlers';
import {watch} from 'vue';

const {container, containerWidth, canvas, context, mountContext, hovered} =
  useTimelineContext();
const {config, height, refresh} = useTimelineConfig();
const {drawBackground} = useTimelineDrawBackground();
const {drawTicks} = useTimelineDrawTicks();
const {drawRows} = useTimelineDrawRows();
const {drawElements} = useTimelineDrawElements();
const {drawTooltip} = useTimelineDrawTooltip();
const {handleMouseLeave, handleMouseMove, isHovering, handleClick, position} =
  useTimelineHandlers();

const render = () => {
  if (!context.value || config.value.width === 0) {
    return;
  }

  drawBackground();
  drawRows();
  drawTicks();
  drawElements();
  drawTooltip();
};

watch(canvas, mountContext);
watch([container, canvas, context, containerWidth, hovered, position], render);
watch(containerWidth, () => refresh(containerWidth.value));
</script>

<template>
  <div
    ref="container"
    class="container"
  >
    <canvas
      v-if="containerWidth > 0"
      ref="canvas"
      :class="{hovering: isHovering}"
      :height="height"
      :width="containerWidth"
      @click="handleClick"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-top: $p0;
  width: calc($s2 - $p0 * 7);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.hovering {
  cursor: pointer;
}
</style>
