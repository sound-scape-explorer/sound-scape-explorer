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
    <div :class="[$style.loading, {[$style['loading-hidden']]: !isLoading}]">
      <AppIcon>
        <RefreshOutline :class="$style.spin" />
      </AppIcon>
    </div>

    <DraggableAudioSidebar />
    <DraggableAudioMenu />

    <div :class="$style.player">
      <div
        ref="waveform"
        :class="$style.mt"
      />

      <div
        ref="spectrogram"
        :class="[$style.spectrogram, $style.mt]"
      />
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
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
  font-size: 100px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: $white-opaque;
  backdrop-filter: blur($p0);

  @include border-radius;
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
