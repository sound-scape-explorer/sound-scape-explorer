<script setup lang="ts">
import {NSelect} from 'naive-ui';
import {computed, ref, watch} from 'vue';
import {
  configTrajectoriesRef,
  useConfigTrajectories,
} from '../../hooks/useConfigTrajectories';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';

const {selectTrajectory} = useConfigTrajectories();

const selectedRef = ref<number | null>(null);

watch(selectedRef, () => selectTrajectory(selectedRef.value));

const optionsRef = computed(() => {
  if (configTrajectoriesRef.value === null) {
    return convertToNaiveSelectOptions([]);
  }

  const indexes = configTrajectoriesRef.value.map((trajectory) =>
    trajectory.index.toString(),
  );

  return convertToNaiveSelectOptions(indexes);
});
</script>

<template>
  <n-select
    v-model:value="selectedRef"
    :options="optionsRef"
    placeholder="Trajectory..."
    size="small"
  />
</template>
