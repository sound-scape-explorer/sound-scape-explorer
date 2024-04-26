<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import {NCascader, NSwitch, NTooltip} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggable from 'src/app/app-draggable.vue';
import {Csv} from 'src/common/csv';
import {useDate} from 'src/composables/date';
import {useTrajectoriesData} from 'src/composables/trajectories-data';
import {useTrajectoriesSelection} from 'src/composables/trajectories-selection';
import {useTrajectoriesStorage} from 'src/composables/trajectories-storage';
import {EXPORT_FILENAME} from 'src/constants';
import TrajectoriesColorScale from 'src/draggables/trajectories/draggable-trajectories-gradient.vue';
import {scatterLoadingRef} from 'src/scatter/scatter-loading';
import {useScatterTraces} from 'src/scatter/scatter-traces';
import {buildAverageTrajectory} from 'src/utils/build-average-trajectory';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed, ref, watch} from 'vue';

const {trajectories} = useTrajectoriesStorage();
const {select} = useTrajectoriesSelection();
const {convertTimestampToIsoDate} = useDate();
const {traceds, isFused} = useTrajectoriesData();

const optionsRef = computed(() => {
  if (trajectories.value === null) {
    return [];
  }

  const names = trajectories.value.map((t) => t.name);
  return convertToNaiveSelectOptions(names);
});

const valueRef = ref([]);
const fuseReadyRef = computed<boolean>(() => {
  if (scatterLoadingRef.value === true) {
    return false;
  }

  return valueRef.value.length > 1;
});

const handleUpdateValue = async (names: string[]) => {
  await select(names);
};

const {renderTraces} = useScatterTraces();
watch(isFused, renderTraces);

const handleExportClick = () => {
  const csv = new Csv();
  csv.addColumn('name');
  csv.addColumn('timestamps');
  csv.addColumn('relativeTimestamps');
  csv.addColumn('x');
  csv.addColumn('y');
  csv.addColumn('z');

  if (isFused.value) {
    const {data, traced} = buildAverageTrajectory(traceds.value);

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
  } else {
    for (const traced of traceds.value) {
      traced.data.forEach((coordinates, index) => {
        csv.createRow();
        csv.addToCurrentRow(traced.trajectory.name);
        csv.addToCurrentRow(
          convertTimestampToIsoDate(traced.timestamps[index]),
        );
        csv.addToCurrentRow(traced.relativeTimestamps[index].toString());
        csv.addToCurrentRow(coordinates[0].toString());
        csv.addToCurrentRow(coordinates[1].toString());
        csv.addToCurrentRow(coordinates[2].toString());
      });
    }
  }

  csv.download(`${EXPORT_FILENAME}-trajectories.csv`);
};
</script>

<template>
  <AppDraggable draggable-key="trajectories">
    <div class="container">
      <NTooltip
        :show-arrow="false"
        placement="top-start"
        trigger="hover"
      >
        <template #trigger>
          <NSwitch
            v-model:value="isFused"
            :disabled="!fuseReadyRef"
            class="toggle"
          >
            <template #checked> fuse</template>
          </NSwitch>
        </template>
        Average trajectories
      </NTooltip>

      <NCascader
        v-model:value="valueRef"
        :cascade="false"
        :clear-filter-after-select="false"
        :disabled="scatterLoadingRef.value || isFused"
        :filterable="false"
        :options="optionsRef"
        :show-path="false"
        check-strategy="child"
        clearable
        expand-trigger="click"
        max-tag-count="responsive"
        multiple
        placeholder="Select trajectories"
        size="small"
        @update:value="handleUpdateValue"
      />
      <TrajectoriesColorScale />

      <AppButton
        :handle-click="handleExportClick"
        text="Export"
      >
        <DownloadOutline />
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
