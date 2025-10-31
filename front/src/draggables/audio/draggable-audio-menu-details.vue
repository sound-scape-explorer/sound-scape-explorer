<script lang="ts" setup="">
import {copyToClipboard} from '@shared/browser';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useAppDisplay} from 'src/composables/use-app-display';
import {useInterval} from 'src/composables/use-interval';
import {useThemeColors} from 'src/composables/use-theme-colors';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';

const {currentIndex} = useInterval();
const {window} = useAudioFile();
const {colors} = useThemeColors();

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
  <span
    v-if="display === Display.enum.file && window !== null"
    :class="$style.click"
    @click="
      () => {
        if (window === null) {
          return;
        }
        copyToClipboard(window.file.Path);
      }
    "
  >
    <AppTooltip>
      <template #tooltip>Copy</template>
      <template #body>{{ window.file.Path }}</template>
    </AppTooltip>
  </span>

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

.click {
  &:hover {
    cursor: pointer;
  }

  &:active {
    background: v-bind('colors.actionColor');
  }
}
</style>
