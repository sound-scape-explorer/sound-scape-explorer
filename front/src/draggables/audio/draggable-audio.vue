<script lang="ts" setup>
import AppDraggableLoading from 'src/app/app-draggable-loading.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {SuspenseCase} from 'src/app/draggable/use-app-draggable-suspense';
import {DraggableKey} from 'src/composables/use-draggables';
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
    :draggable-key="DraggableKey.enum.audio"
    :suspense="SuspenseCase.enum.SCATTER_CLICK"
  >
    <AppDraggableLoading :isLoading="isLoading" />
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
@use 'src/styles/sizes';

.player {
  display: flex;
  flex-direction: column;
}

.spectrogram {
  pointer-events: none;
}

.mt {
  margin-top: sizes.$p0;
}
</style>
