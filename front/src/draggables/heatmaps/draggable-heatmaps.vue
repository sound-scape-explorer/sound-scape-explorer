<script lang="ts" setup="">
import {DownloadOutline, RepeatOutline, ResizeOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NSelect} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppHeatmap from 'src/app/heatmap/app-heatmap.vue';
import AppHeatmap2d from 'src/app/heatmap/app-heatmap-2d.vue';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import AppSelect from 'src/app/select/app-select.vue';
import {Csv} from 'src/common/csv';
import {DigesterLayout} from 'src/common/digester-layout';
import {type HeatmapRange, heatmapRanges} from 'src/common/heatmap-range';
import {HeatmapScale} from 'src/common/heatmap-scale';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {
  type Digested,
  useStorageDigested,
} from 'src/composables/use-storage-digested';
import {useStorageDigesters} from 'src/composables/use-storage-digesters';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {computed, ref, unref, watch, watchEffect} from 'vue';

const {readDigested, digested} = useStorageDigested();
const {digesters} = useStorageDigesters();
const {labelProperties, labelSets} = useStorageLabels();

const labelA = ref<string | null>(null);
const labelB = ref<string | null>(null);
const digester = ref();
const titleRef = ref<string>('');
const xRef = ref<string[]>([]);
const yRef = ref<string[]>([]);
const valuesRef = ref<number[][]>([]);
const colorFlavor = ref<HeatmapScale>(HeatmapScale.RdBu);
const colorFlavors: HeatmapScale[] = [HeatmapScale.RdBu, HeatmapScale.Blues];

const ranges: HeatmapRange[] = [
  heatmapRanges.auto,
  heatmapRanges.min1to1,
  heatmapRanges.min0to1,
  heatmapRanges.min0to100,
];

useRefProvide('digested/digester', digester);
useRefProvide('digested/labelA', labelA);
useRefProvide('digested/labelB', labelB);
useRefProvide('digested/colorFlavor', colorFlavor);

const rangeIndex = ref<number>(ranges.indexOf(heatmapRanges.min1to1));
const rangeOptions = computed(() => {
  return ranges.map((range, index) => {
    return {
      label: `[${range.min ?? 'auto'}, ${range.max ?? 'auto'}]`,
      value: index,
    };
  });
});

const {resize1by1, resize4by3, resize16by10, resize16by9} = useAppHeatmapSize();

const digesterOptions = computed(() => {
  if (digesters.value === null) {
    return [];
  }

  return digesters.value.map((d) => d.name);
});

const swap = () => {
  if (labelA.value === null || labelB.value === null) {
    return;
  }

  const a = unref(labelA.value);
  const b = unref(labelB.value);

  labelA.value = b;
  labelB.value = a;
};

const updateRange = (digested: Digested) => {
  switch (digested.digester.name) {
    case DigesterLayout.silhouette:
      colorFlavor.value = HeatmapScale.RdBu;
      rangeIndex.value = ranges.indexOf(heatmapRanges.min1to1);
      break;
    case DigesterLayout.overlap:
      colorFlavor.value = HeatmapScale.Blues;
      rangeIndex.value = ranges.indexOf(heatmapRanges.min0to1);
      break;
    case DigesterLayout.contingency:
      colorFlavor.value = HeatmapScale.Blues;
      rangeIndex.value = ranges.indexOf(heatmapRanges.min0to100);
      break;
    default:
      colorFlavor.value = HeatmapScale.RdBu;
      rangeIndex.value = ranges.indexOf(heatmapRanges.auto);
      break;
  }
};

const update = () => {
  if (
    labelProperties.value === null ||
    labelSets.value === null ||
    digested.value === null ||
    labelA.value === null
  ) {
    return;
  }

  updateRange(digested.value);

  titleRef.value = `${digested.value.digester.name} - ${labelA.value}`;
  const aIndex = labelProperties.value.indexOf(labelA.value);
  xRef.value = labelSets.value[aIndex];

  // with 2 labels
  if (digested.value.isPairing && labelB.value !== null) {
    titleRef.value = `${titleRef.value} - ${labelB.value}`;
    const bIndex = labelProperties.value.indexOf(labelB.value);
    yRef.value = labelSets.value[bIndex];

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

watch(digester, () => {
  if (digesters.value === null) {
    return;
  }

  const digesterObject = digesters.value.find((d) => d.name === digester.value);

  if (digesterObject === undefined) {
    return;
  }

  readDigested(digesterObject);
});

watchEffect(update);
</script>

<template>
  <AppDraggable draggable-key="heatmaps">
    <div class="container">
      <div class="form">
        <span>Select</span>

        <AppSelect
          :options="digesterOptions"
          injection-key="digested/digester"
          placeholder="Digester..."
        />

        <span>Over</span>

        <div class="form-second-line">
          <AppSelect
            :options="labelProperties ?? []"
            injection-key="digested/labelA"
            placeholder="Label A..."
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

          <AppSelect
            :options="labelProperties ?? []"
            injection-key="digested/labelB"
            placeholder="Label B..."
          />
        </div>

        <span>Colorscale</span>
        <div class="form-additional-line">
          <AppSelect
            :options="colorFlavors"
            injection-key="digested/colorFlavor"
            placeholder="Color flavor..."
          />

          <span>Range</span>

          <div>
            <NSelect
              v-model:value="rangeIndex"
              :options="rangeOptions"
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
        v-if="!digested?.isPairing && digester && (labelA || labelB)"
        :colorscale="colorFlavor"
        :export-name="digested?.digester.name"
        :labels="xRef"
        :range="ranges[rangeIndex]"
        :title="titleRef"
        :values="valuesRef"
      />

      <AppHeatmap2d
        v-if="digested?.isPairing && digester && labelA && labelB"
        :colorscale="colorFlavor"
        :export-name="digested?.digester.name"
        :range="ranges[rangeIndex]"
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
