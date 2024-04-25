<script lang="ts" setup="">
import {DownloadOutline, RepeatOutline, ResizeOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NSelect} from 'naive-ui';
import {Csv} from 'src/common/Csv';
import {DigesterHeatmap} from 'src/common/DigesterHeatmap';
import {HeatmapColorScale} from 'src/common/HeatmapColorScale';
import {type HeatmapRange, heatmapRanges} from 'src/common/HeatmapRange';
import {PLOTLY_SIZE} from 'src/constants';
import {heatmapHeightRef, heatmapWidthRef} from 'src/hooks/useHeatmapSize';
import {labelsPropertiesRef, labelsSetsRef} from 'src/hooks/useLabels';
import {computed, ref, unref, watch, watchEffect} from 'vue';

import {useStorageDigesters} from '../../composables/storage-digesters';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import AppHeatmap from '../AppHeatmap/AppHeatmap.vue';
import AppHeatmap2d from '../AppHeatmap2d/AppHeatmap2d.vue';
import {type Digested, digestedRef, useDigested} from './useDigested';

const {readDigested} = useDigested();
const {digesters} = useStorageDigesters();

const labelSelectedARef = ref<string | null>(null);
const labelSelectedBRef = ref<string | null>(null);

const labelPropertiesOptionsRef = computed(() => {
  if (labelsPropertiesRef.value === null) {
    return [];
  }

  return convertToNaiveSelectOptions(labelsPropertiesRef.value);
});

const digestersOptionsRef = computed(() => {
  if (digesters.value === null) {
    return [];
  }

  const names = digesters.value.map((d) => d.name);
  return convertToNaiveSelectOptions(names);
});

const digesterSelectedRef = ref();

watch(digesterSelectedRef, () => {
  if (digesters.value === null) {
    return;
  }

  const digester = digesters.value.find(
    (d) => d.name === digesterSelectedRef.value,
  );

  if (digester === undefined) {
    return;
  }

  readDigested(digester);
});

const swap = () => {
  if (labelSelectedARef.value === null || labelSelectedBRef.value === null) {
    return;
  }

  const a = unref(labelSelectedARef.value);
  const b = unref(labelSelectedBRef.value);

  labelSelectedARef.value = b;
  labelSelectedBRef.value = a;
};

const titleRef = ref<string>('');
const xRef = ref<string[]>([]);
const yRef = ref<string[]>([]);
const valuesRef = ref<number[][]>([]);

const updateRange = (digested: Digested) => {
  switch (digested.digester.name) {
    case DigesterHeatmap.silhouette:
      colorScaleRef.value = HeatmapColorScale.RdBu;
      rangeIndexRef.value = ranges.indexOf(heatmapRanges.min1to1);
      break;
    case DigesterHeatmap.overlap:
      colorScaleRef.value = HeatmapColorScale.Blues;
      rangeIndexRef.value = ranges.indexOf(heatmapRanges.min0to1);
      break;
    case DigesterHeatmap.contingency:
      colorScaleRef.value = HeatmapColorScale.Blues;
      rangeIndexRef.value = ranges.indexOf(heatmapRanges.min0to100);
      break;
    default:
      colorScaleRef.value = HeatmapColorScale.RdBu;
      rangeIndexRef.value = ranges.indexOf(heatmapRanges.auto);
      break;
  }
};

const update = () => {
  if (
    labelsPropertiesRef.value === null ||
    labelsSetsRef.value === null ||
    digestedRef.value === null ||
    labelSelectedARef.value === null
  ) {
    return;
  }

  updateRange(digestedRef.value);

  titleRef.value = `${digestedRef.value.digester.name} - ${labelSelectedARef.value}`;
  const aIndex = labelsPropertiesRef.value.indexOf(labelSelectedARef.value);
  xRef.value = labelsSetsRef.value[aIndex];

  // with 2 labels
  if (digestedRef.value.isPairing && labelSelectedBRef.value !== null) {
    titleRef.value = `${titleRef.value} - ${labelSelectedBRef.value}`;
    const bIndex = labelsPropertiesRef.value.indexOf(labelSelectedBRef.value);
    yRef.value = labelsSetsRef.value[bIndex];

    // @ts-expect-error: 7053
    valuesRef.value = digestedRef.value.values[aIndex][bIndex] as number[][];
    return;
  }

  // with 1 label
  const values = digestedRef.value.values[aIndex] as number[][];
  const is1d = Array.isArray(values[0]) === false;

  if (is1d) {
    valuesRef.value = [values as unknown as number[]];
  } else {
    valuesRef.value = values;
  }
};

watchEffect(update);

const handleExportClick = () => {
  if (
    digestedRef.value === null ||
    xRef.value.length === 0 ||
    valuesRef.value.length === 0
  ) {
    return;
  }

  const csv = new Csv();
  const isPairing = digestedRef.value.isPairing;
  csv.addColumn('y');

  xRef.value.forEach((x) => {
    csv.addColumn(x);
  });

  valuesRef.value.forEach((values, index) => {
    csv.createRow();
    if (valuesRef.value.length === 1) {
      csv.addToCurrentRow('value');
    } else if (isPairing) {
      csv.addToCurrentRow(yRef.value[index]);
    } else {
      csv.addToCurrentRow(xRef.value[index]);
    }

    values.forEach((value) => {
      csv.addToCurrentRow(value.toString());
    });
  });

  csv.download('digested.csv');
};

