<script lang="ts" setup="">
import {useTimelineConfig} from 'src/draggables/calendar/use-timeline-config';
import {useTimelineContext} from 'src/draggables/calendar/use-timeline-context';
import {useTimelineHandlers} from 'src/draggables/calendar/use-timeline-handlers';
import {useTimelineLifecycles} from 'src/draggables/calendar/use-timeline-lifecycles';

const {container, canvas} = useTimelineContext();
const {height, config} = useTimelineConfig();
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
      ref="canvas"
      :class="{[$style.hovering]: isHovering}"
      :height="height"
      :width="config.width"
      @click="handleClick"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
    />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  overflow: auto;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-height: $h0;
  margin-top: $p0;
}

.hovering {
  cursor: pointer;
}
</style>
