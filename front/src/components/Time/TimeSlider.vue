<script lang="ts" setup="">
import {SearchOutline} from '@vicons/ionicons5';
import dayjs from 'dayjs';
import {NSlider} from 'naive-ui';
import {computed, ref, unref, watch} from 'vue';
import {SLIDER_LIMITS} from '../../constants';
import {useStorage} from '../../hooks/useStorage';
import {mapRange} from '../../utils/map-range';
import AppButton from '../AppButton/AppButton.vue';
import {useScatterStatus} from '../Scatter/useScatterStatus';
import {selectionStore} from '../Selection/selectionStore';
import {timeStore} from './timeStore';

const {isDisabled} = useScatterStatus();
const {
  getStorageRanges,
  getGroupedTimestamps,
  getReducers,
} = await useStorage();

const reducers = await getReducers();
const storageRanges = await getStorageRanges();

/**
 * State
 */

const allTimestamps = ref<number[]>();
const zoomedSlider = ref<Slider | null>(null);
const cachedSliders = ref<Slider[]>();

const sliders = computed<Slider[]>(() => {
  if (selectionStore.integration === null) {
    return [];
  }

  const zoomedSliderValue = unref(zoomedSlider);
  const cachedSlidersValue = unref(cachedSliders);

  if (zoomedSliderValue) {
    return [zoomedSliderValue];
  }

  if (cachedSlidersValue) {
    return cachedSlidersValue;
  }

  const ranges = reducers
    .filter((reducer) => reducer.index === selectionStore.reducer)[0].ranges;

  const sliders: Slider[] = [];

  for (const range of ranges) {
    const rangeValues = storageRanges[range];
    const rangeStart = rangeValues[0];
    const rangeEnd = rangeValues[1];
    const timeStart = dayjs(rangeStart).unix();
    const timeEnd = dayjs(rangeEnd).unix();
    const timeBetween = Math.floor(timeStart + 0.5 * (timeEnd - timeStart));

    if (timeStore.min === -1 || timeStart < timeStore.min) {
      timeStore.min = timeStart;
    }

    if (timeStore.max === -1 || timeEnd > timeStore.max) {
      timeStore.max = timeEnd;
    }

    const slider = {
      key: range,
      min: timeStart,
      max: timeEnd,
      marks: {
        [timeStart]: SLIDER_LIMITS.start,
        [timeBetween]: range,
        [timeEnd]: SLIDER_LIMITS.end,
      },
    } satisfies Slider;

    sliders.push(slider);
  }

  // Can be improved to avoid collisions
  sliders.sort((a, b) => a.min - b.max);

  timeStore.value = timeStore.min;

  cachedSliders.value = sliders;

  return sliders;
});

interface Interest {
  key: string;
  values: boolean[];
}

const interests = computed<Interest[]>(() => {
  if (!Array.isArray(allTimestamps.value)) {
    return [];
  }

  const interests: Interest[] = [];
  const ignoreDecimalsFactor = 1 / (timeStore.duration);
  const ignoreDecimals = (value: number) => Math.floor(ignoreDecimalsFactor * value);

  for (const slider of sliders.value) {
    const {min, max, key} = slider;
    const timestamps = allTimestamps.value.filter((timestamp) => timestamp >= min && timestamp <= max);

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
  zoomedSlider.value = null;
}

function toggleZoom(slider: Slider): void {
  if (zoomedSlider.value !== null) {
    resetZoom();
    return;
  }

  zoomedSlider.value = slider;
}

/**
 * Lifecycles
 */

watch(selectionStore, async () => {
  if (
    selectionStore.reducer === null
    || selectionStore.band === null
    || selectionStore.integration === null
  ) {
    return;
  }

  const timestamps = await getGroupedTimestamps(
    selectionStore.band,
    selectionStore.integration,
  );
  allTimestamps.value = timestamps.flat().map((t) => t / 1000);
});

interface Slider {
  key: string;
  min: number;
  max: number;
  marks: {
    [time: number]: string;
  };
}
</script>

<template>
  <div class="container">
    <div v-if="!isDisabled" class="layer">
      <n-slider
        v-for="slider in sliders"
        :key="slider.key"
        v-model:value="timeStore.value"
        :disabled="timeStore.isAllSelected"
        :marks="slider.marks"
        :max="slider.max"
        :min="slider.min"
        :style="{ width: 100 / sliders.length + '%' }"
        :tooltip="false"
        class="slider"
      />
    </div>

    <div v-if="!isDisabled" class="layer">
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

    <div v-if="!isDisabled" class="layer zoom">
      <AppButton
        v-for="slider in sliders"
        :handle-click="() => toggleZoom(slider)"
      >
        <search-outline />
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
