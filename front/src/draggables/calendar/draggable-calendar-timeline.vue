<script lang="ts" setup="">
import {useTimelineConfig} from 'src/draggables/calendar/use-timeline-config';
import {useTimelineContext} from 'src/draggables/calendar/use-timeline-context';
import {useTimelineHandlers} from 'src/draggables/calendar/use-timeline-handlers';
import {useTimelineLifecycles} from 'src/draggables/calendar/use-timeline-lifecycles';

const {container, containerWidth, canvas} = useTimelineContext();
const {height} = useTimelineConfig();
const {handleMouseLeave, handleMouseMove, isHovering, handleClick} =
  useTimelineHandlers();

useTimelineLifecycles();
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
