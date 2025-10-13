<script lang="ts" setup="">
import {useInterval} from 'src/composables/use-interval';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';

const {currentIndex} = useInterval();
const {window} = useAudioFile();
</script>

<template>
  <span>Interval</span>
  <span>{{ currentIndex }}</span>

  <span>File</span>
  <span>{{ window?.file.Path }}</span>

  <span>Site</span>
  <span>{{ window?.file.Site }}</span>
</template>
