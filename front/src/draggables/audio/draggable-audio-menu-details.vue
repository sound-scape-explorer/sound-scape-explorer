<script lang="ts" setup="">
import {useInterval} from 'src/composables/use-interval';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {ref} from 'vue';
import {z} from 'zod';

const {currentIndex} = useInterval();
const {window} = useAudioFile();

const Display = z.enum(['index', 'file', 'site']);
// eslint-disable-next-line no-redeclare
type Display = z.infer<typeof Display>;

const display = ref<Display>(Display.enum.file);

const cycle = () => {
  const options = Display.options;
  let next = options.indexOf(display.value) + 1;

  if (next >= options.length) {
    next = 0;
  }

  display.value = options[next];
};
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
