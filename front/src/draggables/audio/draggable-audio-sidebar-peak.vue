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
      :class="{peaking: isClipping}"
      class="peak"
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
  bottom: -394px;

  width: $p0 * 3;

  background: $green;
  transition: none;

  cursor: default;
  opacity: 1;

  span {
    font-weight: bold;
    position: relative;
    transform: translate3d(-$p0 - 1px, -$g0 * 5 + 1px, 0);
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
