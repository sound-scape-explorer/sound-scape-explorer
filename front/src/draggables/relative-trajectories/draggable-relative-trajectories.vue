<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import {NButton, NCascader, NIcon} from 'naive-ui';
import AppDraggable from 'src/app/app-draggable.vue';
import AppPlot, {type AppPlotProps} from 'src/app/plot/app-plot.vue';
import {Csv} from 'src/common/csv';
import {useStorageRelativeTrajectories} from 'src/composables/storage-relative-trajectories';
import {EXPORT_FILENAME} from 'src/constants';
import {useScatterLoading} from 'src/scatter/scatter-loading';
import {computed, ref} from 'vue';

const {selectRelativeTrajectories, relativeTrajectories} =
  useStorageRelativeTrajectories();

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

const handleUpdateValue = (indexes: number[]) => {
  const selectedRelativeTrajectories = selectRelativeTrajectories(indexes);

  if (selectedRelativeTrajectories.length === 0) {
    histogramValuesRef.value = [];
    histogramLabelsRef.value = [];
    histogramNamesRef.value = [];
    return;
  }

  histogramValuesRef.value = selectedRelativeTrajectories.map(
    (rT) => rT.values,
  );

  histogramLabelsRef.value = selectedRelativeTrajectories.map((rT) =>
    rT.timestamps.map((t) => t.toString()),
  );

  histogramNamesRef.value = selectedRelativeTrajectories.map((rT) => rT.name);
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

  csv.download(`${EXPORT_FILENAME}-relative-trajectories`);
};
</script>

<template>
  <AppDraggable draggable-key="relativeTrajectories">
    <div class="container">
      <NCascader
        v-model:value="valueRef"
        :cascade="false"
        :clear-filter-after-select="false"
        :disabled="isLoading"
        :filterable="false"
        :options="optionsRef"
        :show-path="false"
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
        class="export"
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

      <AppPlot
        :labels="histogramLabelsRef"
        :names="histogramNamesRef"
        :values="histogramValuesRef"
        export-filename="relative-trajectories"
        legend
        title="Relative Trajectories"
        xTitle="Relative daytime"
        yTitle="Relative distance from average starting point"
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

.export {
  width: 100%;
}
</style>
