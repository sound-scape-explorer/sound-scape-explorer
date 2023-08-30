<script lang="ts" setup>
import {NCascader, NSwitch, NTooltip} from 'naive-ui';
import AppDraggable from 'src/components/AppDraggable/AppDraggable.vue';
import TrajectoriesColorScale from 'src/components/Trajectories/TrajectoriesColorScale.vue';
import {tracedFusedRef} from 'src/hooks/useTraced';
import {trajectoriesRef, useTrajectories} from 'src/hooks/useTrajectories';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed, ref} from 'vue';

import {scatterLoadingRef} from '../Scatter/useScatterLoading';

const {selectTrajectories} = useTrajectories();

const optionsRef = computed(() => {
  if (trajectoriesRef.value === null) {
    return [];
  }

  const names = trajectoriesRef.value.map((t) => t.name);
  return convertToNaiveSelectOptions(names);
});

const valueRef = ref([]);
const fuseReadyRef = computed<boolean>(() => {
  if (scatterLoadingRef.value === false) {
    return false;
  }

  if (valueRef.value.length <= 1) {
    return false;
  }

  return true;
});

const handleUpdateValue = (names: string[]) => {
  selectTrajectories(names);
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
    </div>

    <TrajectoriesColorScale />
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
