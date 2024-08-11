<script lang="ts" setup="">
import {NButton} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {useDraggableAudioSidebarClip} from 'src/draggables/audio/use-draggable-audio-sidebar-clip';
import {watch} from 'vue';

const {classNames} = useDraggableAudioSidebarClip();
const {isClipping, fade} = useAudioAnalyser();
watch(isClipping, fade);
</script>

<template>
  <AppTooltip tooltip="Clip detection">
    <NButton
      :class="classNames"
      disabled
      size="tiny"
    />
  </AppTooltip>
</template>

<style lang="scss" scoped>
.clip {
  position: absolute;
  bottom: -405px;

  width: 2em;

  background: $green;
  transition: none;

  cursor: default;
  opacity: 1;
}

.clipping {
  background: $redDeep;
}
</style>
