<script lang="ts" setup="">
import {SearchOutline} from '@vicons/ionicons5';
import dayjs from 'dayjs';
import {NSlider} from 'naive-ui';
import {computed, ComputedRef, ref, watch} from 'vue';
import {useConfig} from '../composables/useConfig';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {API_ROUTES, DATE_FORMAT, SLIDER_LIMITS} from '../constants';
import {selectionStore} from '../store/selection.store';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import {mapRange} from '../utils/map-range';
import Button from './Button.vue';

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

const cachedSliders = ref<null | Slider[]>(null);

const sliders: ComputedRef<Slider[]> = computed(() => {
  if (!config) {
    return [];
  }

  if (!selectionStore.interval) {
    return [];
  }

  if (zoomedSlider.value) {
    return [zoomedSlider.value];
  }

  if (cachedSliders.value) {
    return cachedSliders.value;
  }

  const umap = config.umaps[selectionStore.interval];
  const rangeNames = Object.values(umap[3]);
  const sliders = [];

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

    sliders.push(slider);
  }

  // TODO: Can be improved to avoid collisions
  sliders.sort((a, b) => a.min - b.max);

  UMAPTimeRangeStore.value = UMAPTimeRangeStore.min;

  cachedSliders.value = sliders;

  return sliders;
});

interface Interest {
  key: string;
  values: boolean[];
}

const umapEndpoint: ComputedRef<string | null> = computed(() => {
  const {band, interval} = selectionStore;

  if (!band || !interval) {
    return null;
  }

  return API_ROUTES.umap({band, interval});
});

const allTimestamps = ref<number[]>([]);

watch(umapEndpoint, async () => {
  if (!umapEndpoint.value) {
    return;
  }

  const response = await fetch(umapEndpoint.value);
  const json = await response.json();
  allTimestamps.value = json.t;
});

const interests: ComputedRef<Interest[]> = computed(() => {
  if (!allTimestamps.value) {
    return [];
  }

  const interests: Interest[] = [];
  const ignoreDecimalsFactor = 1 / (UMAPTimeRangeStore.duration);
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
      key,
      values,
    };

    interests.push(interest);
  }

  return interests;
});

function formatTooltip(time: number): string {
  if (!config) {
    return time.toString();
  }

  const date = dayjs(time * 1000);

  return date.format(DATE_FORMAT);
}

const zoomedSlider = ref<null | Slider>(null);

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
</script>

<template>
  <div class="container">
    <div v-if="!isDisabled" class="layer">
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
      <Button
          v-for="slider in sliders"
          :handle-click="() => toggleZoom(slider)"
      >
        <search-outline />
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
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
  height: 0.8rem;
  padding: 0 8px;

  z-index: 0;
  user-select: none;
  transform: translateY(-21px);
}

.interest__pixel {
  width: 1%;
}

.zoom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  padding: 0 0.5rem;

  transform: translateY(-19px);
}
</style>
