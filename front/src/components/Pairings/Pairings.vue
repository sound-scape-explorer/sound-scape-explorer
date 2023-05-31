<script lang="ts" setup="">
import {FlashOutline, RepeatOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NSelect} from 'naive-ui';
import {computed, ref, unref} from 'vue';
import {buildNestedArray} from '../../utils/build-nested-array';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import AppHeatmap2D from '../AppHeatmap2D/AppHeatmap2D.vue';
import {useStoragePairings} from 'src/hooks/useStoragePairings';
import {useStoragePairing} from 'src/hooks/useStoragePairing';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {metaSetsRef} from 'src/hooks/useStorageMetaSets';

const {pairingsRef} = useStoragePairings();
const {readPairing} = useStoragePairing();

/**
 * State
 */

const titleRef = ref<string>('');
const xRef = ref<string[]>([]);
const yRef = ref<string[]>([]);
const valuesRef = ref<number[][]>([]);
const pairingSelectedRef = ref<string | null>(null);
const metaSelectedARef = ref<string | null>(null);
const metaSelectedBRef = ref<string | null>(null);

const pairingsNaiveRef = computed(() => {
  if (pairingsRef.value === null) {
    return [];
  }

  return convertToNaiveSelectOptions(
    pairingsRef.value.map((pairing) => pairing.name),
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

async function run() {
  if (
    pairingsRef.value === null ||
    metaSelectedARef.value === null ||
    metaSelectedBRef.value === null ||
    pairingSelectedRef.value === null ||
    metaPropertiesRef.value === null ||
    metaSetsRef.value === null
  ) {
    return;
  }

  const pairingNames = pairingsRef.value.map((pairing) => pairing.name);
  const pairingIndex = pairingNames.indexOf(pairingSelectedRef.value);
  const metaIndexA = metaPropertiesRef.value.indexOf(metaSelectedARef.value);
  const metaIndexB = metaPropertiesRef.value.indexOf(metaSelectedBRef.value);

  if (metaIndexA === -1 || metaIndexB === -1 || pairingIndex === -1) {
    return;
  }

  const isDefault = metaIndexA <= metaIndexB;
  let data: number[] | null;

  if (isDefault) {
    data = await readPairing(pairingIndex, metaIndexA, metaIndexB);
  } else {
    data = await readPairing(pairingIndex, metaIndexB, metaIndexA);
  }

  if (data === null) {
    return;
  }

  titleRef.value = `${pairingSelectedRef.value} - ${metaSelectedARef.value} vs. ${metaSelectedBRef.value}`;
  xRef.value = metaSetsRef.value[metaIndexA];
  yRef.value = metaSetsRef.value[metaIndexB];

  const length = xRef.value.length;

  valuesRef.value = buildNestedArray(data, length);
}

function swap() {
  if (metaSelectedARef.value === null || metaSelectedBRef.value === null) {
    return;
  }

  const a = unref(metaSelectedARef.value);
  const b = unref(metaSelectedBRef.value);

  metaSelectedARef.value = b;
  metaSelectedBRef.value = a;
}
</script>

<template>
  <AppDraggable draggable-key="pairings">
    <div class="container">
      <div class="form">
        <span>Select</span>

        <span v-if="!pairingsNaiveRef" />
        <n-select
          v-if="pairingsNaiveRef"
          v-model:value="pairingSelectedRef"
          :options="pairingsNaiveRef"
          placeholder="Pairing..."
          size="tiny"
        />

        <span>Over</span>
        <div class="form-split">
          <n-select
            v-model:value="metaSelectedARef"
            :options="metaPropertiesNaiveRef"
            placeholder="Meta A..."
            size="tiny"
          />
          <n-button
            class="button"
            size="tiny"
            @click="swap"
          >
            <n-icon>
              <repeat-outline />
            </n-icon>
          </n-button>
          <n-select
            v-model:value="metaSelectedBRef"
            :options="metaPropertiesNaiveRef"
            placeholder="Meta B..."
            size="tiny"
          />
        </div>

        <span>And</span>
        <n-button
          class="button"
          size="tiny"
          @click="run"
        >
          <n-icon>
            <flash-outline />
          </n-icon>
        </n-button>
      </div>

      <AppHeatmap2D
        v-if="valuesRef.length > 0"
        :title="titleRef"
        :values="valuesRef"
        :x="xRef"
        :y="yRef"
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

  min-width: 40rem;
}

.form {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 0.5rem;
  width: 100%;
}

.form-split {
  display: grid;
  grid-template-columns: 1fr 4rem 1fr;
  gap: 0.5rem;
}

.submit {
  width: 100%;
}

.button {
  width: 100%;
}

.title {
  font-weight: bold;
}
</style>
