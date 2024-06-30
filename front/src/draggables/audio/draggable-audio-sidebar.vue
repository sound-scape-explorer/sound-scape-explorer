<script lang="ts" setup="">
import {
  AddOutline,
  ArrowDownOutline,
  PauseOutline,
  PlayOutline,
  RemoveOutline,
  StopOutline,
  VolumeHighOutline,
  VolumeLowOutline,
} from '@vicons/ionicons5';
import AppButtonNew from 'src/app/app-button-new.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {useAudioFourier} from 'src/draggables/audio/use-audio-component';
import {useAudioDownload} from 'src/draggables/audio/use-audio-download';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';
import {useWavesurferHandlers} from 'src/draggables/audio/use-wavesurfer-handlers';

const {increase, decrease} = useAudioFourier();
const {increaseVolume, decreaseVolume} = useWavesurferHandlers();
const {isPlaying, togglePlayPause, stop} = useAudioTransport();
const {downloadAudio} = useAudioDownload();
</script>

<template>
  <AppDraggableSidebar>
    <AppButtonNew
      :handle-click="togglePlayPause"
      :tooltip="isPlaying ? 'Pause' : 'Play'"
      icon
      tooltip-placement="left"
    >
      <PauseOutline v-if="isPlaying" />
      <PlayOutline v-if="!isPlaying" />
    </AppButtonNew>

    <AppButtonNew
      :handle-click="stop"
      icon
      tooltip="Stop"
      tooltip-placement="left"
    >
      <StopOutline />
    </AppButtonNew>

    <AppButtonNew
      :handle-click="increaseVolume"
      icon
      tooltip="Volume Up"
      tooltip-placement="left"
    >
      <VolumeHighOutline />
    </AppButtonNew>

    <AppButtonNew
      :handle-click="decreaseVolume"
      icon
      tooltip="Volume Down"
      tooltip-placement="left"
    >
      <VolumeLowOutline />
    </AppButtonNew>

    <AppButtonNew
      :handle-click="increase"
      icon
      tooltip="FFT Size Up"
      tooltip-placement="left"
    >
      <AddOutline />
    </AppButtonNew>

    <AppButtonNew
      :handle-click="decrease"
      icon
      tooltip="FFT Size Down"
      tooltip-placement="left"
    >
      <RemoveOutline />
    </AppButtonNew>

    <AppButtonNew
      :handle-click="downloadAudio"
      icon
      tooltip="Download"
      tooltip-placement="left"
    >
      <ArrowDownOutline />
    </AppButtonNew>
  </AppDraggableSidebar>
</template>
