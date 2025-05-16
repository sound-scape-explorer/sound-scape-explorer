<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {refreshOutline} from 'ionicons/icons';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
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
    suspense="scatterClick"
  >
    <div :class="[$style.loading, {[$style['loading-hidden']]: !isLoading}]">
      <IonIcon
        :class="$style.spin"
        :icon="refreshOutline"
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
  background-color: v-bind('colors.modalColor');
  backdrop-filter: blur(sizes.$p0);

  @include borders.border-radius;
}

$o1: 50% - 0%;
$o2: 50% + 8%;

// todo: check me if still OK
.spin {
  transform-origin: $o1 $o2;

  @include animations.spin;
}

.loading-hidden {
  display: none;
}
</style>
