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
import AppButton from 'src/app/app-button.vue';
import AppDraggableSidebarHistory from 'src/app/app-draggable-sidebar-history.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import DraggableAudioSidebarClip from 'src/draggables/audio/draggable-audio-sidebar-clip.vue';
import {useAudioFourier} from 'src/draggables/audio/use-audio-component';
import {useAudioDownload} from 'src/draggables/audio/use-audio-download';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';
import {useIntervalSelector} from 'src/draggables/audio/use-interval-selector';
import {useWavesurferHandlers} from 'src/draggables/audio/use-wavesurfer-handlers';

const {increase, decrease} = useAudioFourier();
const {increaseVolume, decreaseVolume} = useWavesurferHandlers();
const {isPlaying, togglePlayPause, stop} = useAudioTransport();
const {downloadAudio} = useAudioDownload();
const {history, undo, redo, canUndo, canRedo} = useIntervalSelector();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton
      :handle-click="togglePlayPause"
      :tooltip="isPlaying ? 'Pause' : 'Play'"
      icon
      tooltip-placement="left"
    >
      <PauseOutline v-if="isPlaying" />
      <PlayOutline v-if="!isPlaying" />
    </AppButton>

    <AppButton
      :handle-click="stop"
      icon
      tooltip="Stop"
      tooltip-placement="left"
    >
      <StopOutline />
    </AppButton>

    <AppButton
      :handle-click="increaseVolume"
      icon
      tooltip="Volume Up"
      tooltip-placement="left"
    >
      <VolumeHighOutline />
    </AppButton>

    <AppButton
      :handle-click="decreaseVolume"
      icon
      tooltip="Volume Down"
      tooltip-placement="left"
    >
      <VolumeLowOutline />
    </AppButton>

    <AppButton
      :handle-click="increase"
      icon
      tooltip="FFT Size Up"
      tooltip-placement="left"
    >
      <AddOutline />
    </AppButton>

    <AppButton
      :handle-click="decrease"
      icon
      tooltip="FFT Size Down"
      tooltip-placement="left"
    >
      <RemoveOutline />
    </AppButton>

    <AppButton
      :handle-click="downloadAudio"
      icon
      tooltip="Download"
      tooltip-placement="left"
    >
      <ArrowDownOutline />
    </AppButton>

    <AppDraggableSidebarHistory
      :can-redo="canRedo"
      :can-undo="canUndo && history.length > 2"
      :redo="redo"
      :undo="undo"
      redo-tooltip="Next interval"
      undo-tooltip="Previous interval"
    />

    <DraggableAudioSidebarClip />
  </AppDraggableSidebar>
</template>
