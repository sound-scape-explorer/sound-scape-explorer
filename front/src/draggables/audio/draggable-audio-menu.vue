<script lang="ts" setup>
import {NGi, NGrid, NTag} from 'naive-ui';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import DraggableAudioMenuAudio from 'src/draggables/audio/draggable-audio-menu-audio.vue';
import DraggableAudioMenuDates from 'src/draggables/audio/draggable-audio-menu-dates.vue';
import DraggableAudioMenuDetails from 'src/draggables/audio/draggable-audio-menu-details.vue';
import DraggableAudioMenuFilters from 'src/draggables/audio/draggable-audio-menu-filters.vue';
import DraggableAudioMenuSpeed from 'src/draggables/audio/draggable-audio-menu-speed.vue';
import {useAudioFourier} from 'src/draggables/audio/use-audio-component';

const {size} = useAudioFourier();
</script>

<template>
  <AppDraggableMenu :class="$style.container">
    <DraggableAudioMenuDetails />
    <DraggableAudioMenuDates />
    <DraggableAudioMenuAudio />
    <DraggableAudioMenuSpeed />
    <DraggableAudioMenuFilters />
  </AppDraggableMenu>
  <div>
    <NGrid
      cols="1"
      x-gap="4"
    >
      <NGi>
        <NTag
          :bordered="false"
          size="small"
        >
          FFT Size
        </NTag>

        {{ size }}
      </NGi>
    </NGrid>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  margin-top: -(sizes.$g0);
}
</style>