const colorScales: HeatmapColorScale[] = [
  HeatmapColorScale.RdBu,
  HeatmapColorScale.Blues,
];

const colorScaleRef = ref<HeatmapColorScale>(HeatmapColorScale.RdBu);
const colorScalesOptionsRef = computed(() => {
  return convertToNaiveSelectOptions(colorScales);
});

const ranges: HeatmapRange[] = [
  heatmapRanges.auto,
  heatmapRanges.min1to1,
  heatmapRanges.min0to1,
  heatmapRanges.min0to100,
];

const rangeIndexRef = ref<number>(ranges.indexOf(heatmapRanges.min1to1));
const rangesOptionsRef = computed(() => {
  return ranges.map((range, index) => {
    const label = `[${range.min ?? 'auto'}, ${range.max ?? 'auto'}]`;
    const value = index;

    return {
      label: label,
      value: value,
    };
  });
});

const resize1by1 = () => {
  heatmapWidthRef.value = PLOTLY_SIZE;
  heatmapHeightRef.value = PLOTLY_SIZE;
};

const resize4by3 = () => {
  heatmapWidthRef.value = PLOTLY_SIZE * (4 / 3);
  heatmapHeightRef.value = PLOTLY_SIZE;
};

const resize16by10 = () => {
  heatmapWidthRef.value = PLOTLY_SIZE * (16 / 10);
  heatmapHeightRef.value = PLOTLY_SIZE;
};

const resize16by9 = () => {
  heatmapWidthRef.value = PLOTLY_SIZE * (16 / 9);
  heatmapHeightRef.value = PLOTLY_SIZE;
};
</script>

<template>
  <AppDraggable draggable-key="digested">
    <div class="container">
      <div class="form">
        <span>Select</span>

        <n-select
          v-model:value="digesterSelectedRef"
          :options="digestersOptionsRef"
          placeholder="Digester..."
          size="tiny"
        />

        <span>Over</span>

        <div class="form-second-line">
          <n-select
            v-model:value="labelSelectedARef"
            :options="labelPropertiesOptionsRef"
            placeholder="Label A..."
            size="tiny"
          />

          <n-button
            :disabled="!digestedRef.value?.isPairing"
            class="swap-button"
            size="tiny"
            @click="swap"
          >
            <n-icon>
              <repeat-outline />
            </n-icon>
          </n-button>

          <n-select
            v-model:value="labelSelectedBRef"
            :disabled="!digestedRef.value?.isPairing"
            :options="labelPropertiesOptionsRef"
            placeholder="Label B..."
            size="tiny"
          />
        </div>

        <span>Colorscale</span>
        <div class="form-additional-line">
          <n-select
            v-model:value="colorScaleRef"
            :options="colorScalesOptionsRef"
            placeholder="Colorscale..."
            size="tiny"
          />

          <span>Range</span>
          <div>
            <n-select
              v-model:value="rangeIndexRef"
              :options="rangesOptionsRef"
              placeholder="Range..."
              size="tiny"
            />
          </div>
        </div>

        <span>Export</span>
        <div class="form-additional-line">
          <n-button
            size="tiny"
            @click="handleExportClick"
          >
            <template #icon>
              <n-icon>
                <download-outline />
              </n-icon>
            </template>
            Export .csv
          </n-button>

          <span>Resize</span>
          <div class="resize-row">
            <n-button
              size="tiny"
              @click="resize1by1"
            >
              <template #icon>
                <n-icon>
                  <resize-outline />
                </n-icon>
              </template>
              1:1
            </n-button>

            <n-button
              size="tiny"
              @click="resize4by3"
            >
              <template #icon>
                <n-icon>
                  <resize-outline />
                </n-icon>
              </template>
              4:3
            </n-button>

            <n-button
              size="tiny"
              @click="resize16by10"
            >
              <template #icon>
                <n-icon>
                  <resize-outline />
                </n-icon>
              </template>
              16:10
            </n-button>

            <n-button
              size="tiny"
              @click="resize16by9"
            >
              <template #icon>
                <n-icon>
                  <resize-outline />
                </n-icon>
              </template>
              16:9
            </n-button>
          </div>
        </div>
      </div>

      <AppHeatmap
        v-if="!digestedRef.value?.isPairing"
        :colorscale="colorScaleRef"
        :labels="xRef"
        :range="ranges[rangeIndexRef]"
        :title="titleRef"
        :values="valuesRef"
      />

      <!--    TODO: Fix values    -->
      <AppHeatmap2d
        v-if="digestedRef.value?.isPairing"
        :colorscale="colorScaleRef"
        :range="ranges[rangeIndexRef]"
        :title="titleRef"
        :values="valuesRef"
        :x="xRef"
        :y="yRef"
      />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 20rem;
}

.form {
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  gap: 0.5rem;
  width: 100%;
}

.form-second-line {
  display: grid;
  grid-template-columns: 1fr 4rem 1fr;
  gap: 0.5rem;
}

.form-additional-line {
  display: grid;
  grid-template-columns: 1fr 4rem 1fr;
  gap: 0.5rem;
}

.swap-button {
  transform: translateY(1px);
  width: 100%;
}

.title {
  font-weight: bold;
}

.resize-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
