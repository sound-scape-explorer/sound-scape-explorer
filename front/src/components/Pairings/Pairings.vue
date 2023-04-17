<script lang="ts" setup="">
import {FlashOutline, RepeatOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NSelect} from 'naive-ui';
import {computed, ref, unref} from 'vue';
import {PAIRING_NAMES} from '../../constants';
import {useStorage} from '../../hooks/useStorage';
import {buildNestedArray} from '../../utils/build-nested-array';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import AppHeatmap2D from '../AppHeatmap2D/AppHeatmap2D.vue';
import {useMetas} from '../Meta/useMetas';
import {selectionStore} from '../Selection/selectionStore';

const {
  metaPropertiesRef,
  metaSetsRef,
} = await useMetas();
const {
  getPairing,
  pairingsRef,
} = await useStorage();

const pairingSelectedRef = ref();

const pairingsNaiveRef = computed(() => {
  const pairings = unref(pairingsRef);

  if (!pairings) {
    return;
  }

  return convertToNaiveSelectOptions(pairings.map((v) => v.name));
});

const metaPropertiesNaiveRef = computed(() => convertToNaiveSelectOptions(metaPropertiesRef.value ?? {}));
const metaSelectedARef = ref();
const metaSelectedBRef = ref();

const titleRef = ref<string>();
const xRef = ref<string[]>([]);
const yRef = ref<string[]>([]);
const valuesRef = ref<number[][]>();

async function run() {
  const metaSelectedA = unref(metaSelectedARef);
  const metaSelectedB = unref(metaSelectedBRef);
  const metaProperties = unref(metaPropertiesRef);
  const metaSets = unref(metaSetsRef);
  const pairingSelected = unref(pairingSelectedRef);
  const band = unref(selectionStore.band);
  const integrationName = unref(selectionStore.integration);

  if (
    !metaSelectedA
    || !metaSelectedB
    || !metaProperties
    || !metaSets
    || !pairingSelected
    || !band
    || !integrationName
  ) {
    return;
  }

  const pairingIndex = PAIRING_NAMES.indexOf(pairingSelected);
  const metaIndexA = metaProperties.indexOf(metaSelectedA);
  const metaIndexB = metaProperties.indexOf(metaSelectedB);

  if (
    metaIndexA === -1
    || metaIndexB === -1
    || pairingIndex === -1
  ) {
    return;
  }

  const data = await getPairing(
    band,
    integrationName,
    pairingIndex,
    metaIndexA,
    metaIndexB,
  );

  if (!data) {
    return;
  }

  titleRef.value = `${pairingSelectedRef.value} - ${metaSelectedARef.value} vs. ${metaSelectedBRef.value}`;

  let length = 0;

  if (metaIndexA <= metaIndexB) {
    xRef.value = metaSets[metaIndexA];
    yRef.value = metaSets[metaIndexB];
    length = xRef.value.length;
  } else {
    xRef.value = metaSets[metaIndexB];
    yRef.value = metaSets[metaIndexA];
    length = yRef.value.length;
  }

  valuesRef.value = buildNestedArray(data, length);
}

function swap() {
  const a = unref(metaSelectedARef);
  const b = unref(metaSelectedBRef);

  if (!a || !b) {
    return;
  }

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
          <n-button class="button" size="tiny" @click="swap">
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
        <n-button class="button" size="tiny" @click="run">
          <n-icon>
            <flash-outline />
          </n-icon>
        </n-button>
      </div>

      <AppHeatmap2D
        v-if="xRef && yRef && valuesRef"
        :title="titleRef ?? ''"
        :values="valuesRef ?? []"
        :x="xRef ?? []"
        :y="yRef ?? []"
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
