<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {
  addOutline,
  arrowDownOutline,
  pauseOutline,
  playOutline,
  removeOutline,
  stopOutline,
  volumeHighOutline,
  volumeLowOutline,
} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import FilteringInfo from 'src/components/filtering-info/filtering-info.vue';
import DraggableAudioSidebarVumeter from 'src/draggables/audio/draggable-audio-sidebar-vumeter.vue';
import {useAudioFourier} from 'src/draggables/audio/use-audio-component';
import {useAudioDownload} from 'src/draggables/audio/use-audio-download';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';
import {useWavesurferHandlers} from 'src/draggables/audio/use-wavesurfer-handlers';

const {
  increase: increaseFourier,
  decrease: decreaseFourier,
  canIncrease: canIncreaseFourier,
  canDecrease: canDecreaseFourier,
} = useAudioFourier();
const {
  increase: increaseVolume,
  decrease: decreaseVolume,
  canIncrease: canIncreaseVolume,
  canDecrease: canDecreaseVolume,
} = useWavesurferHandlers();
const {isPlaying, togglePlayPause, stop} = useAudioTransport();
const {downloadAudio} = useAudioDownload();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton
      :handle-click="togglePlayPause"
      :tooltip="isPlaying ? 'Pause [space]' : 'Play [space]'"
      small-tooltip
      tooltip-placement="left"
    >
      <IonIcon
        v-if="isPlaying"
        :icon="pauseOutline"
      />
      <IonIcon
        v-if="!isPlaying"
        :icon="playOutline"
      />
    </AppButton>

    <AppButton
      :handle-click="stop"
      small-tooltip
      tooltip="Stop"
      tooltip-placement="left"
    >
      <IonIcon :icon="stopOutline" />
    </AppButton>

    <AppButton
      :disabled="!canIncreaseVolume"
      :handle-click="increaseVolume"
      small-tooltip
      tooltip="Volume Up"
      tooltip-placement="left"
    >
      <IonIcon :icon="volumeHighOutline" />
    </AppButton>

    <AppButton
      :disabled="!canDecreaseVolume"
      :handle-click="decreaseVolume"
      small-tooltip
      tooltip="Volume Down"
      tooltip-placement="left"
    >
      <IonIcon :icon="volumeLowOutline" />
    </AppButton>

    <AppButton
      :disabled="!canIncreaseFourier"
      :handle-click="increaseFourier"
      small-tooltip
      tooltip="FFT Size Up"
      tooltip-placement="left"
    >
      <IonIcon :icon="addOutline" />
    </AppButton>

    <AppButton
      :disabled="!canDecreaseFourier"
      :handle-click="decreaseFourier"
      small-tooltip
      tooltip="FFT Size Down"
      tooltip-placement="left"
    >
      <IonIcon :icon="removeOutline" />
    </AppButton>

    <AppButton
      :handle-click="downloadAudio"
      tooltip="Download"
      tooltip-placement="left"
    >
      <IonIcon :icon="arrowDownOutline" />
    </AppButton>

    <FilteringInfo />

    <DraggableAudioSidebarVumeter />
  </AppDraggableSidebar>
</template>
