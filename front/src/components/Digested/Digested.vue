<script lang="ts" setup="">
import {RepeatOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NSelect} from 'naive-ui';
import {digestersRef} from 'src/hooks/useDigesters';
import {labelsPropertiesRef, labelsSetsRef} from 'src/hooks/useLabels';
import {computed, ref, unref, watch, watchEffect} from 'vue';

import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import AppHeatmap from '../AppHeatmap/AppHeatmap.vue';
import AppHeatmap2D from '../AppHeatmap2D/AppHeatmap2D.vue';
import {digestedRef} from './useDigested';
import {useDigested} from './useDigested';

const {readDigested} = useDigested();

const labelSelectedARef = ref<string | null>(null);
const labelSelectedBRef = ref<string | null>(null);

const labelPropertiesOptionsRef = computed(() => {
  if (labelsPropertiesRef.value === null) {
    return [];
  }

  return convertToNaiveSelectOptions(labelsPropertiesRef.value);
});

const digestersOptionsRef = computed(() => {
  if (digestersRef.value === null) {
    return [];
  }

  const names = digestersRef.value.map((d) => d.name);
  return convertToNaiveSelectOptions(names);
});

const digesterSelectedRef = ref();

watch(digesterSelectedRef, () => {
  if (digestersRef.value === null) {
    return;
  }

  const digester = digestersRef.value.find(
    (d) => d.name === digesterSelectedRef.value,
  );

  if (digester === undefined) {
    return;
  }

  readDigested(digester);
});

const swap = () => {
  if (labelSelectedARef.value === null || labelSelectedBRef.value === null) {
    return;
  }

  const a = unref(labelSelectedARef.value);
  const b = unref(labelSelectedBRef.value);

  labelSelectedARef.value = b;
  labelSelectedBRef.value = a;
};

const titleRef = ref<string>('');
const xRef = ref<string[]>([]);
const yRef = ref<string[]>([]);
const valuesRef = ref<number[][]>([]);

const update = () => {
  if (
    labelsPropertiesRef.value === null ||
    labelsSetsRef.value === null ||
    digestedRef.value === null ||
    labelSelectedARef.value === null
  ) {
    return;
  }

  titleRef.value = `${digestedRef.value.digester.name} - ${labelSelectedARef.value}`;
  const aIndex = labelsPropertiesRef.value.indexOf(labelSelectedARef.value);
  xRef.value = labelsSetsRef.value[aIndex];

  // with 2 labels
  if (digestedRef.value.isPairing && labelSelectedBRef.value !== null) {
    titleRef.value = `${titleRef.value} - ${labelSelectedBRef.value}`;
    const bIndex = labelsPropertiesRef.value.indexOf(labelSelectedBRef.value);
    yRef.value = labelsSetsRef.value[bIndex];

    // @ts-expect-error: 7053
    valuesRef.value = digestedRef.value.values[aIndex][bIndex] as number[][];
    return;
  }

  // with 1 label
  const values = digestedRef.value.values[aIndex] as number[][];
  const is1d = Array.isArray(values[0]) === false;

  if (is1d) {
    valuesRef.value = [values as unknown as number[]];
  } else {
    valuesRef.value = values;
  }
};

watchEffect(update);
</script>

<template>
  <AppDraggable draggable-key="digested">
    <div class="container">
      <div class="form">
        <span>Select</span>

        <n-select
          v-model:value="digesterSelectedRef"
          :options="digestersOptionsRef"
          placeholder="Digester..."
          size="tiny"
        />

        <span>Over</span>

        <div class="form-second-line">
          <n-select
            v-model:value="labelSelectedARef"
            :options="labelPropertiesOptionsRef"
            placeholder="Label A..."
            size="tiny"
          />

          <n-button
            :disabled="!digestedRef.value?.isPairing"
            class="button"
            size="tiny"
            @click="swap"
          >
            <n-icon>
              <repeat-outline />
            </n-icon>
          </n-button>

          <n-select
            :disabled="!digestedRef.value?.isPairing"
            v-model:value="labelSelectedBRef"
            :options="labelPropertiesOptionsRef"
            placeholder="Label B..."
            size="tiny"
          />
        </div>
      </div>

      <AppHeatmap
        v-if="!digestedRef.value?.isPairing"
        :title="titleRef"
        :labels="xRef"
        :values="valuesRef"
      />

      <AppHeatmap2D
        v-if="digestedRef.value?.isPairing"
        :title="titleRef"
        :x="xRef"
        :y="yRef"
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
  display: grid;
  grid-template-columns: 1fr 4rem 1fr;
  gap: 0.5rem;
}

.button {
  transform: translateY(1px);
  width: 100%;
}

.title {
  font-weight: bold;
}
</style>
