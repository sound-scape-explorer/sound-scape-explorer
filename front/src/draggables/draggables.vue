<script lang="ts" setup>
import {useConfig} from 'src/composables/use-config';
import {useDraggables} from 'src/composables/use-draggables';
import {useThemeColors} from 'src/composables/use-theme-colors';
import DraggableAudio from 'src/draggables/audio/draggable-audio.vue';
import DraggableCalendar from 'src/draggables/calendar/draggable-calendar.vue';
import DraggableColors from 'src/draggables/colors/draggable-colors.vue';
import DraggableDetails from 'src/draggables/details/draggable-details.vue';
import DraggableHeatmaps from 'src/draggables/heatmaps/draggable-heatmaps.vue';
import DraggableHelp from 'src/draggables/help/draggable-help.vue';
import DraggableHistograms from 'src/draggables/histograms/draggable-histograms.vue';
import DraggableOpen from 'src/draggables/open/draggable-open.vue';
import DraggableRelativeTrajectories from 'src/draggables/relative-trajectories/draggable-relative-trajectories.vue';
import DraggableSelection from 'src/draggables/selection/selection.vue';
import DraggableSettings from 'src/draggables/settings/draggable-settings.vue';
import DraggableTags from 'src/draggables/tags/draggable-tags.vue';
import DraggableTemporal from 'src/draggables/temporal/draggable-temporal.vue';
import DraggableTrajectories from 'src/draggables/trajectories/draggable-trajectories.vue';
import DraggableView from 'src/draggables/view/draggable-view.vue';

const {store} = useDraggables();
const {isLoaded} = useConfig();
const {colors} = useThemeColors();
</script>

<template>
  <div :class="$style.empty" />

  <DraggableOpen v-if="store.open" />
  <DraggableSettings v-if="store.settings" />
  <DraggableHelp v-if="store.help" />

  <DraggableView v-if="isLoaded" />
  <DraggableColors v-if="isLoaded && store.colors" />
  <DraggableCalendar v-if="isLoaded" />
  <DraggableTags v-if="isLoaded" />
  <DraggableDetails v-if="isLoaded" />
  <DraggableAudio v-if="isLoaded" />
  <DraggableTrajectories v-if="isLoaded" />
  <DraggableRelativeTrajectories v-if="isLoaded" />
  <DraggableTemporal v-if="isLoaded" />
  <DraggableHeatmaps v-if="isLoaded" />
  <DraggableHistograms v-if="isLoaded" />
  <DraggableSelection v-if="isLoaded" />
</template>

<style lang="scss" module>
.empty {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: v-bind('colors.baseColor');
}
</style>
