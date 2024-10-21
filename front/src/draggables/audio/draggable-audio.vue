<script lang="ts" setup>
import {RefreshOutline} from '@vicons/ionicons5';
import AppIcon from 'src/app/app-icon.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import DraggableAudioMenu from 'src/draggables/audio/draggable-audio-menu.vue';
import DraggableAudioSidebar from 'src/draggables/audio/draggable-audio-sidebar.vue';
import {useAudioFileWatcher} from 'src/draggables/audio/use-audio-file-watcher';
import {useAudioLifecycles} from 'src/draggables/audio/use-audio-lifecycles';
import {useAudioRateWatcher} from 'src/draggables/audio/use-audio-rate-watcher';
import {useDraggableAudio} from 'src/draggables/audio/use-draggable-audio';
import {useWavesurferMounter} from 'src/draggables/audio/use-wavesurfer-mounter';

const {waveform, spectrogram, isLoading} = useDraggableAudio();

useWavesurferMounter();
useAudioFileWatcher();
useAudioRateWatcher();
useAudioLifecycles();
</script>

<template>
  <AppDraggable
    draggable-key="audio"
    suspense="scatterClick"
  >
    <div
      :class="{'loading-hidden': !isLoading}"
      class="loading"
    >
      <AppIcon>
        <RefreshOutline class="spin" />
      </AppIcon>
    </div>

    <DraggableAudioSidebar />
    <DraggableAudioMenu />

    <div class="player">
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
  width: $s2;
}

.spectrogram {
  pointer-events: none;
}

.mt {
  margin-top: $p0;
}

.loading {
  width: 100%;
  height: 100%;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;

  background-color: $whiteOpaque;
  backdrop-filter: blur($p0);
  @include borderRadius;
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
