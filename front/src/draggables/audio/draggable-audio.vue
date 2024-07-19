<script lang="ts" setup>
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import DraggableAudioMenu from 'src/draggables/audio/draggable-audio-menu.vue';
import DraggableAudioSidebar from 'src/draggables/audio/draggable-audio-sidebar.vue';
import {useAudioFileWatcher} from 'src/draggables/audio/use-audio-file-watcher';
import {useAudioRateWatcher} from 'src/draggables/audio/use-audio-rate-watcher';
import {useDraggableAudio} from 'src/draggables/audio/use-draggable-audio';
import {useWavesurferMounter} from 'src/draggables/audio/use-wavesurfer-mounter';

const {waveform, spectrogram} = useDraggableAudio();

useWavesurferMounter();
useAudioFileWatcher();
useAudioRateWatcher();
</script>

<template>
  <AppDraggable
    draggable-key="audio"
    suspense="scatterClick"
  >
    <div class="player">
      <DraggableAudioSidebar />
      <DraggableAudioMenu />

      <div
        ref="waveform"
        class="mt"
      />

      <div
        ref="spectrogram"
        class="spectrogram mt"
      />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.player {
  display: flex;
  flex-direction: column;

  width: 40rem;
}

.spectrogram {
  pointer-events: none;
}

.mt {
  margin-top: 10px;
}
</style>
