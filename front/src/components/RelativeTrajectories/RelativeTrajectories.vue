<script lang="ts" setup>
import {NCascader} from 'naive-ui';
import AppDraggable from 'src/components/AppDraggable/AppDraggable.vue';
import {type AppHistogramProps} from 'src/components/AppHistogram/AppHistogram.vue';
import AppPlot, {AppPlotProps} from 'src/components/AppPlot/AppPlot.vue';
import {scatterLoadingRef} from 'src/components/Scatter/useScatterLoading';
import {
  relativeTrajectoriesRef,
  useRelativeTrajectories,
} from 'src/hooks/useRelativeTrajectories';
import {tracedFusedRef} from 'src/hooks/useTraced';
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
</script>

<template>
  <AppDraggable draggable-key="relativeTrajectories">
    <div class="container">
      <n-cascader
        v-model:value="valueRef"
        :cascade="false"
        :clear-filter-after-select="false"
        :disabled="scatterLoadingRef.value || tracedFusedRef.value"
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
</style>
