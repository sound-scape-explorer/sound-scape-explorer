<script lang="ts" setup>
import VuMeter from 'src/components/vu-meter/vu-meter.vue';
import {useThemeColors} from 'src/composables/use-theme-colors';
import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';
import {computed} from 'vue';

const {rms, isClipping} = useAudioAnalyser();
const {isPlaying} = useAudioTransport();
const width = 8;
const span = computed(() => (isClipping.value ? 'flex' : 'none'));
const {colors} = useThemeColors();
</script>

<template>
  <div :class="[$style.container, {[$style.hide]: !isPlaying}]">
    <span>PEAK</span>
    <VuMeter
      :height="127"
      :value="rms"
      :width="width"
      show-peaks
    />
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/transitions';

.container {
  position: absolute;
  bottom: -394px;
  transform: translate3d(9px, 4px, 0);
  opacity: 1;
  background: transparent;

  @include transitions.transition-vumeter;

  & > span {
    font-size: 80%;
    font-weight: bold;
    position: absolute;
    display: v-bind(span);
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 40px;
    transform: translate3d(0, -8px, 0);
    text-align: center;
    color: v-bind('colors.errorColor');
  }
}

.hide {
  opacity: 0;
}
</style>
