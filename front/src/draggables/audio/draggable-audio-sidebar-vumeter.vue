<script lang="ts" setup="">
import VuMeter from 'src/components/vu-meter/vu-meter.vue';
import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';

const {rms} = useAudioAnalyser();
</script>

<template>
  <div class="container">
    <VuMeter
      :height="127"
      :value="rms"
      :width="24 - 16"
      show-peaks
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  background: transparent;
  transform: translate3d(8px, 4px, 0);
}
</style>
