<script lang="ts" setup="">
import {NButton} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {watch} from 'vue';

const {isClipping, fade} = useAudioAnalyser();
watch(isClipping, fade);
</script>

<template>
  <AppTooltip tooltip="Peak detection">
    <NButton
      :class="[$style.peak, {[$style.peaking]: isClipping}]"
      disabled
      size="tiny"
    >
      <span>PEAK</span>
    </NButton>
  </AppTooltip>
</template>

<style lang="scss" module>
.peak {
  position: absolute;
  bottom: -394px;
  width: $p0 * 3;
  cursor: default;
  transition: none;
  opacity: 1 !important;
  border-radius: $g0;

  & > :nth-child(2) {
    background: $green;
  }

  & > :nth-child(1) {
    font-weight: bold;
    position: relative;
    z-index: 200;
    display: none;
    transform: translate3d(-$p0 - 1px, -$g0 * 5 + 1px, 0);
  }
}

.peaking {
  & > :nth-child(2) {
    background: $red-deep;
  }

  & > :nth-child(1) {
    display: inline-block;
  }
}
</style>
