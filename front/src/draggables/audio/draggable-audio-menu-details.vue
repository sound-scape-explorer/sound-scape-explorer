<script lang="ts" setup="">
import {useAppDisplay} from 'src/composables/use-app-display';
import {useInterval} from 'src/composables/use-interval';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';

const {currentIndex} = useInterval();
const {window} = useAudioFile();

const {display, cycle, Display} = useAppDisplay('index', 'file', 'site');
</script>

<template>
  <span
    v-if="display === Display.enum.index"
    :class="$style.hover"
    @click="cycle"
  >
    Interval
  </span>
  <span v-if="display === Display.enum.index">{{ currentIndex }}</span>

  <span
    v-if="display === Display.enum.file"
    :class="$style.hover"
    @click="cycle"
  >
    File
  </span>
  <span v-if="display === Display.enum.file">{{ window?.file.Path }}</span>

  <span
    v-if="display === Display.enum.site"
    :class="$style.hover"
    @click="cycle"
  >
    Site
  </span>
  <span v-if="display === Display.enum.site">{{ window?.file.Site }}</span>
</template>

<style lang="scss" module>
.hover {
  &:hover {
    cursor: pointer;
  }
}
</style>
