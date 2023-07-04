<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {computed, ref, watch} from 'vue';
import {buildNestedArray} from '../../utils/build-nested-array';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import AppHeatmap from '../AppHeatmap/AppHeatmap.vue';
import {useStorageMatrices} from 'src/hooks/useStorageMatrices';
import {useStorageMatrix} from 'src/hooks/useStorageMatrix';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {metaSetsRef} from 'src/hooks/useStorageMetaSets';

const {matricesRef} = useStorageMatrices();
const {readMatrix} = useStorageMatrix();

/**
 * State
 */

const titleRef = ref<string>('');
const labelsRef = ref<string[]>([]);
const valuesRef = ref<number[][]>([]);
const matrixNameSelectedRef = ref<string | null>(null);
const metaSelectedRef = ref<string | null>(null);

const matricesNaiveRef = computed(() => {
  if (matricesRef.value === null) {
    return [];
  }

  return convertToNaiveSelectOptions(
    matricesRef.value.map((matrix) => matrix.name),
  );
});

const metaPropertiesNaiveRef = computed(() => {
  if (metaPropertiesRef.value === null) {
    return [];
  }

  return convertToNaiveSelectOptions(metaPropertiesRef.value);
});

/**
 * Handlers
 */

async function handleUpdate() {
  if (
    metaPropertiesRef.value === null ||
    metaSetsRef.value === null ||
    matricesRef.value === null ||
    metaSelectedRef.value === null ||
    matrixNameSelectedRef.value === null
  ) {
    return;
  }

  const matrixNames = matricesRef.value.map((matrix) => matrix.name);
  const matrixIndex = matrixNames.indexOf(matrixNameSelectedRef.value);
  const metaIndex = metaPropertiesRef.value.indexOf(metaSelectedRef.value);

  if (metaIndex === -1 || matrixIndex === -1) {
    return;
  }

  const data = await readMatrix(matrixIndex, metaIndex);

  if (data === null) {
    return;
  }

  titleRef.value = `${matrixNameSelectedRef.value} - ${metaSelectedRef.value}`;
  labelsRef.value = metaSetsRef.value[metaIndex];
  valuesRef.value = buildNestedArray(data, Math.sqrt(data.length));
}

watch([matrixNameSelectedRef, metaSelectedRef], handleUpdate);

const isVisibleRef = computed<boolean>(() => {
  if (matrixNameSelectedRef.value === null || metaSelectedRef.value === null) {
    return false;
  }

  return true;
});
</script>

<template>
  <AppDraggable draggable-key="matrices">
    <div class="container">
      <div class="form">
        <span>Select</span>

        <n-select
          v-if="matricesNaiveRef"
          v-model:value="matrixNameSelectedRef"
          :options="matricesNaiveRef"
          placeholder="Matrix..."
          size="tiny"
        />

        <span v-if="!matricesNaiveRef" />

        <span>Over</span>

        <div class="form-second-line">
          <n-select
            v-model:value="metaSelectedRef"
            :options="metaPropertiesNaiveRef"
            placeholder="Meta..."
            size="tiny"
          />
        </div>
      </div>

      <AppHeatmap
        v-if="isVisibleRef"
        :labels="labelsRef"
        :title="titleRef"
        :values="valuesRef"
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
  grid-template-columns: 3rem 1fr;
  gap: 0.5rem;
  width: 100%;
}

.form-second-line {
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit {
  width: 100%;
}

.button {
  transform: translateY(1px);
}

.title {
  font-weight: bold;
}
</style>
