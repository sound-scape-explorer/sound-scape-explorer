<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import FilteringInfo from 'src/components/filtering-info/filtering-info.vue';
import DraggableAudioSidebarVumeter from 'src/draggables/audio/draggable-audio-sidebar-vumeter.vue';
import {useAudioFourier} from 'src/draggables/audio/use-audio-component';
import {useAudioDownload} from 'src/draggables/audio/use-audio-download';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';

const {
  increase: increaseFourier,
  decrease: decreaseFourier,
  canIncrease: canIncreaseFourier,
  canDecrease: canDecreaseFourier,
} = useAudioFourier();

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
      tooltip="Download raw audio"
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
