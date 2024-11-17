<script lang="ts" setup="">
import AppButton from 'src/app/app-button.vue';
import AppDatePicker from 'src/app/app-date-picker.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useTimelineHandlers} from 'src/components/timeline/use-timeline-handlers';
import {useTimelineLifecycles} from 'src/components/timeline/use-timeline-lifecycles';
import {useTimelineOptions} from 'src/components/timeline/use-timeline-options';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useTimelineRecenter} from 'src/components/timeline/use-timeline-recenter';
import {useIntervalSelector} from 'src/composables/use-interval-selector';
import {useRefProvide} from 'src/composables/use-ref-provide';

const {left, right, updateLeft, updateRight} = useTimelineRange();
const {recenter} = useTimelineRecenter();
const {currentIntervalIndex} = useIntervalSelector();
const {overdrive} = useTimelineHandlers();
const {name, names} = useTimelineOptions();

useRefProvide(InjectionKey.calendarRange, name);
useRefProvide(InjectionKey.timelineLeft, left);
useRefProvide(InjectionKey.timelineRight, right);

useTimelineLifecycles();
</script>

<template>
  <AppDraggableMenu>
    <span>Range</span>
    <div :class="$style.row">
      <AppSelect
        :class="$style.select"
        :injection-key="InjectionKey.calendarRange"
        :options="names"
      />

      <AppButton
        :handle-click="overdrive"
        tooltip="set window limits as range"
        tooltip-placement="top"
      >
        overdrive
      </AppButton>

      <AppButton
        :disabled="currentIntervalIndex === null"
        :handle-click="recenter"
        tooltip="to selected interval"
        tooltip-placement="top"
      >
        recenter
      </AppButton>
    </div>

    <span>Dates</span>
    <div :class="$style.row">
      <AppDatePicker
        :handle-click="updateLeft"
        :injection-key="InjectionKey.timelineLeft"
      />

      <AppDatePicker
        :handle-click="updateRight"
        :injection-key="InjectionKey.timelineRight"
      />
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" module>
.row {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: $p0;
}

.select {
  width: 100%;
}

.date {
  width: 100%;
}
</style>
