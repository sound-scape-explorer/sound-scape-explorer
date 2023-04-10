<script lang="ts" setup="">
import {FlashOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NSelect} from 'naive-ui';
import {computed, ref, unref} from 'vue';
import {useStorage} from '../../hooks/useStorage';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import AppHistogram from '../AppHistogram/AppHistogram.vue';
import {useMetas} from '../Meta/useMetas';
import {selectionStore} from '../Selection/selectionStore';

const {
  metaPropertiesRef,
  metaSetsRef,
} = await useMetas();
const {
  volumeNamesRef,
  getVolumeNew,
  volumesRef,
} = await useStorage();

const volumeSelectedRef = ref();

const volumesNaiveRef = computed(() => {
  const volumes = unref(volumesRef);

  if (!volumes) {
    return;
  }

  return convertToNaiveSelectOptions(volumes.map((v) => v.name));
});

const metaPropertiesNaiveRef = computed(() => convertToNaiveSelectOptions(metaPropertiesRef.value ?? {}));
const metaSelectedRef = ref();

const titleRef = ref<string>();
const labelsRef = ref<string[]>();
const valuesRef = ref<number[]>();

async function run() {
  const metaSelected = unref(metaSelectedRef);
  const metaProperties = unref(metaPropertiesRef);
  const metaSets = unref(metaSetsRef);
  const volumeSelected = unref(volumeSelectedRef);
  const volumeNames = unref(volumeNamesRef);
  const band = unref(selectionStore.band);
  const integrationName = unref(selectionStore.integration);

  if (
    !metaSelected
    || !metaProperties
    || !metaSets
    || !volumeSelected
    || !volumeNames
    || !band
    || !integrationName
  ) {
    return;
  }

  const volumeIndex = volumeNames.indexOf(volumeSelected);
  const metaIndex = metaProperties.indexOf(metaSelected);

  if (
    metaIndex === -1
    || volumeIndex === -1
  ) {
    return;
  }

  const data = await getVolumeNew(
    band,
    integrationName,
    volumeIndex,
    metaIndex,
  );

  if (!data) {
    return;
  }

  titleRef.value = `${volumeSelectedRef.value} - ${metaSelectedRef.value}`;
  labelsRef.value = metaSets[metaIndex];
  valuesRef.value = data;
}
</script>

<template>
  <AppDraggable draggable-key="volumes">
    <div class="container">
      <div class="form">
        <span>Select</span>

        <n-select
          v-if="volumesNaiveRef"
          v-model:value="volumeSelectedRef"
          :options="volumesNaiveRef"
          placeholder="Volume..."
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

      <AppHistogram
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
