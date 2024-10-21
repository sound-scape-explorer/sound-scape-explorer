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
    :class="$style.container"
  >
    <canvas
      v-if="containerWidth > 0"
      ref="canvas"
      :class="{[$style.hovering]: isHovering}"
      :height="height"
      :width="containerWidth"
      @click="handleClick"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
    />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: calc($s2 - $p0 * 7);
  padding-top: $p0;
}

.hovering {
  cursor: pointer;
}
</style>
