<script lang="ts" setup="">
import {FlashOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NSelect} from 'naive-ui';
import {computed, ref} from 'vue';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import AppHistogram from '../AppHistogram/AppHistogram.vue';
import {useStorageVolumes} from 'src/hooks/useStorageVolumes';
import {useStorageVolume} from 'src/hooks/useStorageVolume';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {metaSetsRef} from 'src/hooks/useStorageMetaSets';

const {volumesRef} = useStorageVolumes();
const {readVolume} = useStorageVolume();

/**
 * State
 */

const titleRef = ref<string>();
const labelsRef = ref<string[]>();
const valuesRef = ref<number[]>();
const volumeNameSelectedRef = ref<string | null>(null);
const metaSelectedRef = ref();

const volumesNaiveRef = computed(() => {
  if (volumesRef.value === null) {
    return;
  }

  return convertToNaiveSelectOptions(
    volumesRef.value.map((volumes) => volumes.name),
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
    metaSelectedRef.value === null ||
    metaPropertiesRef.value === null ||
    metaSetsRef.value === null ||
    volumesRef.value === null ||
    volumeNameSelectedRef.value === null ||
    metaSelectedRef.value === null
  ) {
    return;
  }

  const volumeNames = volumesRef.value.map((volume) => volume.name);
  const volumeIndex = volumeNames.indexOf(volumeNameSelectedRef.value);
  const metaIndex = metaPropertiesRef.value.indexOf(metaSelectedRef.value);

  console.log(volumeNameSelectedRef.value, volumeNames);

  if (metaIndex === -1 || volumeIndex === -1) {
    return;
  }

  const data = await readVolume(volumeIndex, metaIndex);

  if (data === null) {
    return;
  }

  titleRef.value = `${volumeNameSelectedRef.value} - ${metaSelectedRef.value}`;
  labelsRef.value = metaSetsRef.value[metaIndex];
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
          v-model:value="volumeNameSelectedRef"
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
