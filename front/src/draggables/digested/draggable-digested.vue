<script lang="ts" setup="">
import {DownloadOutline, RepeatOutline, ResizeOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NSelect} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppHeatmap from 'src/app/heatmap/app-heatmap.vue';
import AppHeatmap2d from 'src/app/heatmap/app-heatmap-2d.vue';
import {useAppHeatmapSize} from 'src/app/heatmap/app-heatmap-size';
import {Csv} from 'src/common/csv';
import {DigesterLayout} from 'src/common/digester-layout';
import {type HeatmapRange, heatmapRanges} from 'src/common/heatmap-range';
import {HeatmapScale} from 'src/common/heatmap-scale';
import {
  type Digested,
  useStorageDigested,
} from 'src/composables/storage-digested';
import {useStorageDigesters} from 'src/composables/storage-digesters';
import {useStorageLabels} from 'src/composables/storage-labels';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed, ref, unref, watch, watchEffect} from 'vue';

const {readDigested, digested} = useStorageDigested();
const {digesters} = useStorageDigesters();
const {labelsProperties, labelsSets} = useStorageLabels();

const labelSelectedARef = ref<string | null>(null);
const labelSelectedBRef = ref<string | null>(null);
const digesterSelectedRef = ref();
const titleRef = ref<string>('');
const xRef = ref<string[]>([]);
const yRef = ref<string[]>([]);
const valuesRef = ref<number[][]>([]);
const colorScaleRef = ref<HeatmapScale>(HeatmapScale.RdBu);

const colorScales: HeatmapScale[] = [HeatmapScale.RdBu, HeatmapScale.Blues];

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

const swap = () => {
  if (labelSelectedARef.value === null || labelSelectedBRef.value === null) {
    return;
  }

  const a = unref(labelSelectedARef.value);
  const b = unref(labelSelectedBRef.value);

  labelSelectedARef.value = b;
  labelSelectedBRef.value = a;
};

const updateRange = (digested: Digested) => {
  switch (digested.digester.name) {
    case DigesterLayout.silhouette:
      colorScaleRef.value = HeatmapScale.RdBu;
      rangeIndexRef.value = ranges.indexOf(heatmapRanges.min1to1);
      break;
    case DigesterLayout.overlap:
      colorScaleRef.value = HeatmapScale.Blues;
      rangeIndexRef.value = ranges.indexOf(heatmapRanges.min0to1);
      break;
    case DigesterLayout.contingency:
      colorScaleRef.value = HeatmapScale.Blues;
      rangeIndexRef.value = ranges.indexOf(heatmapRanges.min0to100);
      break;
    default:
      colorScaleRef.value = HeatmapScale.RdBu;
      rangeIndexRef.value = ranges.indexOf(heatmapRanges.auto);
      break;
  }
};

const update = () => {
  if (
    labelsProperties.value === null ||
    labelsSets.value === null ||
    digested.value === null ||
    labelSelectedARef.value === null
  ) {
    return;
  }

  updateRange(digested.value);

  titleRef.value = `${digested.value.digester.name} - ${labelSelectedARef.value}`;
  const aIndex = labelsProperties.value.indexOf(labelSelectedARef.value);
  xRef.value = labelsSets.value[aIndex];

  // with 2 labels
  if (digested.value.isPairing && labelSelectedBRef.value !== null) {
    titleRef.value = `${titleRef.value} - ${labelSelectedBRef.value}`;
    const bIndex = labelsProperties.value.indexOf(labelSelectedBRef.value);
    yRef.value = labelsSets.value[bIndex];

    // @ts-expect-error: 7053
    valuesRef.value = digested.value.values[aIndex][bIndex] as number[][];
    return;
  }

  // with 1 label
  const values = digested.value.values[aIndex] as number[][];
  const is1d = Array.isArray(values[0]) === false;

  if (is1d) {
    valuesRef.value = [values as unknown as number[]];
  } else {
    valuesRef.value = values;
  }
};

const handleExportClick = () => {
  if (
    digested.value === null ||
    xRef.value.length === 0 ||
    valuesRef.value.length === 0
  ) {
    return;
  }

  const csv = new Csv();
  const isPairing = digested.value.isPairing;
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

watchEffect(update);
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
            :disabled="!digested?.isPairing"
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
            :disabled="!digested?.isPairing"
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
          !digested?.isPairing &&
          digesterSelectedRef &&
          (labelSelectedARef || labelSelectedBRef)
        "
        :colorscale="colorScaleRef"
        :export-name="digested?.digester.name"
        :labels="xRef"
        :range="ranges[rangeIndexRef]"
        :title="titleRef"
        :values="valuesRef"
      />

      <AppHeatmap2d
        v-if="
          digested?.isPairing &&
          digesterSelectedRef &&
          labelSelectedARef &&
          labelSelectedBRef
        "
        :colorscale="colorScaleRef"
        :export-name="digested?.digester.name"
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
