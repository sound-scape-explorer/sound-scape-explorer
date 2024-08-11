<script lang="ts" setup>
import {RefreshOutline} from '@vicons/ionicons5';
import AppIcon from 'src/app/app-icon.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import DraggableAudioMenu from 'src/draggables/audio/draggable-audio-menu.vue';
import DraggableAudioSidebar from 'src/draggables/audio/draggable-audio-sidebar.vue';
import {useAudioFileWatcher} from 'src/draggables/audio/use-audio-file-watcher';
import {useAudioRateWatcher} from 'src/draggables/audio/use-audio-rate-watcher';
import {useDraggableAudio} from 'src/draggables/audio/use-draggable-audio';
import {useWavesurferMounter} from 'src/draggables/audio/use-wavesurfer-mounter';

const {waveform, spectrogram, loadingClassNames} = useDraggableAudio();

useWavesurferMounter();
useAudioFileWatcher();
useAudioRateWatcher();
</script>

<template>
  <AppDraggable
    draggable-key="audio"
    suspense="scatterClick"
  >
    <div :class="loadingClassNames">
      <AppIcon>
        <RefreshOutline class="spin" />
      </AppIcon>
    </div>

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

.loading {
  width: 100%;
  height: 100%;
  z-index: 100;
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;

  background-color: $whiteOpaque;
  backdrop-filter: blur(5px);
}

$o1: 50% - 0%;
$o2: 50% + 8%;

.spin {
  @include spin;
  transform-origin: $o1 $o2;
}

.loading-hidden {
  display: none;
}
</style>
