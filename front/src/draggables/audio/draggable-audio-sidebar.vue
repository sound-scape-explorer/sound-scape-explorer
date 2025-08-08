<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
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
      <AppIcon
        v-if="isPlaying"
        icon="pause"
        size="small"
      />
      <AppIcon
        v-if="!isPlaying"
        icon="play"
        size="small"
      />
    </AppButton>

    <AppButton
      :handle-click="stop"
      small-tooltip
      tooltip="Stop"
      tooltip-placement="left"
    >
      <AppIcon
        icon="stop"
        size="small"
      />
    </AppButton>

    <AppButton
      :disabled="!canIncreaseVolume"
      :handle-click="increaseVolume"
      small-tooltip
      tooltip="Volume Up"
      tooltip-placement="left"
    >
      <AppIcon
        icon="volumeUp"
        size="small"
      />
    </AppButton>

    <AppButton
      :disabled="!canDecreaseVolume"
      :handle-click="decreaseVolume"
      small-tooltip
      tooltip="Volume Down"
      tooltip-placement="left"
    >
      <AppIcon
        icon="volumeDown"
        size="small"
      />
    </AppButton>

    <AppButton
      :disabled="!canIncreaseFourier"
      :handle-click="increaseFourier"
      small-tooltip
      tooltip="FFT Size Up"
      tooltip-placement="left"
    >
      <AppIcon
        icon="plus"
        size="small"
      />
    </AppButton>

    <AppButton
      :disabled="!canDecreaseFourier"
      :handle-click="decreaseFourier"
      small-tooltip
      tooltip="FFT Size Down"
      tooltip-placement="left"
    >
      <AppIcon
        icon="minus"
        size="small"
      />
    </AppButton>

    <AppButton
      :handle-click="downloadAudio"
      tooltip="Download"
      tooltip-placement="left"
    >
      <AppIcon
        icon="download"
        size="small"
      />
    </AppButton>

    <FilteringInfo />

    <DraggableAudioSidebarVumeter />
  </AppDraggableSidebar>
</template>
