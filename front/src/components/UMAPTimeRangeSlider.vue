<script lang="ts" setup="">
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {NSlider} from 'naive-ui';
import {computed, ComputedRef} from 'vue';
import {useConfig} from '../composables/useConfig';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {SLIDER_LIMITS} from '../constants';
import {selectionStore} from '../store/selection.store';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';

dayjs.extend(utc);
dayjs.extend(timezone);

const {isDisabled} = useUMAPStatus();
const {config} = await useConfig();

interface Slider {
  key: string;
  min: number;
  max: number;
  marks: {
    [time: number]: string;
  };
}

const sliders: ComputedRef<Slider[]> = computed(() => {
  if (!config) {
    return [];
  }

  if (!selectionStore.interval) {
    return [];
  }

  const umap = config.umaps[selectionStore.interval];
  const rangeNames = Object.values(umap[3]);
  const payload = [];

  for (const rangeName of rangeNames) {
    const rangeValues = config.ranges[rangeName];
    const rangeStart = rangeValues[0];
    const rangeEnd = rangeValues[1];
    const timeStart = dayjs(rangeStart).unix();
    const timeEnd = dayjs(rangeEnd).unix();
    const timeBetween = Math.floor(timeStart + 0.5 * (timeEnd - timeStart));

    if (UMAPTimeRangeStore.min === null || timeStart < UMAPTimeRangeStore.min) {
      UMAPTimeRangeStore.min = timeStart;
    }

    if (UMAPTimeRangeStore.max === null || timeEnd > UMAPTimeRangeStore.max) {
      UMAPTimeRangeStore.max = timeEnd;
    }

    const slider = {
      key: rangeName,
      min: timeStart,
      max: timeEnd,
      marks: {
        [timeStart]: SLIDER_LIMITS.start,
        [timeBetween]: rangeName,
        [timeEnd]: SLIDER_LIMITS.end,
      },
    };

    payload.push(slider);
  }

  payload.sort((a, b) => a.min - b.max);

  UMAPTimeRangeStore.value = UMAPTimeRangeStore.min;

  return payload;
});

function formatTooltip(time: number): string {
  if (!config) {
    return time.toString();
  }

  const date = dayjs(time * 1000);
  const timezone = config.variables.display_locale;

  return date.tz(timezone).format();
}
</script>

<template>
  <div v-if="!isDisabled" class="container">
    <n-slider
        v-for="slider in sliders"
        :key="slider.key"
        v-model:value="UMAPTimeRangeStore.value"
        :disabled="UMAPTimeRangeStore.isAllSelected"
        :format-tooltip="formatTooltip"
        :marks="slider.marks"
        :max="slider.max"
        :min="slider.min"
        :style="{ width: 100 / sliders.length + '%' }"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
}
</style>
