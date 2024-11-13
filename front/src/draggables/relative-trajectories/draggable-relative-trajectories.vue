<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import chroma from 'chroma-js';
import {downloadOutline} from 'ionicons/icons';
import {NButton, NCascader} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppPlot, {type AppPlotProps} from 'src/app/plot/app-plot.vue';
import {Csv} from 'src/common/csv';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useExportName} from 'src/composables/use-export-name';
import {useRelativeTrajectories} from 'src/composables/use-relative-trajectories';
import {
  LOWER_QUARTILE_SUFFIX,
  RELATIVE_TRAJECTORIES_FLAVOR,
  UPPER_QUARTILE_SUFFIX,
} from 'src/constants';
import {computed, ref} from 'vue';

// TODO: split me
// TODO: make zoom unzoom for hd raster exports
// TODO: split app plot for dedicated relative trajectories

const {selectRelativeTrajectories, relativeTrajectories} =
  useRelativeTrajectories();
const {generate} = useExportName();
const exportName = generate('relative-trajectories');

const valueRef = ref([]);
const {isLoading} = useScatterLoading();

const optionsRef = computed(() => {
  if (relativeTrajectories.value === null) {
    return [];
  }

  return relativeTrajectories.value.map((rT) => ({
    label: rT.name,
    value: rT.index,
  }));
});

const histogramValuesRef = ref<AppPlotProps['values']>([]);
const histogramLabelsRef = ref<AppPlotProps['labels']>([]);
const histogramNamesRef = ref<string[]>([]);
const histogramColors = ref<string[]>([]);

const handleUpdateValue = (indexes: number[]) => {
  const selected = selectRelativeTrajectories(indexes);

  if (selected.length === 0) {
    histogramValuesRef.value = [];
    histogramLabelsRef.value = [];
    histogramNamesRef.value = [];
    histogramColors.value = [];
    return;
  }

  const names: string[] = [];
  const labels: string[][] = []; // timestamps
  const values: number[][] = []; // series
  const colors: string[] = [];
  const s = chroma.scale(RELATIVE_TRAJECTORIES_FLAVOR).colors(selected.length);

  for (let i = 0; i < selected.length; i += 1) {
    const {name, timestamps, quartiles, values: v} = selected[i];
    const color = s[i];
    const ts = timestamps.map((t) => t.toString());

    names.push(name);
    labels.push(ts);
    values.push(v);
    colors.push(color);

    if (quartiles === null) {
      continue;
    }

    names.push(`${name}${LOWER_QUARTILE_SUFFIX}`);
    labels.push(ts);
    values.push(quartiles.map((q) => q[0]));
    colors.push(color);

    names.push(`${name}${UPPER_QUARTILE_SUFFIX}`);
    labels.push(ts);
    values.push(quartiles.map((q) => q[1]));
    colors.push(color);
  }

  histogramNamesRef.value = names;
  histogramLabelsRef.value = labels;
  histogramValuesRef.value = values;
  histogramColors.value = colors;
};

const handleExportClick = () => {
  if (
    histogramValuesRef.value.length === 0 ||
    histogramLabelsRef.value.length === 0 ||
    histogramNamesRef.value.length === 0 ||
    typeof histogramNamesRef?.value === 'undefined'
  ) {
    return;
  }

  const csv = new Csv();

  const maxLength = histogramValuesRef.value
    .map((values) => values.length)
    .reduce((a, b) => Math.max(a, b), 0);

  // create columns
  for (const name of histogramNamesRef.value) {
    csv.addColumn(`${name} - relative time`);
    csv.addColumn(`${name} - relative distance`);
  }

  for (let i = 0; i < maxLength; i += 1) {
    let row: string[] = [];

    for (const j in histogramNamesRef.value) {
      const time = histogramLabelsRef.value[j][i];
      const distance = histogramValuesRef.value[j][i];

      if (typeof time === 'undefined' || typeof distance === 'undefined') {
        row = [...row, '', ''];
        continue;
      }

      row = [...row, time, distance.toString()];
    }

    csv.createRow();
    csv.addToCurrentRow(row.join(csv.separator));
  }

  csv.download(exportName);
};
</script>

<template>
  <AppDraggable
    draggable-key="relativeTrajectories"
    suspense="view"
  >
    <div :class="$style.container">
      <NCascader
        v-model:value="valueRef"
        :cascade="false"
        :clear-filter-after-select="false"
        :disabled="isLoading"
        :filterable="false"
        :options="optionsRef"
        :show-path="false"
        :virtual-scroll="false"
        check-strategy="child"
        clearable
        expand-trigger="click"
        max-tag-count="responsive"
        multiple
        placeholder="Select relative trajectories"
        size="small"
        @update:value="handleUpdateValue"
      />

      <NButton
        :class="$style.export"
        size="tiny"
        @click="handleExportClick"
      >
        <IonIcon :icon="downloadOutline" />
        Export .csv
      </NButton>

      <div :class="$style.plot">
        <AppPlot
          :colors="histogramColors"
          :export-filename="exportName"
          :labels="histogramLabelsRef"
          :names="histogramNamesRef"
          :values="histogramValuesRef"
          hover-template="relative-trajectories"
          legend
          title="Relative Trajectories"
          xTitle="Relative daytime"
          yTitle="Relative distance from average starting point"
        />
      </div>
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  width: $s2;
  gap: $p0;
}

.export {
  width: 100%;
}

.plot {
  width: 100%;
  height: 100%;
}
</style>
