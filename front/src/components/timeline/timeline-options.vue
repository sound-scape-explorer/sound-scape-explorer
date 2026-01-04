<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppDatePicker from 'src/app/app-date-picker.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useTimelineHandlers} from 'src/components/timeline/use-timeline-handlers';
import {useTimelineLifecycles} from 'src/components/timeline/use-timeline-lifecycles';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useTimelineRangeNames} from 'src/components/timeline/use-timeline-range-names';
import {useIntervalTransport} from 'src/composables/use-interval-transport';

const {left, right, updateLeft, updateRight} = useTimelineRange();
const {currentIndex} = useIntervalTransport();
const {overdrive, recenter} = useTimelineHandlers();
const {name, names} = useTimelineRangeNames();

useTimelineLifecycles();
</script>

<template>
  <AppDraggableMenu>
    <span>Range</span>
    <div :class="$style.row">
      <AppSelect
        v-model="name"
        :class="$style.select"
        :options="names"
      />

      <AppButton
        :handle-click="overdrive"
        tooltip="Crop window"
        tooltip-placement="top"
      >
        <AppIcon
          icon="crop"
          size="tiny"
        />
      </AppButton>

      <AppButton
        :disabled="currentIndex === null"
        :handle-click="recenter"
        tooltip="Focus window to current interval"
        tooltip-placement="top"
      >
        <AppIcon
          icon="select"
          size="tiny"
        />
      </AppButton>
    </div>

    <span>Dates</span>
    <div :class="$style.row">
      <AppDatePicker
        v-model="left"
        :handle-click="updateLeft"
      />

      <AppDatePicker
        v-model="right"
        :handle-click="updateRight"
      />
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.row {
  align-items: center;
  display: flex;
  gap: sizes.$p0;
  justify-content: center;
  width: 100%;
}

.select {
  width: 100%;
}

.date {
  width: 100%;
}
</style>
