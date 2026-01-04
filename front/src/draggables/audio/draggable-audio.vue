<script lang="ts" setup>
import AppIcon from 'src/app/app-icon.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {SuspenseCase} from 'src/app/draggable/use-app-draggable-suspense';
import {DraggableKey} from 'src/composables/use-draggables';
import {useThemeColors} from 'src/composables/use-theme-colors';
import DraggableAudioMenu from 'src/draggables/audio/draggable-audio-menu.vue';
import DraggableAudioSidebar from 'src/draggables/audio/draggable-audio-sidebar.vue';
import {useAudioFileWatcher} from 'src/draggables/audio/use-audio-file-watcher';
import {useAudioLifecycles} from 'src/draggables/audio/use-audio-lifecycles';
import {useAudioRateWatcher} from 'src/draggables/audio/use-audio-rate-watcher';
import {useDraggableAudio} from 'src/draggables/audio/use-draggable-audio';
import {useWavesurferMounter} from 'src/draggables/audio/use-wavesurfer-mounter';

const {waveform, spectrogram, isLoading} = useDraggableAudio();
const {colors} = useThemeColors();

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
    <div :class="[$style.loading, {[$style['loading-hidden']]: !isLoading}]">
      <AppIcon
        :class="$style.spin"
        icon="refresh"
        size="giant"
      />
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
@use 'src/styles/sizes';
@use 'src/styles/borders';
@use 'src/styles/animations';

.player {
  display: flex;
  flex-direction: column;
  width: sizes.$s2;
}

.spectrogram {
  pointer-events: none;
}

.mt {
  margin-top: sizes.$p0;
}

.loading {
  align-items: center;
  backdrop-filter: blur(sizes.$p0);
  background-color: v-bind('colors.modalColor');
  display: flex;
  font-size: 100px;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  @include borders.border-radius;
}

$o1: 50% - 0%;
$o2: 50% + 8%;

// TODO: check me if still OK
.spin {
  transform-origin: $o1 $o2;

  @include animations.spin;
}

.loading-hidden {
  display: none;
}
</style>
