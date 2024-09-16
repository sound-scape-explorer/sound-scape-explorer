<script lang="ts" setup="">
import {NButton} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {useDraggableAudioSidebarPeak} from 'src/draggables/audio/use-draggable-audio-sidebar-peak';
import {watch} from 'vue';

const {classNames} = useDraggableAudioSidebarPeak();
const {isClipping, fade} = useAudioAnalyser();
watch(isClipping, fade);
</script>

<template>
  <AppTooltip tooltip="Peak detection">
    <NButton
      :class="classNames"
      disabled
      size="tiny"
    >
      <span>PEAK</span>
    </NButton>
  </AppTooltip>
</template>

<style lang="scss" scoped>
.peak {
  position: absolute;
  bottom: -405px;

  width: 2em;

  background: $green;
  transition: none;

  cursor: default;
  opacity: 1;

  span {
    font-weight: bold;
    position: relative;
    transform: translate3d(-9px, -20px, 0);
    z-index: 200;
    display: none;
  }
}

.peaking {
  background: $redDeep;

  span {
    display: inline-block;
  }
}
</style>
