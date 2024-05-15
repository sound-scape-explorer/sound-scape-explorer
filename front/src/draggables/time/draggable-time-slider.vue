<script lang="ts" setup="">
import {SearchOutline} from '@vicons/ionicons5';
import dayjs from 'dayjs';
import {NSlider} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import {useReducerSelection} from 'src/composables/reducer-selection';
import {useStorageAggregatedTimestamps} from 'src/composables/storage-aggregated-timestamps';
import {useStorageRanges} from 'src/composables/storage-ranges';
import {SLIDER_LIMITS} from 'src/constants';
import {timeStore} from 'src/draggables/time/time-store';
import {useScatterFilterTime} from 'src/components/scatter/scatter-filter-time';
import {useScatterLoading} from 'src/components/scatter/scatter-loading';
import {mapRange} from 'src/utils/map-range';
import {computed, ref, watch} from 'vue';

// todo: refactor me

const {ranges} = useStorageRanges();
const {reducer} = useReducerSelection();
const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
const {isLoading} = useScatterLoading();

const zoomedSliderRef = ref<Slider | null>(null);
const cachedSlidersRef = ref<Slider[]>();

const sliders = computed<Slider[]>(() => {
  if (ranges.value === null || reducer.value === null) {
    return [];
  }

  const zoomedSlider = zoomedSliderRef.value;
  const cachedSliders = cachedSlidersRef.value;

  if (zoomedSlider !== null) {
    return [zoomedSlider];
  }

  if (typeof cachedSliders !== 'undefined') {
    return cachedSliders;
  }

  const sliders: Slider[] = [];

  for (const range of ranges.value) {
    const timeStart = dayjs(range.start).unix();
    const timeEnd = dayjs(range.end).unix();
    const timeBetween = Math.floor(timeStart + 0.5 * (timeEnd - timeStart));

    if (timeStore.min === -1 || timeStart < timeStore.min) {
      timeStore.min = timeStart;
    }

    if (timeStore.max === -1 || timeEnd > timeStore.max) {
      timeStore.max = timeEnd;
    }

    const slider = {
      key: range.index,
      name: range.name,
      min: timeStart,
      max: timeEnd,
      marks: {
        [timeStart]: SLIDER_LIMITS.start,
        [timeBetween]: range.name.toString(),
        [timeEnd]: SLIDER_LIMITS.end,
      },
    } satisfies Slider;

    sliders.push(slider);
  }

  // Can be improved to avoid collisions
  sliders.sort((a, b) => a.min - b.max);

  timeStore.value = timeStore.min;

  cachedSlidersRef.value = sliders;

  return sliders;
});

interface Interest {
  key: number;
  values: boolean[];
}

const interests = computed<Interest[]>(() => {
  if (aggregatedTimestamps.value === null) {
    return [];
  }

  const allTimestamps = aggregatedTimestamps.value.map((t) => t / 1000);

  const interests: Interest[] = [];
  const ignoreDecimalsFactor = 1 / timeStore.duration;
  const ignoreDecimals = (value: number) =>
    Math.floor(ignoreDecimalsFactor * value);

  for (const slider of sliders.value) {
    const {min, max, key} = slider;
    const timestamps = allTimestamps.filter(
      (timestamp) => timestamp >= min && timestamp <= max,
    );

    const values = [];

    for (let i = 0; i < 100; i += 1) {
      const index = mapRange(i, 0, 100, min, max);

      const trimmedTimestamps = timestamps.map((t) => ignoreDecimals(t));
      const isInterest = trimmedTimestamps.includes(ignoreDecimals(index));

      values.push(isInterest);
    }

    const interest: Interest = {
      key: key,
      values: values,
    };

    interests.push(interest);
  }

  return interests;
});

/**
 * Handlers
 */

function resetZoom() {
  zoomedSliderRef.value = null;
}

function toggleZoom(slider: Slider): void {
  if (zoomedSliderRef.value !== null) {
    resetZoom();
    return;
  }

  zoomedSliderRef.value = slider;
}

interface Slider {
  key: number;
  name: string;
  min: number;
  max: number;
  marks: {
    [time: number]: string;
  };
}

const {filterByTime} = useScatterFilterTime();
watch(timeStore, () => filterByTime());
</script>

<template>
  <div class="container">
    <div
      v-if="!isLoading"
      class="layer"
    >
      <NSlider
        v-for="slider in sliders"
        :key="slider.key"
        v-model:value="timeStore.value"
        :disabled="timeStore.isAllSelected"
        :marks="slider.marks"
        :max="slider.max"
        :min="slider.min"
        :style="{width: 100 / sliders.length + '%'}"
        :tooltip="false"
        class="slider"
      />
    </div>

    <div
      v-if="!isLoading"
      class="layer"
    >
      <div
        v-for="interest in interests"
        class="interest"
      >
        <span
          v-for="value of interest.values"
          :style="{background: value ? 'red' : 'gainsboro'}"
          class="interest__pixel"
        />
      </div>
    </div>

    <div
      v-if="!isLoading"
      class="layer zoom"
    >
      <AppButton
        v-for="slider in sliders"
        :handle-click="() => toggleZoom(slider)"
      >
        <SearchOutline />
      </AppButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.layer {
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
}

.slider {
  z-index: 1;
}

.interest {
  display: flex;

  width: 100%;
  height: 13px;
  padding: 0 8px;

  z-index: 0;
  user-select: none;
  transform: translateY(-20px);
}

.interest__pixel {
  width: 1%;
}

.zoom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  padding: 0 8px;

  transform: translateY(-6px);
  height: 10px;
}
</style>
