<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import {NButton, NCascader, NIcon} from 'naive-ui';
import {Csv} from 'src/common/Csv';
import AppDraggable from 'src/components/AppDraggable/AppDraggable.vue';
import AppPlot, {type AppPlotProps} from 'src/components/AppPlot/AppPlot.vue';
import {scatterLoadingRef} from 'src/components/Scatter/useScatterLoading';
import {
  relativeTrajectoriesRef,
  useRelativeTrajectories,
} from 'src/hooks/useRelativeTrajectories';
import {computed, ref} from 'vue';

const {selectRelativeTrajectories} = useRelativeTrajectories();

const valueRef = ref([]);

const optionsRef = computed(() => {
  if (relativeTrajectoriesRef.value === null) {
    return [];
  }

  return relativeTrajectoriesRef.value.map((rT) => ({
    label: rT.name,
    value: rT.index,
  }));
});

const histogramValuesRef = ref<AppPlotProps['values']>([]);
const histogramLabelsRef = ref<AppPlotProps['labels']>([]);
const histogramNamesRef = ref<AppPlotProps['names']>([]);

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
    histogramNamesRef.value?.length === 0 ||
    typeof histogramNamesRef?.value === 'undefined'
  ) {
    return;
  }

  const csv = new Csv();
  csv.addColumn('relativeTrajectory');

  for (const index in histogramValuesRef.value) {
    csv.createRow();
    csv.addToCurrentRow(`${histogramNamesRef?.value[index]} - relative time`);
    csv.addToCurrentRow(histogramLabelsRef.value[index].toString());

    csv.createRow();
    csv.addToCurrentRow(
      `${histogramNamesRef?.value[index]} - relative distance`,
    );
    csv.addToCurrentRow(histogramValuesRef.value[index].toString());
  }

  csv.download('relative-trajectories');
};
</script>

<template>
  <AppDraggable draggable-key="relativeTrajectories">
    <div class="container">
      <n-cascader
        v-model:value="valueRef"
        :cascade="false"
        :clear-filter-after-select="false"
        :disabled="scatterLoadingRef.value"
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

      <n-button
        class="export"
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

      <AppPlot
        :labels="histogramLabelsRef"
        :names="histogramNamesRef"
        :values="histogramValuesRef"
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
