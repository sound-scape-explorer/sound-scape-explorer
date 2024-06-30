<script lang="ts" setup="">
import {useDraggables} from 'src/composables/use-draggables';
import {useStorageReady} from 'src/composables/use-storage-ready';
import DraggableAudio from 'src/draggables/audio/draggable-audio.vue';
import DraggableColors from 'src/draggables/colors/draggable-colors.vue';
import DraggableDetails from 'src/draggables/details/draggable-details.vue';
import DraggableHeatmaps from 'src/draggables/heatmaps/draggable-heatmaps.vue';
import DraggableHelp from 'src/draggables/help/draggable-help.vue';
import DraggableImport from 'src/draggables/import/draggable-import.vue';
import DraggableLabel from 'src/draggables/label/draggable-label.vue';
import DraggableRelativeTrajectories from 'src/draggables/relative-trajectories/draggable-relative-trajectories.vue';
import DraggableSelection from 'src/draggables/selection/selection.vue';
import DraggableSettings from 'src/draggables/settings/draggable-settings.vue';
import DraggableTemporal from 'src/draggables/temporal/draggable-temporal.vue';
import DraggableTime from 'src/draggables/time/draggable-time.vue';
import DraggableTimeline from 'src/draggables/timeline/draggable-timeline.vue';
import DraggableTrajectories from 'src/draggables/trajectories/draggable-trajectories.vue';
import DraggableView from 'src/draggables/view/draggable-view.vue';

const {store} = useDraggables();
const {isReady} = useStorageReady();
</script>

<template>
  <DraggableImport v-if="store.import" />
  <DraggableSettings v-if="store.settings" />
  <DraggableHelp v-if="store.help" />

  <DraggableView v-if="isReady" />
  <DraggableColors v-if="isReady && store.colors" />
  <DraggableTime v-if="isReady" />
  <DraggableLabel v-if="isReady" />
  <DraggableDetails v-if="isReady" />
  <DraggableAudio v-if="isReady" />
  <DraggableTrajectories v-if="isReady" />
  <DraggableRelativeTrajectories v-if="isReady" />
  <DraggableTemporal v-if="isReady" />
  <DraggableHeatmaps v-if="isReady" />
  <DraggableSelection v-if="isReady" />

  <DraggableTimeline v-if="isReady" />
</template>
