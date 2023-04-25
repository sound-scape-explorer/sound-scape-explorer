<script lang="ts" setup="">
import {FlashOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NSelect} from 'naive-ui';
import {computed, ref} from 'vue';
import {useStorage} from '../../storage/useStorage';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import AppHistogram from '../AppHistogram/AppHistogram.vue';

const {readVolume, volumesRef, metaPropertiesRef, metaSetsRef} =
  await useStorage();

/**
 * State
 */

const titleRef = ref<string>();
const labelsRef = ref<string[]>();
const valuesRef = ref<number[]>();
const volumeSelectedRef = ref();
const metaSelectedRef = ref();

const volumesNaiveRef = computed(() => {
  const volumes = volumesRef.value;

  if (volumes === null) {
    return;
  }

  return convertToNaiveSelectOptions(volumes.map((v) => v.name));
});

const metaPropertiesNaiveRef = computed(() => {
  const metaProperties = metaPropertiesRef.value;

  if (metaProperties === null) {
    return [];
  }

  return convertToNaiveSelectOptions(metaProperties);
});

/**
 * Handlers
 */

async function run() {
  const metaProperties = metaPropertiesRef.value;
  const metaSets = metaSetsRef.value;
  const metaSelected = metaSelectedRef.value;
  const volumeSelected = volumeSelectedRef.value;
  const volumes = volumesRef.value;

  console.log(volumes);

  if (
    metaSelected === null ||
    metaProperties === null ||
    metaSets === null ||
    volumeSelected === null ||
    volumes === null
  ) {
    return;
  }

  const volumeNames = volumes.map((volume) => volume.name);
  const volumeIndex = volumeNames.indexOf(volumeSelected);
  const metaIndex = metaProperties.indexOf(metaSelected);

  console.log(volumeSelected, volumeNames);

  if (metaIndex === -1 || volumeIndex === -1) {
    return;
  }

  const data = await readVolume(volumeIndex, metaIndex);

  console.log(data);

  if (data === null) {
    return;
  }

  console.log(metaSets);

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
