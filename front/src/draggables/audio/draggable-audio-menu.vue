<script lang="ts" setup>
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import DraggableAudioMenuAudio from 'src/draggables/audio/draggable-audio-menu-audio.vue';
import DraggableAudioMenuDates from 'src/draggables/audio/draggable-audio-menu-dates.vue';
import DraggableAudioMenuDetails from 'src/draggables/audio/draggable-audio-menu-details.vue';
import DraggableAudioMenuFilters from 'src/draggables/audio/draggable-audio-menu-filters.vue';
import DraggableAudioMenuSampling from 'src/draggables/audio/draggable-audio-menu-sampling.vue';
</script>

<template>
  <AppDraggableMenu :class="$style.container">
    <DraggableAudioMenuDetails />
    <DraggableAudioMenuDates />
    <DraggableAudioMenuAudio />
    <DraggableAudioMenuSampling />
    <DraggableAudioMenuFilters />
  </AppDraggableMenu>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  margin-top: -(sizes.$g0);
}
</style>
