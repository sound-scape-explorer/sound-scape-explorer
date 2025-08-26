<script lang="ts" setup>
import VuMeter from 'src/components/vu-meter/vu-meter.vue';
import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';
import {computed} from 'vue';

const {rms, isClipping} = useAudioAnalyser();
const {isPlaying} = useAudioTransport();
const width = 8;
const span = computed(() => (isClipping.value ? 'flex' : 'none'));
</script>

<template>
  <div :class="[$style.container, {[$style.hide]: !isPlaying}]">
    <span :class="$style.peak">PEAK</span>
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
  background: transparent;
  bottom: -394px;
  opacity: 1;
  position: absolute;
  transform: translate3d(9px, 4px, 0);

  @include transitions.transition-vumeter;
}

.peak {
  align-items: flex-start;
  color: red;
  display: v-bind(span);
  font-size: 80%;
  font-weight: bold;
  height: 40px;
  justify-content: center;
  position: absolute;
  text-align: center;
  transform: translate3d(0, -8px, 0);
  width: 100%;
}

.hide {
  opacity: 0;
}
</style>
