<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import {NCascader, NSwitch, NTooltip} from 'naive-ui';
import {Csv} from 'src/common/Csv';
import AppButton from 'src/components/AppButton/AppButton.vue';
import AppDraggable from 'src/components/AppDraggable/AppDraggable.vue';
import TrajectoriesColorScale from 'src/components/Trajectories/TrajectoriesColorScale.vue';
import {EXPORT_FILENAME} from 'src/constants';
import {useDate} from 'src/hooks/useDate';
import {tracedFusedRef, tracedRef} from 'src/hooks/useTraced';
import {trajectoriesRef, useTrajectories} from 'src/hooks/useTrajectories';
import {buildAverageTrajectory} from 'src/utils/build-average-trajectory';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed, ref, watch} from 'vue';

import {scatterLoadingRef} from '../Scatter/useScatterLoading';
import {useScatterTraces} from '../Scatter/useScatterTraces';

const {selectTrajectories} = useTrajectories();
const {convertTimestampToIsoDate} = useDate();

const optionsRef = computed(() => {
  if (trajectoriesRef.value === null) {
    return [];
  }

  const names = trajectoriesRef.value.map((t) => t.name);
  return convertToNaiveSelectOptions(names);
});

const valueRef = ref([]);
const fuseReadyRef = computed<boolean>(() => {
  if (scatterLoadingRef.value === true) {
    return false;
  }

  if (valueRef.value.length <= 1) {
    return false;
  }

  return true;
});

const handleUpdateValue = async (names: string[]) => {
  await selectTrajectories(names);
};

const {renderTraces} = useScatterTraces();
watch(tracedFusedRef, renderTraces);

const handleExportClick = () => {
  const isFused = tracedFusedRef.value;

  const csv = new Csv();
  csv.addColumn('name');
  csv.addColumn('timestamps');
  csv.addColumn('relativeTimestamps');
  csv.addColumn('x');
  csv.addColumn('y');
  csv.addColumn('z');

  if (isFused === true) {
    const {data, traced} = buildAverageTrajectory(tracedRef.value);

    traced.data.forEach((_, index) => {
      csv.createRow();
      csv.addToCurrentRow('fused');
      csv.addToCurrentRow(convertTimestampToIsoDate(traced.timestamps[index]));
      csv.addToCurrentRow(traced.relativeTimestamps[index].toString());
      csv.addToCurrentRow(data.x[index].toString());
      csv.addToCurrentRow(data.y[index].toString());
      if (typeof data.z !== 'undefined') {
        csv.addToCurrentRow(data.z[index].toString());
      }
    });

    csv.download(`${EXPORT_FILENAME}-trajectories.csv`);
    return;
  }

  for (const traced of tracedRef.value) {
    traced.data.forEach((coordinates, index) => {
      csv.createRow();
      csv.addToCurrentRow(traced.trajectory.name);
      csv.addToCurrentRow(convertTimestampToIsoDate(traced.timestamps[index]));
      csv.addToCurrentRow(traced.relativeTimestamps[index].toString());
      csv.addToCurrentRow(coordinates[0].toString());
      csv.addToCurrentRow(coordinates[1].toString());
      csv.addToCurrentRow(coordinates[2].toString());
    });
  }

  csv.download(`${EXPORT_FILENAME}-trajectories.csv`);
};
</script>

<template>
  <AppDraggable draggable-key="trajectories">
    <div class="container">
      <n-tooltip
        trigger="hover"
        placement="top-start"
        :show-arrow="false"
      >
        <template #trigger>
          <n-switch
            v-model:value="tracedFusedRef.value"
            :disabled="!fuseReadyRef"
            class="toggle"
          >
            <template #checked> fuse</template>
          </n-switch>
        </template>
        Average trajectories
      </n-tooltip>

      <n-cascader
        v-model:value="valueRef"
        multiple
        placeholder="Select trajectories"
        clearable
        max-tag-count="responsive"
        expand-trigger="click"
        :disabled="scatterLoadingRef.value || tracedFusedRef.value"
        :options="optionsRef"
        :cascade="false"
        check-strategy="child"
        :show-path="false"
        :filterable="false"
        :clear-filter-after-select="false"
        @update:value="handleUpdateValue"
        size="small"
      />
      <TrajectoriesColorScale />

      <AppButton
        :handle-click="handleExportClick"
        text="Export"
      >
        <download-outline />
      </AppButton>
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
</style>
