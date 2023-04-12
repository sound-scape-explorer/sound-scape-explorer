<script lang="ts" setup="">
import {FlashOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NSelect} from 'naive-ui';
import {computed, ref, unref} from 'vue';
import {MATRIX_NAMES} from '../../constants';
import {useStorage} from '../../hooks/useStorage';
import {buildNestedArray} from '../../utils/build-nested-array';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import AppHeatmap from '../AppHeatmap/AppHeatmap.vue';
import {useMetas} from '../Meta/useMetas';
import {selectionStore} from '../Selection/selectionStore';

const {
  metaPropertiesRef,
  metaSetsRef,
} = await useMetas();
const {
  getMatrix,
  matricesRef,
} = await useStorage();

const volumeSelectedRef = ref();

const volumesNaiveRef = computed(() => {
  const matrices = unref(matricesRef);

  if (!matrices) {
    return;
  }

  return convertToNaiveSelectOptions(matrices.map((v) => v.name));
});

const metaPropertiesNaiveRef = computed(() => convertToNaiveSelectOptions(metaPropertiesRef.value ?? {}));
const metaSelectedRef = ref();

const titleRef = ref<string>();
const labelsRef = ref<string[]>();
const valuesRef = ref<number[][]>();

async function run() {
  const metaSelected = unref(metaSelectedRef);
  const metaProperties = unref(metaPropertiesRef);
  const metaSets = unref(metaSetsRef);
  const volumeSelected = unref(volumeSelectedRef);
  const band = unref(selectionStore.band);
  const integrationName = unref(selectionStore.integration);

  if (
    !metaSelected
    || !metaProperties
    || !metaSets
    || !volumeSelected
    || !band
    || !integrationName
  ) {
    return;
  }

  const matrixIndex = MATRIX_NAMES.indexOf(volumeSelected);
  const metaIndex = metaProperties.indexOf(metaSelected);

  if (
    metaIndex === -1
    || matrixIndex === -1
  ) {
    return;
  }

  const data = await getMatrix(
    band,
    integrationName,
    matrixIndex,
    metaIndex,
  );

  if (!data) {
    return;
  }

  titleRef.value = `${volumeSelectedRef.value} - ${metaSelectedRef.value}`;
  labelsRef.value = metaSets[metaIndex];
  valuesRef.value = buildNestedArray(data, Math.sqrt(data.length));
}
</script>

<template>
  <AppDraggable draggable-key="matrices">
    <div class="container">
      <div class="form">
        <span>Select</span>

        <n-select
          v-if="volumesNaiveRef"
          v-model:value="volumeSelectedRef"
          :options="volumesNaiveRef"
          placeholder="Matrix..."
          size="tiny"
        />

        <span v-if="!volumesNaiveRef" />

        <span>Over</span>

        <div class="form-split">
          <n-select
            v-model:value="metaSelectedRef"
            :options="metaPropertiesNaiveRef"
            placeholder="Meta..."
            size="tiny"
          />
          <n-button class="button" size="tiny" @click="run">
            <n-icon>
              <flash-outline />
            </n-icon>
          </n-button>
        </div>
      </div>

      <AppHeatmap
        v-if="labelsRef && valuesRef"
        :labels="labelsRef ?? []"
        :title="titleRef ?? ''"
        :values="valuesRef ?? []"
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

.form-split {
  display: grid;
  grid-template-columns: 1fr 4rem;
  gap: 0.5rem;
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
