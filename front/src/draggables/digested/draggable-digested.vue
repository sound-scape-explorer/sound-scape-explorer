<script lang="ts" setup="">
import {DownloadOutline, RepeatOutline, ResizeOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NSelect} from 'naive-ui';
import AppDraggable from 'src/app/app-draggable.vue';
import AppHeatmap from 'src/app/heatmap/app-heatmap.vue';
import AppHeatmap2d from 'src/app/heatmap/app-heatmap-2d.vue';
import {useAppHeatmapSize} from 'src/app/heatmap/app-heatmap-size';
import {Csv} from 'src/common/csv';
import {DigesterHeatmap} from 'src/common/digester-heatmap';
import {HeatmapColorScale} from 'src/common/heatmap-color-scale';
import {type HeatmapRange, heatmapRanges} from 'src/common/heatmap-range';
import {useStorageDigesters} from 'src/composables/storage-digesters';
import {useStorageLabels} from 'src/composables/storage-labels';
import {
  type Digested,
  digestedRef,
  useDigested,
} from 'src/draggables/digested/digested';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed, ref, unref, watch, watchEffect} from 'vue';

const {readDigested} = useDigested();
const {digesters} = useStorageDigesters();
const {labelsProperties, labelsSets} = useStorageLabels();

const labelSelectedARef = ref<string | null>(null);
const labelSelectedBRef = ref<string | null>(null);

const {resize1by1, resize4by3, resize16by10, resize16by9} = useAppHeatmapSize();

const labelPropertiesOptionsRef = computed(() => {
  if (labelsProperties.value === null) {
    return [];
  }

  return convertToNaiveSelectOptions(labelsProperties.value);
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
    labelsProperties.value === null ||
    labelsSets.value === null ||
    digestedRef.value === null ||
    labelSelectedARef.value === null
  ) {
    return;
  }

  updateRange(digestedRef.value);

  titleRef.value = `${digestedRef.value.digester.name} - ${labelSelectedARef.value}`;
  const aIndex = labelsProperties.value.indexOf(labelSelectedARef.value);
  xRef.value = labelsSets.value[aIndex];

  // with 2 labels
  if (digestedRef.value.isPairing && labelSelectedBRef.value !== null) {
    titleRef.value = `${titleRef.value} - ${labelSelectedBRef.value}`;
    const bIndex = labelsProperties.value.indexOf(labelSelectedBRef.value);
    yRef.value = labelsSets.value[bIndex];

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
</script>

<template>
  <AppDraggable draggable-key="digested">
    <div class="container">
      <div class="form">
        <span>Select</span>

        <NSelect
          v-model:value="digesterSelectedRef"
          :options="digestersOptionsRef"
          placeholder="Digester..."
          size="tiny"
        />

        <span>Over</span>

        <div class="form-second-line">
          <NSelect
            v-model:value="labelSelectedARef"
            :options="labelPropertiesOptionsRef"
            placeholder="Label A..."
            size="tiny"
          />

          <NButton
            :disabled="!digestedRef.value?.isPairing"
            class="swap-button"
            size="tiny"
            @click="swap"
          >
            <NIcon>
              <RepeatOutline />
            </NIcon>
          </NButton>

          <NSelect
            v-model:value="labelSelectedBRef"
            :disabled="!digestedRef.value?.isPairing"
            :options="labelPropertiesOptionsRef"
            placeholder="Label B..."
            size="tiny"
          />
        </div>

        <span>Colorscale</span>
        <div class="form-additional-line">
          <NSelect
            v-model:value="colorScaleRef"
            :options="colorScalesOptionsRef"
            placeholder="Colorscale..."
            size="tiny"
          />

          <span>Range</span>
          <div>
            <NSelect
              v-model:value="rangeIndexRef"
              :options="rangesOptionsRef"
              placeholder="Range..."
              size="tiny"
            />
          </div>
        </div>

        <span>Export</span>
        <div class="form-additional-line">
          <NButton
            size="tiny"
            @click="handleExportClick"
          >
            <template #icon>
              <NIcon>
                <DownloadOutline />
              </NIcon>
            </template>
            Export .csv
          </NButton>

          <span>Resize</span>
          <div class="resize-row">
            <NButton
              size="tiny"
              @click="resize1by1"
            >
              <template #icon>
                <NIcon>
                  <ResizeOutline />
                </NIcon>
              </template>
              1:1
            </NButton>

            <NButton
              size="tiny"
              @click="resize4by3"
            >
              <template #icon>
                <NIcon>
                  <ResizeOutline />
                </NIcon>
              </template>
              4:3
            </NButton>

            <NButton
              size="tiny"
              @click="resize16by10"
            >
              <template #icon>
                <NIcon>
                  <ResizeOutline />
                </NIcon>
              </template>
              16:10
            </NButton>

            <NButton
              size="tiny"
              @click="resize16by9"
            >
              <template #icon>
                <NIcon>
                  <ResizeOutline />
                </NIcon>
              </template>
              16:9
            </NButton>
          </div>
        </div>
      </div>

      <AppHeatmap
        v-if="
          !digestedRef.value?.isPairing &&
          digesterSelectedRef &&
          (labelSelectedARef || labelSelectedBRef)
        "
        :colorscale="colorScaleRef"
        :labels="xRef"
        :range="ranges[rangeIndexRef]"
        :title="titleRef"
        :values="valuesRef"
      />

      <AppHeatmap2d
        v-if="
          digestedRef.value?.isPairing &&
          digesterSelectedRef &&
          labelSelectedARef &&
          labelSelectedBRef
        "
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
